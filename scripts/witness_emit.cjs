'use strict';
/**
 * witness_emit.cjs - this product's fail-open bridge to Witness (WS-DDR-150), for Node.
 *
 * Every action this product takes (a run that changes state, decides, sends or
 * skips) reports one event to Witness. This module appends one JSON line to the
 * Witness inbox, <witness>/farm/stderr-jsonl/emit-<UTC date>.jsonl, in exactly
 * the shape Witness's shared emit (Core/products/witness/src/emit.py) writes:
 * {ts, level, product, event, attributes:{caller, machine, outcome, run_id,
 * duration_ms, target, ...}}. The Witness file watcher (com.brien.witness-watcher,
 * Aurelius only) ingests new lines within seconds; elsewhere the inbox simply
 * accumulates, which is the local copy the rule asks for.
 *
 * Why an append and not a spawn of bin/witness-emit: one short synchronous write
 * costs well under a millisecond, needs no python start-up, and still works inside
 * a process 'exit' handler, where a spawned child may never get to run.
 *
 * Where the inbox is, first hit wins (the same rules as the python bridge):
 *   $WITNESS_INBOX; else <witness>/farm/stderr-jsonl, where <witness> is the first
 *   of $WITNESS_ROOT, the Core/ folder above this file plus products/witness (works
 *   from a session-kit worktree too), ~/Workspaces/Core/products/witness, that
 *   holds src/emit.py. No Witness found: nothing is written.
 * Under `node --test` with no explicit WITNESS_INBOX, nothing is written, so test
 * runs never post fake activity to the real inbox.
 *
 * Fail-open is load-bearing: nothing here throws. A reporting failure prints one
 * line to stderr ("witness-emit: not recorded (...)") and the real work goes on.
 * Events carry names, hashes, counts and durations only; never prompt text, model
 * output, document text or client material (WS-DDR-150 decision point 5).
 *
 *   const wx = require('./witness_emit.cjs');
 *   const ev = wx.action('intent_site.verb', { target: 'name' });  // starts the clock
 *   ev.attrs.count = 3; ev.end('ok');                          // emits once
 *   wx.onExit('intent_site.verb', { target: 'name' });              // emits at process exit
 *
 * Events this product emits:
 *   intent_site.sync_signals        scripts/sync-signals.js, each run: ok (attrs total, published,
 *                                   newly_added, held, skipped, volume_status), blocked on the volume
 *                                   lockout (exit 2), error (exit 1 or an uncaught exception)
 *   intent_site.verify_sync_config  scripts/verify-sync-config.sh (bash, through Witness's
 *                                   bin/witness-emit): ok, blocked when the product repo path does
 *                                   not resolve
 *   intent_site.check_evolves       scripts/check-evolves-not-deprecates.sh (bash): ok, blocked on
 *                                   drift (exit 1), error when the scan cannot run (exit 2)
 *
 * Not local, so not here: the site deploys by GitHub Pages from docs/ on push, and
 * .github/workflows (freshness-check, portability) run only on GitHub.
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');

const PRODUCT = 'intent-site';
const EVENT_RE = /^[a-z][a-z0-9_]*(\.[a-z0-9_]+)+$/;
const PRODUCT_RE = /^[a-z0-9][a-z0-9._-]{0,63}$/;
const OUTCOMES = ['ok', 'error', 'skipped', 'blocked'];
const MAX_LINE = 3800; // stay under PIPE_BUF so one append is one atomic write

function isFile(p) {
  try { return fs.statSync(p).isFile(); } catch (_) { return false; }
}

function witnessRoot() {
  const candidates = [];
  if (process.env.WITNESS_ROOT) candidates.push(process.env.WITNESS_ROOT);
  let d = __dirname;
  while (d && path.dirname(d) !== d) {
    if (path.basename(d) === 'Core') { candidates.push(path.join(d, 'products', 'witness')); break; }
    d = path.dirname(d);
  }
  candidates.push(path.join(os.homedir(), 'Workspaces', 'Core', 'products', 'witness'));
  for (const c of candidates) {
    if (isFile(path.join(c, 'src', 'emit.py'))) return c;
  }
  return null;
}

/** Full path of today's inbox file (UTC date), or null when no Witness is found. */
function inboxPath(now) {
  const day = (now || new Date()).toISOString().slice(0, 10);
  let base = process.env.WITNESS_INBOX || null;
  if (!base) {
    const root = witnessRoot();
    if (!root) return null;
    base = path.join(root, 'farm', 'stderr-jsonl');
  }
  return path.join(base, `emit-${day}.jsonl`);
}

function machineName() {
  try { return os.hostname().split('.')[0].toLowerCase(); } catch (_) { return 'unknown'; }
}

/** Who asked: WITNESS_CALLER, else the Claude session, else the launchd job, else the person. */
function defaultCaller() {
  const env = process.env;
  if (env.WITNESS_CALLER) return env.WITNESS_CALLER;
  const sid = env.CLAUDE_SESSION_ID || env.CLAUDE_CODE_SESSION_ID;
  if (sid) return `session:${sid}`;
  const label = env.XPC_SERVICE_NAME || '';
  if (label.startsWith('com.brien.')) return `launchd:${label}`;
  let who = 'unknown';
  try { who = os.userInfo().username || env.USER || 'unknown'; } catch (_) { who = env.USER || 'unknown'; }
  return `manual:${who}`;
}

