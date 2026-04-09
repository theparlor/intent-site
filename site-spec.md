---
title: Site Spec
type: framework
maturity: final
confidentiality: shareable
reusability: universal
domains:
  - consulting-operations
created: 2026-03-31
depth_score: 4
depth_signals:
  file_size_kb: 9.9
  content_chars: 9654
  entity_count: 0
  slide_count: 0
  sheet_count: 0
  topic_count: 1
  has_summary: 0
vocab_density: 0.21
---
# Intent Site Specification

> Canonical inventory of the Intent product site. Any agent modifying files in `docs/` MUST read this spec first and verify against `site-contracts.md` after.

## Page Inventory

### Primary Nav Pages (storytelling tier)

| Page | File | Page Type | Nav Active | Min Size | Status |
|------|------|-----------|------------|----------|--------|
| Home | index.html | Rich | none (logo only) | 7KB | Live |
| Pitch | pitch.html | Rich | Pitch | 28KB | Live |
| Methodology | methodology.html | Light | Methodology | 13KB | Live |
| Concept Brief | concept-brief.html | Light | Concept Brief | 10KB | Live |
| Work System | work-system.html | Rich | Work System | 48KB | Live |
| Flow | flow-diagram.html | Light | Flow | 1.5KB | **NEEDS REBUILD — content stripped** |
| System Map | system-diagram.html | Rich | System Map | 20KB | New — Interactive signal-to-observation SVG diagram |
| Schemas | schemas.html | Light | Schemas | 16KB | Live |
| ARB | arb.html | Rich | ARB | 39KB | Live — SVG radar visual + tab interface |
| Dogfood | dogfood.html | Rich | Dogfood | 22KB | Live |
| Roadmap | roadmap.html | Rich | Roadmap | 18KB | Live |

### Technical Depth Pages (sub-nav tier)

| Page | File | Page Type | Sub-Nav Active | Min Size | Status |
|------|------|-----------|----------------|----------|--------|
| Architecture | architecture.html | Rich | Architecture | 25KB | New — 2026-03-30 |
| Agents | agents.html | Rich | Agents | 25KB | New — 2026-03-30 |
| Deployment | deployment.html | Rich | Deployment | 15KB | New — 2026-03-30 |
| Signals | signals.html | Rich | Signals | 48KB | Live — verify 15 signals intact |
| Dogfood | dogfood.html | Rich | Dogfood | 22KB | Live (dual nav: primary + sub) |

### ARB Review Pages (added 2026-03-30)

These pages were identified by the ARB review as gaps in the site's ability to describe the Intent universe.

| Page | File | Page Type | Pillar | Min Size | Status |
|------|------|-----------|--------|----------|--------|
| Walkthrough | walkthrough.html | Rich | 1 (Story) | 15KB | New — End-to-end trace of one real intent |
| Observe | observe.html | Rich | 2 (System) | 12KB | New — Observe phase narrative, loop closure |
| Getting Started | getting-started.html | Rich | 2 (System) | 13KB | New — Adoption onramp, "30 minutes to Intent" |
| Voices | personas.html | Rich | 2 (System) | 40KB | New — 178+ persona catalog, 7 archetypes, filters, freshening pipeline |

### Supporting Pages (no nav active state)

| Page | File | Page Type | Min Size | Status |
|------|------|-----------|----------|--------|
| Observability | observability.html | Rich | 12KB | New — Mermaid architecture diagram, phase cards, metrics table |
| Decisions | decisions.html | Rich | 22KB | **Expanding (ARB review) — D1-D12 ADRs from ARB panel** |
| Event Catalog | event-catalog.html | Rich | 8KB | **Expanding (ARB review) — 15 event types with schemas and triggers** |
| Native Repos | native-repos.html | Rich | 13KB | Live |
| Products | products.html | Rich | 10KB | Product catalog — 8 products by layer, signal/decision counts |
| Visual Brief | visual-brief.html | Light | 1KB | Live (launches visual-brief-app/) |

## CSS Strategy

**All pages use the same architecture:** link `styles.css` for shared foundation + page-specific `<style>` blocks for unique components.

```html
<link rel="stylesheet" href="styles.css">
<style>
  /* Page-specific component CSS only */
  .my-page-component { ... }
</style>
```

The shared `styles.css` provides: reset, variables, body, nav, sub-nav, hero, content, cards, grids, badges, scroll animations, callouts, code blocks, footer, responsive breakpoints. Page-specific `<style>` blocks provide component CSS unique to that page.

### Page Types

**Light pages** have small or no `<style>` blocks. Most styling comes from styles.css.

**Rich pages** have extensive `<style>` blocks (50-300+ lines) with complex visual components. **Never strip or reduce `<style>` blocks from rich pages.** The page-specific CSS IS the page's value. The protection against content loss is CON-SITE-006 (file size canary) and CON-SITE-008 (visual components check).

## Navigation Patterns

### Primary Nav (9 links + logo)
Present on ALL 18 pages. Exactly one link has `class="active"` matching the current page. Pages not in the nav (decisions, event-catalog, native-repos, visual-brief, architecture, agents, deployment, signals) have NO active link on the primary nav.

### Technical Sub-Nav (5 links)
Present on: architecture.html, agents.html, deployment.html, signals.html, dogfood.html. Sits below primary nav. Exactly one link has `class="active"`.

## Visual Components Inventory

