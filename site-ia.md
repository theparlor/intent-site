---
title: Site Ia
type: framework
maturity: final
confidentiality: shareable
reusability: universal
domains:
  - consulting-operations
created: 2026-03-31
technologies:
  - jira
depth_score: 4
depth_signals:
  file_size_kb: 15.5
  content_chars: 14860
  entity_count: 1
  slide_count: 0
  sheet_count: 0
  topic_count: 1
  has_summary: 0
vocab_density: 0.13
related_entities:
  - {pair: consulting-operations ↔ subaru, count: 836, strength: 0.43}
  - {pair: consulting-operations ↔ automotive-manufacturing, count: 791, strength: 0.409}
  - {pair: consulting-operations ↔ engagement-management, count: 507, strength: 0.262}
  - {pair: consulting-operations ↔ turnberry, count: 472, strength: 0.226}
  - {pair: consulting-operations ↔ foot-locker, count: 256, strength: 0.133}
---
# Intent Site — Information Architecture v2

> This document defines the navigation structure, page hierarchy, and content placement for the Intent product site. Any agent modifying navigation or page structure MUST read this spec first.

## Design Principle

The site tells a story in three acts. Each act has a **hero page** (the entry point) and **depth pages** (the detail). The primary nav shows only the three acts. Each act's hero page includes a sub-nav to its depth pages. Cross-links connect related content across acts.

Think of it like a building with three wings. You enter through the lobby (home/pitch), and from there you choose a wing. Inside each wing, a corridor (sub-nav) connects the rooms.

---

## The Three Pillars

### Pillar 1 — "The Story" (What & Why)

**Purpose:** Convince. Create the visceral "something is broken, here's what's different" reaction. Then let people go deeper into the formal framing.

| Role | Page | File | Notes |
|------|------|------|-------|
| **Hero** | Pitch | pitch.html | Becomes the site index. Fracture grid, loop SVG, stat boxes, timeline, comparison strip, two-plane diagram. The full emotional + intellectual hook. |
| Depth | Concept Brief | concept-brief.html | Formal product framing — problem, solution, differentiation, audience. |
| Depth | Methodology | methodology.html | The Intent loop explained — Notice→Spec→Execute→Observe with depth on each phase. |
| Depth | Walkthrough | walkthrough.html | **NEW (ARB review).** One real intent traced end-to-end: signal → cluster → promote → spec → execute → observe → new signal. The "hello world" that proves the methodology works. |
| Depth | Roadmap | roadmap.html | Where Intent is headed. Vision-forward, not implementation-detail. |

**Sub-nav label order:** Concept Brief · Methodology · Walkthrough · Roadmap

**Why this grouping:** These pages answer "what is Intent?" from different angles — emotional (pitch), formal (brief), procedural (methodology), experiential (walkthrough), temporal (roadmap). A visitor convinced by the pitch naturally wants to understand the concept, then the method, then see it work, then see what's coming.

---

### Pillar 2 — "The System" (How It Works)

**Purpose:** Show. The operational centerpiece — how Intent actually functions as a working system. Proof over promise.

| Role | Page | File | Notes |
|------|------|------|-------|
| **Hero** | Work System | work-system.html | The Jira-replacement dashboard. Signal stream, spec lifecycle, execution state, the full operational picture. |
| Depth | Flow | flow-diagram.html | The loop visualized — interactive/animated Notice→Spec→Execute→Observe diagram. **Currently a 1.5KB skeleton — needs full rebuild.** |
| Depth | System Map | system-diagram.html | Interactive signal-to-observation flow. 5 capture surfaces, enrichment pipeline, spec/execute, OTel observe layer. Click-to-explore detail panels. |
| Depth | Schemas | schemas.html | Data contracts — signal schema, spec schema, execution record schema. The type system behind the system. |
| Depth | Signals | signals.html | Live signal stream — 15 signal cards, trust scores, clustering, pattern detection. |
| Depth | Voices | personas.html | The 178+ thought leader personas that power spec-shaping, ARB critique, and discovery. 7 archetypes, filterable catalog, freshening pipeline. |
| Depth | Dogfood | dogfood.html | Intent building Intent. Self-referential proof — the system's own signal stream, specs, and event log. |
| Depth | Observe | observe.html | **NEW (ARB review).** What it means to observe: how loop closure works, what dashboards reveal, how observations become new signals. The Observe phase narrative — the most powerful concept deserves its own page. |
| Depth | Event Catalog | event-catalog.html | Catalog of event types in the system. **Expanding (ARB review) — will contain all 15 event types with schemas, triggers, and examples.** |
| Depth | Getting Started | getting-started.html | **NEW (ARB review).** The adoption onramp: stitches deployment + native-repos + CLI into a single "adopt Intent in 30 minutes" path. Distinguishes evaluators from adopters. |

