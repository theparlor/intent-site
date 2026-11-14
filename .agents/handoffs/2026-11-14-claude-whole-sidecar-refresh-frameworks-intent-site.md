# Agent handoff: whole-sidecar-refresh-frameworks-intent-site

- Status: complete
- Provider/agent: claude
- Objective: 
- Worktree and branch: `../intent-site-wt-2026-11-14-whole-sidecar-refresh-frameworks-intent-site`, `agent/claude/2026-11-14-whole-sidecar-refresh-frameworks-intent-site`
- Base and head commits: base `0fa9ec9`; head recorded at merge.
- Owned paths: 
- Changed paths:
- Canonical inputs:
- Generated outputs:
- External reads:
- External writes: none
- Checks and results:
- Decisions made:
- Unresolved risks or decisions:
- Safest next action:

<!-- kf11:start -->
## KF-11 review: a content change over the threshold

Rule KF-11 (`Core/products/_intake/2026-10-03-knowledge-farm-projection/rules/knowledge-farm-rules.md`, under the Workspaces root): any content change over 25 files, counted per session and per day, lands only as a reviewed diff.

- This land: 52 content file(s). This session in all: 52. Today, by agent `claude` in this repository: 53. Threshold: 25.
- Base `0fa9ec93f8`, head `566a75026c` (the head before the squash). The whole diff: `git diff 0fa9ec93f8 566a75026c`.
- Reviewer: read the table and the diff, then say yes or no. The answer is recorded here by `python3 .agents/bin/session land --kf11-verdict yes --kf11-reviewer NAME` (or `no`, which stops the land).
- Reviewer verdict: (blank)

| File | Change | Added | Removed |
|---|---|---|---|
| `docs/agents.html.meta.yml` | M | 9 | 2 |
| `docs/arb.html.meta.yml` | M | 8 | 1 |
| `docs/architecture.html.meta.yml` | M | 8 | 1 |
| `docs/archive/v1-2-multi-framing/agents.html.meta.yml` | M | 8 | 1 |
| `docs/archive/v1-2-multi-framing/arb.html.meta.yml` | M | 7 | 0 |
| `docs/archive/v1-2-multi-framing/architecture.html.meta.yml` | M | 7 | 0 |
| `docs/archive/v1-2-multi-framing/concept-brief.html.meta.yml` | M | 8 | 1 |
| `docs/archive/v1-2-multi-framing/decisions.html.meta.yml` | M | 10 | 1 |
| `docs/archive/v1-2-multi-framing/deployment.html.meta.yml` | M | 8 | 1 |
| `docs/archive/v1-2-multi-framing/dogfood.html.meta.yml` | M | 8 | 1 |
| `docs/archive/v1-2-multi-framing/event-catalog.html.meta.yml` | M | 20 | 5 |
| `docs/archive/v1-2-multi-framing/flow-diagram.html.meta.yml` | M | 8 | 1 |
| `docs/archive/v1-2-multi-framing/getting-started.html.meta.yml` | M | 10 | 1 |
| `docs/archive/v1-2-multi-framing/methodology.html.meta.yml` | M | 20 | 5 |
| `docs/archive/v1-2-multi-framing/native-repos.html.meta.yml` | M | 8 | 1 |
| `docs/archive/v1-2-multi-framing/observability.html.meta.yml` | M | 7 | 0 |
| `docs/archive/v1-2-multi-framing/observe.html.meta.yml` | M | 8 | 1 |
| `docs/archive/v1-2-multi-framing/personas.html.meta.yml` | M | 38 | 6 |
| `docs/archive/v1-2-multi-framing/pitch.html.meta.yml` | M | 19 | 4 |
| `docs/archive/v1-2-multi-framing/products.html.meta.yml` | M | 8 | 1 |
| `docs/archive/v1-2-multi-framing/roadmap.html.meta.yml` | M | 22 | 5 |
| `docs/archive/v1-2-multi-framing/schemas.html.meta.yml` | M | 23 | 5 |
| `docs/archive/v1-2-multi-framing/signals.html.meta.yml` | M | 11 | 2 |
| `docs/archive/v1-2-multi-framing/system-diagram.html.meta.yml` | M | 19 | 4 |
| `docs/archive/v1-2-multi-framing/walkthrough.html.meta.yml` | M | 8 | 1 |
| `docs/archive/v1-2-multi-framing/work-system.html.meta.yml` | M | 20 | 5 |
| `docs/archive/v2-draft/pitch-coherence-mockup.html.meta.yml` | M | 14 | 1 |
| `docs/archive/v2-draft/pitch-v2-mockup.html.meta.yml` | M | 14 | 1 |
| `docs/concept-brief.html.meta.yml` | M | 23 | 6 |
| `docs/decisions.html.meta.yml` | M | 26 | 7 |
| `docs/deployment.html.meta.yml` | M | 9 | 2 |
| `docs/dogfood.html.meta.yml` | M | 21 | 6 |
| `docs/event-catalog.html.meta.yml` | M | 21 | 6 |
| `docs/flow-diagram.html.meta.yml` | M | 9 | 2 |
| `docs/getting-started.html.meta.yml` | M | 11 | 2 |
| `docs/index.html.meta.yml` | M | 16 | 1 |
| `docs/methodology.html.meta.yml` | M | 24 | 6 |
| `docs/native-repos.html.meta.yml` | M | 9 | 2 |
| `docs/observability.html.meta.yml` | M | 8 | 1 |
| `docs/observe.html.meta.yml` | M | 9 | 2 |
| `docs/personas.html.meta.yml` | M | 39 | 7 |
| `docs/products.html.meta.yml` | M | 9 | 2 |
| `docs/review-2026-04-09.html.meta.yml` | M | 27 | 6 |
| `docs/roadmap.html.meta.yml` | M | 23 | 6 |
| `docs/schemas.html.meta.yml` | M | 24 | 6 |
| `docs/signals.html.meta.yml` | M | 26 | 7 |
| `docs/system-diagram.html.meta.yml` | M | 20 | 5 |
| `docs/visual-brief-app/index.html.meta.yml` | M | 8 | 1 |
| `docs/visual-brief.html.meta.yml` | M | 9 | 2 |
| `docs/walkthrough.html.meta.yml` | M | 9 | 2 |
| `docs/work-system.html.meta.yml` | M | 24 | 7 |
| `tasks/2026-04-08-persona-browser-and-product-dashboard-design.html.meta.yml` | M | 22 | 5 |
<!-- kf11:end -->
