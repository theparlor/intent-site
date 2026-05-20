---
signal_id: SIG-INTENTSITE-2026-04-23
title: Intent-site evolves into Intent+Throughline narrative surface; does NOT deprecate at launch
date: 2026-04-23
kind: evolution-signal
status: captured
source: 2026-04-23 brainstorming session; phased-accessibility positioning (SIG-PARALLAX-002)
related:
  - SIG-PARALLAX-001
  - SIG-PARALLAX-002
  - Core/products/parallax/spec/2026-04-23-three-tier-umbrella-and-ecosystem-design.md §7
---

# SIG-INTENTSITE-2026-04-23 — Intent-site evolves, doesn't die

## What happened

Earlier framing had intent-site deprecating at launch of Parallax. That framing was wrong for two reasons surfaced by the phased-accessibility positioning decision (SIG-PARALLAX-002):

1. Parallax is Phase 3 / brand-consolidation — it's not the opening play. Intent-site can't be deprecated by a brand that hasn't been activated
2. Intent is Phase 1 lead. Intent-site is already the surface for Intent; it evolves into the Intent + Throughline narrative surface

Intent-site's task backlog (~20 open tasks including `rebuild-flow-diagram.md`, `system-diagram-page.md`, `expand-event-catalog.md`) remains relevant — the diagrams now have stable labels (Parallax, Warp, Throughline) to draw against.

## Why it matters

- Protects against launch-theater: we don't delete the working narrative surface just because we named a future brand
- Preserves the 62 HTML pages + 4 mermaid diagrams as substrate for the Intent+Throughline narrative, rather than orphaning them
- Gives the intent-site task backlog a clear near-term purpose: rebuild with the stable Parallax/Warp/Throughline labels, not with pre-naming ambiguity

## Action

- Captured: intent-site evolves rather than dies
- Pending: intent-site content-plan revision — which pages stay, which get new content for Throughline, which are held for Parallax Phase 3
- Pending: URL/naming decision — does the domain rename when Parallax activates, or does intent-site URL stay as a child surface inside parallax.*?
- Pending: integration of intent-site into the signal system — this signal directory was just created; tasks/ backlog should be converted to signals or formal TODOs

## Upstream control

Prevents the common "rename-means-delete" failure mode. The intent-site codebase is load-bearing for Phase 1; it gets updated in-place rather than replaced.