**Sub-nav label order:** Flow · System Map · Schemas · Signals · Voices · Dogfood · Observe · Events · Start

**Why this grouping:** These pages answer "how does it actually work?" from different angles — operational (work system), visual (flow), structural (schemas), live data (signals), advisory (voices), proof (dogfood), narrative (observe), reference (events), and practical (getting started). A visitor who understands the concept naturally wants to see it in action, hear the voices that challenge it, then try it.

---

### Pillar 3 — "The Build" (How It's Constructed)

**Purpose:** Explain. The technical architecture, governance, and engineering decisions. For builders and evaluators.

| Role | Page | File | Notes |
|------|------|------|-------|
| **Hero** | Architecture | architecture.html | MCP server topology, trust model, loop diagram, phased rollout. The technical overview. |
| Depth | Agents | agents.html | 6 subagent definitions, model routing, tool access, coordinator pattern. |
| Depth | Deployment | deployment.html | FastMCP Cloud, local dev, platform comparison, configuration. |
| Depth | Observability | observability.html | OTel-native stack architecture. Mermaid diagram, trace identity model, deployment phases, metrics, dashboard preview. |
| Depth | ARB / Tech Radar | arb.html | SVG radar visual, architectural stack, governance panel, atomized roadmap. |
| Depth | Decisions | decisions.html | Architecture decision records. 19 ADR cards (D1–D19). |
| Depth | Native Repos | native-repos.html | Repository structure, code organization, integration points. |
| Depth | Products | products.html | Product catalog — all products built with Intent, organized by layer, with signal/decision counts. |

**Sub-nav label order:** Agents · Deployment · Observability · ARB · Decisions · Repos · Products

**Why this grouping:** These pages answer "how is it built?" from different angles — topology (architecture), agents (who does what), operations (deployment), governance (ARB/decisions), and code (repos). A visitor evaluating the technical depth naturally wants to understand the architecture, then drill into specifics.

---

## Navigation Structure

### Primary Nav (3 links + logo)

```html
<nav class="site-nav">
  <a href="index.html" class="logo"><span>I</span>ntent</a>
  <a href="pitch.html">The Story</a>
  <a href="work-system.html">The System</a>
  <a href="architecture.html">The Build</a>
</nav>
```

**Active states:**
- Pitch and all Pillar 1 depth pages → "The Story" active
- Work System and all Pillar 2 depth pages → "The System" active
- Architecture and all Pillar 3 depth pages → "The Build" active

### Sub-Nav (per pillar)

Each pillar's hero page AND depth pages show the same sub-nav below the primary nav. The hero page name appears first, then depth pages.

**Pillar 1 sub-nav:**
```html
<nav class="sub-nav">
  <a href="pitch.html">Overview</a>
  <a href="concept-brief.html">Concept Brief</a>
  <a href="methodology.html">Methodology</a>
  <a href="walkthrough.html">Walkthrough</a>
  <a href="roadmap.html">Roadmap</a>
</nav>
```