function newRunId() {
  if (process.env.WITNESS_RUN_ID) return process.env.WITNESS_RUN_ID;
  try { return crypto.randomUUID().replace(/-/g, ''); } catch (_) { return crypto.randomBytes(16).toString('hex'); }
}

function isoLocal(d) {
  const pad = (n, w = 2) => String(Math.abs(Math.trunc(n))).padStart(w, '0');
  const off = -d.getTimezoneOffset();
  const sign = off >= 0 ? '+' : '-';
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:` +
    `${pad(d.getMinutes())}:${pad(d.getSeconds())}.${pad(d.getMilliseconds(), 3)}` +
    `${sign}${pad(Math.floor(Math.abs(off) / 60))}:${pad(Math.abs(off) % 60)}`;
}

/** Build the event object. Throws on a malformed event name or outcome (emit catches it). */
function buildEvent(event, opts) {
  const o = opts || {};
  if (!PRODUCT_RE.test(PRODUCT)) throw new Error(`product must be a lowercase slug, got ${PRODUCT}`);
  if (!EVENT_RE.test(event || '')) throw new Error(`event must be a static dotted name, got ${event}`);
  const outcome = o.outcome || 'ok';
  if (!OUTCOMES.includes(outcome)) throw new Error(`outcome must be one of ${OUTCOMES.join('|')}, got ${outcome}`);
  const level = o.level || ({ error: 'error', blocked: 'warn' }[outcome] || 'info');
  const a = {
    caller: o.caller || defaultCaller(),
    machine: machineName(),
    outcome,
    run_id: o.runId || newRunId(),
  };
  if (o.durationMs !== undefined && o.durationMs !== null && Number.isFinite(Number(o.durationMs))) {
    a.duration_ms = Math.round(Number(o.durationMs) * 1000) / 1000;
  }
  if (o.target !== undefined && o.target !== null) a.target = String(o.target);
  if (o.serves) a.serves = o.serves;
  if (o.redactionLevel) a.redaction_level = o.redactionLevel;
  const attrs = o.attrs || {};
  for (const k of Object.keys(attrs)) {
    const v = attrs[k];
    if (!(k in a) && v !== undefined && v !== null) a[k] = v;
  }
  return { ts: isoLocal(o.now || new Date()), level, product: PRODUCT, event, attributes: a };
}

/** Report one action. Returns true when the line was written; never throws. */
function emit(event, opts) {
  try {
    if (process.env.NODE_TEST_CONTEXT && !process.env.WITNESS_INBOX) return false;
    const record = buildEvent(event, opts);
    let line = JSON.stringify(record);
    if (Buffer.byteLength(line, 'utf8') > MAX_LINE) {
      const keep = {};
      for (const k of ['caller', 'machine', 'outcome', 'run_id', 'duration_ms']) {
        if (k in record.attributes) keep[k] = record.attributes[k];
      }
      keep.truncated = true;
      record.attributes = keep;
      line = JSON.stringify(record);
    }
    const p = inboxPath();
    if (!p) return false;
    fs.mkdirSync(path.dirname(p), { recursive: true });
    const fd = fs.openSync(p, 'a', 0o644);
    try { fs.writeSync(fd, line + '\n'); } finally { fs.closeSync(fd); }
    return true;
  } catch (exc) {
    try { process.stderr.write(`witness-emit: not recorded (${exc && exc.name}: ${exc && exc.message})\n`); } catch (_) { /* fail-open */ }
    return false;
  }
}

/**
 * Start timing one action. Returns a handle: set handle.target, handle.outcome
 * and handle.attrs.<name>, then call handle.end([outcome]). Only the first end()
 * emits; later calls return false. Never throws.
 */
function action(event, opts) {
  const o = opts || {};
  const t0 = process.hrtime.bigint();
  const handle = {
    target: o.target,
    outcome: null,
    attrs: Object.assign({}, o.attrs || {}),
    runId: o.runId || null,
    ended: false,
    end(outcome) {
      try {
        if (handle.ended) return false;
        handle.ended = true;
        const ms = Number(process.hrtime.bigint() - t0) / 1e6;
        return emit(event, {
          caller: o.caller, outcome: outcome || handle.outcome || 'ok', durationMs: ms,
          target: handle.target, runId: handle.runId || undefined, attrs: handle.attrs,
        });
      } catch (_) { return false; }
    },
  };
  return handle;
}

/**
 * Time the whole process as one action and emit when it exits. The outcome is
 * handle.outcome when the script set one, else ok for exit code 0 and error for
 * anything else; exit_code is recorded as an attribute. Never throws.
 */
function onExit(event, opts) {
  const handle = action(event, opts);
  try {
    process.once('exit', (code) => {
      try {
        const rc = typeof code === 'number' ? code : (process.exitCode || 0);
        handle.attrs.exit_code = rc;
        handle.end(handle.outcome || (rc === 0 ? 'ok' : 'error'));
      } catch (_) { /* fail-open */ }
    });
  } catch (_) { /* fail-open */ }
  return handle;
}

/** Short sha256 prefix, for a target that is a path or anything client-derived. */
function hashTarget(s) {
  try { return 'sha256:' + crypto.createHash('sha256').update(String(s)).digest('hex').slice(0, 12); } catch (_) { return 'sha256:unknown'; }
}

module.exports = { PRODUCT, emit, action, onExit, buildEvent, inboxPath, defaultCaller, hashTarget };
