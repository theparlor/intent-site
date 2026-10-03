# Agent handoff: org-blocklist-from-engagements

- Status: complete
- Provider/agent: claude
- Objective: the sync's org blocklist leaves this public repo; it is built at run time from private engagement alias files plus an optional private list in the product repo.
- Worktree and branch: `../intent-site-wt-2026-10-03-org-blocklist-from-engagements`, `agent/claude/2026-10-03-org-blocklist-from-engagements`
- Base and head commits: base `4ff3f12`; head recorded at merge.
- Owned paths: `scripts/sync-signals.js`, `scripts/engagement_blocklist.cjs`, `sync-config.json`, `tests/org-blocklist.test.js`, `tests/witness-emit.test.js`, `tasks/sync-guardrails.md`, `ARCHITECTURE.md`
- Changed paths: the owned paths above.
- Canonical inputs: `Work/*/Engagements/*/.agents/engagement-aliases.yaml` (WS-DDR-153), read at run time, never copied here.
- Generated outputs:
- External reads: the engagement alias files and `<product_repo>/.intent/config/site-egress-blocklist.json`, at sync time.
- External writes: none
- Checks and results: `node --test tests/*.test.js` 19 of 19 pass (fictional engagements only); portability-check ok.
- Decisions made: no readable engagement folder means exit 3 and nothing synced (fail closed); a held signal records `[client name withheld]`, never the matched name, because held-signals.json and the log are public.
- Unresolved risks or decisions: matching stays case-insensitive on word boundaries, so a common-word alias can hold a signal that only uses the word; release with RELEASE=SIG-n. A sparse tree reads only the engagements it holds.
- Safest next action: none.
