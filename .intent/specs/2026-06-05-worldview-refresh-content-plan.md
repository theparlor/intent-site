---
id: SPEC-WORLDVIEW-REFRESH-2026-06
title: Intent-site Worldview Refresh — Content-Plan (critique-gated, evolve-in-place)
type: spec
status: approved
signoff: "Brien 2026-06-05 — C-minimal fenced doorway. Decision: DEC-004."
decision: .intent/decisions/DEC-004-worldview-rescope-rejected-c-minimal.md
critique: .intent/critiques/2026-06-05-worldview-refresh-panel-critique.md
panel_verdict: "Option B (re-scope) REJECTED 8/8. A=4, C-minimal=4. A/C converge on stack-as-dogfood-evidence."
created: 2026-06-05
author: Brien (via dedicated worldview-refresh session)
related:
  - SIG-INTENTSITE-2026-06-05 (notice — worldview refresh + critique gate)
  - SIG-INTENTSITE-2026-04-23 (governing canon — evolves-not-deprecates)
  - DEC-20260409-02 (intent repo — "one site, target-user committed, multi-product framing removed")
  - Core/products/parallax/spec/2026-04-23-three-tier-umbrella-and-ecosystem-design.md
  - Core/ECOSYSTEM-ARCHITECTURE-2026-05-20.md
snapshot: "git tag worldview-snapshot-2026-06-05 @ d534dbe (pushed to origin)"
autonomy:
  file_work: L4 (local, reversible)
  rescope_decision: L0 (Brien — DDR-level)
  page_change_over_20pct: L0 (Brien)
gates:
  before_execute: 4-panel Voices critique (positioning/product/engineering/AI-minds) MUST clear; Brien MUST approve
  during_execute: site-contracts.md run before AND after; intent-site/CLAUDE.md content-preservation rules
upstream_control_path: "This SPEC + the 4-panel critique record gate any HTML rebuild; ROADMAP phase-gating + site-contracts.md are the catch-net; the re-scope fork routes to a WS-DDR, not an ad-hoc mid-rebuild choice."
catch_mechanism: "site-contracts.md CON-SITE-001..010 (run before/after); CON-SITE-006 file-size canary; this SPEC's status gate (draft-pending-critique → approved) blocks execution."
pipeline_survival: "Snapshot tag is on origin; SPEC is committed to intent-site repo; rebuild is a separate, post-sign-off phase."
---

# Intent-site Worldview Refresh — Content-Plan

> **What this is.** The Spec phase of SIG-INTENTSITE-2026-06-05. A per-page content-plan for refreshing intent-site against the matured ecosystem, **gated on a 4-panel Voices critique** that must settle one DDR-level question before any HTML changes. This document is the *subject of critique* and a *decision brief for Brien*. It does **not** authorize a rebuild. The rebuild is the phase after sign-off.
>
> **What this is NOT.** Not an archive-and-regenerate. Not a teardown. Per the governing canon (SIG-INTENTSITE-2026-04-23), intent-site **evolves in place**. Per intent-site/CLAUDE.md, no page is skeleton-replaced or cut >20% without approval.

---

## 0. Snapshot (deliverable — DONE)

A non-destructive reference point was captured **before** authoring this plan:

| Field | Value |
|-------|-------|
| Mechanism | Annotated git tag (not a file-copy — avoids polluting the served GH Pages tree; captures exact bytes) |
| Tag | `worldview-snapshot-2026-06-05` |
| Commit | `d534dbe` (HEAD; all `docs/*.html` clean — only `.meta.yml`/`content-map.md` scanner churn was dirty, none of it served) |
| Pushed | Yes → `origin` (`theparlor/intent-site`) |
| Roll back / inspect | `git checkout worldview-snapshot-2026-06-05` |

Why a tag, not `docs/_archive/2026-06/`: the repo already has a browsable `docs/archive/v1.2-multi-framing/` for forcing-function reference; a second served copy would duplicate the GH Pages tree and confuse the contract globs. The tag is the clean, reversible "exact current site" record.

---

## 1. Verified current state (recon, 2026-06-05)

intent-site is **two sites superimposed**, which is the crux this plan must resolve:

**Track 1 — the LIVE site (v1.2-era, mostly):** 23 pillar pages across three pillars (Story / System / Build) + `index.html` (redirect) + `visual-brief.html` (CTA) + `review-2026-04-09.html` (the panel-review forcing artifact). This is what `https://theparlor.github.io/intent-site/` serves today. `products.html` (11KB) lists **8 products** including the **old `skills-engine` name** (now Forge), and frames Intent as a solo framework.

**Track 2 — the v2-draft NARROWING (70%, governance-pending):** `docs/v2-draft/` holds 11 pages — `pitch`, `the-system`, `the-build`, `the-proof`, `lineage`, `who-loses`, `when-not`, `ending`, `neutral-zone`, + 2 pitch mockups. The live `products.html` already carries a banner pointing to `v2-draft/pitch.html` as "the hypothesis framing." **This draft is the post-panel rebuild — and it deliberately NARROWS** (one target user, Intent-as-hypothesis, Dunford-shaped), naming **zero** sibling products.

**Track 3 — the matured ECOSYSTEM the refresh is measured against:** `Core/ECOSYSTEM-ARCHITECTURE-2026-05-20.md` = **21 products / 17 frameworks** with contracted seams. Absent from intent-site's worldview entirely: Forge, Cast, Loom, Voices, Topography, Witness, Conduit, Parallax, Warp, Throughline, Crucible, Lodestone, reference-substrate, cortège, Pulse.

---

## 2. The reframe (READ BEFORE THE OPEN QUESTION)

The 06-05 notice framed the gap as **staleness** ("products.html says 8, the world has 21; Intent is still framed as a solo framework"). Recon **inverts** that framing, and the panel must hold both readings at once:

> **"Intent-site doesn't show the coherence stack" is not (only) a staleness bug. It is, in large part, a *ratified positioning discipline.***

Evidence that the narrow framing is deliberate, recent, and panel-validated:

1. **`docs/archive/v1.2-multi-framing/ARCHIVE.md`** — on 2026-04-09 an **8-panel review killed** the broader "multi-framing" intent-site for: **F1 No target user (6/8)**, **F3 Category confusion — 6 framings across 6 pages (5/8)**, **F4 Reader never the hero (4/8)**. `products.html` was called out as "the flat catalog that fails the Dunford category test hardest"; `concept-brief.html` for "oscillating between 'personal OS' and 'team OS' in the same paragraph."
2. **`DEC-20260409-02` ratified UNCONDITIONALLY:** "One site, not two… **Target user committed: staff+ engineers on teams of 2–7 using Claude Code daily**… **Remove multi-product framing from the hero**… 30% content reduction." The rebuild was a *subtraction* pass.
3. **The v2-draft executes exactly that** — `pitch.html` commits the single target user, frames Intent as "active research hypothesis · v0," and credits Dunford for shaping the page. It is a Dunford-disciplined narrowing, not a stack expansion.
4. **The governing canon scopes the evolution narrowly:** SIG-INTENTSITE-2026-04-23 says intent-site evolves into the **"Intent + Throughline"** narrative surface — *one* sibling, not twenty. The full-stack worldview is explicitly **Parallax's Phase-3 job** (parallax three-tier spec §2/§6: Throughline → Warp → Parallax; "any earlier attempt at Parallax is narrative theater").

So the refresh decision is **not** "fix the count." It is: **do we re-open a ratified narrowing because the world changed, or do we complete it and route the broader worldview to its designated owner (Parallax)?**

---

## 3. THE OPEN QUESTION (DDR-level — the panel's job-1)

**Should intent-site be RE-SCOPED from "the Intent framework site" toward "the coherence-stack worldview surface" now — or stay scoped as the Intent + Throughline Phase-1 lead, with the 21-product stack deferred to Parallax Phase 3?**

Three crisp options. The panel resolves which; if it recommends re-scope, a WS-DDR is written before any rebuild.

### Option A — HOLD THE LINE *(recommended default)*
Complete and publish the v2-draft narrowing. Keep Intent as the hero with its committed single target user. Add **Throughline** as the *one* canon-authorized new narrative surface. Refresh factual staleness (counts, `skills-engine`→Forge). The 21-product worldview stays Parallax Phase 3. Products appear only as **dogfood evidence** ("Intent governs N real repos"), never as a catalog-to-buy.
- **For:** Respects DEC-20260409-02 + evolves-not-deprecates + the parallax three-tier ordering. Lowest regression risk against F1/F3. Finishes work already 70% done.
- **Against:** May *under-claim* a worldview that is now real and shipping. "Defer to Parallax Phase 3" risks indefinite deferral.

