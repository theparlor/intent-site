---
title: System Diagram Page
type: framework
maturity: final
confidentiality: shareable
reusability: universal
domains:
  - consulting-operations
created: 2026-03-31
technologies:
  - slack
depth_score: 4
depth_signals:
  file_size_kb: 15.7
  content_chars: 15011
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
# Task: Create system-diagram.html — Interactive Signal-to-Observation Flow

> Handoff spec for Claude Code terminal. Creates an interactive architecture diagram page showing the full Intent system: capture surfaces → enrichment pipeline → spec/execute → observe → loop back. Vanilla HTML/JS/SVG — no build step required.

## Context

This page visualizes the complete Intent system as an interactive flow diagram. A reference React implementation exists at the repo root as `intent-system-architecture.jsx` — use it as the design reference but convert to **vanilla HTML + inline SVG + vanilla JavaScript**. GitHub Pages has no React build step.

This is a Pillar 2 ("The System") depth page. Read `site-ia.md`, `site-spec.md`, and `site-contracts.md` before starting.

## Page: `docs/system-diagram.html`

### Nav Configuration

**Primary nav:** "The System" active
**Sub-nav:** Pillar 2 sub-nav with "System Map" as active link

The Pillar 2 sub-nav must be updated across ALL Pillar 2 pages to include the new link:
```html
<nav class="sub-nav">
  <a href="work-system.html">Overview</a>
  <a href="flow-diagram.html">Flow</a>
  <a href="system-diagram.html" class="active">System Map</a>
  <a href="schemas.html">Schemas</a>
  <a href="signals.html">Signals</a>
  <a href="dogfood.html">Dogfood</a>
  <a href="event-catalog.html">Events</a>
</nav>
```

Update the sub-nav on ALL Pillar 2 pages: work-system.html, flow-diagram.html, schemas.html, signals.html, dogfood.html, event-catalog.html. Each keeps its own link as `class="active"`.

### Design Reference

The JSX file `intent-system-architecture.jsx` (in the product repo root or provided by Cowork) defines the exact layout, colors, positions, and interaction model. Convert this to vanilla HTML. Key aspects:

### Color System (from Intent personas)
```javascript
const COLORS = {
  amber: "#f59e0b",    // △ Notice — Practitioner-Architect
  blue: "#3b82f6",     // ◇ Pipeline — Product-Minded Leader
  green: "#10b981",    // ◉ Execute — AI Agent
  purple: "#8b5cf6",   // ○ Observe — Design-Quality Advocate
  red: "#ef4444",
  slate900: "#0f172a",
  slate800: "#1e293b",
  slate700: "#334155",
  slate600: "#475569",
  slate500: "#64748b",
  slate400: "#94a3b8",
  slate300: "#cbd5e1",
  slate100: "#f1f5f9"
};
```

### SVG Layout (viewBox: 0 0 960 720)

The diagram has 4 horizontal rows with connecting arrows:

**Row 1 — CAPTURE SURFACES** (y ≈ 50, amber section)
5 boxes at x positions 40, 220, 400, 580, 760 (each 160×52):
- MCP Server (T1) — "Claude Code · Cowork" — amber solid border
- CLI Tools (T2) — "intent-signal · spec" — amber solid border
- Slack Bot (T3) — "Reactions · Commands" — slate dashed border (planned)
- GitHub Actions (T4) — "intent-events.yml" — amber solid border
- AI Plugins (T5) — "ChatGPT · Copilot" — slate dashed border (planned)

All converge via arrows into:
- events.jsonl box (350, 130, 260×52) — amber border, centered

**Row 2 — ENRICHMENT PIPELINE** (y ≈ 238, blue section)
5 pipeline stage boxes at x positions 80, 210, 340, 470, 600 (each 100×52):
- Dedup → Context → Trust Score → Classify → Route
Connected by arrows left-to-right. Route splits into:
- "Human Review Queue" (L0-L2) — amber, right side
- "Auto-promote Pipeline" (L3-L4) — green, right side

Below pipeline: two boxes at y ≈ 320:
- Signal Clustering (200, 320, 200×44)
- Promote to Intent (440, 320, 200×44)

