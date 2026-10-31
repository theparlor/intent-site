---
title: Retirement ledger
type: reference
maturity: living
created: 2026-10-02
---
# Retirement ledger

Every branch, stash, worktree, history rewrite or redaction deliberately applied to this repo,
with a pointer to the tag, bundle, or archive that still holds the prior state and a manifest
of what it contained. Nothing listed here is gone. Recover any row with the command in its
manifest. Grep this directory before concluding that anything was lost.

| Retired | Name | Kind | Holds it | Tip | Last real commit | Unique commits | Files | Why | Manifest |
|---|---|---|---|---|---|---|---|---|---|
| 2026-10-02 | core-client-cleanup redaction (intent-site) | redaction | local tag `archive/pre-client-cleanup-2026-10-02` (never pushed) | ce9ecb835 | 2026-10-02 | 0 | 23 | Client content neutralized in place per WS-DDR-153; prior wording held by the tag | [RET-2026-10-02-core-client-cleanup.md](RET-2026-10-02-core-client-cleanup.md) |
| 2026-10-31 | intent-site-wt-2026-10-31-public-render | worktree | tag `archive/agent/claude/2026-10-31-public-render-2026-10-31` | 0548fd9c | 2026-10-26 | 0 | 0 | Retired, work not on main: leftover of the 2026-10-31 public-render session: its one commit landed as the merged public-render PR, then the name purge rewrote history; nothing beyond main. | [RET-2026-10-31-session-retire-0451.md](RET-2026-10-31-session-retire-0451.md) |
| 2026-10-31 | pre-purge history (two client names in vendored kit comments) | history-rewrite | bundle `intent-site-pre-name-purge-2026-10-31.bundle` in ~/.local/state/retired-history-bundles/ (sha256 e9a999b5e0aa, verified) + local tag `archive/pre-name-purge-2026-10-31` (never pushed) | f619130 | 2026-10-31 | 258 commits rewritten to 256 | 4 kit lines | Two kit provenance comments named a client in this public repo (guard Check 33, 2026-10-31); purged at egress on Brien's 2026-10-31 instruction "address without permanently losing data", bundle first; new main 0548fd9 | [RET-2026-10-31-name-purge.md](RET-2026-10-31-name-purge.md) |
