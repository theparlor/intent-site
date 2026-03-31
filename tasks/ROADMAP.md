# Site Tasks Roadmap — Execution Plan for Terminal Claude

> Master execution plan for all intent-site task specs. Terminal Claude reads this FIRST before picking up work.
>
> **Last updated:** 2026-03-30 by Cowork (ARB review cycle)

## Current State

The ARB review identified 7 gaps. Terminal has executed ALL of them. The site is now 23 pages across 3 pillars, up from 18. All 10 contracts pass. Mermaid source files exist for all diagram pages.

### Phase 1: ARB Review — COMPLETE

| Task | File | Status | Verification |
|------|------|--------|--------------|
| Walkthrough page | walkthrough-page.md | DONE | 35KB, P1 sub-nav, Mermaid source |
| Observe narrative page | observe-page.md | DONE | 26KB, P2 sub-nav, Mermaid source |
| Getting Started page | getting-started-page.md | DONE | 24KB, P2 sub-nav |
| Event Catalog expansion | expand-event-catalog.md | DONE | 36KB (was 2KB), 15 event types |
| Decisions expansion | expand-decisions.md | DONE | 26KB (was 4KB), 6 ADRs |
| Work System onramp | work-system-onramp.md | DONE | 54KB (was 48KB), collapsible intro |
| Cross-link expansion | cross-link-expansion.md | DONE | 15 cross-links wired |

### Phase 0: Observability Infrastructure — COMPLETE

| Task | File | Status | Verification |
|------|------|--------|--------------|
| System diagram page | system-diagram-page.md | DONE | 38KB, interactive SVG |
| Observability page | observability-page.md | DONE | 25KB, Mermaid diagram |
| Fix routing connections | fix-routing-connections.md | DONE | Human→Cluster, Auto→Cluster |
| Roadmap observe update | roadmap-observe-update.md | DONE | Milestones added |
| Flow diagram rebuild | rebuild-flow-diagram.md | DONE | 20KB (was 1.5KB skeleton) |
| Index redirect | convert-index-to-redirect.md | DONE | 192B redirect |

---

## Phase 2: Hardening & Verification (NEXT)

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

## Phase 3: Product Repo Verification (AFTER SITE)

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

## Execution Protocol

Terminal Claude should follow this protocol when picking up this roadmap:

1. **Read** CLAUDE.md + this ROADMAP.md
2. **Check** which phase is current (look at the status column)
3. **Execute** the next incomplete phase IN ORDER
4. **Run verification** for each task before marking complete
5. **Update** this file: change status from blank to DONE, add verification date
6. **Commit** with message referencing the phase and task

**Do NOT skip phases. Do NOT parallelize across phases.** Tasks within a phase CAN be parallelized if they have no dependencies.
