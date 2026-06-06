---
title: Site Ia
type: framework
maturity: final
confidentiality: shareable
reusability: universal
domains:
  - consulting-operations
created: 2026-03-31
updated: 2026-06-05
technologies:
  - jira
depth_score: 4
depth_signals:
  file_size_kb: 15.5
  content_chars: 14950
  entity_count: 1
  slide_count: 0
  sheet_count: 0
  topic_count: 1
  has_summary: 0
vocab_density: 0.13
related_entities:
  - {pair: consulting-operations ↔ teresa-torres, count: 67, strength: 0.099}
  - {pair: consulting-operations ↔ marty-cagan, count: 64, strength: 0.082}
  - {pair: consulting-operations ↔ subaru, count: 44, strength: 0.116}
  - {pair: consulting-operations ↔ slack, count: 41, strength: 0.123}
  - {pair: consulting-operations ↔ jeff-patton, count: 40, strength: 0.078}
---
# Intent Site — Information Architecture v3 (Four Zones)

> This document defines the navigation structure, page hierarchy, and content placement for the Intent product site. Any agent modifying navigation or page structure MUST read this spec first.
>
> **IA v3 (Phase 10, 2026-06-05, DEC-004).** Supersedes the three-pillar IA v2. The v2 era is preserved at `docs/archive/v1-3-three-pillar/`; the earlier multi-framing era at `docs/archive/v1-2-multi-framing/`; the stalled four-zone draft's exploration mockups at `docs/archive/v2-draft/`. **`docs/` root holds exactly ONE site with ONE nav.** Do not reintroduce a second IA or a banner that punts to another draft.

## Design Principle

The site is scoped narrow on purpose. It has **one committed target user** — staff+ engineers on teams of 2–7 using Claude Code daily — and frames Intent as **an active research hypothesis**, not shipped product. The worldview (the 21-product coherence stack) is **not** presented here; it lives on the **Parallax** surface (`https://theparlor.github.io/parallax-site/`) and the **portfolio** surface (`https://theparlor.github.io/portfolio-site/`). intent-site is the **system-plane / operating-model** surface those products point back to.

The site moves through four zones of progressively deeper, progressively-more-work-in-progress content. Each zone has a **hero/hub page** (the entry) and **depth pages** (the detail). The primary nav shows only the four zones. Every page carries the same primary nav + a within-zone sub-nav.

```
The Hypothesis  →  The System  →  The Build  →  The Proof
   (why)             (how it runs)   (how it's built)   (whether we've earned it)
```

The organizing principle of the refresh is **dogfood-evidence**: the stack appears as *evidence* ("Intent governs N real repos"), never as a catalog to buy.

---

## The Four Zones

### Zone 1 — "The Hypothesis" (Why)

**Hero:** `pitch.html` — single target user, the claim being tested, the competitive alternative named (Dunford gate), maturity-labeled tablestakes/evolutionary/open-question, honesty boxes, falsification criteria, and the "Where Intent sits" portfolio doorway.

| Role | Page | Notes |
|------|------|-------|
| **Hero** | pitch.html | The hypothesis pitch. Hero loop SVG, who-for, hypothesis-box, competitive-alternative, three-col maturity, lineage-strip, honesty-box. |
| Depth | concept-brief.html | Formal product framing. |
| Depth | lineage.html | Methodology lineage graph — the credited ancestors. |
| Depth | roadmap.html | Vision-forward direction. |
| Depth | when-not.html | When NOT to adopt Intent. |
| Depth | who-loses.html | Who loses power when Intent is adopted. |
| Depth | ending.html | What Intent asks teams to release. |
| Depth | neutral-zone.html | The adoption neutral-zone playbook. |

**Sub-nav:** Overview · Concept Brief · Lineage · Roadmap · When Not · Who Loses · The Ending · Neutral Zone

### Zone 2 — "The System" (How the loop runs)

**Hub:** `the-system.html` — methodology-layer hub linking the depth pages.

| Role | Page | Notes |
|------|------|-------|
| **Hub** | the-system.html | The four phases + links into the depth pages. |
| Depth | methodology.html | Notice→Spec→Execute→Observe, two-plane architecture. |
| Depth | walkthrough.html | One real intent (SIG-010) end-to-end. |
| Depth | work-system.html | The work-system dashboard (6 tabs incl. product taxonomy). |
| Depth | signals.html | Live signal stream + trust scores. |
| Depth | personas.html | The persona/voice library (count L0-gated — see TASK-004). |
| Depth | event-catalog.html | Event types + schemas. |
| Depth | observe.html | The Observe-phase narrative. |
| Depth | getting-started.html | 30-minute adoption onramp. |

**Sub-nav:** Overview · Methodology · Walkthrough · Work System · Signals · Voices · Events · Observe · Start

### Zone 3 — "The Build" (How it's constructed)

**Hub:** `the-build.html` — architecture hub + the hardening backlog.

