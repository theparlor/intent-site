---
id: SIG-INTENTSITE-2026-07-19-freshness-comparator-gap
date: 2026-07-19
type: observation
status: resolved
upstream_control_path: site-contracts.md CON-SITE-013 (registered in the contract suite the repo protocol mandates before and after every docs/ change)
catch_mechanism: CON-SITE-013 compares site claims against live ground truth directly, independent of the hash tracker
author: claude-fable-5
---

# Freshness tracker acknowledges hashes without verifying content parity

## Observation

`.freshness-state.json` records the last-seen git hash of four upstream spec files. On 2026-07-19 all four recorded hashes matched live, so the tracker reported clean, while the site claimed 15 event types against a catalog whose tracked file says "The 25 Events." The tracker answers "has the source changed since I last looked?" and cannot answer "did the site absorb the change?" Drift that predates the recorded hash is invisible forever: acknowledging a hash blesses whatever divergence already exists.

This is the audit-comparator failure mode from feedback_audit_vs_writethrough, inverted: the audit stays green because its comparator never inspects the governed artifact.

## Resolution

CON-SITE-013 (added this pass) compares site claims to ground truth directly: exact match on the event-catalog count, 25% drift band on the signal-stream stat, 5% band on the registry census. It fails loudly on absorbed-vs-unabsorbed divergence regardless of hash state.

## Residual (named, tracked in ROADMAP Phase 11)

1. The tracker script itself still only records hashes; extending it to assert parity would move the control further upstream.
2. No CI executes the contract suite; it runs via the repo agent protocol. A GitHub Action runner would remove the depends-on-discipline link.
