'use strict';
// Org blocklist tests. Run: node --test tests/*.test.js
// Every engagement and name here is fictional. The blocklist is built at run time from private
// engagement alias files and an optional private list; this public repo stores no client name.

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const REPO = path.resolve(__dirname, '..');
const BL = require(path.join(REPO, 'scripts', 'engagement_blocklist.cjs'));

function tmpdir() { return fs.mkdtempSync(path.join(os.tmpdir(), 'is-blocklist-')); }
function write(p, text) { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, text); }

// A fictional Workspaces tree: one engagement with an alias file, one without, one session
// worktree that must be skipped, and one malformed alias file.
// Paths are joined from segments so the public-repo leak gate does not read them as pointers.
function eng(root, kind, folder, ...rest) { return path.join(root, 'Work', kind, 'Engagements', folder, ...rest); }
const ALIAS = ['.agents', 'engagement-aliases.yaml'];
function makeWorkspaces(dir) {
  const root = path.join(dir, 'Workspaces');
  write(eng(root, 'Consulting', 'NorthwindTraders', ...ALIAS),
    '# fictional\ncanonical: "Northwind Traders"\nfolder: "NorthwindTraders"\naliases:\n  - "Northwind"\n  - "NWT"\ncodenames:\n  - "Project Lantern"\n');
  fs.mkdirSync(eng(root, 'Advising', 'ContosoBank'), { recursive: true });
  write(eng(root, 'Consulting', 'NorthwindTraders-wt-2026-01-01-x', ...ALIAS),
    'canonical: "Worktree Only Name"\naliases: []\ncodenames: []\n');
  write(eng(root, 'Consulting', 'FabrikamFoods', ...ALIAS),
    'canonical: "Fabrikam Foods"\naliases: [ "inline", "list" ]\n');
  return root;
}

test('build: aliases, codenames and folder forms are read; worktrees skipped; counts only', () => {
  const root = makeWorkspaces(tmpdir());
  const b = BL.build({ workspacesRoot: root });
  const lower = new Set(b.names.map((n) => n.toLowerCase()));
  for (const want of ['northwind traders', 'northwind', 'nwt', 'project lantern', 'contosobank', 'contoso bank', 'fabrikamfoods', 'fabrikam foods']) {
    assert.ok(lower.has(want), `missing ${want}`);
  }
  assert.ok(!lower.has('worktree only name'), 'a session worktree must not contribute names');
  assert.deepEqual(b.counts, { engagements: 3, alias_files: 1, folder_only: 1, errors: 1, private_list: 0, terms: b.names.length });
  assert.ok(b.names.every((n, i, a) => i === 0 || a[i - 1].length >= n.length), 'longest first');
});

test('build: the private product-repo list is added to the engagement names', () => {
  const dir = tmpdir();
  const root = makeWorkspaces(dir);
  const product = path.join(dir, 'product');
  write(path.join(product, BL.PRIVATE_LIST), JSON.stringify({ names: ['Tailspin Toys', 'Wingtip'] }));
  const b = BL.build({ workspacesRoot: root, productRepo: product });
  assert.ok(b.names.includes('Tailspin Toys') && b.names.includes('Wingtip'));
  assert.equal(b.counts.private_list, 2);
});

test('build: no readable engagement folder fails closed', () => {
  const dir = tmpdir();
  assert.throws(() => BL.build({ workspacesRoot: path.join(dir, 'nowhere') }), /refusing to sync/);
});

test('parseAliasFile matches the strict subset', () => {
  const d = BL.parseAliasFile('---\ncanonical: "A B"\nfolder: AB  # c\nextra:\n  - ignored\naliases:\n  - "x"\ncodenames: []\n');
  assert.deepEqual(d, { canonical: 'A B', folder: 'AB', aliases: ['x'], codenames: [] });
  assert.throws(() => BL.parseAliasFile('- "orphan"\n'));
  assert.deepEqual(BL.folderVariants('LitwareInc'), ['LitwareInc', 'Litware Inc']);
});

