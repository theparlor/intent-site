'use strict';
// Witness emit tests for intent-site (WS-DDR-150). Run: node --test tests/*.test.js
// Every run that could emit points WITNESS_INBOX at a temp dir, so nothing here posts to the
// real Witness inbox; sync-signals.js runs against a temp copy of the site, never docs/.
//
// Proves, per local entry point: (a) the event carries product, event, caller, machine, outcome,
// duration_ms, run_id and target; (b) an emit failure or a missing Witness (no witness-emit, no
// emitter module) leaves the exit status, stdout and written files unchanged, including under
// /bin/bash 3.2, where snippet v2 installs no EXIT trap for nounset scripts.

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const REPO = path.resolve(__dirname, '..');
const EMITTER = path.join(REPO, 'scripts', 'witness_emit.cjs');
const SYNC = path.join(REPO, 'scripts', 'sync-signals.js');
const VERIFY = path.join(REPO, 'scripts', 'verify-sync-config.sh');
const CHECK = path.join(REPO, 'scripts', 'check-evolves-not-deprecates.sh');
const WITNESS_ROOT = (() => {
  let d = REPO;
  while (path.dirname(d) !== d) {
    if (path.basename(d) === 'Core') return path.join(d, 'products', 'witness');
    d = path.dirname(d);
  }
  return path.join(os.homedir(), 'Workspaces', 'Core', 'products', 'witness');
})();
const REQUIRED = ['caller', 'machine', 'outcome', 'duration_ms', 'run_id', 'target'];
const BASH32 = fs.existsSync('/bin/bash') ? '/bin/bash' : null;
const BASH5 = (() => {
  const r = spawnSync('bash', ['-c', 'echo ${BASH_VERSINFO[0]}'], { encoding: 'utf8' });
  return r.status === 0 && Number(r.stdout.trim()) >= 4 ? 'bash' : null;
})();
const SHELLS = [BASH5, BASH32].filter(Boolean);

function tmpdir() { return fs.mkdtempSync(path.join(os.tmpdir(), 'is-witness-')); }
function brokenInbox(dir) {
  const blocker = path.join(dir, 'blocker');
  fs.writeFileSync(blocker, 'a regular file, so mkdir under it fails');
  return path.join(blocker, 'inbox');
}
function readEvents(inbox) {
  if (!fs.existsSync(inbox)) return [];
  const out = [];
  for (const f of fs.readdirSync(inbox).filter((n) => /^emit-\d{4}-\d{2}-\d{2}\.jsonl$/.test(n))) {
    for (const line of fs.readFileSync(path.join(inbox, f), 'utf8').split('\n')) if (line.trim()) out.push(JSON.parse(line));
  }
  return out;
}
function assertMinimum(ev, event) {
  assert.equal(ev.product, 'intent-site');
  assert.equal(ev.event, event);
  assert.match(ev.ts, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}[+-]\d{2}:\d{2}$/);
  for (const k of REQUIRED) assert.ok(k in ev.attributes, `attribute ${k} missing from ${event}`);
  assert.match(ev.attributes.run_id, /^[0-9a-f-]+$/);
}
function env(extra) {
  const e = Object.assign({}, process.env, { WITNESS_CALLER: 'test:intent-site' }, extra || {});
  delete e.NODE_TEST_CONTEXT;
  for (const k of Object.keys(e)) if (e[k] === undefined) delete e[k];
  return e;
}
function run(cmd, args, e, cwd) {
  const r = spawnSync(cmd, args, { env: e, cwd: cwd || REPO, encoding: 'utf8', timeout: 60000 });
  return { code: r.status, stdout: r.stdout, stderr: r.stderr };
}
// "No Witness at all": no inbox override, no WITNESS_ROOT, no home tree, script outside Core/.
function noWitnessEnv(extra) {
  return env(Object.assign({ HOME: '/nonexistent', WITNESS_ROOT: '', WITNESS_INBOX: undefined }, extra || {}));
}

// ---------- the emitter ----------

