---
title: Roadmap
type: framework
maturity: final
confidentiality: shareable
reusability: universal
domains:
  - consulting-operations
topics:
  - product-strategy
created: 2026-03-31
depth_score: 4
depth_signals:
  file_size_kb: 15.4
  content_chars: 14952
  entity_count: 0
  slide_count: 0
  sheet_count: 0
  topic_count: 2
  has_summary: 0
vocab_density: 0.27
related_entities:
  - {pair: consulting-operations ↔ subaru, count: 836, strength: 0.43}
  - {pair: consulting-operations ↔ automotive-manufacturing, count: 791, strength: 0.409}
  - {pair: consulting-operations ↔ engagement-management, count: 507, strength: 0.262}
  - {pair: consulting-operations ↔ turnberry, count: 472, strength: 0.226}
  - {pair: consulting-operations ↔ foot-locker, count: 256, strength: 0.133}
---
# Site Tasks Roadmap — Execution Plan for Terminal Claude

> Master execution plan for all intent-site task specs. Terminal Claude reads this FIRST before picking up work.
>
> **Last updated:** 2026-03-30 by Cowork (ARB review cycle)

## Current State

The ARB review identified 7 gaps. Terminal has executed ALL of them. The site is now 23 pages across 3 pillars, up from 18. All 10 contracts pass. Mermaid source files exist for all diagram pages.

### Phase 1: ARB Review — COMPLETE

| Task | File | Status | Verification |
|------|------|--------|--------------:|
| Walkthrough page | walkthrough-page.md | DONE | 35KB, P1 sub-nav, Mermaid source |
| Observe narrative page | observe-page.md | DONE | 26KB, P2 sub-nav, Mermaid source |
| Getting Started page | getting-started-page.md | DONE | 24KB, P2 sub-nav |
| Event Catalog expansion | expand-event-catalog.md | DONE | 36KB (was 2KB), 15 event types |
| Decisions expansion | expand-decisions.md | DONE | 26KB (was 4KB), 6 ADRs |
| Work System onramp | work-system-onramp.md | DONE | 54KB (was 48KB), collapsible intro |
| Cross-link expansion | cross-link-expansion.md | DONE | 15 cross-links wired |

### Phase 0: Observability Infrastructure — COMPLETE

| Task | File | Status | Verification |
|------|------|--------|--------------:|
| System diagram page | system-diagram-page.md | DONE | 38KB, interactive SVG |
| Observability page | observability-page.md | DONE | 25KB, Mermaid diagram |
| Fix routing connections | fix-routing-connections.md | DONE | Human→Cluster, Auto→Cluster |
| Roadmap observe update | roadmap-observe-update.md | DONE | Milestones added |
| Flow diagram rebuild | rebuild-flow-diagram.md | DONE | 20KB (was 1.5KB skeleton) |
| Index redirect | convert-index-to-redirect.md | DONE | 192B redirect |

---

## Phase 2: Hardening & Verification — COMPLETE

These tasks verify that everything built in Phase 0-1 is production-quality. Terminal should execute these IN ORDER.

### 2.1 — Full Contract Suite Run

Run ALL 10 contracts against the complete 23-page site. Fix any failures.

```bash
cd ~/Workspaces/Core/frameworks/intent-site

# Run the full contract suite from site-contracts.md
# Every CON-SITE-001 through CON-SITE-010 must pass
# If ANY fails, fix it before proceeding

# Quick size audit of all pages
for f in docs/*.html; do
  SIZE=$(wc -c < "$f")
  printf "%6d  %s\n" "$SIZE" "$f"
done | sort -rn
```

**Contract:** All 10 contracts pass. No regressions.

### 2.2 — Mermaid Source Completeness

Verify every diagram page links to its Mermaid source, and every Mermaid file is valid.