**Row 3 — SPEC + EXECUTE** (y ≈ 392, green section)
4 boxes:
- Spec Creation (80, 392, 180×56) — "Narrative + acceptance criteria + contracts"
- Agent Execution (290, 392, 180×56) — "Claude Code executes against contracts"
- Entire.io (500, 392, 160×56) — "Session traces · Execution observability" — green border
- Contract Verification (690, 392, 180×56) — "Assertions pass/fail → events emitted"

**Entire.io** is the execution trace collector. It watches Claude Code sessions, captures the full execution trace (files, commands, tests), and emits `trace.completed` events. It bridges Execute → Observe by producing the spans that make agent work visible.

Arrow flow: Agent Execution → Entire.io (captures session) → Contract Verification (assertions emitted) + Entire.io → File Tail Adapter (trace.completed events)

**Row 4 — OBSERVE + LOOP** (y ≈ 540, purple section)
- File Tail Adapter (80, 540, 200×56)
- OTel Collector (320, 540, 200×56)
- Tempo (560, 540, 110×56) — "Traces"
- Mimir (685, 540, 110×56) — "Metrics"
- Loki (810, 540, 110×56) — "Logs"
- Grafana Dashboard (320, 630, 340×56) — full width bottom

**The Loop Arrow:** A curved dashed path from Grafana (bottom-left) back up to MCP Server (top-left), labeled "OBSERVATIONS → NEW SIGNALS" — rotated text along the left edge.

### Interaction Model (Vanilla JS)

Each clickable box has a `data-detail` attribute. When clicked:
1. Toggle a detail panel below the SVG
2. Detail panel shows: title, color-coded left border, list of items with icon + label + description
3. Clicking the same box again hides the panel
4. Clicking a different box switches the panel

The detail data for each clickable element (from the JSX reference):

**MCP Server:** 4 items — intent_capture_signal, intent_list_signals, intent_propose_intent, Port 8001
**CLI Tools:** 4 items — intent-signal, intent-intent, intent-spec, intent-status
**Slack Bot:** 3 items — Reaction-based capture, Slash command, Status: planned
**GitHub Actions:** 4 items — intent-events.yml, freshness-check.yml, On push signals, On push intents
**AI Plugins:** 3 items — ChatGPT plugin, Copilot extension, Status: planned
**events.jsonl:** 4 items — Git-tracked, 15 event types, OTel fields, 50+ events current
**Dedup:** 3 items — Fuzzy match, Merge duplicates, Output
**Context:** 3 items — Attach references, Tag extraction, Cluster suggestion
**Trust Score:** 3 items — Formula, Output, Amplification
**Classify:** 3 items — Type, Domain, Product
**Route:** 5 items — L0 through L4 autonomy levels with descriptions
**Spec Creation:** 4 items — Intent→Spec, Contracts, Agent readiness, Trace context
**Agent Execution:** 4 items — contract.started, .passed, .failed, .completed
**Entire.io:** 4 items — Session trace capture (full execution recording), trace.completed event emission, File/command/test observability, Bridge between Execute and Observe phases
**Contract Verification:** 3 items — Assertions pass/fail, Evidence collection, Events emitted to events.jsonl
**OTel Collector:** 4 items — OTLP Receiver, Processors, Exporters, File Tail Adapter
**Observe (Grafana stack):** 4 items — Tempo, Mimir, Loki, Loop closure

### Implementation Pattern

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>System Map — Intent</title>
  <link rel="stylesheet" href="styles.css">
  <style>
    /* Page-specific styles for the diagram */
    .diagram-container { ... }
    .detail-panel { ... }
    .detail-panel.active { ... }
    /* etc */
  </style>
</head>
<body>
  <!-- Standard nav + sub-nav -->
  <!-- Hero section -->
  <!-- SVG diagram (inline, not <img>) -->
  <!-- Detail panel (hidden by default, populated by JS) -->
  <!-- Legend bar -->
  <!-- Phase badges (Operational / Specced / Planned) -->
  <!-- Footer -->

  <script>
    // Detail data object
    // Click handler: toggle detail panel
    // SVG element click delegation
  </script>