| Role | Page | Notes |
|------|------|-------|
| **Hub** | the-build.html | Three-layer arch at a glance + hardening backlog + pressure-test invitation. |
| Depth | architecture.html | MCP topology, trust model. **Carries the Parallax doorway (CON-SITE-011).** |
| Depth | system-diagram.html | Interactive signal→observe SVG. |
| Depth | flow-diagram.html | The loop diagram. |
| Depth | observability.html | OTel-native stack. |
| Depth | arb.html | Tech radar + ARB governance. |
| Depth | decisions.html | ADRs (D1–D19). |
| Depth | schemas.html | Data contracts. |
| Depth | agents.html | Subagents + spec-shaping protocol. |
| Depth | deployment.html | FastMCP/local deployment. |
| Depth | native-repos.html | Repo structure. |

**Sub-nav:** Overview · Architecture · System Map · Flow · Observability · ARB · Decisions · Schemas · Agents · Deployment · Repos

### Zone 4 — "The Proof" (Whether we've earned it)

**Hub:** `the-proof.html` — the dogfood-evidence ledger (internal vs external evidence, panel review, falsification criteria, discovery status).

| Role | Page | Notes |
|------|------|-------|
| **Hub** | the-proof.html | The honest evidence ledger. |
| Depth | dogfood.html | Intent building Intent — live signal/spec/event receipts. **Carries the Parallax + portfolio doorways (CON-SITE-011).** |
| Depth | products.html | **Repos Intent governs** — dogfood-evidence, NOT a catalog. Routes the worldview to Parallax/portfolio. |
| Depth | review-2026-04-09.html | The multi-panel review that forced the rebuild (the honesty record). |

**Sub-nav:** Overview · Dogfood · Governed Repos · Panel Review

---

## Navigation Structure

### Primary Nav (4 zone links + logo) — on every page except `index.html`

```html
<nav class="site-nav">
  <a href="pitch.html" class="logo"><span>I</span>ntent</a>
  <a href="pitch.html">The Hypothesis</a>
  <a href="the-system.html">The System</a>
  <a href="the-build.html">The Build</a>
  <a href="the-proof.html">The Proof</a>
</nav>
```

**Active states:** the page's home zone link gets `class="active"`. The logo links to `pitch.html`.

### Sub-Nav (per zone)

Every zone page (hub + depth) shows its zone's sub-nav below the primary nav, with the current page's link `class="active"`. The four sub-navs are listed under each zone above.

### Special pages

- `index.html` — meta redirect to `pitch.html` (the pitch IS the home). Excluded from nav contracts.
- `visual-brief.html` — iframe CTA launched from the pitch; carries the primary nav (Hypothesis active) but **no sub-nav**.
- `review-2026-04-09.html` — lives in Zone 4 (Proof), carries the Proof sub-nav as "Panel Review."

### The doorway policy (DEC-004 + CON-SITE-011)

intent-site connects to the broader coherence stack via **honest doorways into real surfaces** — `parallax-site` (the worldview) and `portfolio-site` (the product dashboard) — **never** by enumerating the 21-product portfolio in-line. `architecture.html` and `dogfood.html` are the contract-checked doorway pages; `pitch.html` and `products.html` carry additional honest doorways. Re-scoping intent-site into the worldview surface was rejected 8/8 by the 2026-06-05 panel (DEC-004) — do not reopen it.

---

## Cross-Links

Inline contextual links connect related content across zones (e.g., methodology → schemas, signals → architecture, observe → observability, dogfood → methodology). These are page-body links, not nav elements; they survive the v2→v3 re-zoning because they point to specific pages by filename. When adding a cross-link, point to the destination page directly and let its home-zone nav orient the reader.

---

## Diagram Source Policy

**Every interactive or visual diagram page MUST link to its Mermaid (or markdown) source file in the repo.** The interactive page is the storytelling surface; the Mermaid source is the working artifact engineers copy into PRs and docs. Both must be reachable.

```html
<a href="https://github.com/theparlor/intent/blob/main/{path-to-mermaid-file}" class="source-link">
  View Mermaid source →
</a>
```

Affected pages: `system-diagram.html`, `flow-diagram.html`, `observability.html` (and any new diagram page). The source link is a first-class cross-link, not optional.

---

## Migration Notes (v2 three-pillar → v3 four-zone, Phase 10)

- **Archive, don't delete.** Each prior era is preserved browsable under `docs/archive/` plus the exact-bytes tag `intent-site-pre-overhaul-2026-06-05`.
- **Evolve in place.** The rich depth pages were KEPT at root and re-navved to the four-zone nav; the zone hubs link to them. No page was skeleton-replaced. Content-preservation rules (CON-SITE-005/006/008) still apply.
- **One nav, one site.** The `v1-banner` that punted visitors to `v2-draft/pitch.html` was removed from every page. Do not reintroduce a second IA at root.
- **Counts:** persona-count sync remains L0-gated (TASK-004, Brien approval). Other numeric counts (signals/specs/events) are a known staleness item pending a verified source-of-truth mapping.