```bash
cd ~/Workspaces/Core/frameworks/intent-site

# Check diagram pages link to their Mermaid source
for pair in "system-diagram.html:system-architecture.mermaid" "observability.html:observability-stack.mermaid" "observe.html:loop-closure.mermaid" "walkthrough.html:walkthrough-trace.mermaid"; do
  page="${pair%%:*}"
  mermaid="${pair##*:}"
  grep -q "$mermaid" "docs/$page" && echo "PASS: $page → $mermaid" || echo "FAIL: $page missing link to $mermaid"
  [ -f "docs/diagrams/$mermaid" ] && echo "PASS: $mermaid exists" || echo "FAIL: $mermaid missing"
done

# Validate Mermaid files have graph/flowchart declaration
for f in docs/diagrams/*.mermaid; do
  grep -q 'flowchart\|graph\|sequenceDiagram' "$f" && echo "PASS: $(basename $f) valid syntax" || echo "FAIL: $(basename $f) no graph declaration"
done
```

**Contract:** Every diagram page has a "View Mermaid source" link. Every Mermaid file exists and has valid syntax.

### 2.3 — Cross-link Integrity

Verify all 28 cross-links (13 original + 15 new) are present and point to existing pages.

```bash
cd ~/Workspaces/Core/frameworks/intent-site/docs

# Full cross-link audit from site-ia.md
FAIL=0

# Original 13 cross-links
check_link() { grep -q "href=\"$2\"" "$1" 2>/dev/null && echo "PASS: $1 → $2" || { echo "FAIL: $1 → $2 missing"; FAIL=1; }; }

# Pillar 1 → 2 cross-links
check_link methodology.html schemas.html
check_link methodology.html flow-diagram.html
check_link methodology.html signals.html
check_link methodology.html walkthrough.html
check_link concept-brief.html work-system.html
check_link roadmap.html arb.html
check_link roadmap.html observability.html
check_link pitch.html dogfood.html
check_link pitch.html walkthrough.html

# Pillar 2 → 3 cross-links
check_link signals.html architecture.html
check_link work-system.html agents.html
check_link work-system.html methodology.html
check_link work-system.html getting-started.html
check_link system-diagram.html architecture.html
check_link system-diagram.html observe.html

# Pillar 2 internal
check_link observe.html observability.html
check_link observe.html dogfood.html
check_link observe.html signals.html
check_link dogfood.html methodology.html
check_link schemas.html decisions.html

# Pillar 3 cross-links
check_link arb.html roadmap.html
check_link architecture.html work-system.html
check_link observability.html event-catalog.html
check_link observability.html architecture.html

# New page outbound links
check_link walkthrough.html work-system.html
check_link walkthrough.html schemas.html
check_link getting-started.html deployment.html
check_link getting-started.html native-repos.html

[ $FAIL -eq 0 ] && echo "ALL CROSS-LINKS PASS" || echo "SOME CROSS-LINKS MISSING"
```

**Contract:** All 28 cross-links present and pointing to existing files.

### 2.4 — Visual Component Spot Check

Verify the new pages have their required visual components (CON-SITE-008 extension).

```bash
cd ~/Workspaces/Core/frameworks/intent-site/docs

# Walkthrough: trace timeline
grep -q 'timeline' walkthrough.html && echo "PASS: walkthrough timeline" || echo "FAIL"
grep -q 'events.jsonl\|event-stream\|monospace\|code-block' walkthrough.html && echo "PASS: walkthrough events" || echo "FAIL"

# Observe: loop closure diagram + dashboard questions
grep -q 'loop-closure\|mermaid' observe.html && echo "PASS: observe loop diagram" || echo "FAIL"
grep -q 'cycle time\|trust.*distribution\|pass.*fail' observe.html && echo "PASS: observe dashboard questions" || echo "FAIL"

# Getting Started: step cards
grep -q 'step\|Step 1\|install\|capture' getting-started.html && echo "PASS: getting-started steps" || echo "FAIL"

# Event Catalog: all 15 event types
for evt in signal.created signal.enriched signal.clustered signal.promoted signal.dismissed intent.proposed intent.accepted spec.created spec.approved contract.started contract.assertion.passed contract.assertion.failed contract.completed system.health system.error; do
  grep -q "$evt" event-catalog.html && echo "PASS: $evt" || echo "FAIL: $evt missing"
done

# Decisions: 6 ADRs
for d in "Markdown for" "Git as" "Claude API" "SQL over\|SQLite" "Static site" "Deferred"; do
  grep -q "$d" decisions.html && echo "PASS: ADR $d" || echo "FAIL: ADR $d missing"
done
```

**Contract:** All visual components present per site-spec.md inventory.

