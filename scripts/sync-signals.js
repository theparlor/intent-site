#!/usr/bin/env node
/**
 * Signal Sync Pipeline with Trust Guardrails
 *
 * Reads signal files from the product repo, applies volume and content
 * guardrails, and updates signals.html and dogfood.html in the site repo.
 *
 * Usage:
 *   node scripts/sync-signals.js                    # Normal sync (local mode)
 *   SIGNAL_SOURCE=github node scripts/sync-signals.js  # Fetch from GitHub API
 *   RELEASE=all node scripts/sync-signals.js        # Release all held signals
 *   RELEASE=SIG-042,SIG-043 node scripts/sync-signals.js  # Release specific
 *   SKIP=SIG-044 node scripts/sync-signals.js       # Permanently skip signals
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Paths
const SITE_ROOT = path.resolve(__dirname, '..');
const CONFIG_PATH = path.join(SITE_ROOT, 'sync-config.json');
const SIGNALS_HTML = path.join(SITE_ROOT, 'docs', 'signals.html');
const DOGFOOD_HTML = path.join(SITE_ROOT, 'docs', 'dogfood.html');
const HELD_PATH = path.join(SITE_ROOT, 'held-signals.json');

// Load config
const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));

// ─── Signal File Parser ───────────────────────────────────────────────

function parseSignalFile(filePath, fileName) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) return null;

  const frontmatter = {};
  fmMatch[1].split('\n').forEach(line => {
    const m = line.match(/^(\w[\w_]*)\s*:\s*(.*)$/);
    if (m) {
      let val = m[2].trim();
      // Strip quotes
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      // Parse arrays
      if (val.startsWith('[')) {
        try { val = JSON.parse(val.replace(/'/g, '"')); } catch { val = []; }
      }
      frontmatter[m[1]] = val;
    }
  });

  const body = raw.slice(fmMatch[0].length).trim();

  // Extract title: prefer frontmatter, fall back to markdown heading
  let title = frontmatter.title || '';
  if (!title) {
    const headingMatch = body.match(/^#\s+(?:Signal:\s*)?(.+)/m);
    if (headingMatch) title = headingMatch[1].trim();
  }
  if (!title) title = fileName.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '').replace(/-/g, ' ');

  // Normalize date
  let date = frontmatter.date || '';
  if (!date && frontmatter.timestamp) {
    date = frontmatter.timestamp.slice(0, 10);
  }
  if (!date) {
    const dateMatch = fileName.match(/^(\d{4}-\d{2}-\d{2})/);
    if (dateMatch) date = dateMatch[1];
  }

  // Normalize confidence
  let confidence = 0.5;
  if (frontmatter.confidence !== undefined) {
    const c = frontmatter.confidence;
    if (c === 'high') confidence = 0.9;
    else if (c === 'medium') confidence = 0.7;
    else if (c === 'low') confidence = 0.4;
    else confidence = parseFloat(c) || 0.5;
  }

  // Normalize trust
  let trust = null;
  if (frontmatter.trust !== undefined && frontmatter.trust !== '') {
    trust = parseFloat(frontmatter.trust);
    if (isNaN(trust)) trust = null;
  }

  // Compute autonomy from trust if not provided
  let autonomy = frontmatter.autonomy_level || frontmatter.autonomy || null;
  if (!autonomy && trust !== null) {
    if (trust < 0.2) autonomy = 'L0';
    else if (trust < 0.4) autonomy = 'L1';
    else if (trust < 0.6) autonomy = 'L2';
    else if (trust < 0.85) autonomy = 'L3';
    else autonomy = 'L4';
  }
  if (!autonomy) autonomy = 'L0';

  return {
    id: frontmatter.id || 'SIG-???',
    date,
    title,
    source: frontmatter.source || 'unknown',
    confidence,
    status: frontmatter.status || 'active',
    autonomy,
    cluster: frontmatter.cluster || null,
    trust,
    file: fileName,
    _body: body.slice(0, 500), // For content scanning
  };
}

// ─── Signal Loader ────────────────────────────────────────────────────

function loadSignalsLocal() {
  const signalsDir = path.resolve(SITE_ROOT, config.sync.product_repo_path, config.sync.signals_subdir);
  if (!fs.existsSync(signalsDir)) {
    console.error(`Signal directory not found: ${signalsDir}`);
    process.exit(1);
  }
  const files = fs.readdirSync(signalsDir).filter(f => f.endsWith('.md')).sort();
  const signals = [];
  for (const f of files) {
    const sig = parseSignalFile(path.join(signalsDir, f), f);
    if (sig) signals.push(sig);
  }
  return signals;
}

// ─── Guardrail: Volume Circuit Breaker ────────────────────────────────

function checkVolume(newSignals) {
  const count = newSignals.length;
  const { green, amber, red } = config.volume;

  if (count > red) {
    return { status: 'lockout', publishable: [], held: newSignals, message: `Volume lockout: ${count} new signals exceeds red threshold (${red})` };
  }
  if (count > amber) {
    const publishable = newSignals.slice(0, green);
    const held = newSignals.slice(green);
    return { status: 'red', publishable, held, message: `Volume hold: ${count} new signals. Publishing first ${green}, holding ${held.length}` };
  }
  if (count > green) {
    return { status: 'amber', publishable: newSignals, held: [], message: `Volume elevated: ${count} new signals (above green threshold of ${green})` };
  }
  return { status: 'green', publishable: newSignals, held: [], message: `Volume normal: ${count} new signals` };
}

// ─── Guardrail: Content Safety Gate ───────────────────────────────────

function checkContent(signal) {
  const text = `${signal.title} ${signal._body || ''}`;

  // PII patterns
  for (const [ruleName, pattern] of Object.entries(config.content.pii_patterns)) {
    const re = new RegExp(pattern);
    const match = text.match(re);
    if (match) {
      return { clean: false, rule: `pii_${ruleName}`, match: match[0] };
    }
  }

  // Org blocklist (case-insensitive, word boundary)
  for (const org of config.content.org_blocklist) {
    const re = new RegExp(`\\b${org.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    const match = text.match(re);
    if (match) {
      // Check it's not in allowed list
      const isAllowed = config.content.allowed_names.some(a => a.toLowerCase() === match[0].toLowerCase());
      if (!isAllowed) {
        return { clean: false, rule: 'org_blocklist', match: match[0] };
      }
    }
  }

  // Profanity/toxicity
  for (const term of config.content.blocklist_terms) {
    const re = new RegExp(`\\b${term}\\b`, 'i');
    const match = text.match(re);
    if (match) {
      return { clean: false, rule: 'blocklist_term', match: match[0] };
    }
  }

  // URL detection (flag but publish)
  const urlMatch = signal.title.match(/https?:\/\/\S+/);
  if (urlMatch) {
    console.log(`  ⚠ URL in title: ${signal.id} — ${urlMatch[0]} (publishing anyway)`);
  }

  return { clean: true, rule: null, match: null };
}

// ─── Held Signal Manifest ─────────────────────────────────────────────

function loadHeldManifest() {
  if (fs.existsSync(HELD_PATH)) {
    return JSON.parse(fs.readFileSync(HELD_PATH, 'utf8'));
  }
  return { held: [], released: [], skipped: [] };
}

function saveHeldManifest(manifest) {
  fs.writeFileSync(HELD_PATH, JSON.stringify(manifest, null, 2) + '\n');
}

// ─── Release/Skip Processing ──────────────────────────────────────────

function processReleases(manifest) {
  const releaseEnv = process.env.RELEASE || '';
  const skipEnv = process.env.SKIP || '';

  if (releaseEnv) {
    const toRelease = releaseEnv === 'all'
      ? manifest.held.map(h => h.id)
      : releaseEnv.split(',').map(s => s.trim());

    manifest.held = manifest.held.filter(h => {
      if (toRelease.includes(h.id)) {
        manifest.released.push({ ...h, released_at: new Date().toISOString() });
        return false;
      }
      return true;
    });
  }

  if (skipEnv) {
    const toSkip = skipEnv.split(',').map(s => s.trim());
    manifest.held = manifest.held.filter(h => {
      if (toSkip.includes(h.id)) {
        manifest.skipped.push({ ...h, skipped_at: new Date().toISOString() });
        return false;
      }
      return true;
    });
  }

  return manifest;
}

// ─── HTML Injection ───────────────────────────────────────────────────

function formatSignalForJS(sig) {
  const cluster = sig.cluster ? `"${sig.cluster}"` : 'null';
  const trust = sig.trust !== null ? sig.trust : 'null';
  const title = sig.title.replace(/"/g, '\\"');
  return `            { id: "${sig.id}", date: "${sig.date}", title: "${title}", source: "${sig.source}", confidence: ${sig.confidence}, status: "${sig.status}", autonomy: "${sig.autonomy}", cluster: ${cluster}, trust: ${trust}, file: "${sig.file}" }`;
}

function updateSignalsHTML(signals) {
  let html = fs.readFileSync(SIGNALS_HTML, 'utf8');

  // Replace the SIGNALS array
  const arrayStart = html.indexOf('const SIGNALS = [');
  const arrayEnd = html.indexOf('];', arrayStart);
  if (arrayStart === -1 || arrayEnd === -1) {
    console.error('Could not find SIGNALS array in signals.html');
    process.exit(1);
  }

  const newArray = 'const SIGNALS = [\n' +
    signals.map(formatSignalForJS).join(',\n') +
    '\n        ]';

  html = html.slice(0, arrayStart) + newArray + html.slice(arrayEnd + 1);
  fs.writeFileSync(SIGNALS_HTML, html);
}

function formatDate(dateStr) {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const d = new Date(dateStr + 'T00:00:00');
  return `${months[d.getMonth()]} ${d.getDate()}`;
}

function formatDogfoodSignalItem(sig) {
  const repoBase = 'https://github.com/theparlor/intent/blob/main/.intent/signals/';
  const title = sig.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  return `      <a class="signal-item" href="${repoBase}${sig.file}">
        <span class="signal-id">${sig.id}</span>
        <span class="signal-title">${title}</span>
        <span class="signal-date">${formatDate(sig.date)}</span>
      </a>`;
}

function updateDogfoodHTML(signals) {
  let html = fs.readFileSync(DOGFOOD_HTML, 'utf8');
  const signalCount = signals.length;

  // Update stat box: <div class="num amber">NUMBER</div>
  html = html.replace(
    /(<div class="num amber">)\d+(<\/div>\s*<div class="label">Signals captured)/,
    `$1${signalCount}$2`
  );

  // Update flow strip: <span class="count">NUMBER</span> Signals
  html = html.replace(
    /(<span class="count">)\d+(<\/span> Signals)/,
    `$1${signalCount}$2`
  );

  // Regenerate the signal list between <div class="signal-list"> and its closing </div>
  const listStart = html.indexOf('<div class="signal-list">');
  if (listStart !== -1) {
    const listContentStart = html.indexOf('>', listStart) + 1;
    // Find the closing </div> — it's the next </div> after the last </a> in the list
    const nextSectionHeader = html.indexOf('<!-- Specifications -->', listContentStart);
    // Walk back to find the </div> that closes signal-list
    const listEnd = html.lastIndexOf('</div>', nextSectionHeader);

    const newList = '\n' + signals.map(formatDogfoodSignalItem).join('\n') + '\n    ';
    html = html.slice(0, listContentStart) + newList + html.slice(listEnd);
  }

  fs.writeFileSync(DOGFOOD_HTML, html);
}

// ─── Main ─────────────────────────────────────────────────────────────

function main() {
  console.log('╔══════════════════════════════════════════╗');
  console.log('║  Intent Signal Sync Pipeline             ║');
  console.log('╚══════════════════════════════════════════╝\n');

  // 1. Load held manifest and process releases/skips
  let manifest = loadHeldManifest();
  manifest = processReleases(manifest);

  const skippedIds = new Set(manifest.skipped.map(s => s.id));
  const heldIds = new Set(manifest.held.map(h => h.id));

  // 2. Load all signals from product repo
  console.log('Loading signals from product repo...');
  const allSignals = loadSignalsLocal();
  console.log(`  Found ${allSignals.length} signal files\n`);

  // 3. Determine what's currently on the site
  const siteHTML = fs.readFileSync(SIGNALS_HTML, 'utf8');
  const siteSignalIds = new Set();
  const idMatches = siteHTML.matchAll(/id: "SIG-(\d+)"/g);
  for (const m of idMatches) siteSignalIds.add(`SIG-${m[1]}`);
  console.log(`  Site currently shows ${siteSignalIds.size} signals`);

  // Released signals should be treated as "new" for publishing
  const releasedIds = new Set(manifest.released.map(r => r.id));

  // 4. Identify new signals (not on site, not held, not skipped)
  const newSignals = allSignals.filter(s =>
    (!siteSignalIds.has(s.id) || releasedIds.has(s.id)) &&
    !skippedIds.has(s.id) &&
    !heldIds.has(s.id)
  );
  console.log(`  New signals to process: ${newSignals.length}\n`);

  // 5. Volume circuit breaker
  console.log('── Volume Check ──');
  const volumeResult = checkVolume(newSignals);
  console.log(`  ${volumeResult.message}`);

  if (volumeResult.status === 'lockout') {
    console.log('\n🚫 LOCKOUT — No signals published. Run with RELEASE=true after review.');
    volumeResult.held.forEach(s => {
      manifest.held.push({
        id: s.id, title: s.title, rule: 'volume_lockout',
        match: `${newSignals.length} signals exceed red threshold`,
        held_at: new Date().toISOString()
      });
    });
    saveHeldManifest(manifest);
    process.exit(2);
  }

  // Add volume-held signals to manifest
  volumeResult.held.forEach(s => {
    manifest.held.push({
      id: s.id, title: s.title, rule: 'volume_hold',
      match: `Exceeded green threshold (${config.volume.green})`,
      held_at: new Date().toISOString()
    });
  });

  // 6. Content safety gate on publishable signals
  console.log('\n── Content Check ──');
  const cleanSignals = [];
  for (const sig of volumeResult.publishable) {
    const result = checkContent(sig);
    if (result.clean) {
      cleanSignals.push(sig);
      console.log(`  ✓ ${sig.id}: clean`);
    } else {
      console.log(`  ✗ ${sig.id}: held (${result.rule}: "${result.match}")`);
      manifest.held.push({
        id: sig.id, title: sig.title, rule: result.rule,
        match: result.match, held_at: new Date().toISOString()
      });
    }
  }

  // 7. Build the full publishable set: existing site signals + clean new signals
  const existingSignals = allSignals.filter(s =>
    siteSignalIds.has(s.id) && !releasedIds.has(s.id) && !skippedIds.has(s.id)
  );
  const publishSet = [...existingSignals, ...cleanSignals]
    .sort((a, b) => {
      const numA = parseInt(a.id.replace('SIG-', ''));
      const numB = parseInt(b.id.replace('SIG-', ''));
      return numA - numB;
    });

  // 8. Update signals.html
  console.log(`\n── Publishing ──`);
  console.log(`  Publishing ${publishSet.length} signals to signals.html`);
  updateSignalsHTML(publishSet);

  // 9. Update dogfood.html counts + signal list
  console.log(`  Updating dogfood.html: ${publishSet.length} signals (count + cards)`);
  updateDogfoodHTML(publishSet);

  // 10. Save held manifest
  saveHeldManifest(manifest);

  // 11. Summary
  console.log('\n── Summary ──');
  console.log(`  Total signals in product:  ${allSignals.length}`);
  console.log(`  Published to site:         ${publishSet.length}`);
  console.log(`  Newly added:               ${cleanSignals.length}`);
  console.log(`  Held (content/volume):     ${manifest.held.length}`);
  console.log(`  Skipped (permanent):       ${manifest.skipped.length}`);

  if (volumeResult.status === 'amber') {
    console.log(`\n⚠ Volume elevated — consider reviewing the signal surge`);
  }

  if (manifest.held.length > 0) {
    console.log(`\n📋 Held signals:`);
    manifest.held.forEach(h => console.log(`   ${h.id}: ${h.rule} — "${h.match}"`));
  }

  console.log('\n✅ Sync complete');
}

main();