### Option B — RE-SCOPE NOW
Broaden intent-site to present the 21-product stack with the coherence spine; accelerate the Parallax-ward evolution; reframe the hero from "Intent (a team operating model)" to "the coherence stack."
- **For:** The world *has* moved. In April the failure was "6 framings, **no organizing spine**." Today there **is** a named spine (coherence / Parallax-Warp-Throughline) and 21 *contracted* products. The Dunford verdict was against *category confusion*, not against *more than one product existing* — a single spine may now carry breadth without the confusion.
- **Against:** Directly re-litigates a ratified decision and risks reintroducing **F1 (no target user)** and **F3 (category confusion)** — the exact findings a panel flagged in 5–6/8 just two months ago. Parallax exists *specifically* to be this surface; doing it in intent-site may be building Parallax in the wrong repo.

### Option C — GRADUATED BRIDGE *(synthesis candidate)*
Hold Intent as hero + single target user (Option A's discipline), but add **one** honest doorway: a single page/section framing "Intent is the **reference implementation** of a broader coherence discipline," naming the stack as *context* with a single forward-pointer to Parallax — **not** 21 product cards. One controlled doorway to the worldview, not a re-scope.
- **For:** Honors the "world has moved" pressure *and* the Dunford discipline. Gives the stack a truthful mention without making intent-site the catalog. Pre-stages the Parallax hand-off.
- **Against:** Risks being a camel's nose — one doorway becomes five. Needs a hard boundary the panel can specify.

> **My read (to be pressure-tested, NOT pre-decided):** A as the floor, C as the likely-right synthesis, B rejected unless the panel shows the named spine genuinely dissolves the F1/F3 risk. **Brien decides after the panel.**

---

## 4. Per-page disposition (all live + v2-draft pages)

Disposition vocabulary: **KEEP** · **REFRESH-FACTS** (counts/names/dates only) · **REFRESH-WORLDVIEW** (framing; option-dependent) · **ADD-THROUGHLINE** · **COMPLETE-V2** (finish the narrowing; publish-path) · **HOLD-FOR-PARALLAX** · **GOVERN** (resolve status) · **ARCHIVE** (approval-only).

### Pillar 1 — The Story
| Page | Current role | Disposition (Option A) | B/C delta · product mapping |
|------|--------------|------------------------|------------------------------|
| `pitch.html` | Hero; fracture grid, loop SVG, stat boxes | **COMPLETE-V2** — promote the v2-draft hypothesis pitch to live (single target user, honesty boxes). | B: re-hero to "coherence stack" (F1 risk). C: keep narrow + 1 stack-context line. |
| `concept-brief.html` | Formal framing | **REFRESH-WORLDVIEW** — kill any residual "personal OS vs team OS" oscillation (the v1.2 F3 callout). | Maps: Intent framework only. |
| `methodology.html` | Notice→Spec→Execute→Observe | **KEEP** + **REFRESH-FACTS** (event count 15→current). | Two-plane architecture stays. |
| `walkthrough.html` | Real SIG-010 trace | **KEEP** — best "it works" artifact. Verify trace IDs still resolve. | Maps: Intent + Witness (observe). |
| `roadmap.html` | Vision-forward | **REFRESH-WORLDVIEW** — engagement rollout + four-product maturity may be stale. | C: add Parallax/Throughline horizon line. |

### Pillar 2 — The System
| Page | Current role | Disposition (Option A) | B/C delta · product mapping |
|------|--------------|------------------------|------------------------------|
| `work-system.html` | 82KB hero; 6 tabs incl Products | **REFRESH-FACTS** — Products tab data (8→current); **reframe products as dogfood-evidence, not catalog.** | B: expand to 21-product portfolio (F3 epicenter). Maps: org-design-tooling, library-index, Fieldbook. |
| `flow-diagram.html` | Loop visual | **KEEP**. | — |
| `system-diagram.html` | Signal→observe SVG | **KEEP** + **REFRESH-FACTS** (5 capture surfaces current?). | Maps: Conduit, Witness. |
| `schemas.html` | Data contracts | **KEEP**. | — |
| `signals.html` | 15 signal cards, trust | **REFRESH-FACTS** — signal counts (43→current). | Maps: Intent Notice. |
| `personas.html` | 79KB; persona catalog | **REFRESH-FACTS** — count 178→242→**current**; **frame Cast as the engine** (identity), Forge as renderer. TASK-004 (L0) lives here. | Maps: **Cast** + Forge + Voices. The one place a sibling product legitimately surfaces today. |
| `dogfood.html` | Intent building Intent | **REFRESH-WORLDVIEW** — strongest Option-A surface: "Intent governs N real products" is *evidence*, the honest way the stack appears. | Maps: ALL products (as dogfood proof, not catalog). |
| `observe.html` | Observe narrative | **KEEP** + **ADD-THROUGHLINE** candidate (loop-closure ↔ vision-trace). | Maps: Witness, Throughline. |
| `event-catalog.html` | 15 event types | **REFRESH-FACTS** — event family 15→22 (deploy.* + safety fields per INT-013). | Maps: Intent Observe, Witness. |
| `getting-started.html` | 30-min onramp | **KEEP** — panel-praised, functional. Verify commands. | — |

### Pillar 3 — The Build
| Page | Current role | Disposition (Option A) | B/C delta · product mapping |
|------|--------------|------------------------|------------------------------|
| `architecture.html` | MCP topology hero | **REFRESH-FACTS** (4-server topology current?). C: best home for the "reference implementation of a discipline" doorway. | Maps: Intent servers. |
| `agents.html` | 6 subagents | **KEEP** + **REFRESH-FACTS**. | Maps: spec-shaping protocol. |
| `deployment.html` | FastMCP/local | **KEEP**. | — |
| `observability.html` | OTel stack | **KEEP** + **REFRESH-FACTS** — Witness now owns this position. | Maps: **Witness**, Conduit. |
| `arb.html` | Tech radar | **REFRESH-WORLDVIEW** — radar blips stale vs 21-product reality. | Maps: governance. |
| `decisions.html` | 19 ADRs (D1–D19) | **REFRESH-FACTS** — newer ADRs exist. | — |
| `native-repos.html` | Repo structure | **REFRESH-FACTS** — repo list grew. | Maps: product repos (nested). |
| `products.html` | 8-product catalog | **REFRESH-FACTS** + **REFRESH-WORLDVIEW** — fix `skills-engine`→Forge, counts; **reframe from "portfolio to buy" → "repos Intent governs" (Dunford-safe).** **Do NOT expand to 21 cards under Option A/C** (that is the exact F3 trap). | B: this becomes the 21-product catalog — the single highest-risk change. |

### Supporting / governance
| Page | Disposition |
|------|-------------|
| `index.html` | **KEEP** (192B redirect). |
| `visual-brief.html` | **KEEP** (CTA, not nav). |
| `review-2026-04-09.html` | **KEEP** — forcing-function artifact; honesty record. |
| `docs/v2-draft/*` (11) | **GOVERN** — the central governance fork. Option A/C = **promote** (the publish-path the v2-draft itself references: "link back to v1.2 until the S1 rebuild"). The 2 pitch mockups + `neutral-zone` need explicit keep/merge/archive calls. |
| `docs/archive/v1.2-multi-framing/*` | **KEEP** (recovery point + honesty record). |

---

## 5. The 21-product → surface mapping (makes the tradeoff concrete)

This table is the *clearest argument* in the re-scope decision: under Option A, **most products have no surface here — by design.** Under Option B, every product needs a home, and that is the category-confusion engine.

| Product | Option A (hold) | Option B (re-scope) |
|---------|-----------------|---------------------|
| **Intent** (framework) | HERO | one of many |
| **Throughline** | ADD as the 1 authorized narrative surface | product card |
| **Cast** + **Forge** + **Voices** | surface only as mechanisms (personas.html, dogfood "panels are the loop") | product cards |
| **Witness** / **Conduit** | named in observability.html as position-owners | product cards |
| Loom · Topography · Crucible · Lodestone · library-index(-mcp) · reference-substrate · cortège · Pulse · Fieldbook · studio-control · org-design-tooling · digital-declutter | **HOLD-FOR-PARALLAX** — appear only as dogfood-evidence counts, never as catalog entries | **21 product cards** ← the F3 (category-confusion) epicenter |
| **Parallax / Warp** | named as the *future* overhead surface (C: single forward-pointer) | intent-site *becomes* proto-Parallax (wrong repo?) |

---

## 6. Staleness ledger (fix regardless of option)

These are factual corrections that apply under A, B, or C:

1. `products.html`: `skills-engine` → **Forge**; product count 8 → current; `skills-engine` tagline "47 skills" → current Forge count.
2. `personas.html` + `work-system.html`: persona count 178 → 242 → **current live count** (TASK-004, **L0 — Brien approval**; verify against registry YAML count at run-time, do not hardcode).
3. `event-catalog.html`: 15 → 22 events (deploy.* family, safety fields).
4. `signals.html` / `dogfood.html`: signal/spec/decision counts → current.
5. `decisions.html`: ADRs beyond D19.
6. **Contradiction flag (correction-propagation):** `Core/ECOSYSTEM-ARCHITECTURE-2026-05-20.md` §6 still says *"intent-site … (deprecating per Parallax three-tier spec)."* This **contradicts** the governing canon (SIG-INTENTSITE-2026-04-23: evolves-not-deprecates). The ECOSYSTEM line is stale and should be corrected to "evolving in place into the Intent + Throughline surface." **Out of scope for the rebuild itself**, but logged here for a Sonnet correction-propagation pass (per feedback_decision_atom_correction_propagation).

---

## 7. Content-preservation guardrails (binding on the future rebuild)

Restated from intent-site/CLAUDE.md so the rebuild phase cannot drift:

- **No page cut >20%** without explicit Brien approval (CON-SITE-006 file-size canary enforces).
- **No skeleton/placeholder replacement.** Visual components (fracture grid, SVG loop, radar, timelines, stat boxes) **are content** (CON-SITE-005/008).
- **Run `site-contracts.md` (CON-SITE-001..010) before AND after** every `docs/` change; diff results.
- **Prefer the LARGER version** on any merge conflict.
- **Per-page: enrich over replace.** Any single-page change >20% is **L0** → surface to Brien before applying.
- **Respect ROADMAP phase-gating** — add a new "Phase 10 — Worldview Refresh" *after* sign-off; do not retro-edit closed phases.

---

## 8. Critique-gate plan (the hard gate)

Run via `Core/products/voices/src/panel_critique.py` (composition surface) → per-persona Sonnet rendering per the `panel-critique` SKILL.md → two-channel output (machine_assertions + named_dissents), dissent preserved verbatim, validated by `voices/src/validate.py` (INV-12). **No HTML changes until this clears AND Brien approves.**

| Panel | Personas | Focus question |
|-------|----------|----------------|
| **Positioning** | april-dunford (single-voice) | Does re-scoping (B) reintroduce F1/F3, or does the now-named coherence spine make breadth safely positionable? What is the right category + target user for THIS surface vs Parallax? |
| **Product** | marty-cagan, teresa-torres, jeff-patton | Is completing+publishing the narrowed v2 (A) the right product call, or under-shipping a real worldview (B)? Is the per-page disposition sound? Where is the user value? |
| **Engineering** | andrej-karpathy, chris-markus | Does this respect evolve-in-place + sibling architecture + content-preservation, or smuggle a teardown? Is one site carrying 21 products a monolith-in-disguise? *(chris-markus has a registry stance that Intent's surface area is already too large — preserve it.)* |
| **AI-minds** | andrej-karpathy, nate-b-jones | Given where AI-native practice is heading (intent engineering / three-engineering progression), is holding narrow right for the next 12 months, or must the worldview surface lead now? |

Each panelist returns: TOP CONCERN → 2–3 observations citing THIS spec → recommended action → an explicit **RE-SCOPE VOTE (A / B / C)** with one-line why. Flags: positioning is single-voice (no disagreement log); engineering/AI-minds are 2-voice (even, no wildcard) — accepted per Brien's explicit composition.

---

## 9. Open questions for Brien (L0)

1. **The re-scope fork (§3)** — A, B, or C. Everything downstream depends on this. (Panel informs; you decide.)
2. **v2-draft disposition (§4 governance row)** — promote to live as the publish-path? And the 2 pitch mockups + `neutral-zone`: keep/merge/archive?
3. **Persona-count sync (TASK-004)** — still L0-pending since Phase 9; approve the 178→current sync?
4. **URL/naming** (carried from SIG-INTENTSITE-2026-04-23) — when Parallax activates, does the domain rename, or does intent-site stay a child surface under parallax.*?

## 10. Exit gate (this SPEC)

Accepted when: (a) the 4 panels have run and dissent is recorded — **DONE** (`.intent/critiques/2026-06-05-worldview-refresh-panel-critique.md`); (b) Brien has chosen the direction and answered §9; (c) if re-scope (B or C-with-stack), a WS-DDR is written; (d) a "Phase 10 — Worldview Refresh" stub is added to ROADMAP **after** sign-off. Only then does the rebuild phase begin.

---

## 11. Panel Resolution (2026-06-05) — the critique gate's verdict

The 4 panels ran (`voices-run-20260605T191442Z`, 8 renderings, dissent preserved + validated). **Verdict: Option B is rejected 8/8.** Vote: **A=4** (Dunford, Cagan, Patton, Markus), **B=0**, **C-minimal=4** (Torres, Karpathy×2, Nate). The A↔C split is narrow — it is not a disagreement about re-scoping (all 8 = do not re-scope) but about whether to add *one* fenced doorway sentence. This **resolves the §3 DDR-level question: do NOT re-scope intent-site to the 21-product worldview; the coherence-stack worldview remains Parallax's Phase-3 domain.**

**Refinements the panel demands (these AMEND the plan above):**

1. **Elevate the dogfood-evidence reframe from a §4 row to the ORGANIZING PRINCIPLE.** 5/8 voices independently named it as the strongest, under-weighted move: the stack appears as *evidence* ("Intent governs N real repos"), never as catalog. Patton + Torres: with this framing, Options A and C **collapse into the same answer** and B is redundant. → `dogfood.html` becomes the spine of the refresh, not a staleness fix.
2. **Ship the v2-draft narrowing NOW; do not block it on the direction choice.** 5/8. The 70%-done publish-path and the §6 staleness fixes are safe under any option and should proceed in parallel.
3. **Dunford gate (pre-rebuild, blocking):** name the **competitive alternative** the target user faces (write own `CLAUDE.md` / build `.intent/` from scratch / do nothing). Two-sentence test in her recommended action. The SPEC currently omits this; the rebuild cannot position without it.
4. **Torres gate (doorway-scoped, non-blocking on the narrowing):** before finalizing the doorway's *wording*, get 3–5 discovery conversations with the named target user. Does not block shipping the narrowing or staleness fixes.
5. **Structural fence (if C-minimal):** the doorway must be ONE static outbound link — zero product enumeration, no expandable section — wired as **`CON-SITE-011`** in `site-contracts.md` *before* any `docs/*.html` change. Markus: "C without a hard gate is B with a longer fuse." The doorway must be a **claim**, not a pointer (Karpathy-AI, Nate).

**Revised recommendation (supersedes §3 "My read"):** Adopt the **A/C convergence** — Option A's discipline (Intent hero, single target user, v2 narrowing shipped) with the dogfood-evidence reframe as the organizing principle, **plus** the single structurally-fenced doorway (C-minimal) naming the discipline. **B is struck.** The one open fork for Brien: include the fenced doorway now (C-minimal — captures the frontier-positioning Karpathy/Nate want at near-zero F1/F3 risk) or hold pure-A (no doorway until Parallax has a URL — Dunford/Markus's stricter line). Either way: ship the narrowing + staleness fixes; honor the Dunford competitive-alternative gate.

**Governance:** Because the panel did **not** recommend a re-scope (B=0), the mandatory "WS-DDR before proceeding" trigger is **not** met. The resolution is recorded as intent-site **`DEC-004`** (product-scope; affirms the intent-site↔Parallax boundary rather than changing workspace structure — hence a decision atom, not a WS-DDR).

**Brien sign-off (2026-06-05): C-minimal fenced doorway.** SPEC status → **approved**. The rebuild is ROADMAP **Phase 10** (next session), gated by: (1) Dunford competitive-alternative (pre-rebuild, blocking); (2) `CON-SITE-011` structural fence (before any `docs/*.html`); (3) Torres 3–5 discovery conversations (doorway wording, non-blocking on the narrowing). The v2-draft narrowing + dogfood-evidence reframe + §6 staleness fixes ship regardless.