---

## Phase 3: Product Repo Verification — COMPLETE

These verify the observability infrastructure in the product repo (theparlor/intent).

### 3.1 — Trace Propagation Verification

```bash
cd ~/Workspaces/Core/frameworks/intent

# models.py has TraceContext
grep -q 'class TraceContext' servers/models.py && echo "PASS" || echo "FAIL"
grep -q 'trace_id' servers/models.py && echo "PASS" || echo "FAIL"

# All three servers import and use trace context
for server in notice.py spec.py observe.py; do
  grep -c 'trace' "servers/$server"
  echo "$server trace references"
done
```

### 3.2 — File Tail Adapter Verification

```bash
cd ~/Workspaces/Core/frameworks/intent

# Adapter exists and is valid Python
python3 -c "import ast; ast.parse(open('observe/adapters/file-tail.py').read())" && echo "PASS: valid Python" || echo "FAIL"

# Requirements file exists
[ -f observe/adapters/requirements.txt ] && echo "PASS" || echo "FAIL"
grep -q 'opentelemetry' observe/adapters/requirements.txt && echo "PASS: OTel SDK in requirements" || echo "FAIL"

# OTel collector config is valid YAML
python3 -c "import yaml; yaml.safe_load(open('observe/otel-collector-config.yaml'))" && echo "PASS: valid YAML" || echo "FAIL"
```

### 3.3 — Grafana Dashboard Verification

```bash
cd ~/Workspaces/Core/frameworks/intent

# Dashboard JSON exists and is valid
python3 -c "import json; json.load(open('observe/grafana/dashboards/intent-observe.json'))" && echo "PASS: valid JSON" || echo "FAIL"

# Dashboard has expected panels
for panel in "Signals" "Intents" "Cycle Time" "Trust"; do
  grep -qi "$panel" observe/grafana/dashboards/intent-observe.json && echo "PASS: $panel panel" || echo "FAIL: $panel missing"
done
```

---

## Phase 4: Operational Readiness (FUTURE)

These tasks move from "specced" to "running." Not yet specced as task files.

| Task | Dependency | Description |
|------|-----------|-------------|
| Grafana Cloud setup | 3.2, 3.3 | Sign up for free tier, configure collector exporters |
| File tail adapter E2E test | 3.1, 3.2 | Run adapter against real events.jsonl, verify spans appear |
| Dashboard import | Grafana Cloud | Import intent-observe.json, verify panels render |
| Signal sync pipeline | Site repo | Automate signal card updates from product repo |
| GitHub Action: freshness check | Product repo | Deploy freshness-action.yml for signal drift detection |

---

## Phase 5: v1.0 Site Sync — COMPLETE

Framework v1.0 (April 5-6) introduced 8 architectural changes. This phase syncs all 8 to the site.

| Task | Pages affected | Status | Verification |
|------|---------------|--------|--------------|
| Three-layer architecture | architecture, pitch, methodology, roadmap | DONE | Layer diagram, 6 data flows, stat box |
| Knowledge Engine separation | pitch, architecture, getting-started, methodology | DONE | KE as Layer 1, standalone adoption path |
| Fourth MCP server (intent-knowledge) | architecture, agents, deployment, schemas, getting-started, dogfood | DONE | Server card, agent cards, deployment config, CLI |
| Spec-shaping protocol | agents, methodology | DONE | Four-persona cards, protocol reference |
| Federated knowledge base | architecture, schemas | DONE | Federation model, cross-scope notation |
| Engagement rollout order | roadmap | DONE | Subaru → F&G → ASA → Cargill → Footlocker |
| Redaction at tool level | architecture | DONE | Note in intent-knowledge server card |
| Decisions D7-D12 | decisions, dogfood | DONE | 6 new ADR cards, stats updated |
| Content-map traceability | content-map.md | DONE | 51 new entries |
| Site-spec baselines | site-spec.md | DONE | Updated file sizes and component inventory |
| CHANGELOG | CHANGELOG.md | DONE | Created with full v1.0.0 entry |
| Contract verification | all pages | DONE | All 10 contracts pass |

---

## Phase 6: Persona System Integration — COMPLETE

The Unified Persona System (178+ thought leaders, 7 archetypes) gets its own site page under Pillar 2.