test('emit writes the minimum event; bad input or a broken inbox returns false, never throws', () => {
  const wx = require(EMITTER);
  const dir = tmpdir();
  const saved = process.env.WITNESS_INBOX;
  try {
    process.env.WITNESS_INBOX = path.join(dir, 'inbox');
    assert.equal(wx.emit('intent_site.probe', { target: 'unit', durationMs: 2, attrs: { count: 1 } }), true);
    assertMinimum(readEvents(process.env.WITNESS_INBOX)[0], 'intent_site.probe');
    assert.equal(wx.emit('intent-site.bad', {}), false, 'hyphens are not allowed in event names');
    process.env.WITNESS_INBOX = brokenInbox(dir);
    assert.equal(wx.emit('intent_site.probe', {}), false);
  } finally {
    if (saved === undefined) delete process.env.WITNESS_INBOX; else process.env.WITNESS_INBOX = saved;
  }
});

test('emitter with no Witness anywhere: returns false, writes nothing, exit code 0', () => {
  const dir = tmpdir();
  fs.copyFileSync(EMITTER, path.join(dir, 'witness_emit.cjs'));
  const r = run(process.execPath, ['-e', "const w=require('./witness_emit.cjs'); console.log(w.emit('intent_site.probe',{target:'x'}), w.inboxPath())"], noWitnessEnv(), dir);
  assert.equal(r.code, 0);
  assert.equal(r.stdout.trim(), 'false null');
  assert.equal(r.stderr, '');
});

// ---------- sync-signals.js ----------

function makeSite(nSignals, volume) {
  const dir = tmpdir();
  const site = path.join(dir, 'site');
  fs.mkdirSync(path.join(site, 'scripts'), { recursive: true });
  fs.mkdirSync(path.join(site, 'docs'));
  fs.copyFileSync(SYNC, path.join(site, 'scripts', 'sync-signals.js'));
  fs.copyFileSync(EMITTER, path.join(site, 'scripts', 'witness_emit.cjs'));
  const cfg = JSON.parse(fs.readFileSync(path.join(REPO, 'sync-config.json'), 'utf8'));
  cfg.sync.product_repo_path = '../product';
  if (volume) cfg.volume = volume;
  fs.writeFileSync(path.join(site, 'sync-config.json'), JSON.stringify(cfg, null, 2));
  fs.writeFileSync(path.join(site, 'docs', 'signals.html'), '<script>\n        const SIGNALS = [\n        ];\n</script>\n');
  fs.writeFileSync(path.join(site, 'docs', 'dogfood.html'),
    '<div class="num amber">0</div>\n<div class="label">Signals captured</div>\n<span class="count">0</span> Signals\n' +
    '<div class="signal-list">\n</div>\n<!-- Specifications -->\n');
  const sig = path.join(dir, 'product', '.intent', 'signals');
  fs.mkdirSync(sig, { recursive: true });
  for (let i = 1; i <= nSignals; i++) {
    const id = `SIG-${String(i).padStart(3, '0')}`;
    fs.writeFileSync(path.join(sig, `2026-09-0${(i % 9) + 1}-${id.toLowerCase()}.md`),
      `---\nid: ${id}\ntitle: Test signal ${i}\ndate: 2026-09-0${(i % 9) + 1}\nconfidence: high\n---\n# Test signal ${i}\nBody.\n`);
  }
  return site;
}
function siteFiles(site) {
  return ['docs/signals.html', 'docs/dogfood.html', 'held-signals.json'].map((f) => {
    const p = path.join(site, f);
    return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : null;
  });
}

