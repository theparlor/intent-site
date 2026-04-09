---
title: Personas Page
type: framework
maturity: final
confidentiality: shareable
reusability: universal
domains:
  - consulting-operations
created: 2026-04-09
depth_score: 4
depth_signals:
  file_size_kb: 7.2
  content_chars: 7146
  entity_count: 0
  slide_count: 0
  sheet_count: 0
  topic_count: 1
  has_summary: 0
vocab_density: 0.42
---
# Task: Personas Page — "The Voices Behind Intent"

> Add a new Pillar 2 depth page showcasing all 178+ thought leader personas that power Intent's advisory layer. The persona system provides the critique voices used in spec-shaping, ARB review, and continuous discovery.

## Context

Intent uses a Unified Persona System (Core/personas/) with 178+ named-human entities and 7 composite archetypes. These personas aren't decorative — they're operational. The spec-shaping protocol uses persona critique to challenge assumptions. The ARB pattern uses persona voices to evaluate architectural decisions from multiple disciplines.

The intent-site currently has no representation of this system. The agents.html page references the four spec-shaping roles (△◇○◉) but doesn't surface the deep persona library behind them.

## Placement

**Pillar 2 — "The System"** (How It Works)

**Sub-nav label:** `Voices`

**Sub-nav position:** After "Signals", before "Dogfood"

Updated Pillar 2 sub-nav:
```
Overview · Flow · System Map · Schemas · Signals · Voices · Dogfood · Observe · Events · Start
```

**Rationale:** Personas are an operational component — they're HOW the system produces depth. Signals surface observations; Voices interpret and challenge them. This is a natural narrative: see signals → hear the voices that analyze them → see the system dogfooding itself.

## Page Structure: personas.html

### Hero Section
- **Title:** "The Voices Behind Intent"
- **Subtitle:** "178 thought leaders. 7 archetypes. Every spec challenged from multiple disciplines."
- **Stat boxes** (4 count items):
  - Total Voices: 178+
  - Archetypes: 7
  - Foundational Tier: 19
  - Archetype Sources: 35+

### Section 1: "The Seven Archetypes"
Visual cards for each archetype with accent-color borders:

| Archetype | Color | Source Count |
|-----------|-------|-------------|
| Product Thought Leader | `#3b82f6` (blue) | 4 |
| Transformation Architect | `#f59e0b` (amber) | 5 |
| Flow Engineer | `#10b981` (green) | 5 |
| Systems Strategist | `#a855f7` (purple) | 5 |
| Organizational Psychologist | `#dc2626` (red) | 6 |
| Visual Strategist | `#3b82f6` (blue, lighter) | 5 |
| Engineering Excellence Advisor | `#10b981` (green, lighter) | 5 |

Each archetype card shows:
- Archetype name + icon
- One-sentence purpose
- Key convictions (3-4 bullets)
- Source humans listed with weights

### Section 2: "How Personas Power the System"
Narrative section explaining:
- Spec-shaping protocol (link to agents.html)
- ARB review critique pattern (link to arb.html)
- Discovery challenge (link to methodology.html)
- Diagram: Signal → Persona Critique → Refined Spec

### Section 3: "Voice Catalog"
Full catalog of all 178+ entities.

**Filter bar** (client-side JS):
- Tier filter: All / Foundational / Primary / Secondary
- Archetype filter: All / [7 archetype names]
- Search input (filters by name)

**Card grid** (responsive: 4-col desktop → 2-col tablet → 1-col mobile):
Each card contains:
- Name (h3)
- Voice descriptor (1 line, from rendering)
- 2-3 key framework/mental model tags (small badges)
- Tier badge (color-coded)
- Archetype contribution badges (if any)

**Sort:** Foundational first, then primary, then secondary. Alphabetical within tiers.

### Section 4: "The Freshening Pipeline"
Brief explanation of how personas stay current:
- Monthly refresh for foundational tier
- Quarterly for primary
- Semi-annual for secondary
- Link to the system's own dogfood page

### Footer Cross-Links
- → Agents: "See the spec-shaping protocol that invokes these voices"
- → ARB: "See how architectural decisions are challenged"
- → Methodology: "See how discovery uses persona critique"
- → Schemas: "See the data contracts behind persona records"

## Data Source

Generate card content from:
1. **Registry YAML** (`Core/personas/registry/*.yaml`): name, voice (substance.voice first line), tier, contributes_to
2. **Rendering files** (`Core/products/skills-engine/personas/personalities/*.md`): mental model names from frontmatter `frameworks:`
3. **Freshening schedule** (`Core/personas/freshening-schedule.yaml`): tier classification

## Implementation Notes

1. **Static HTML generation.** The page is vanilla HTML like all other pages. Generate it once from registry data. Can be regenerated when personas change.
2. **Client-side filtering.** Use vanilla JS (no framework). Data attributes on cards for filtering. No build step needed.
3. **File size target:** ~40-60KB (comparable to work-system.html at 48KB, signals.html has 15 signal cards).
4. **Rich page.** Extensive `<style>` block with card grid, filter bar, archetype cards, and responsive breakpoints.
5. **Design system compliance.** Use the unified slate palette. Archetype colors from the persona colors section of CLAUDE.md.

## Sub-Nav Update (ALL Pillar 2 pages)

Must update the sub-nav on ALL 9 existing Pillar 2 pages to add "Voices":

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

## Governance Updates Required

1. **site-ia.md** — Add Personas to Pillar 2 table, update sub-nav template
2. **site-spec.md** — Add personas.html to page inventory with baseline size
3. **site-contracts.md** — No new contracts needed (existing nav/size contracts cover it)
4. **content-map.md** — Add mapping: personas.html → Core/personas/registry/, Core/personas/archetypes/
5. **CLAUDE.md** — Update Pillar 2 page list
6. **ROADMAP.md** — Add Phase 3 entry

## Cross-Links to Wire

| From | To | Context |
|------|----|---------|
| personas.html → | agents.html | "See the spec-shaping protocol" |
| personas.html → | arb.html | "See architectural review patterns" |
| personas.html → | methodology.html | "How discovery uses persona critique" |
| agents.html → | personas.html | "Meet the 178 voices behind spec-shaping" |
| arb.html → | personas.html | "The advisory voices that challenge decisions" |
| methodology.html → | personas.html | "The thought leaders who shape every spec" |

## Verification

```bash
cd ~/Workspaces/Core/frameworks/intent-site

# Page exists and is reasonable size
SIZE=$(wc -c < docs/personas.html)
[ "$SIZE" -gt 30000 ] && echo "PASS: personas.html size $SIZE" || echo "FAIL: too small"

# Sub-nav updated on all P2 pages
for f in work-system flow-diagram system-diagram schemas signals dogfood observe event-catalog getting-started; do
  grep -q 'personas.html' "docs/${f}.html" && echo "PASS: $f has personas link" || echo "FAIL: $f missing personas link"
done

# Archetype section exists
grep -q 'archetype' docs/personas.html && echo "PASS: archetype section" || echo "FAIL"

# Filter functionality
grep -q 'filter\|data-tier\|data-archetype' docs/personas.html && echo "PASS: filter attributes" || echo "FAIL"

# All 10 site contracts still pass
```