| Task | Pages affected | Status | Verification |
|------|---------------|--------|--------------|
| Create personas.html | new page | DONE | 79KB, 178 cards, archetype cards, voice catalog, filters |
| Update P2 sub-nav | 9 existing P2 pages | DONE | All pages have "Voices" link after "Signals" |
| Update site-ia.md | governance | DONE | P2 table, sub-nav template, cross-links |
| Update CLAUDE.md | governance | DONE | P2 page list, sub-nav label order |
| Wire cross-links | agents, arb, methodology, personas | DONE | 6 cross-links wired |
| Update site-spec.md | governance | DONE | personas.html added to inventory |
| Update content-map.md | governance | DONE | 8 persona claim mappings added |
| Contract verification | all pages | DONE | All P2 pages have Voices link |

**Task spec:** `tasks/personas-page.md`

---

## Phase 7: Products Built with Intent — COMPLETE

Product taxonomy formalized and integrated into work-system.html as a 6th tab.

| Task | Pages affected | Status | Verification |
|------|---------------|--------|--------------|
| Create products-taxonomy.yaml | new file | DONE | Full portfolio: 5 product lines, 16 products, 16 flows, 1 GTM product |
| Add Products tab to work-system.html | work-system.html | DONE | 80KB (was 55KB), ProductsTab component with taxonomy + SVG flow + cards |
| Design spec | tasks/ | DONE | Spec + rendered HTML version |
| Log signals | intent .intent/signals/ | DONE | 3 signals: taxonomy builder, Knowledge Farm GTM, spec-viewer skill |

**Related deliverables (outside intent-site):**
- Persona browser generator: `Core/personas/browser/generate.py` → 178 detail pages + index
- 178 taglines added to all persona registry entries
- SIG-004 logged for tagline schema addition

---

## Phase 8: Product Evolution Sync — COMPLETE

Sync all product .intent/ state changes into the site. Products have evolved significantly since Phase 7.

| Task | Pages affected | Status | Verification |
|------|---------------|--------|--------------|
| Add Studio Control + Library Index MCP to taxonomy | products-taxonomy.yaml | DONE | 2 new products, 1 new flow added |
| Update products.html data | products.html | DONE | All 8 products with current signal/decision counts |
| Update dogfood.html stats | dogfood.html | DONE | 43 signals (was 24), 19 specs (was 14), 19 decisions (was 12) |
| Add decisions D13-D19 | decisions.html | DONE | 7 new ADR cards (GTM, four-product, three-layer, compilation, double-loop, origin tracking, federation) |
| Update decisions heading | decisions.html | DONE | D1-D19 (was D1-D12) |
| Update signal counts | signals.html | DONE | 43 signals (was 24) |
| Add Products to P3 sub-nav | 8 P3 pages | DONE | All P3 pages now link to products.html |
| Update work-system Products tab | work-system.html | DONE | Fieldbook→execute, Library Index→observe, +Library Index MCP, +Studio Control |
| Update Fieldbook status | work-system.html, products.html | DONE | spec→execute (Tier 2 active, 13 signals, 12 decisions) |

**Key deltas synced:**
- Fieldbook: evolved from spec to execute (Tier 2, 8 contracts validated, 13 signals, 12 decisions)
- Org-Design-Tooling: 27+ signals, 2 decisions (was 7/1)
- Library Index: 7 signals, 8 decisions, OTel wired (was 0/1)
- Library Index MCP: new product (19 MCP tools, 6 signals)
- Studio Control: new product (Wave Link API, 7 signals, noticed phase)
- Intent framework: 43 signals (was 24), 19 decisions (was 12), 19 spec documents (was 14)

---

## Execution Protocol

Terminal Claude should follow this protocol when picking up this roadmap:

1. **Read** CLAUDE.md + this ROADMAP.md
2. **Check** which phase is current (look at the status column)
3. **Execute** the next incomplete phase IN ORDER
4. **Run verification** for each task before marking complete
5. **Update** this file: change status from blank to DONE, add verification date
6. **Commit** with message referencing the phase and task

**Do NOT skip phases. Do NOT parallelize across phases.** Tasks within a phase CAN be parallelized if they have no dependencies.
