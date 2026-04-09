---
title: 2026 04 08 Persona Browser And Product Dashboard Design
type: framework
maturity: final
confidentiality: shareable
reusability: universal
domains:
  - consulting-operations
created: 2026-04-09
thought_leaders:
  - marty-cagan
  - teresa-torres
depth_score: 4
depth_signals:
  file_size_kb: 17.6
  content_chars: 17713
  entity_count: 2
  slide_count: 0
  sheet_count: 0
  topic_count: 1
  has_summary: 0
vocab_density: 0.40
related_entities:
  - {pair: consulting-operations ↔ subaru, count: 836, strength: 0.43}
  - {pair: consulting-operations ↔ automotive-manufacturing, count: 791, strength: 0.409}
  - {pair: consulting-operations ↔ engagement-management, count: 507, strength: 0.262}
  - {pair: consulting-operations ↔ turnberry, count: 472, strength: 0.226}
  - {pair: consulting-operations ↔ foot-locker, count: 256, strength: 0.133}
---
# Design Spec: Persona Browser & Products Built with Intent

> Two deliverables that formalize the product taxonomy and make the persona system browsable. The persona browser is a local reference tool; the product dashboard is a public intent-site feature that shows how products compose.

**Date:** 2026-04-08
**Owner:** Brien
**Status:** Draft

---

## Deliverable A: Local Persona Browser

### Purpose

A local-only HTML reference tool that lets Brien browse all 178+ persona registry entries visually. Not part of the public intent-site. Generated from registry data, regenerable on demand.

### Location

```
Core/personas/browser/
├── generate.py          ← generator script
├── index.html           ← generated catalog page
└── personas/
    ├── teresa-torres.html
    ├── marty-cagan.html
    └── ... (178+ files)
```

### Generator Script

`generate.py` reads:
- All `Core/personas/registry/*.yaml` files
- `Core/personas/freshening-schedule.yaml` for tier classification
- `Core/personas/archetypes/*/source-humans.yaml` for contribution context

Outputs static HTML. No build tools, no framework, no server required. Opens with `file:///`.

Run: `python3 Core/personas/browser/generate.py`

