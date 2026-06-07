---
id: SIG-EXEC-2026-06-07-personas-voices-reframe
title: personas.html reframed — Cast registry + Voices judgment layer Intent dogfoods (conflation removed); CON-SITE-012 catch-net added; voices-site/cast-site enhancement proposed
type: signal
signal_class: execution
status: resolved
created: 2026-06-07
author: Claude (Opus 4.8) via Claude Code session
decision: .intent/decisions/DEC-004-worldview-rescope-rejected-c-minimal.md
spec: .intent/specs/2026-06-05-worldview-refresh-content-plan.md
closes_followup: "SIG-EXEC-2026-06-05-phase10-overhaul.md — Update 2026-06-05 pass-2 open follow-up ('the Voices page (personas.html) doesn't match the Voices product's current reality')"
upstream_control_path: "Reframe canon is now write-through in the three places a future agent reads before touching personas.html: (1) personas.html itself — names Cast (identity) + Voices (judgment), dogfood framing, doorways out; (2) content-map.md § 'Core/products/cast/ (Cast registry) + Core/products/voices/ (Voices judgment layer)' — corrected from the stale Core/personas/ 'Unified Persona System' rows to Cast/Voices paths + new rows for two-channel / dissent-law / dogfood / doorways; (3) the content-plan §4 + DEC-004, which already mandate 'frame Cast as the engine; never product cards.'"
catch_mechanism: "site-contracts.md CON-SITE-012 (new, this session): fails personas.html if any conflation tripwire returns ('Intent's persona system' | 'The Complete Voice Catalog' | 'Every entity in the persona registry') OR if a required reframe token is lost (machine_assertions | named_dissents | voices-site | cast-site | dogfood). Zero-violation install — all 12 CON-SITE contracts PASS before AND after. CON-SITE-006 size canary + the CLAUDE.md content-preservation 20% rule guard content loss."
pipeline_survival: "All changes are committed-on-disk static HTML/markdown served by GitHub Pages; edits are idempotent text reframes — no generated/derived stage rewrites personas.html. personas.html.meta.yml summary/content_excerpt are library-index AUTO-generated and will self-refresh on the next enrichment pass to reflect the new text (deliberately NOT hand-edited — that would fight the scanner write-through). Rollback: git revert + tag intent-site-pre-overhaul-2026-06-05."
---

# personas.html reframed — dogfood doorway, not Intent's own catalog

## Problem (the conflation)

`personas.html` (sub-nav "Voices") presented the persona registry as **Intent's own** ("Intent's persona system gives every spec… a grounded advisory board") and as **the canonical catalog** ("The Complete Voice Catalog / Every entity in the persona registry"). That conflated two distinct front-of-veil **products** Intent merely *consumes*:

- **Cast** — the registry / identity engine (`Core/products/cast/`): who each voice is, corpus, archetypes, freshening. Cast owns identity.
- **Voices** — the judgment / critique layer (`Core/products/voices/`): the multi-persona panel, two-channel output (`machine_assertions` + `named_dissents`), dissent-preservation conservation law (SPEC-001, INV-1..10 + INV-12; INV-11 reserved). Voices reads Cast as substrate. (Live maturity verified 2026-06-07: 85 test fns; cross-era / topical-relevance composition SHIPPED; MCP surface in-build per SIG-VOICES-MCP-BUILD-TRIGGERED-2026-06-03 — the 2026-05-20 docs that said "45 tests / MCP planned" are themselves stale.)

Intent **dogfoods** both. The multi-panel review that gated the IA v3 Phase-10 overhaul (`voices-run-20260605T191442Z`, 4 panels / 8 renderings, dissent preserved + validated → DEC-004) *was* Voices run on Intent.

## What changed (this session)

**`docs/personas.html`** — 6 framing edits, **zero count changes** (L0/TASK-004 respected):
1. `<title>` → names the Cast-registry + Voices-panel dogfood relationship.
2. Hero subtitle → "This isn't Intent's own catalog — it's a window into two products Intent runs on itself" (names Cast + Voices + dogfooding). H1 "178 Voices. 7 Archetypes." kept verbatim.
3. New dogfood-evidence callout after the stats → the IA v3 panel was Voices on Intent; "this page is dogfood evidence, not a catalog to buy."
4. §02 → names the **Voices** product + a two-channel `archetype-grid` pair (`machine_assertions` blue / `named_dissents` amber) + callout re-attributed to the dissent-preservation conservation law (SPEC-001).
5. §03 → "The Complete Voice Catalog / Every entity…" → "The Bench Intent Draws On" + "not the canonical registry: identity, corpus, freshening live in the **Cast** product." 171/7 kept verbatim.
6. New "Cross back out of the veil" doorway band → Voices (voices-site) · Cast (cast-site) · The Parlor (portfolio-site). Existing within-site "Related" cross-links kept.

