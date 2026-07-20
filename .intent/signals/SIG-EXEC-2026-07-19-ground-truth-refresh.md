---
id: SIG-EXEC-2026-07-19-ground-truth-refresh
date: 2026-07-19
type: execution
status: resolved
upstream_control_path: site-contracts.md CON-SITE-013 (runs on every docs/ change per repo agent protocol)
catch_mechanism: CON-SITE-013 numeric-parity contract (exact match on event-catalog count, 25% drift band on signal stream, 5% band on registry census)
pipeline_survival: hand-authored pages, no render pipeline overwrites them; sync-signals.js only touches signal cards when explicitly run
author: claude-fable-5
autonomy: L4 local edits; deploy push held at L0 per README publishing rule
---

# Ground-truth refresh executed (Phase 11)

## What

Brien asked what on theparlor.github.io/intent-site could be updated. Audit found the deployed site 3+ months behind ground truth on every headline number. Synced:

- Internal signals 43 to 194 (ls ../intent/.intent/signals/*.md, census 2026-07-19)
- Specs 14/19 to 45 (ls ../intent/spec/*.md)
- Event catalog 15 to 25 cited; founding-15 schema detail preserved with supersession note
- Cast registry 178/188 to 352 (328 named-human, 16 archetype, 7 org, 1 peer; cast/.known-counts)
- Decisions stat now cites ratified DEC-001 to DEC-014 (upstream log consolidated; site's D1-D19 cards are historical, re-derivation open)
- External evidence: N=1 to 1 interview voice + 3 published convergences (Cagan, Block, MobAI); interview wave honestly 0/10
- Governed repos 8 to 53 .intent roots (worktrees excluded), profiled-cohort framing
- Hero stamp v0 · 2026-04-09 to v0.13 · 2026-07-19 (../intent/VERSION)

Snapshot honesty notes added where rendered artifacts (personas grid, dogfood signal list, signals counters, products cards) intentionally lag the stream. TASK-004 (L0-parked persona count sync) executed with Brien in the loop; TASK-006 status corrected (resolved by Phase 10 archive).

## Residue (tracked in ROADMAP Phase 11)

decisions.html re-derivation; freshness-tracker content-parity extension + CI runner for contracts; signals card curation; observability.html vs signalbox reality unaudited.