**Git:** The `browser/` output directory (index.html + personas/*.html) is `.gitignore`d — generated output, not source. Only `generate.py` is committed. The generator is the artifact; the output is ephemeral.

### Index Page

- **Header:** "Persona Registry Browser" + entity count + enrichment coverage stats (how many have vocab fingerprints, channels, contributes_to)
- **Filter bar:** Tier pills (All / Foundational / Primary / Secondary) + Archetype dropdown + Search input
- **Card grid** (4-col → 2-col → 1-col responsive):
  - Name (linked to detail page)
  - **Tagline** (new field — see below)
  - Tier badge (amber/blue/gray)
  - Archetype contribution badges (if any)
  - Depth score indicator (1-5 dots)
  - 2-3 framework tags from `rendering.frameworks`

### Detail Page (per entity)

Sections in order, derived from registry YAML:

1. **Identity Header**
   - Name (large), type badge, lifecycle badge
   - **Tagline** (prominent, below name)
   - Created/updated timestamps
   - Tier badge, depth score (1-5 visual)

2. **Role & Industry**
   - Role tags with title, level, function, org, O*NET where present
   - Industry tags with NAICS codes and labels

3. **Voice**
   - Full `substance.voice` text, styled as a reading block
   - Voice tags extracted and shown as pills if present in text

4. **Mental Models**
   - Card per model: name as heading, description as body
   - Accent-colored left border

5. **Stances**
   - Ordered list with blue accent border

6. **Frustration Triggers**
   - Ordered list with red accent border

7. **Vocabulary Fingerprint**
   - Pill/tag cloud layout

8. **Unique Signal**
   - Callout block with "When operating as [Name]:" prefix

9. **Archetype Contributions**
   - Card per archetype: name, weight shown as bar (e.g., 30% filled), dimension badges (voice, mental_models, stances), notes text

10. **Related Entities**
    - List with strength indicator (dot size or bar), each name links to that entity's detail page
    - Sorted by strength descending

11. **Channels**
    - Table: platform, URL (linked where present), frequency, richness, notes
    - Legacy channels flagged for deceased entities

12. **Sourcing**
    - Source type, sourced_from list, corpus path as file link

13. **Rendering Bridge**
    - Framework tags from `rendering.frameworks`
    - Skills Engine persona file link
    - Platform combination notes
    - Role combination guidance

**Footer of every detail page:**
- "View registry YAML →" → `file:///Users/brien/Workspaces/Core/personas/registry/{slug}.yaml`
- "View rendering →" → `file:///Users/brien/Workspaces/Core/products/skills-engine/personas/personalities/{slug}.md`
- Prev / Next navigation (alphabetical within tier, with tier label)

### Design System

Uses the same dark slate palette as the intent-site for visual consistency:
- Background: `#0f172a`, Surface: `#1e293b`, Border: `#334155`
- Text: `#f1f5f9`, Muted: `#94a3b8`
- Tier colors: Foundational = `#f59e0b`, Primary = `#3b82f6`, Secondary = `#64748b`
- Archetype accent colors match the intent-site personas.html definitions

No shared stylesheet dependency — all CSS is self-contained in the generated HTML (works offline, no file path dependencies beyond the generated output).

### New Registry Field: `tagline`

**Location in YAML:** Under IDENTITY section, after `lifecycle`

```yaml
# IDENTITY
id: teresa-torres
type: named-human
name: Teresa Torres
tagline: "Product discovery coach who created the Opportunity-Solution Tree framework."
created: 2026-04-06T18:00:00Z
updated: 2026-04-06T18:00:00Z
lifecycle: active
```

**Format:** One sentence, 10-20 words. Written for someone who has never heard of this person. Pattern: "[Role/credential] known for [signature contribution]."

**Generation:** Opus reads `substance.voice`, `substance.mental_models`, `sourced_from`, and `index.roles` to produce the tagline. Stored in registry YAML. Refreshed when the persona is freshened (checked against `updated` timestamp).

**Schema update:** Add `tagline` as an optional string field to `registry/_schema.yaml`.

---

## Deliverable B: Products Built with Intent — Dashboard Tab

### Purpose

A new 6th tab on work-system.html that shows the product portfolio taxonomy, composability flow diagram, and product cards. Answers: "What products exist, how do they compose, and what's the status of each?"

### Tab Label

**"Products Built with Intent"** — displayed as the tab name. Internal link anchor: `#products`.

### Data Source

A new governance file: `products-taxonomy.yaml` in the intent-site repo root. This is the canonical product taxonomy that drives the dashboard tab.

```yaml
# products-taxonomy.yaml
portfolio:
  name: The Parlor
  product_lines:
    - id: knowledge-engine
      name: Knowledge Engine
      color: "#a855f7"  # purple
      description: "Composable intelligence platform that researches, enriches, and infers knowledge from raw sources."
      products:
        - id: company-dossier
          name: Company Dossier
          type: domain
          status: execute
          tagline: "Structured intelligence profile for any company, built from public sources."
          provides: ["enriched company profiles", "competitive landscape context"]
          consumes: ["KE Research", "KE Enrich", "KE Infer"]
        - id: person-dossier
          name: Person Dossier
          type: domain
          status: execute
          tagline: "Deep profile of any individual — career arc, publications, influence map."
          provides: ["enriched person profiles", "persona corpus input"]
          consumes: ["KE Research", "KE Enrich", "KE Infer"]
        - id: industry-scan
          name: Industry Scan
          type: domain
          status: spec
          tagline: "Market landscape analysis with competitive dynamics and trend mapping."
          provides: ["industry context", "market landscape models"]
          consumes: ["KE Research", "KE Assess"]
        - id: ke-research
          name: Research
          type: platform
          status: execute
          tagline: "Multi-source research pipeline — web, corpus, API, and document ingestion."
          provides: ["raw research artifacts"]
          consumes: []
        - id: ke-enrich
          name: Enrich
          type: platform
          status: execute
          tagline: "Structured enrichment of raw research into typed knowledge artifacts."
          provides: ["enriched knowledge artifacts"]
          consumes: ["KE Research"]
        - id: ke-infer
          name: Infer
          type: platform
          status: spec
          tagline: "Cross-artifact inference — relationship mapping, gap detection, implication threading."
          provides: ["inferred relationships", "gap analysis", "implications"]
          consumes: ["KE Enrich"]
        - id: ke-assess
          name: Assess
          type: platform
          status: noticed
          tagline: "Evaluation framework — scoring, ranking, and confidence calibration."
          provides: ["confidence scores", "assessments", "rankings"]
          consumes: ["KE Enrich", "KE Infer"]
      gtm_product:
        id: knowledge-farm
        name: Knowledge Farm
        tagline: "A portable knowledge base — your personas, dossiers, and domain models in one place."
        description: "The carry-away product. A curated instance of Knowledge Engine output scoped to an engagement or user. Contains personas, company dossiers, industry scans, and domain models. Freshening requires Knowledge Engine access (subscription model)."
        status: noticed

    - id: intent
      name: Intent
      color: "#3b82f6"  # blue
      description: "Team operating model for AI-augmented product teams. Replaces Agile toolchain with a signal-driven loop."
      products:
        - id: notice
          name: Notice
          type: platform
          status: execute
          tagline: "Signal capture and enrichment — the system's sensory layer."
          provides: ["enriched signals", "signal clusters", "promoted intents"]
          consumes: ["KE domain context"]
        - id: spec
          name: Spec
          type: platform
          status: execute
          tagline: "Spec authoring with persona critique and contract decomposition."
          provides: ["validated specs", "contract trees"]
          consumes: ["Personas & Voices", "Methodology Library"]
        - id: execute
          name: Execute
          type: platform
          status: execute
          tagline: "Contract verification and artifact generation."
          provides: ["verified contracts", "generated artifacts"]
          consumes: ["specs", "contracts"]
        - id: observe
          name: Observe
          type: platform
          status: execute
          tagline: "Loop closure — observations become new signals."
          provides: ["observations", "drift detection", "new signals"]
          consumes: ["execution results", "KE Enrich (feedback loop)"]

    - id: skills-engine
      name: Skills Engine
      color: "#f59e0b"  # amber
      description: "Composable advisory intelligence — methodology x persona x platform = deployable capability."
      products:
        - id: personas-voices
          name: Personas & Voices
          type: domain
          status: execute
          tagline: "178+ thought leader personas rendered as advisory voices for coaching and critique."
          provides: ["persona critique for spec-shaping", "advisory voices", "archetype compositions"]
          consumes: ["KE Person Dossier", "KE Enrich"]
        - id: methodology-library
          name: Methodology Library
          type: domain
          status: execute
          tagline: "Codified consulting methodologies — discovery, debugging, planning, review."
          provides: ["methodology modules", "skill compositions"]
          consumes: []

    - id: fieldbook
      name: Fieldbook
      color: "#10b981"  # green
      description: "Expense lifecycle system — intake, ledger, comply, narrate, export."
      type: standalone-product
      status: spec
      tagline: "Composable expense management for independent consultants."
      provides: ["expense tracking", "compliance narratives", "export projections"]
      consumes: ["KE categorization"]

    - id: digital-declutter
      name: Digital Declutter
      color: "#64748b"  # gray
      description: "File organization and knowledge ingestion pipeline."
      type: standalone-product
      status: execute
      tagline: "Automated file triage, placement, and knowledge graph maintenance."
      provides: ["organized file system", "raw material for KE Research"]
      consumes: []

# Composability flows (what the diagram renders)
flows:
  - from: ke-research
    to: ke-enrich
    label: "raw → structured"
  - from: ke-enrich
    to: ke-infer
    label: "enriched → inferred"
  - from: ke-enrich
    to: company-dossier
    label: "enriched profiles"
  - from: ke-infer
    to: person-dossier
    label: "enriched + inferred profiles"
  - from: person-dossier
    to: personas-voices
    label: "persona corpus input"
  - from: ke-enrich
    to: personas-voices
    label: "freshening data"
  - from: personas-voices
    to: spec
    label: "persona critique"
  - from: methodology-library
    to: spec
    label: "methodology guidance"
  - from: ke-enrich
    to: notice
    label: "domain context"
  - from: observe
    to: ke-enrich
    label: "observations → enrichment (feedback loop)"
    highlight: true
  - from: digital-declutter
    to: ke-research
    label: "raw material"
  - from: ke-enrich
    to: fieldbook
    label: "categorization"
```

### Section 1: Portfolio Taxonomy

Visual nested card layout showing the three-level hierarchy:

- **Product line** = colored container with header (name, product count, description)
- **Product** = card inside the container (name, type badge, status badge, tagline)
- **GTM product** = highlighted card with a different treatment (dashed border? star icon?) to distinguish it from internal products

Type badges:
- Domain product: solid pill
- Platform product: outlined pill
- GTM product: highlighted/starred pill

Status badges use Intent lifecycle colors:
- Noticed: gray
- Spec: blue
- Execute: green
- Observe: amber

### Section 2: Composability Flow Diagram

SVG diagram rendered from the `flows` array in the taxonomy YAML. Shows:

- Product lines as colored containers (matching Section 1 colors)
- Products as nodes within containers
- Flows as directed arrows with labels
- The **feedback loop** (Observe → KE Enrich) highlighted with a different stroke style (dashed + brighter color) since it's the most important architectural insight
- Fan-out visible where a product serves multiple consumers

The diagram is hand-authored SVG (matching the intent-site pattern — the arb.html tech radar, the system-diagram.html interactive panels are all hand-authored SVG). Not generated from Mermaid — the composability flow needs custom layout for readability.

A Mermaid source version lives in `docs/diagrams/product-composability.mermaid` for the engineering reference (per diagram source policy).

### Section 3: Product Cards

Card grid below the flow diagram. Grouped by product line (colored header dividers).

Each card:
- Product name + type badge + status badge
- Tagline
- **Provides:** bulleted list of what this product enables
- **Consumes:** bulleted list of what it depends on (each item links to the providing product's card via anchor)
- Signal count + Decision count (from `.intent/` if applicable)
- Repo link (if applicable)

The provides/consumes cross-references make the composability story concrete at the card level — you can trace any dependency chain by following links.

### Knowledge Farm Note

The Knowledge Farm GTM product appears in the KE product line container with a distinctive treatment (e.g., dashed border, "GTM" badge). Its card includes a note:

> "The Knowledge Farm is the carry-away product — a portable instance of Knowledge Engine output scoped to an engagement or user. Contains personas, company dossiers, industry scans, and domain models. Freshening requires Knowledge Engine access."

This seeds the subscription model concept without over-committing to pricing or packaging.

### Changes to Existing Content

1. **work-system.html:** Add 6th tab "Products Built with Intent" with three sections
2. **products.html:** Add a note at top: "For the full product taxonomy and composability view, see Products Built with Intent →" linking to the new tab. Keep the lightweight listing for now.
3. **site-ia.md:** Document the new tab in Pillar 2 description
4. **site-spec.md:** Update work-system.html baseline size (will increase ~15-20KB)
5. **content-map.md:** Add mappings for product taxonomy claims → products-taxonomy.yaml

---

## Signals to Log

1. **KE signal: Digital Product Taxonomy Builder** — the Knowledge Engine should have a capability to scan and build product taxonomies. We did this manually for The Parlor portfolio. Automate it as a KE Research + Infer + Assess pipeline.

2. **KE signal: Knowledge Farm as GTM product** — the portable knowledge base concept. Needs its own intent, spec, and business model thinking. Subscription relationship with the Engine.

3. **Persona signal: Tagline field** — 178 entities need taglines generated. Batch job using Opus, stored in registry YAML, refreshed on persona freshening.

---

## Implementation Order

1. **products-taxonomy.yaml** — formalize the taxonomy as data
2. **Tagline generation** — batch generate taglines for all 178 personas, update registry schema
3. **Persona browser generator** — `generate.py` + output HTML
4. **Products Built with Intent tab** — SVG flow diagram + taxonomy visual + product cards
5. **Governance updates** — site-ia.md, site-spec.md, content-map.md, ROADMAP.md
6. **Signal logging** — KE taxonomy builder, Knowledge Farm, tagline field

---

## Success Criteria

- Brien can open `file:///Users/brien/Workspaces/Core/personas/browser/index.html` and browse all 178 personas with full detail
- Every persona detail page links to its source YAML and rendering file
- The work-system dashboard shows the full product portfolio with composability flows
- The feedback loop (Observe → KE Enrich) is visually prominent
- The Knowledge Farm concept is seeded as a GTM product
- Taxonomy is data-driven from `products-taxonomy.yaml`, not hardcoded HTML