**`content-map.md`** — replaced the stale `Core/personas/ (Unified Persona System)` source section with `Core/products/cast/ + Core/products/voices/`; corrected paths; added rows for two-channel output, conservation law, dogfood evidence, and doorways.

**`site-contracts.md`** — added **CON-SITE-012** (content invariant; summary-table row added) as the regression catch-net for the reframe.

## Verification

- `bash /tmp/con-site-check.sh docs` → **all 12 CON-SITE contracts PASS** (11 before; 12 after incl. CON-SITE-012). Conflation phrases confirmed absent.
- Size: personas.html **78,737 B → 82,299 B** (content added; well above the 62,989 B / 20% floor — no preservation breach; no visual component removed).
- **L0 count guard:** H1 `178 Voices. 7`, stat boxes `178/7/19/3`, `Showing 178 voices`, §3 `171 named-human … 7 composite`, cadence `19/49/103` all byte-identical to baseline. No count value altered.
- Preview render verified (port 8862): hero/subtitle, two-channel colors (`machine_assertions` rgb(59,130,246) / `named_dissents` rgb(245,158,11)), all 3 doorway hrefs present & visible; sub-nav "Voices" still active; no console errors.

## Status — two-bucket

**Resolved (with catch-net):** the personas.html reframe + content-map correction + CON-SITE-012.

**Deferred / open (NOT closure-blocking):**
- **Persona-count sync (TASK-004, L0 — Brien approval):** the page shows 178/171/7 + cadence tiers 19·49·103; live registry (verified 2026-06-07, .known-counts) is **351** — 327 named-human · 16 archetype · 7 org · 1 peer, tiers now foundational·primary·secondary·workhorse·candidate. The whole numeric + archetype-count + tier layer is stale, not just the hero number. **Recommended resolution: de-hardcode** (soften to type-lists + a live pointer to Cast as source of truth) — the same move Brien applied this week to the cast + voices product docs ("soften narrative counts to type-lists + live pointer", "soften registry count to a live pointer — no hardcoded total") — NOT a one-time 178→351 bump that just resets the stale clock. Untouched per the hard gate pending approval.
- **voices-site / cast-site enhancement (proposed, not built):** scope below — "cross back out of the veil into the product spaces."
- **personas.html.meta.yml** summary/excerpt: library-index auto-generated; will self-refresh on next enrichment pass (not hand-edited).
- **Contract-count references** in historical SIGs/ROADMAP say "11"; site-contracts.md (the live governance doc) now lists 12. Historical records left as-is.

## Proposal — cross back out of the veil (scope, not built)

The rich content stranded on intent-site is **two products' material**, so it should land honestly, not be dumped onto one page (that would recreate the conflation at the product layer):

**A. voices-site (the Voices product page) — judgment/critique:**
- A1. A **real rendered-panel excerpt** (canonical `SIG-PCU-PHASE-3-ARB-PANEL`): one per-voice critique, one cross-voice `machine_assertion`, one load-bearing dissent with its full qualification block. Makes the abstract two-channel section concrete.
- A2. **Mechanism depth:** INV-9 refactor-run preservation, the tripwire-phrase lint, Preserve/Qualify/Adjudicate as 3 ops — "a law, not a vibe: 45 tests + a validator."
- A3. A **"who's in the room" voice sampler** (12–20 representative voices, by tier/discipline) — gives the catalog flavor *without* claiming the registry; CTA → Cast for the full registry.
- A4. **Presets + the two orthogonal knobs** (intensity × stance; the six presets) surfaced from the panel-critique skill.
- A5. (secondary) cross-era panel composition callout.

**B. cast-site (the registry's true home) — identity:**
- The full filterable **Voice Catalog** (the 178-card grid + search/tier filter, lifted from personas.html) — but as Cast's canonical catalog with **live** counts (Cast is source of truth; not L0-frozen).
- The **7 archetype cards** (source-humans + weights + convictions).
- The **freshening pipeline** (cadences) — an identity/corpus concern Cast owns.

**C. Doorway wiring (bidirectional loop):** intent-site/personas.html → product sites (done). Add a **Cast** doorway on voices-site (the arch diagram already shows Cast→Voices but there's no link); add Cast↔Voices sibling cross-links.

**Boundary:** keep the Foundry type system on the product sites (Playfair/Spectral, molten/brass/steel) — map two-channel to steel(assertions)/ember(dissents) as voices-site already does; do NOT import intent-site's blue/amber semantic palette.

**Open decision for Brien:** catalog home. Recommend **Cast** (architecturally honest: Voices ≠ the registry) with a Voices sampler. Alternative: also mirror a catalog onto voices-site if the product page should stand fully alone.