**Pillar 2 sub-nav:**
```html
<nav class="sub-nav">
  <a href="work-system.html">Overview</a>
  <a href="flow-diagram.html">Flow</a>
  <a href="system-diagram.html">System Map</a>
  <a href="schemas.html">Schemas</a>
  <a href="signals.html">Signals</a>
  <a href="personas.html">Voices</a>
  <a href="dogfood.html">Dogfood</a>
  <a href="observe.html">Observe</a>
  <a href="event-catalog.html">Events</a>
  <a href="getting-started.html">Start</a>
</nav>
```

**Pillar 3 sub-nav:**
```html
<nav class="sub-nav">
  <a href="architecture.html">Overview</a>
  <a href="agents.html">Agents</a>
  <a href="deployment.html">Deployment</a>
  <a href="observability.html">Observability</a>
  <a href="arb.html">ARB</a>
  <a href="decisions.html">Decisions</a>
  <a href="native-repos.html">Repos</a>
  <a href="products.html">Products</a>
</nav>
```

### Index Page

**The pitch IS the home page. There is no separate home concept.**

`index.html` should contain a meta redirect to `pitch.html`:
```html
<!DOCTYPE html>
<html><head>
<meta http-equiv="refresh" content="0;url=pitch.html">
<title>Intent</title>
</head><body>
<p>Redirecting to <a href="pitch.html">Intent</a>...</p>
</body></html>
```

The logo link in the primary nav points to `index.html` (which redirects to pitch). This keeps GitHub Pages happy with a proper index while making the pitch the true landing experience.

### Visual Brief

`visual-brief.html` is not a nav destination. It becomes a CTA button or link on the Pitch page ("Launch Visual Brief →") rather than a standalone page in the navigation.

---

## Cross-Links

Cross-links connect related content across pillars. These are inline contextual links within page content, not nav elements.

| From | To | Context |
|------|----|---------|
| Methodology (Pillar 1) → | Schemas (Pillar 2) | "See the data contracts behind each loop phase" |
| Methodology (Pillar 1) → | Flow (Pillar 2) | "See the loop visualized" |
| Concept Brief (Pillar 1) → | Work System (Pillar 2) | "See the system in action" |
| Roadmap (Pillar 1) → | ARB (Pillar 3) | "See the technology decisions behind the roadmap" |
| Signals (Pillar 2) → | Architecture (Pillar 3) | "How signals are ingested — MCP server topology" |
| Dogfood (Pillar 2) → | Methodology (Pillar 1) | "The methodology this system follows" |
| Schemas (Pillar 2) → | Decisions (Pillar 3) | "Why these schema shapes were chosen" |
| Work System (Pillar 2) → | Agents (Pillar 3) | "The agents that power the work system" |
| ARB (Pillar 3) → | Roadmap (Pillar 1) | "The vision these decisions serve" |
| Architecture (Pillar 3) → | Work System (Pillar 2) | "See the architecture in operation" |
| Observability (Pillar 3) → | Event Catalog (Pillar 2) | "See the 15 event types this stack ingests" |
| Observability (Pillar 3) → | Architecture (Pillar 3) | "See the MCP server topology that generates events" |
| Roadmap (Pillar 1) → | Observability (Pillar 3) | "See the observability architecture" |
| Pitch (Pillar 1) → | Dogfood (Pillar 2) | "See it working right now" |
| Pitch (Pillar 1) → | Walkthrough (Pillar 1) | "Follow one intent end-to-end" |
| Methodology (Pillar 1) → | Signals (Pillar 2) | "See real signals from this system" |
| Methodology (Pillar 1) → | Walkthrough (Pillar 1) | "See the loop in action" |
| Work System (Pillar 2) → | Methodology (Pillar 1) | "Understand the model behind this dashboard" |
| Work System (Pillar 2) → | Getting Started (Pillar 2) | "Try it yourself" |
| Observe (Pillar 2) → | Observability (Pillar 3) | "See the OTel stack architecture" |
| Observe (Pillar 2) → | Dogfood (Pillar 2) | "See live observations from Intent building itself" |
| Observe (Pillar 2) → | Signals (Pillar 2) | "See how observations become new signals" |
| Getting Started (Pillar 2) → | Deployment (Pillar 3) | "See deployment options in depth" |
| Getting Started (Pillar 2) → | Native Repos (Pillar 3) | "See adoption tiers for existing repos" |
| Walkthrough (Pillar 1) → | Work System (Pillar 2) | "See the full operational dashboard" |
| Walkthrough (Pillar 1) → | Schemas (Pillar 2) | "See the data contracts behind each artifact" |
| System Diagram (Pillar 2) → | Architecture (Pillar 3) | "See the MCP server topology" |
| System Diagram (Pillar 2) → | Observe (Pillar 2) | "Understand what the Observe layer reveals" |
| Voices (Pillar 2) → | Agents (Pillar 3) | "See the spec-shaping protocol that invokes these voices" |
| Voices (Pillar 2) → | ARB (Pillar 3) | "See how architectural decisions are challenged" |
| Voices (Pillar 2) → | Methodology (Pillar 1) | "How discovery uses persona critique" |
| Agents (Pillar 3) → | Voices (Pillar 2) | "Meet the 178 voices behind spec-shaping" |
| ARB (Pillar 3) → | Voices (Pillar 2) | "The advisory voices that challenge decisions" |
| Methodology (Pillar 1) → | Voices (Pillar 2) | "The thought leaders who shape every spec" |

