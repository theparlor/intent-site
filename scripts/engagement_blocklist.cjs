'use strict';
/**
 * Org blocklist for the signal sync, built at run time from private sources only.
 *
 * This repo is public, so it never stores a client name. The sync asks this module for the
 * names to hold back, and the module reads them from two private places:
 *
 *   1. Every engagement repo's `.agents/engagement-aliases.yaml` under
 *      <Workspaces>/Work/Consulting/Engagements/* and <Workspaces>/Work/Advising/Engagements/*
 *      (WS-DDR-153). Each contributes its folder name, the folder's spaced CamelCase form, and
 *      its canonical name, aliases and codenames. Session worktrees (`-wt-`) are skipped.
 *   2. An optional extra list in the private product repo, at
 *      <product_repo>/.intent/config/site-egress-blocklist.json, shaped {"names": [...]}, for
 *      names that have no engagement repo.
 *
 * Fail closed: when no engagement folder can be read (a machine without Work/, a wrong
 * WORKSPACES_ROOT), build() throws, and the sync publishes nothing.
 *
 * The parser mirrors the stdlib reader in Core/products/witness/src/engagement_aliases.py
 * (a strict YAML subset). This file holds and logs counts only, never a name.
 */

const fs = require('fs');
const os = require('os');
const path = require('path');

const ENGAGEMENT_DIRS = [
  ['Work', 'Consulting', 'Engagements'],
  ['Work', 'Advising', 'Engagements'],
];
const ALIAS_FILE = path.join('.agents', 'engagement-aliases.yaml');
const PRIVATE_LIST = path.join('.intent', 'config', 'site-egress-blocklist.json');
const CAMEL_RE = /[A-Z]{2,}(?![a-z])|[A-Z][a-z0-9]*|[a-z0-9]+/g;

/** Workspaces root: WORKSPACES_ROOT, else the nearest ancestor holding Work/ and Core/, else ~/Workspaces. */
function workspacesRoot(startDir) {
  if (process.env.WORKSPACES_ROOT) return path.resolve(process.env.WORKSPACES_ROOT);
  let d = path.resolve(startDir || __dirname);
  while (path.dirname(d) !== d) {
    if (fs.existsSync(path.join(d, 'Work')) && fs.existsSync(path.join(d, 'Core'))) return d;
    d = path.dirname(d);
  }
  return path.join(os.homedir(), 'Workspaces');
}

function scalar(raw) {
  raw = raw.trim();
  if (!raw) return '';
  if (raw[0] === '"' || raw[0] === "'") {
    const end = raw.indexOf(raw[0], 1);
    if (end < 0) throw new Error('unterminated quoted value');
    const rest = raw.slice(end + 1).trim();
    if (rest && !rest.startsWith('#')) throw new Error('text after a quoted value');
    return raw.slice(1, end);
  }
  return raw.split(/\s+#/)[0].trim();
}

/** Parse the alias-file subset: canonical, folder (scalars), aliases, codenames (lists). */
function parseAliasFile(text) {
  const data = { canonical: null, folder: null, aliases: [], codenames: [] };
  let current = null;
  text.split(/\r?\n/).forEach((line, i) => {
    const s = line.trim();
    if (!s || s.startsWith('#') || (s === '---' && i === 0)) return;
    if (s === '-' || s.startsWith('- ')) {
      if (!/^\s/.test(line) || current === null) throw new Error(`line ${i + 1}: stray list item`);
      const v = scalar(s.slice(1));
      if (current !== '_ignored' && v) data[current].push(v);
      return;
    }
    if (/^\s/.test(line)) throw new Error(`line ${i + 1}: unexpected indentation`);
    const m = s.match(/^([A-Za-z_][A-Za-z0-9_-]*):(?:\s+(.*))?$/);
    if (!m) throw new Error(`line ${i + 1}: expected key: value`);
    const key = m[1];
    const rest = (m[2] || '').trim();
    if (key === 'aliases' || key === 'codenames') {
      if (rest && rest !== '[]' && !rest.startsWith('#')) throw new Error(`line ${i + 1}: list on one line`);
      current = key;
    } else if (key === 'canonical' || key === 'folder') {
      data[key] = scalar(rest) || null;
      current = null;
    } else {
      current = '_ignored';
    }
  });
  return data;
}

function folderVariants(folder) {
  const out = [folder];
  const spaced = (folder.match(CAMEL_RE) || []).join(' ');
  if (spaced && spaced.toLowerCase() !== folder.toLowerCase()) out.push(spaced);
  return out;
}

function addTerm(map, raw) {
  const t = String(raw || '').split(/\s+/).filter(Boolean).join(' ');
  if (t.length >= 2) map.set(t.toLowerCase(), t);
}

/** Terms from every engagement folder under root, plus counts. */
function engagementTerms(root) {
  const terms = new Map();
  const counts = { engagements: 0, alias_files: 0, folder_only: 0, errors: 0 };
  for (const parts of ENGAGEMENT_DIRS) {
    const base = path.join(root, ...parts);
    let names;
    try { names = fs.readdirSync(base).sort(); } catch (_) { continue; }
    for (const name of names) {
      if (name.startsWith('.') || name.includes('-wt-')) continue;
      const dir = path.join(base, name);
      try { if (!fs.statSync(dir).isDirectory()) continue; } catch (_) { continue; }
      counts.engagements += 1;
      folderVariants(name).forEach((t) => addTerm(terms, t));
      let text;
      try { text = fs.readFileSync(path.join(dir, ALIAS_FILE), 'utf8'); } catch (_) { counts.folder_only += 1; continue; }
      try {
        const d = parseAliasFile(text);
        [d.canonical, ...d.aliases, ...d.codenames].forEach((t) => addTerm(terms, t));
        counts.alias_files += 1;
      } catch (_) {
        counts.errors += 1;
      }
    }
  }
  return { terms, counts };
}

/** Names from the private product repo's extra list; a missing file is an empty list. */
function privateTerms(productRepo) {
  if (!productRepo) return { names: [], present: false };
  const file = path.join(productRepo, PRIVATE_LIST);
  if (!fs.existsSync(file)) return { names: [], present: false };
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (!data || !Array.isArray(data.names)) throw new Error(`${PRIVATE_LIST}: expected {"names": [...]}`);
  return { names: data.names.filter((n) => typeof n === 'string'), present: true };
}

/**
 * Build the blocklist. Returns { names: [...longest first], counts }.
 * Throws when no engagement folder is readable, so the caller publishes nothing.
 */
function build(opts) {
  const o = opts || {};
  const root = o.workspacesRoot || workspacesRoot(o.siteRoot);
  const { terms, counts } = engagementTerms(root);
  if (counts.engagements === 0) {
    throw new Error(`no engagement folders readable under ${path.join(root, 'Work')}; refusing to sync without the org blocklist`);
  }
  const extra = privateTerms(o.productRepo);
  extra.names.forEach((t) => addTerm(terms, t));
  const names = [...terms.values()].sort((a, b) => b.length - a.length || a.localeCompare(b));
  return { names, counts: Object.assign({}, counts, { private_list: extra.present ? extra.names.length : 0, terms: names.length }) };
}

module.exports = { build, parseAliasFile, folderVariants, workspacesRoot, PRIVATE_LIST };
