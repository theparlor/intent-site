# Archive — v1.2 multi-framing snapshot

**Frozen:** 2026-04-09
**Trigger:** Multi-panel review (see `../review-2026-04-09.html`)
**Reason:** Subtraction pass before rebuild — preserving recoverable snapshot

## What this is

This is the intent-site state on 2026-04-09, immediately before the post-panel-review subtraction pass (INT-008). 23 HTML pages representing the v1.2 "multi-framing" era of the site.

The panels flagged this version with:
- **F1:** No target user (6/8 panels)
- **F3:** Category confusion — 6 framings across 6 pages (5/8 panels)
- **F4:** Reader is never the hero (4/8 panels)
- Plus 7 other findings across architecture, discovery, psychological safety

## Why it was archived rather than deleted

1. **Recovery point.** If the rebuilt site performs worse on a future panel review, we can roll back to this baseline.
2. **Historical record.** The git history alone is hard to browse; having a readable snapshot in a subfolder makes regressions visible.
3. **Honest accountability.** The panel review explicitly flagged the problems in these pages. Archiving rather than deleting shows we're not hiding what we shipped before.
4. **Forcing function.** The review document (review-2026-04-09.html) references these pages by name. Archive keeps those references live.

## What's NOT in the archive

- `review-2026-04-09.html` — stays in the live site as the driving artifact
- `index.html` — stays live (it's the redirect)
- `styles.css` — shared stylesheet, stays live
- `visual-brief.html` and `visual-brief-app/` — not part of the IA review
- `.meta.yml` files — not archived (they're library-index enrichment sidecars)

## Reading order (if you're reviewing this archive)

1. `../review-2026-04-09.html` — the panel review that triggered this archival
2. `pitch.html` — the hero page with 3 of the 6 conflicting category framings
3. `concept-brief.html` — the page Positioning panel called out for oscillating between "personal OS" and "team OS" in the same paragraph
4. `methodology.html` — the Two-Plane Architecture page that introduced most of the internal jargon
5. `work-system.html` — the Products tab where 8 products got sold at once
6. `products.html` — the flat catalog that fails the Dunford category test hardest

## What replaces it

See `../../../Core/frameworks/intent/.intent/plans/2026-04-09-post-panel-plan.md` for the three-week rollout plan. New content lands as drafts in week 2, published in week 3 after a second panel review validates the fixes.

## Git history

Every page in this archive can be traced back through git log to find the commit that wrote it. The archival commit is:
- `[hash pending]` — "post-panel: archive v1.2 multi-framing snapshot before subtraction pass"
