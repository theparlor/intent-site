# Task: Update roadmap.html with Observe product milestones

> Handoff spec for Claude Code terminal. Updates the roadmap page to reflect the Observe product's progression from "Schema-Ready" to "Infrastructure Specced" and adds the observability stack to the investment grid.

## Context

The product repo's CLAUDE.md describes Intent as "four products, not one." The Observe product was listed as "Schema-Ready" — 15 event types defined, no visualization yet. With the observability stack spec now complete (`spec/observability-stack.md`), the Observe product has advanced. The roadmap page needs to reflect this.

Read the current roadmap.html structure before modifying. Follow the existing card pattern.

## Changes Required

### 1. Update Observe Product Card

Find the Observe product card (purple border, should have phase info). Update:

**Old status:** Schema-Ready
**New status:** Infrastructure Specced

**Add milestones:**
- ✅ 15 event types defined (event-catalog.md)
- ✅ OTel-compatible event schema (trace_id, span_id, parent_id)
- ✅ Observability stack architecture specced (Grafana + Tempo + Mimir + Loki)
- ✅ File Tail Adapter designed (events.jsonl → OTLP)
- ✅ Trace identity model defined (Intent = Trace, Spec = Span)
- ✅ Metrics model designed (counters, gauges, histograms)
- ✅ Grafana Observe dashboard specified
- 🔲 OTel Collector deployed (Phase 1)
- 🔲 File Tail Adapter operational
- 🔲 Grafana dashboard live with real data
- 🔲 Agent instrumentation (contract execution spans)

### 2. Add Observability to Investment Grid

If there's a CLI/tooling grid or investment sizing section, add:

| Investment | Product | Priority | Status |
|-----------|---------|----------|--------|
| OTel Collector + Adapter | Observe | Now | Specced |
| Grafana Dashboard | Observe | Now | Specced |
| Trace propagation (models.py) | Observe | Now | Specced |
| Agent instrumentation | Execute × Observe | Next | Designed |
| GitHub webhook receiver | Observe | Next | Designed |
| Self-hosted stack (Docker) | Observe | Later | Designed |

### 3. Update the Loop Diagram Annotation

If the loop diagram at the top of the page has annotations per phase, update Observe from:
- "Dashboard and learning layer. 15 event types defined, no visualization yet."

To:
- "OTel-native observability. Stack specced: Grafana Tempo + Mimir + Loki. Trace identity model links signals through to contracts."

### 4. Cross-link to New Observability Page

Add a contextual link from the Observe section to `observability.html`:
```html
<a href="observability.html">See the observability architecture →</a>
```

## Verification

```bash
cd ~/Workspaces/Core/frameworks/intent-site

# 1. Observe status updated
grep -q 'Infrastructure Specced\|infrastructure specced\|Infrastructure specced' docs/roadmap.html && echo "PASS: observe status updated" || echo "FAIL: observe status not updated"

# 2. New milestones present
grep -q 'Grafana\|grafana' docs/roadmap.html && echo "PASS: Grafana milestone present" || echo "FAIL: no Grafana mention"
grep -q 'OTel\|otel\|OpenTelemetry' docs/roadmap.html && echo "PASS: OTel mention present" || echo "FAIL: no OTel mention"

# 3. Cross-link to observability page
grep -q 'observability.html' docs/roadmap.html && echo "PASS: cross-link present" || echo "FAIL: no observability cross-link"

# 4. File size hasn't shrunk (should only grow)
FILE_SIZE=$(wc -c < docs/roadmap.html)
[ "$FILE_SIZE" -gt 15000 ] && echo "PASS: size ${FILE_SIZE} > 15KB baseline" || echo "FAIL: size ${FILE_SIZE} < 15KB baseline"
```

## Commit

```bash
cd ~/Workspaces/Core/frameworks/intent-site
git add docs/roadmap.html
git commit -m "Update roadmap with Observe product milestones

Observe product advances from Schema-Ready to Infrastructure Specced.
Added: OTel stack, trace identity model, Grafana dashboard, metrics
model, file tail adapter milestones. Cross-link to new observability page.

Ref: spec/observability-stack.md, spec/event-catalog.md

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```