</body>
</html>
```

### Important Implementation Notes

1. **Inline SVG, not `<img>`** — the SVG must be inline in the HTML so click handlers work on individual elements
2. **CSS custom properties** — use the site's `--surface`, `--border`, `--text-muted` etc. from styles.css where they match, fall back to hardcoded hex for persona colors
3. **Hover states** — boxes should subtly brighten on hover (border-color transition)
4. **Active state on click** — clicked box gets highlighted border (2px, persona color) and fill changes to persona color at 8% opacity
5. **Arrows** — each arrow is a `<line>` + `<polygon>` arrowhead. Dashed arrows use `stroke-dasharray="6,4"`. All arrows at `opacity="0.6"`
6. **Section labels** — colored line + uppercase text above each row
7. **Tier badges** — small "T1"..."T5" labels in top-right corner of capture surface boxes
8. **Responsive** — the SVG uses viewBox so it scales. Detail panel and legend should be HTML below the SVG, not inside it
9. **The loop arrow** — curved `<path>` with quadratic bezier from bottom-left to top-left, dashed amber stroke, with rotated text label

### Below-diagram content

After the interactive SVG + detail panel, add these HTML sections:

**Legend bar:** 4 colored squares with persona labels (amber/blue/green/purple)

**Phase status badges:** 3 cards in a row:
- Operational (green border): MCP, CLI, GitHub Actions, events.jsonl
- Specced (blue border): OTel Collector, Adapter, Dashboard, Trust Propagation
- Planned (slate border): Slack Bot, AI Plugins, Self-hosted Stack

**Diagram source link:** (required — see Diagram Source Policy in site-ia.md)
```html
<a href="https://github.com/theparlor/intent/blob/main/docs/diagrams/system-architecture.mermaid" class="source-link">
  View Mermaid source →
</a>
```
This links engineers directly to the machine-readable Mermaid diagram. The Mermaid file must also be created (see below).

**Cross-links section:**
- "View Mermaid source →" → GitHub raw Mermaid file (see above)
- "See the loop phases visualized →" → flow-diagram.html
- "See the work system dashboard →" → work-system.html
- "Explore the 15 event types →" → event-catalog.html
- "See the OTel observability stack →" → observability.html

### Page Size Target

Minimum 20KB (Rich page — inline SVG is large, plus JS detail data, plus page-specific CSS).

## Also Required: Update Pillar 2 Sub-Nav

Update sub-nav on ALL Pillar 2 pages to include "System Map":
- `docs/work-system.html`
- `docs/flow-diagram.html`
- `docs/schemas.html`
- `docs/signals.html`
- `docs/dogfood.html`
- `docs/event-catalog.html`

Each page keeps its own link as `class="active"`.

## Also Required: Mermaid Source File

Create `docs/diagrams/system-architecture.mermaid` — a standalone Mermaid diagram that captures the same system architecture as the interactive SVG. This is the engineer-facing source artifact that the "View Mermaid source →" link points to.

The Mermaid file should include:
- All 5 capture surfaces with tier labels
- events.jsonl convergence point
- Enrichment pipeline (Dedup → Context → Trust → Classify → Route)
- Autonomy routing split (L0-L2 human review, L3-L4 auto-promote)
- Signal clustering → Promote to Intent
- Spec → Execute → Verify flow (include Entire.io)
- Observe layer (File Tail Adapter → OTel Collector → Tempo/Mimir/Loki → Grafana)
- Loop closure arrow (Observations → New Signals)

Use Mermaid `graph TD` (top-down) or `flowchart TD` syntax. Include `%%` comments for each row/section. Engineers will copy this into their own docs and PRs.

```bash
mkdir -p docs/diagrams
```

## Verification

```bash
cd ~/Workspaces/Core/frameworks/intent-site

# 1. Page exists and meets size target
[ -f docs/system-diagram.html ] && echo "PASS: file exists" || echo "FAIL: missing"
FILE_SIZE=$(wc -c < docs/system-diagram.html)
[ "$FILE_SIZE" -gt 20000 ] && echo "PASS: size ${FILE_SIZE} > 20KB" || echo "FAIL: size ${FILE_SIZE} < 20KB"

