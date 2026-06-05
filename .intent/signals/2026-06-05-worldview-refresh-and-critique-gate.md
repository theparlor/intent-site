---
signal_id: SIG-INTENTSITE-2026-06-05
title: Worldview refresh needed (products.html 8 → ecosystem 21); critique-gate before rebuild; evolve-in-place per canon, re-scope question open for panel
date: 2026-06-05
kind: notice-signal
status: captured
source: 2026-06-05 session (Brien) — "should we archive intent-site docs and regenerate a refreshed view of the world, run it through critique panels, then rebuild?"
related:
  - SIG-INTENTSITE-2026-04-23 (evolves-not-deprecates — the governing canon)
  - Core/products/parallax/spec/2026-04-23-three-tier-umbrella-and-ecosystem-design.md
  - Core/ECOSYSTEM-ARCHITECTURE-2026-05-20.md
  - Core/products/voices/src/panel_critique.py
---

# SIG-INTENTSITE-2026-06-05 — Refresh the worldview, gate it on critique, don't archive-and-rebuild

## What happened

Brien asked whether the product ecosystem has advanced far enough to (a) archive the current intent-site docs into a standalone subdir, (b) regenerate a refreshed "view of the world," (c) run it through critique panels (positioning / product / engineering / AI-minds-of-tomorrow) BEFORE rebuilding, and (d) whether this is best done as a dedicated new session.

Recon findings:
- **Worldview is materially stale (~7–8 weeks at ecosystem level).** `docs/products.html` lists only 8 products (incl. old "skills-engine" name). The current ecosystem (Core/ECOSYSTEM-ARCHITECTURE-2026-05-20.md) is ~21 products / 17 frameworks. **Missing from intent-site's worldview:** Forge, Cast, Loom, Voices, Topography, Witness, Conduit, Parallax, Warp, Throughline, Crucible, Lodestone, reference-substrate, and the Cast↔Forge split. The narrative still frames Intent as a *solo framework*, not the coherence stack.
- **A refresh is already partly scaffolded:** `docs/v2-draft/` (11 pages, ~70% narrative: pitch/the-system/the-proof/the-build/lineage/who-loses/when-not/ending + 2 May-20 mockups), governance-pending Phase 9; `tasks/ROADMAP.md` Phase 9 has ready tasks (persona-count sync 178→242, orphan-page governance, metadata).

## Why it matters — reconciliation with canon

The instinct ("archive + regenerate from scratch") **conflicts with ratified canon** and must be reframed:
- **SIG-INTENTSITE-2026-04-23 (evolve-not-deprecate)** is the precedence anchor: intent-site is the load-bearing Phase-1 surface and evolves IN PLACE into the Intent+Throughline narrative; Parallax is Phase-3 and can't deprecate a surface it hasn't replaced. Its OWN "Pending" list already names "content-plan revision — which pages stay, which get Throughline content." This refresh IS that pending action.
- **intent-site/CLAUDE.md content-preservation rules** forbid skeleton-replacement, >20% size cuts without approval, and orphaning the visual components / site-contracts / ROADMAP infra.

So: **not** archive-and-rebuild-from-scratch. Reframe as **evolve-in-place**: a *non-destructive* snapshot (git tag or `docs/_archive/2026-06/`) for reference, then a content-plan revision against the 21-product worldview + Throughline integration, gated on critique.

## Open strategic question (FOR THE CRITIQUE PANEL — DDR-level)

Has the world moved enough that intent-site should be **re-scoped** — from "the Intent framework site" toward "the coherence-stack worldview surface" (accelerating the Parallax-ward evolution) — or does it stay scoped as the Intent+Throughline Phase-1 lead with the broader stack deferred to Parallax Phase 3? Positioning (Dunford) and the AI-minds panel will have the sharpest read. This is the panel's job-1; it gates everything downstream.

## Plan (Notice → Spec → Critique gate → Execute)

1. **Notice** — this signal.
2. **Spec** — content-plan revision: per-page disposition (keep / refresh-worldview / add-Throughline / hold-for-Parallax), mapped to the 21-product ecosystem.
3. **Critique gate (HARD — "then and only then rebuild")** — Voices panels (Core/products/voices/src/panel_critique.py), dissent-preserved:
   - Positioning → april-dunford
   - Product → marty-cagan, teresa-torres, jeff-patton
   - Engineering/architecture → andrej-karpathy, chris-markus
   - AI minds of tomorrow → andrej-karpathy, nate-b-jones
   Panel resolves the re-scope question + pressure-tests positioning/IA BEFORE any HTML changes.
4. **Execute** — rebuild against approved plan; run site-contracts before/after; respect ROADMAP phase-gating.

Recommended as a **dedicated session** (multi-phase, governed surface, own Intent scaffold). Kickoff prompt authored 2026-06-05 (delivered in-session; paste to ignite).

## Action / status

- Captured: refresh warranted; archive-from-scratch rejected on canon; critique-gate-before-rebuild endorsed; dedicated-session recommended.
- Pending: Brien go on new session; Spec (content-plan revision); panel run; re-scope DDR if panel recommends it.

## Upstream control

Critique-gate-before-rebuild prevents shipping stale-worldview HTML; content-preservation rules + ROADMAP phase-gating prevent skeleton-replace / orphaning; the re-scope decision is routed to a Voices panel + (if it flips) a WS-DDR rather than decided ad hoc mid-rebuild.

---

## Confirmation + enrichment (2026-06-05 dedicated session)

**Notice CONFIRMED — it holds.** Recon verified the staleness: `products.html` lists 8 products incl. the old `skills-engine` name; ecosystem is 21 products. The evolve-in-place reframe and critique-gate-before-rebuild posture are correct and unchanged.

**Material enrichment that SHARPENS the open question** (this changes the panel's framing, so recording it on the notice):

- The instinct's premise — "Intent is still framed as a *solo framework* not the coherence stack" — is **only half the story.** Recon found the narrow framing is largely a **ratified positioning discipline**, not just drift:
  - `docs/archive/v1.2-multi-framing/ARCHIVE.md`: an 8-panel review on 2026-04-09 **killed** a broader multi-framing intent-site for **F1 no-target-user (6/8)** and **F3 category confusion: 6 framings across 6 pages (5/8)**. `products.html` was "the flat catalog that fails the Dunford category test hardest."
  - `DEC-20260409-02` ratified unconditionally: **one site, target-user committed (staff+ eng on teams of 2–7 using Claude Code daily), multi-product framing removed from the hero.**
  - `docs/v2-draft/` (the 70% rebuild) **executes that narrowing** — Dunford-shaped, names zero sibling products. It is a *deliberate* narrowing, not stale neglect.
- Therefore the re-scope question is not "fix the count" but **"re-open a ratified narrowing because the world changed, or complete it and route the broader worldview to Parallax (its designated owner)?"**
- Snapshot taken: `git tag worldview-snapshot-2026-06-05 @ d534dbe` (pushed to origin).
- Spec authored: `.intent/specs/2026-06-05-worldview-refresh-content-plan.md` (status: draft-pending-critique) — frames 3 options (A hold / B re-scope / C graduated) for the panel.

**Status:** notice → spec authored → critique gate next. Re-scope decision remains L0 (Brien, post-panel).
