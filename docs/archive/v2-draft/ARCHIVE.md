---
title: Archive — v2-draft (the stalled four-zone refresh)
type: framework
maturity: final
confidentiality: shareable
reusability: universal
created: 2026-06-05
purpose: Record of the v2-draft four-zone refresh — its core pages were promoted to root in Phase 10; the alternative pitch mockups are preserved here.
---
# Archive — v2-draft (the stalled four-zone refresh)

**Status changed:** 2026-06-05 — from "stalled, never promoted" to "promoted to root (core) + archived (exploration)"

## What v2-draft was

`docs/v2-draft/` held the post-2026-04-09 four-zone refresh: a Dunford-disciplined narrowing that committed a single target user, framed Intent as an active research hypothesis, and reorganized the site into four zones (Hypothesis → System → Build → Proof). It was ~70% complete and sat unpromoted for ~7 weeks while the live site stayed on the three-pillar IA — producing the navigation collision that Phase 10 resolved.

## What happened to it (Phase 10, DEC-004)

The four-zone narrowing was **adopted**. Its core pages were promoted (`git mv`) from `docs/v2-draft/` to `docs/` root and wired as the live IA:

| Promoted to root | Role |
|------------------|------|
| `pitch.html` | The Hypothesis (hero) — replaced the three-pillar pitch |
| `the-system.html` | The System (zone hub) |
| `the-build.html` | The Build (zone hub) |
| `the-proof.html` | The Proof (dogfood-evidence ledger) |
| `lineage.html` | Methodology lineage graph |
| `when-not.html` · `who-loses.html` · `ending.html` · `neutral-zone.html` | Adoption-honesty pages |

On promotion, internal links were de-nested (`../foo.html` → `foo.html`), footers standardized, and a persistent zone sub-nav added.

## What's preserved here

The two **alternative pitch mockups** that were design explorations, never part of the shipped IA:

- `pitch-v2-mockup.html` — an alternative hero treatment
- `pitch-coherence-mockup.html` — a "coherence stack" hero exploration (the framing DEC-004 explicitly declined for intent-site; the coherence-stack worldview lives on the Parallax surface, not here)

These are kept as the design-exploration record. They are **not** linked from the live site and carry the older standalone framing.

## Provenance

- Decision: `.intent/decisions/DEC-004-worldview-rescope-rejected-c-minimal.md`
- Content-plan: `.intent/specs/2026-06-05-worldview-refresh-content-plan.md`
- Pre-overhaul tag: `intent-site-pre-overhaul-2026-06-05`
