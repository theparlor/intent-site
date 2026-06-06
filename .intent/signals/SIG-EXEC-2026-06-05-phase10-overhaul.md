---
id: SIG-EXEC-2026-06-05-phase10-overhaul
title: Phase 10 worldview overhaul EXECUTED — 3 nav eras archived, four-zone narrowing promoted to root
type: signal
signal_class: execution
status: resolved
created: 2026-06-05
author: Claude (Opus 4.8) via terminal session
decision: .intent/decisions/DEC-004-worldview-rescope-rejected-c-minimal.md
spec: .intent/specs/2026-06-05-worldview-refresh-content-plan.md
upstream_control_path: "site-ia.md (IA v3 spec) + CLAUDE.md (IA summary + nav template) now define the single four-zone IA; site-contracts.md CON-SITE-001/010 are the write-through guard against a second IA or old-nav remnant; CON-SITE-011 guards the doorway. Future agents read these before touching nav."
catch_mechanism: "site-contracts.md CON-SITE-001..011 (harness: all 11 PASS after); CON-SITE-010 fires on any reintroduced three-pillar primary nav; CON-SITE-006 size canary guards content loss; CON-SITE-011 fires on a missing Parallax doorway."
pipeline_survival: "All changes are committed HTML served by GitHub Pages; the nav transform was idempotent and re-runnable; archives + the tag intent-site-pre-overhaul-2026-06-05 are the rollback path. No downstream render stage can wipe the result (static site)."
---

# Phase 10 worldview overhaul — EXECUTED

## What was done (this session)

**Job 1 — archived the three colliding nav eras** so `docs/` root holds exactly ONE site with ONE nav:
- Pushed pre-overhaul snapshot tag `intent-site-pre-overhaul-2026-06-05`.
- Renamed `docs/archive/v1.2-multi-framing/` → `docs/archive/v1-2-multi-framing/`.
- Froze `docs/archive/v1-3-three-pillar/` (23-page snapshot of the live three-pillar era) + ARCHIVE.md.
- Created `docs/archive/v2-draft/` for the stalled refresh's exploration mockups + ARCHIVE.md.

**Job 2 — overhauled root to the approved narrowing (DEC-004):**
- Promoted the v2-draft four-zone narrowing to root (pitch + the-system/the-build/the-proof + lineage/when-not/who-loses/ending/neutral-zone); de-nested links, standardized footers, added per-zone sub-navs.
- Unified every root page onto the four-zone nav (The Hypothesis · The System · The Build · The Proof) and removed the `v1-banner` collision punt from all 23 depth pages.
- Made **dogfood-evidence the organizing principle**: `products.html` reframed Catalog→"Repos Intent governs"; dogfood/the-proof carry evidence framing + the "operating model that built me" portfolio framing.
- Honored the **Dunford gate**: named the competitive alternative on the pitch (write own `CLAUDE.md` / build `.intent/` from scratch / do nothing) before positioning copy.
- Wired honest **multi-doorways** into the now-live Parallax (`parallax-site`) and portfolio (`portfolio-site`) surfaces — no in-line 21-product catalog (CON-SITE-011).
- Corrected stale "discovery wave in flight / come back Friday" claims (pitch, the-proof) to current reality (discovery still the open gate); `skills-engine`→Forge rename.
- Rewrote `site-contracts.md`, `site-ia.md`, `CLAUDE.md`, `tasks/ROADMAP.md` to the four-zone IA v3.

## Interpretive decision recorded (the one judgment call)

The session brief said "archive the current live pillar pages" AND "obey the content-preservation rules." These pull opposite ways if read as "move the rich depth pages out of the served site." Resolved per the v2-draft's own design (its zone hubs link to the live depth pages) + the approved SPEC ("evolve in place; no skeleton-replace") + the established v1.2 precedent: **the three-pillar ERA is archived as a frozen browsable snapshot, while the depth pages stay live at root and are re-navved to the single four-zone nav.** No content was moved out of the served site; the collision (two IAs + the v1-banner) was removed. If Brien intended a smaller self-contained root (depth archived, not kept), that is a one-question pivot — the tag makes it cheap.

## Verification
- `bash /tmp/intent-site-contracts.sh docs` → **all 11 CON-SITE contracts PASS** (before AND after).
- No `>The Story<`, no `v1-banner`, no `href="v2-draft/`, no `../` leaks, no broken internal links at root.
- Deployed GitHub Pages render verified post-push.

## Open / deferred (not closure-blocking)
- Persona-count sync (TASK-004) remains **L0 — Brien approval**.
- Numeric counts (signals/specs/events) kept at the site's internally-consistent values pending a verified source-of-truth mapping.
- ECOSYSTEM-ARCHITECTURE-2026-05-20.md §6 "deprecating" contradiction — flagged for a Core correction pass (out of intent-site scope).
- Torres gate: doorway wording provisional until 3–5 discovery conversations.

## Update 2026-06-05 (pass 2 — visual identity + home-at-root, Brien-directed)

1. **Behind-the-veil visual family** (Brien chose "shared family, own metaphor"). Centralized in `docs/styles.css`: Montserrat display type (shared with Parallax) + warm heat accent `--heat:#f7660a` (shared with Parallax `--altitude` / portfolio `--molten`) + darker graphite-metal base `#0b0f14` with non-fixed gradient language. Intent keeps its own loop metaphor; **semantic colors preserved** (loop phases, trust L0–L4, persona △◇○◉ never repurposed for chrome). Hardcoded old-base hexes shifted across 10 pages; `overflow-x:hidden` guards the 100vw hero-loop breakout. Proof approved on the home page before roll-out; render verified on home + depth.
2. **Home at the default root.** The `pitch.html` URL (a redirect kept only to avoid the old two-homepage collision) is retired; the hero is promoted to `index.html`, served at the site root. 77 home references repointed. Contracts updated: `index.html` is now the checked hero (no longer an excluded redirect); CON-010 also flags any lingering `pitch.html` nav ref.

All 11 contracts pass; deployed render verified.

**Open follow-up (Brien-flagged, NOT done here):** the **Voices** page (`personas.html`) doesn't match the Voices *product*'s current reality — a "cross back out of the veil into the product spaces" task: enhance the Voices product page (in the portfolio/product repo) with the catalog-type info, and reframe intent-site's `personas.html` as the dogfooded Voices product. Scoped separately (crosses repos; persona-count still L0-gated, TASK-004).