# 2. Contains inline SVG
grep -q '<svg' docs/system-diagram.html && echo "PASS: inline SVG present" || echo "FAIL: no SVG"
grep -q 'viewBox' docs/system-diagram.html && echo "PASS: SVG has viewBox" || echo "FAIL: no viewBox"

# 3. Contains all 5 capture surfaces
for surface in "MCP Server" "CLI Tools" "Slack Bot" "GitHub Actions" "AI Plugins"; do
  grep -q "$surface" docs/system-diagram.html && echo "PASS: has $surface" || echo "FAIL: missing $surface"
done

# 4. Contains pipeline stages
for stage in "Dedup" "Context" "Trust Score" "Classify" "Route"; do
  grep -q "$stage" docs/system-diagram.html && echo "PASS: has $stage" || echo "FAIL: missing $stage"
done

# 5. Contains observe layer
for comp in "OTel Collector" "Tempo" "Mimir" "Loki" "Grafana"; do
  grep -q "$comp" docs/system-diagram.html && echo "PASS: has $comp" || echo "FAIL: missing $comp"
done

# 6. Has JavaScript for interactivity
grep -q '<script>' docs/system-diagram.html && echo "PASS: has JS" || echo "FAIL: no JS"
grep -q 'detail' docs/system-diagram.html && echo "PASS: has detail panel" || echo "FAIL: no detail panel"

# 7. Nav correct
grep -q 'The System</a>' docs/system-diagram.html && echo "PASS: primary nav" || echo "FAIL: primary nav"
grep -q 'system-diagram.html" class="active"' docs/system-diagram.html && echo "PASS: sub-nav active" || echo "FAIL: sub-nav"

# 8. Sub-nav updated on ALL Pillar 2 pages
for page in work-system.html flow-diagram.html schemas.html signals.html dogfood.html event-catalog.html; do
  grep -q 'system-diagram.html' "docs/$page" && echo "PASS: $page has system-diagram link" || echo "FAIL: $page missing link"
done

# 9. The loop arrow exists
grep -q 'OBSERVATIONS' docs/system-diagram.html && echo "PASS: loop arrow label" || echo "FAIL: no loop arrow"

# 10. Legend and phase badges
grep -q 'Operational' docs/system-diagram.html && grep -q 'Specced' docs/system-diagram.html && grep -q 'Planned' docs/system-diagram.html && echo "PASS: phase badges" || echo "FAIL: phase badges"

# 11. Mermaid source file exists
[ -f docs/diagrams/system-architecture.mermaid ] && echo "PASS: mermaid source exists" || echo "FAIL: mermaid source missing"
grep -q 'flowchart\|graph' docs/diagrams/system-architecture.mermaid && echo "PASS: valid mermaid syntax" || echo "FAIL: no mermaid graph declaration"

# 12. Diagram page links to Mermaid source
grep -q 'system-architecture.mermaid' docs/system-diagram.html && echo "PASS: mermaid source link present" || echo "FAIL: no mermaid source link"
grep -q 'View Mermaid source' docs/system-diagram.html && echo "PASS: source link text" || echo "FAIL: missing source link text"
```

## Commit

```bash
cd ~/Workspaces/Core/frameworks/intent-site
git add docs/system-diagram.html docs/diagrams/system-architecture.mermaid
git add docs/work-system.html docs/flow-diagram.html docs/schemas.html docs/signals.html docs/dogfood.html docs/event-catalog.html
git commit -m "Add interactive system diagram page + Mermaid source

New Pillar 2 depth page with inline SVG architecture diagram showing:
- 5 capture surfaces (MCP, CLI, Slack, GitHub, AI Plugins) with tier badges
- Enrichment pipeline (Dedup → Context → Trust → Classify → Route)
- Autonomy routing (L0-L4 split to human review vs auto-promote)
- Spec creation + agent execution + contract verification
- OTel observe layer (Collector → Tempo/Mimir/Loki → Grafana)
- Loop closure arrow (observations → new signals)

Click any element for detail panel with tools, commands, and specs.
Includes standalone Mermaid source file for engineer access.
Updated Pillar 2 sub-nav on all 6 existing pages.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```