test('public sync-config.json carries no org_blocklist', () => {
  const cfg = JSON.parse(fs.readFileSync(path.join(REPO, 'sync-config.json'), 'utf8'));
  assert.ok(!('org_blocklist' in cfg.content));
});

// ---------- end to end through sync-signals.js ----------

function makeSite(dir) {
  const site = path.join(dir, 'site');
  fs.mkdirSync(path.join(site, 'scripts'), { recursive: true });
  for (const f of ['sync-signals.js', 'engagement_blocklist.cjs', 'witness_emit.cjs']) {
    fs.copyFileSync(path.join(REPO, 'scripts', f), path.join(site, 'scripts', f));
  }
  const cfg = JSON.parse(fs.readFileSync(path.join(REPO, 'sync-config.json'), 'utf8'));
  cfg.sync.product_repo_path = '../product';
  write(path.join(site, 'sync-config.json'), JSON.stringify(cfg, null, 2));
  write(path.join(site, 'docs', 'signals.html'), '<script>\n        const SIGNALS = [\n        ];\n</script>\n');
  write(path.join(site, 'docs', 'dogfood.html'),
    '<div class="num amber">0</div>\n<div class="label">Signals captured</div>\n<span class="count">0</span> Signals\n' +
    '<div class="signal-list">\n</div>\n<!-- Specifications -->\n');
  const sig = path.join(dir, 'product', '.intent', 'signals');
  write(path.join(sig, '2026-09-01-sig-001.md'), '---\nid: SIG-001\ntitle: Clean signal\ndate: 2026-09-01\n---\nNothing named.\n');
  write(path.join(sig, '2026-09-02-sig-002.md'), '---\nid: SIG-002\ntitle: Retro notes\ndate: 2026-09-02\n---\nFrom the project lantern review.\n');
  write(path.join(sig, '2026-09-03-sig-003.md'), '---\nid: SIG-003\ntitle: Pairing note\ndate: 2026-09-03\n---\nWorked with Wingtip on this.\n');
  write(path.join(dir, 'product', BL.PRIVATE_LIST), JSON.stringify({ names: ['Wingtip'] }));
  return site;
}
function runSync(site, root) {
  const e = Object.assign({}, process.env, { WITNESS_INBOX: path.join(path.dirname(site), 'inbox'), WORKSPACES_ROOT: root });
  delete e.NODE_TEST_CONTEXT;
  return spawnSync(process.execPath, [path.join(site, 'scripts', 'sync-signals.js')], { cwd: site, env: e, encoding: 'utf8', timeout: 60000 });
}

test('sync holds signals naming a client, publishes the rest, and never writes the name', () => {
  const dir = tmpdir();
  const root = makeWorkspaces(dir);
  const site = makeSite(dir);
  const r = runSync(site, root);
  assert.equal(r.status, 0, r.stderr);
  const held = JSON.parse(fs.readFileSync(path.join(site, 'held-signals.json'), 'utf8')).held;
  assert.deepEqual(held.map((h) => [h.id, h.rule]).sort(), [['SIG-002', 'org_blocklist'], ['SIG-003', 'org_blocklist']]);
  const html = fs.readFileSync(path.join(site, 'docs', 'signals.html'), 'utf8');
  assert.match(html, /SIG-001/);
  assert.doesNotMatch(html, /SIG-002|SIG-003/);
  for (const text of [r.stdout, r.stderr, JSON.stringify(held)]) {
    assert.doesNotMatch(text, /lantern|wingtip|northwind/i, 'a client name leaked into public output');
  }
});

test('sync with no readable Work/ exits 3 and writes nothing', () => {
  const dir = tmpdir();
  const site = makeSite(dir);
  const before = fs.readFileSync(path.join(site, 'docs', 'signals.html'), 'utf8');
  const r = runSync(site, path.join(dir, 'nowhere'));
  assert.equal(r.status, 3);
  assert.match(r.stderr, /Org blocklist unavailable/);
  assert.equal(fs.readFileSync(path.join(site, 'docs', 'signals.html'), 'utf8'), before);
  assert.ok(!fs.existsSync(path.join(site, 'held-signals.json')));
});
