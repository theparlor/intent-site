---
id: SIG-intent-site-freshness-unreachable-2026-11-10
title: "intent-site: freshness-unreachable landed with decisions or risks in its handoff"
type: signal
status: open
severity: low
created: 2026-11-10
source_handoff: .agents/handoffs/2026-11-10-claude-freshness-unreachable.md
derived_by: session land
kit_version: 34
repo: intent-site
task: 2026-11-10-claude-freshness-unreachable
branch: agent/claude/2026-11-10-freshness-unreachable
commit_range: 3b7fc86765..d8b81f7e48
---

# intent-site: freshness-unreachable landed with decisions or risks in its handoff

`session land` derived this stub from the session's handoff: the lines below are the handoff's own words, copied verbatim, because a decision that lives only in a handoff is invisible to the sweeps that read signals (SIG-DARK-ZONES-FIVE-PRODUCTS-ROOT-CAUSE-2026-10-31 at the Workspaces root, control 1). The kit wrote nothing beyond this frame. A person or a later session triages it: keep it open as the decision's record, raise its severity, or resolve it with `upstream_control_path` and `catch_mechanism`.

## Decisions made (from the handoff)

product calls use the optional INTENT_READ_TOKEN secret, else GITHUB_TOKEN; any failed product call means unreachable.

## Unresolved risks or decisions (from the handoff)

INTENT_READ_TOKEN does not exist yet; only Brien can create it. Once it exists, the signal count check compares 206 product signal files with 3 on the site and will open a real drift issue on each daily run (no de-duplication); that is existing behavior, not changed here.

## Commit range

- Branch `agent/claude/2026-11-10-freshness-unreachable`, commits `3b7fc86765..d8b81f7e48` on top of origin/main `3b7fc86765`; `session land` squashes them into one commit on main.
- Handoff: `.agents/handoffs/2026-11-10-claude-freshness-unreachable.md`.
