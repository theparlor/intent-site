---
id: SIG-INTENTSITE-2026-09-26-witness-emit-coverage
title: intent-site reports its local actions to Witness; the signal sync has no live event yet and the GitHub-side jobs are outside the fleet
type: signal
maturity: draft
created: 2026-09-26
date: 2026-09-26
timestamp: 2026-09-26T16:10:00Z
source: agent-trace
confidence: high
autonomy_level: L0
status: symptom-repaired, upstream-pending
cluster: witness-coverage
author: claude (queue task QMT-01M3F5JYA4643ANV7GPPRJDPZR)
product: intent-site
parent_signal: SIG-WITNESS-COVERAGE-GAP-AND-DEAD-RECORDER-HOOK-2026-09-25
serves: WS-DDR-150
upstream_control_path: "The next real signal sync (node scripts/sync-signals.js, run by a person or session before a site update) emits intent_site.sync_signals with its counts; nothing else is needed. The two bash-level gaps belong to the shared snippet (Core/products/witness owners): a script killed by SIGPIPE or SIGKILL never runs its EXIT trap, and under bash 3.2 with nounset snippet v2 installs no trap, so an unexpected abort (set -e or set -u) there goes unrecorded."
catch_mechanism: "tests/witness-emit.test.js (node --test tests/*.test.js, 11 tests) pins every emit, including runs under /bin/bash 3.2 and with witness-emit missing; the WS-DDR-150 recorder check shows intent-site as silent if its events stop arriving; the verification command below finds the latest sync event."
verification_command: "grep -h '\"event\":\"intent_site.sync_signals\"' ~/Workspaces/Core/products/witness/farm/events-store/*.jsonl | tail -1"
---
# intent-site reports its local actions to Witness

> **In plain terms:** The site's three local tools (the signal sync, the sync-config check and the
> guard that keeps the site from being described as deprecated) now each report one event to Witness,
> the workspace's event recorder, every time they run. Two of them have already reported a real run.
> The signal sync was tested on a throwaway copy of the site instead of run for real, because a real
> run rewrites the published signals page. It reports on its next real run.

## What runs, and where

| Entry point | Who runs it | Event | Live proof |
|---|---|---|---|
| `scripts/sync-signals.js` | a person or session, before a site update | `intent_site.sync_signals` (ok, blocked on the volume lockout, error) | none yet: a real run rewrites docs/signals.html and docs/dogfood.html |
| `scripts/verify-sync-config.sh` | before any sync | `intent_site.verify_sync_config` (ok, blocked) | EVT-a92d8b914e0d4d85999960c4 |
| `scripts/check-evolves-not-deprecates.sh` | sweeps and sessions (catch-net) | `intent_site.check_evolves` (ok, blocked on drift, error) | EVT-d3849325f7da4301b5a941b8 |

Out of fleet scope, so not instrumented: the site deploys through GitHub Pages from `docs/` on push
(there is no local build step; `docs/visual-brief-app/` is committed build output with no source here),
and `.github/workflows/freshness-check.yml` and `portability.yml` run only on GitHub. The
`.claude/launch.json` preview server is a local viewer, not an action. `scripts/test-evolves-not-deprecates.sh`
and `tests/test-no-hardcoded-home.sh` are tests; the first now sends its fixture runs to a throwaway inbox.

## Known gaps (from the shared bash snippet v2)

1. A script killed by SIGPIPE or SIGKILL never runs its EXIT trap and emits nothing.
2. Under bash 3.2 (macOS /bin/bash) with nounset on, v2 installs no trap. Both bash scripts here call
   `_wx_on_exit_emit <status>` before every explicit exit, so their verdicts are recorded there too
   (tested); only an unexpected abort, such as a failed python3 call under `set -e` in
   verify-sync-config.sh, goes unrecorded on bash 3.2.

## Trust Factors

- Clarity: high
- Blast radius: none (reporting only, fail-open, tested)
- Reversibility: high
- Testability: high (node --test tests/*.test.js)
- Precedent: WS-DDR-150