test('sync-signals: ok event with counts; emit failure and missing Witness change nothing', () => {
  const inbox = path.join(tmpdir(), 'inbox');
  const siteA = makeSite(3);
  const a = run(process.execPath, [path.join(siteA, 'scripts', 'sync-signals.js')], env({ WITNESS_INBOX: inbox }), siteA);
  assert.equal(a.code, 0, a.stderr);
  assert.match(a.stdout, /Sync complete/);
  const evs = readEvents(inbox);
  assert.equal(evs.length, 1);
  assertMinimum(evs[0], 'intent_site.sync_signals');
  assert.equal(evs[0].attributes.outcome, 'ok');
  assert.equal(evs[0].attributes.target, 'docs/signals.html');
  assert.equal(evs[0].attributes.published, 3);
  assert.equal(evs[0].attributes.newly_added, 3);
  assert.equal(evs[0].attributes.volume_status, 'green');
  assert.equal(evs[0].attributes.caller, 'test:intent-site');

  const siteB = makeSite(3);
  const b = run(process.execPath, [path.join(siteB, 'scripts', 'sync-signals.js')], env({ WITNESS_INBOX: brokenInbox(tmpdir()) }), siteB);
  assert.equal(b.code, a.code);
  assert.equal(b.stdout, a.stdout);
  assert.match(b.stderr, /witness-emit: not recorded/);
  assert.deepEqual(siteFiles(siteB), siteFiles(siteA));

  const siteC = makeSite(3);
  const c = run(process.execPath, [path.join(siteC, 'scripts', 'sync-signals.js')], noWitnessEnv(), siteC);
  assert.equal(c.code, a.code);
  assert.equal(c.stdout, a.stdout);
  assert.deepEqual(siteFiles(siteC), siteFiles(siteA));

  const siteD = makeSite(3);
  fs.unlinkSync(path.join(siteD, 'scripts', 'witness_emit.cjs'));
  const d = run(process.execPath, [path.join(siteD, 'scripts', 'sync-signals.js')], env({ WITNESS_INBOX: path.join(tmpdir(), 'inbox') }), siteD);
  assert.equal(d.code, a.code, 'a missing emitter module must not break the sync');
  assert.equal(d.stdout, a.stdout);
  assert.deepEqual(siteFiles(siteD), siteFiles(siteA));
});

test('sync-signals: volume lockout is reported as blocked, exit 2 unchanged', () => {
  const inbox = path.join(tmpdir(), 'inbox');
  const vol = { green: 1, amber: 2, red: 3 };
  const site = makeSite(5, vol);
  const r = run(process.execPath, [path.join(site, 'scripts', 'sync-signals.js')], env({ WITNESS_INBOX: inbox }), site);
  assert.equal(r.code, 2);
  const [ev] = readEvents(inbox);
  assertMinimum(ev, 'intent_site.sync_signals');
  assert.equal(ev.attributes.outcome, 'blocked');
  assert.equal(ev.attributes.volume_status, 'lockout');
  assert.equal(ev.attributes.exit_code, 2);
  const site2 = makeSite(5, vol);
  const r2 = run(process.execPath, [path.join(site2, 'scripts', 'sync-signals.js')], env({ WITNESS_INBOX: brokenInbox(tmpdir()) }), site2);
  assert.equal(r2.code, 2);
  assert.equal(r2.stdout, r.stdout);
});

// ---------- verify-sync-config.sh (set -euo pipefail) ----------

function verifyCopy(productExists) {
  const dir = tmpdir();
  fs.mkdirSync(path.join(dir, 'site', 'scripts'), { recursive: true });
  fs.copyFileSync(VERIFY, path.join(dir, 'site', 'scripts', 'verify-sync-config.sh'));
  fs.writeFileSync(path.join(dir, 'site', 'sync-config.json'), JSON.stringify({ sync: { product_repo_path: '../product' } }));
  if (productExists) fs.mkdirSync(path.join(dir, 'product'));
  return path.join(dir, 'site', 'scripts', 'verify-sync-config.sh');
}

for (const sh of SHELLS) {
  test(`verify-sync-config under ${sh}: ok and blocked events, one per run`, () => {
    const inbox = path.join(tmpdir(), 'inbox');
    const e = env({ WITNESS_INBOX: inbox, WITNESS_ROOT: WITNESS_ROOT });
    const pass = run(sh, [verifyCopy(true)], e);
    const fail = run(sh, [verifyCopy(false)], e);
    assert.equal(pass.code, 0);
    assert.match(pass.stdout, /^PASS: /);
    assert.equal(fail.code, 1);
    assert.match(fail.stdout, /^ERROR: /);
    const evs = readEvents(inbox);
    assert.equal(evs.length, 2, 'exactly one event per run (explicit emit plus trap never doubles)');
    evs.forEach((ev) => assertMinimum(ev, 'intent_site.verify_sync_config'));
    assert.deepEqual(evs.map((x) => x.attributes.outcome), ['ok', 'blocked']);
    assert.deepEqual(evs.map((x) => x.attributes.exit_code), ['0', '1']);
    assert.equal(evs[0].attributes.target, 'sync-config.json');
  });
}