These are HIGH-VALUE visual elements. Their loss constitutes a critical defect.

| Page | Component | Description |
|------|-----------|-------------|
| pitch.html | Fracture grid | 2-column broken/intact comparison cards |
| pitch.html | Timeline | Gradient-line era timeline (waterfalls → agile → AI → intent) |
| pitch.html | Comparison strip | 3-column old/divider/new |
| pitch.html | SVG loop diagram | Notice → Spec → Execute → Observe circular |
| pitch.html | Two-plane diagram | Work stream + ownership topology rows |
| pitch.html | Stat boxes | 4-column grid (10×, 0×, ∞, 3 independent layers) |
| architecture.html | Three-layer diagram | Stacked layer cards with 6 data flow descriptions |
| architecture.html | Federation model | Core vs engagement knowledge base model |
| architecture.html | Fourth server card | intent-knowledge (port 8004) server card |
| arb.html | Tab interface | 4 tabs: Tech Radar, Architectural Stack, ARB Panel, Atomized Roadmap |
| arb.html | SVG radar visual | Circular radar with 22 blips, 4 quadrants, concentric rings, legend |
| arb.html | Tech radar grid | Quadrant detail cards: Adopt, Trial, Assess, Hold |
| arb.html | Stack layers | Tiered architecture cards |
| signals.html | Signal cards | 15 signal cards with trust scores, status badges |
| signals.html | Cluster views | Signal grouping visualization |
| signals.html | Source flow | Signal source → pipeline flow |
| signals.html | Pattern timeline | Emergent pattern visualization |
| work-system.html | Full work system | Comprehensive operational dashboard replacement |
| agents.html | Knowledge agents | knowledge-compiler and knowledge-querier agent cards |
| agents.html | Spec-shaping protocol | Four-persona interrogation cards (△◇○◉) |
| dogfood.html | Dogfood dashboard | Self-referential metrics and status |
| roadmap.html | Product roadmap | Interactive phase cards with investment sizing |
| observability.html | Mermaid architecture diagram | Full OTel stack: sources → collector → backends → Grafana |
| observability.html | Trace identity diagram | Mermaid span hierarchy: Intent=Trace, Spec=Span, Contract=Leaf |
| observability.html | Dashboard preview | Styled panel layout of Grafana Observe dashboard |
| system-diagram.html | Interactive flow SVG | 5 capture surfaces → pipeline → spec/execute → observe → loop |
| system-diagram.html | Click-to-explore panels | Detail data for every element: tools, commands, specs |
| walkthrough.html | Trace timeline | Visual timeline showing signal→cluster→promote→spec→execute→observe |
| walkthrough.html | Event stream excerpt | Real events from events.jsonl for the traced intent |
| observe.html | Loop closure diagram | Visual: observation → new signal → back to Notice |
| observe.html | Dashboard questions | What the Grafana panels answer: cycle time, trust drift, anomalies |
| getting-started.html | Adoption steps | Step-by-step cards: install → configure → capture → observe |
| schemas.html | Knowledge artifact schemas | PER, JRN, DDR, THM, DOM, RAT type definitions |
| event-catalog.html | Event type cards | 15 event types with schema, trigger conditions, and examples |
| decisions.html | ADR cards | D1-D12 architecture decision records with context and rationale |

## File Size Baselines

File sizes serve as a canary. A page dropping significantly below its baseline means content was lost.

```
pitch.html        ~28KB (Rich — scroll animations, SVG, fracture grid, timeline, comparison strip, three-layer section)
work-system.html  ~80KB (Rich — full React work system dashboard with 6 tabs including Products Built with Intent)
signals.html      ~48KB (Rich — 15 signal cards, cluster views, trust scoring)
arb.html          ~39KB (Rich — SVG radar visual, tab interface, tech radar cards, stack, ARB panel, roadmap)
dogfood.html      ~22KB (Rich — dogfood dashboard, event stream, signal list, updated stats)
roadmap.html      ~18KB (Rich — product phase cards, investment sizing, CLI grid, KE roadmap)
architecture.html ~25KB (Rich — three-layer diagram, federation model, server cards, trust table, ASCII diagrams, phase cards)
agents.html       ~25KB (Rich — knowledge agents, spec-shaping protocol, model routing table, tool pills)
native-repos.html ~13KB (Rich — React tabbed interface)
deployment.html   ~15KB (Rich — step cards, platform table, code blocks, 4th server)
methodology.html  ~13KB (Light — three-layer context, spec-shaping protocol reference)
concept-brief.html ~10KB (Light)
decisions.html    ~22KB (Rich — 12 ADR cards from ARB panel, expanded from 4KB stub)
event-catalog.html ~8KB (Rich — 15 event type cards with schemas, expanded from 2KB stub)
walkthrough.html  ~15KB (Rich — end-to-end trace timeline, event stream, cross-links)
observe.html      ~12KB (Rich — loop closure narrative, dashboard questions, observation patterns)
getting-started.html ~13KB (Rich — adoption steps, CLI quickstart, deployment link, KE adoption path)
schemas.html      ~16KB (Light — knowledge artifact schemas, federation notation)
index.html        ~8KB (Rich — loop strip, card grid, section layout)
flow-diagram.html ~1.5KB ⚠️ NEEDS REBUILD (was stripped to skeleton)
visual-brief.html ~1KB (Light — iframe launcher)
```
