# Agent handoff: 2026-11-10-freshness-unreachable

- Status: complete
- Provider/agent: claude
- Objective: Stop the Content Freshness Check from reporting false drift when the private product repo is unreachable (item 4 of .intent/plans/PLAN-FAILING-CI-REPAIR-2026-11-10.md in the Workspaces repo).
- Worktree and branch: `../intent-site-wt-2026-11-10-freshness-unreachable`, `agent/claude/2026-11-10-freshness-unreachable`
- Base and head commits: base `3b7fc86`; head recorded at merge.
- Owned paths: `.github/workflows/freshness-check.yml`, `.freshness-state.json`
- Changed paths: `.freshness-state.json` (revert of bot commit 3b7fc86), `.github/workflows/freshness-check.yml`
- Canonical inputs: run https://github.com/theparlor/intent-site/actions/runs/42842658860, issue #222
- Generated outputs: none
- External reads: GitHub API for theparlor/intent (local test with the owner's gh login)
- External writes: none before landing; after landing, one workflow_dispatch run and a closing comment on issue #222
- Checks and results: local harness ran the workflow's steps with a fake gh (404 on the first call, 404 on one spec, reachable with no drift, reachable with drift) and with the real gh (real repo reachable, real 404, real 401). Every failure took the unreachable path: no drift claim, no issue, state file unchanged, no commit, one warning. Reachable runs kept the drift check and wrote state only when SHAs changed.
- Decisions made: product calls use the optional INTENT_READ_TOKEN secret, else GITHUB_TOKEN; any failed product call means unreachable.
- Unresolved risks or decisions: INTENT_READ_TOKEN does not exist yet; only Brien can create it. Once it exists, the signal count check compares 206 product signal files with 3 on the site and will open a real drift issue on each daily run (no de-duplication); that is existing behavior, not changed here.
- Safest next action: Brien creates the INTENT_READ_TOKEN secret, then reviews whether the signal count comparison should stay.