test('verify-sync-config with witness-emit missing (HOME=/nonexistent WITNESS_ROOT=, /bin/bash): exit status unchanged', { skip: !BASH32 }, () => {
  const withW = env({ WITNESS_INBOX: path.join(tmpdir(), 'inbox'), WITNESS_ROOT: WITNESS_ROOT });
  for (const exists of [true, false]) {
    const ref = run(BASH32, [verifyCopy(exists)], withW);
    const bare = run(BASH32, [verifyCopy(exists)], noWitnessEnv());
    assert.equal(bare.code, exists ? 0 : 1);
    assert.equal(bare.code, ref.code);
    assert.equal(bare.stdout.replace(/\/[^ ']*is-witness-[^/]+/g, '<tmp>'), ref.stdout.replace(/\/[^ ']*is-witness-[^/]+/g, '<tmp>'));
  }
});

test('verify-sync-config on the real repo config (read-only)', () => {
  const inbox = path.join(tmpdir(), 'inbox');
  const r = run(BASH5 || 'bash', [VERIFY], env({ WITNESS_INBOX: inbox }));
  const [ev] = readEvents(inbox);
  assertMinimum(ev, 'intent_site.verify_sync_config');
  assert.equal(ev.attributes.outcome, r.code === 0 ? 'ok' : 'blocked');
});

// ---------- check-evolves-not-deprecates.sh (set -u) ----------

function corpus(withDrift) {
  const dir = tmpdir();
  fs.mkdirSync(path.join(dir, 'docs'));
  for (let i = 1; i <= 6; i++) fs.writeFileSync(path.join(dir, 'docs', `pad${i}.md`), `intent-site reference line ${i}\n`);
  fs.writeFileSync(path.join(dir, 'docs', 'qualified.md'), 'intent-site evolves in place; deprecation gates on Phase 3.\n');
  if (withDrift) fs.writeFileSync(path.join(dir, 'docs', 'drift.md'), 'The intent-site product is being deprecated this quarter.\n');
  return dir;
}

for (const sh of SHELLS) {
  test(`check-evolves under ${sh}: ok, blocked on drift, error when the root is missing; one event each`, () => {
    const inbox = path.join(tmpdir(), 'inbox');
    const e = env({ WITNESS_INBOX: inbox });
    const clean = run(sh, [CHECK, corpus(false)], e);
    const drift = run(sh, [CHECK, corpus(true)], e);
    const missing = run(sh, [CHECK, path.join(tmpdir(), 'no-such-root')], e);
    assert.deepEqual([clean.code, drift.code, missing.code], [0, 1, 2]);
    const evs = readEvents(inbox);
    assert.equal(evs.length, 3, 'exactly one event per run');
    evs.forEach((ev) => assertMinimum(ev, 'intent_site.check_evolves'));
    assert.deepEqual(evs.map((x) => x.attributes.outcome), ['ok', 'blocked', 'error']);
    assert.deepEqual(evs.map((x) => x.attributes.exit_code), ['0', '1', '2']);
  });
}

test('check-evolves with witness-emit missing (HOME=/nonexistent WITNESS_ROOT=, /bin/bash): exit status and output unchanged', { skip: !BASH32 }, () => {
  const dir = tmpdir();
  const copy = path.join(dir, 'check-evolves-not-deprecates.sh');
  fs.copyFileSync(CHECK, copy);
  fs.chmodSync(copy, 0o755);
  const cleanRoot = corpus(false);
  const driftRoot = corpus(true);
  const missingRoot = path.join(dir, 'no-such-root');
  for (const [root, want] of [[cleanRoot, 0], [driftRoot, 1], [missingRoot, 2]]) {
    const ref = run(BASH32, [CHECK, root], env({ WITNESS_INBOX: path.join(tmpdir(), 'inbox') }));
    const bare = run(BASH32, [copy, root], noWitnessEnv());
    assert.equal(bare.code, want);
    assert.equal(bare.code, ref.code);
    assert.equal(bare.stdout, ref.stdout);
  }
});