---

## Diagram Source Policy

**Every interactive or visual diagram page MUST link to its Mermaid (or markdown) source file in the repo.**

The interactive page is the storytelling surface — it explains the system to a broad audience. The Mermaid source is the working artifact — engineers copy it into PRs, embed it in their own docs, fork it for subsystem diagrams. Both must be reachable.

### Pattern

Each diagram page includes a "View source diagram →" link in its below-diagram content section, pointing to the raw Mermaid/markdown file on GitHub. Use this format:

```html
<a href="https://github.com/theparlor/intent/blob/main/{path-to-mermaid-file}" class="source-link">
  View Mermaid source →
</a>
```

### Affected Pages

| Page | Source File | Link Context |
|------|------------|--------------|
| system-diagram.html (Pillar 2) | TBD — Mermaid version of system architecture | Below interactive SVG, in cross-links section |
| flow-diagram.html (Pillar 2) | TBD — Mermaid version of loop flow | Below flow visualization |
| observability.html (Pillar 3) | spec/observability-stack.md (contains Mermaid) | Below OTel architecture diagram |

As new diagram pages are added, each must follow this policy. The source link is not optional — it is a first-class cross-link, as important as any pillar cross-link above.

---

## Migration Notes

### Content that moves or merges

- **Pitch visuals** (fracture grid, loop SVG, stat boxes, timeline, comparison strip, two-plane diagram) stay on pitch.html. If any of these visuals would enhance the Concept Brief or Methodology pages, they should be **duplicated/adapted**, not moved. The pitch page must remain visually complete.
- **index.html** current content (loop strip, card grid) gets replaced by pitch.html content or index.html redirects to pitch.html.
- **visual-brief.html** becomes a link/CTA on pitch.html, removed from any nav.

### What doesn't change

- All page files keep their current filenames.
- All page-specific CSS remains intact (the Light/Rich model continues).
- All existing visual components are preserved (CON-SITE-008 still applies).
- File size baselines still apply (CON-SITE-006 still applies).

### Implementation order

1. **Update nav HTML on all 18 pages** — new 3-link primary nav, pillar-appropriate sub-nav
2. **Update index.html** — either replace content with pitch.html content or redirect
3. **Add cross-links** to page content where specified
4. **Update site-spec.md** — new page inventory reflecting pillar structure
5. **Update site-contracts.md** — new nav contracts reflecting 3-link primary, pillar sub-navs
6. **Update CLAUDE.md** — new IA rules for terminal agents
7. **Verify all contracts pass**
