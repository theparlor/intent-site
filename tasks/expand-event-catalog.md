# Task: Expand event-catalog.html from stub to full Rich page

> Handoff spec for Claude Code terminal. Expands event-catalog.html from a 57-line stub to a full Rich page (8KB minimum) showing all 15 event types with detailed descriptions, field tables, category colors, and JSON examples.

## Context

The current event-catalog.html is a placeholder showing only abstract event categories. This task expands it into a comprehensive catalog showing all 15 actual event types emitted by the Intent system, organized by category (signal.*, intent.*, spec.*, contract.*, system.*) with structured field definitions, trigger conditions, and real examples from events.jsonl.

The page is in Pillar 2 ("The System") and belongs in the System event observability chain alongside dogfood.html and observability.html.

Read `site-ia.md` and `site-spec.md` before starting. Follow the CSS strategy (shared styles.css + page-specific `<style>` block). Follow the Pillar 2 page pattern from work-system.html.

## Page: `docs/event-catalog.html`

### EXPANSION: Preserve Existing Structure

The existing event-catalog.html already has:
- Correct nav structure (primary nav: "The System", sub-nav: "Events" active)
- Hero section with title "Event Catalog"
- Intro paragraph
- Partial event-types section with bullet list

**Do not replace these.** Expand the event-types section and add new sections below it.

### Nav Configuration (KEEP EXISTING)

**Primary nav:** "The System" active
**Sub-nav:** Overview · Flow · System Map · Schemas · Signals · Dogfood · Observe · Events (Events active)

The sub-nav already has the correct structure in the existing file. Do not modify the nav.

### Page Structure (AFTER EXPANSION)

```
┌─────────────────────────────────────────────┐
│ Primary Nav (The System active)             │
│ Sub-Nav (Events active)                     │
├─────────────────────────────────────────────┤
│ HERO (EXISTING)                             │
│ Kicker: SYSTEM EVENTS                       │
│ Title: Event Catalog                        │
│ Subtitle: Structured events for the Intent  │
│ system                                      │
├─────────────────────────────────────────────┤
│ OVERVIEW SECTION                            │
│ Intent emits 15 event types across 4        │
│ categories. Events are the audit trail.     │
├─────────────────────────────────────────────┤
│ SIGNAL.* EVENTS (Amber color #f59e0b)       │
│ Card 1: signal.created                      │
│ Card 2: signal.enriched                     │
│ Card 3: signal.clustered                    │
│ Card 4: signal.promoted                     │
│ Card 5: signal.dismissed                    │
├─────────────────────────────────────────────┤
│ INTENT.* EVENTS (Blue color #3b82f6)        │
│ Card 1: intent.proposed                     │
│ Card 2: intent.accepted                     │
├─────────────────────────────────────────────┤
│ SPEC.* EVENTS (Green color #10b981)         │
│ Card 1: spec.created                        │
│ Card 2: spec.approved                       │
├─────────────────────────────────────────────┤
│ CONTRACT.* EVENTS (Green color #10b981)     │
│ Card 1: contract.started                    │
│ Card 2: contract.assertion.passed           │
│ Card 3: contract.assertion.failed           │
│ Card 4: contract.completed                  │
├─────────────────────────────────────────────┤
│ SYSTEM.* EVENTS (Gray color #64748b)        │
│ Card 1: system.health                       │
│ Card 2: system.error                        │
├─────────────────────────────────────────────┤
│ Cross-links section                         │
├─────────────────────────────────────────────┤
│ Footer                                      │
└─────────────────────────────────────────────┘
```

### Update Hero Section

Modify the existing hero to add a kicker:

```html
<header class="page-header">
    <div class="container">
        <span class="kicker">SYSTEM EVENTS</span>
        <h1>Event Catalog</h1>
        <p class="subtitle">Structured events for the Intent system</p>
    </div>
</header>
```

### Overview Section

Expand the intro with summary about the 15 event types:

```html
<section class="event-catalog-overview">
    <p>
        Intent emits <strong>15 event types</strong> across four categories—signal.*, intent.*, spec.*, and contract.*—plus two system.* event types. These events form the complete audit trail of the notice→spec→execute→observe loop, enabling observability, reproducibility, and trust scoring.
    </p>
    <p>
        Each event is immutable, timestamped, and appended to events.jsonl. Events can be ingested by the OTel Collector for distributed tracing, or analyzed directly via log queries in Grafana Loki.
    </p>
</section>
```

### Event Card Pattern

Each event is displayed as a styled card with:
1. Event name (e.g., signal.created) in a monospace font
2. Category color accent (left border or background tint)
3. Trigger description: "When: ..."
4. Field table with: Field | Type | Description
5. JSON example from events.jsonl (code block with monospace font)

**Card HTML template:**

```html
<div class="event-card" data-category="signal">
    <div class="event-card-header">
        <h3 class="event-name">signal.created</h3>
        <span class="event-badge">Signal</span>
    </div>
    <div class="event-trigger">
        <strong>When:</strong> Signal captured from any tier (CLI, MCP, agent, Slack, email).
    </div>
    <table class="event-fields">
        <thead>
            <tr><th>Field</th><th>Type</th><th>Description</th></tr>
        </thead>
        <tbody>
            <tr><td>signal_id</td><td>string</td><td>Unique signal identifier (SIG-*)</td></tr>
            <tr><td>source</td><td>string</td><td>Origin: "cli" | "mcp" | "email" | "slack" | "agent"</td></tr>
            <tr><td>content</td><td>string</td><td>Raw signal text or observation</td></tr>
            <tr><td>confidence</td><td>number</td><td>0.0–1.0 initial confidence (before enrichment)</td></tr>
            <tr><td>timestamp</td><td>ISO 8601</td><td>Event emission timestamp</td></tr>
        </tbody>
    </table>
    <div class="event-example">
        <code>
{
  "event_type": "signal.created",
  "signal_id": "SIG-042",
  "source": "cli",
  "content": "API latency spiking in prod, p99 > 2s",
  "confidence": 0.75,
  "timestamp": "2026-03-30T14:23:45Z"
}
        </code>
    </div>
</div>
```

### CSS for Event Cards (add to `<style>` block)

```css
.event-catalog-overview {
    margin-bottom: 3rem;
}

.event-category {
    margin-bottom: 3rem;
}

.event-category h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.event-category-badge {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 0.5rem;
}

.event-category-badge.signal { background-color: #f59e0b; }
.event-category-badge.intent { background-color: #3b82f6; }
.event-category-badge.spec { background-color: #10b981; }
.event-category-badge.contract { background-color: #10b981; }
.event-category-badge.system { background-color: #64748b; }

.event-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.event-card {
    border: 1px solid #334155;
    border-left: 4px solid #64748b;
    background: #0f172a;
    border-radius: 6px;
    padding: 1.5rem;
    transition: border-left-color 0.2s ease;
}

.event-card[data-category="signal"] {
    border-left-color: #f59e0b;
}

.event-card[data-category="intent"] {
    border-left-color: #3b82f6;
}

.event-card[data-category="spec"],
.event-card[data-category="contract"] {
    border-left-color: #10b981;
}

.event-card[data-category="system"] {
    border-left-color: #64748b;
}

.event-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.event-name {
    font-family: 'Monaco', 'Menlo', monospace;
    font-size: 1.125rem;
    font-weight: 600;
    color: #f1f5f9;
    margin: 0;
}

.event-badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.event-card[data-category="signal"] .event-badge {
    background: #f59e0b1a;
    color: #f59e0b;
}

.event-card[data-category="intent"] .event-badge {
    background: #3b82f61a;
    color: #3b82f6;
}

.event-card[data-category="spec"] .event-badge,
.event-card[data-category="contract"] .event-badge {
    background: #10b9811a;
    color: #10b981;
}

.event-card[data-category="system"] .event-badge {
    background: #64748b1a;
    color: #64748b;
}

.event-trigger {
    background: #1e293b;
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
    font-size: 0.95rem;
    line-height: 1.5;
}

.event-trigger strong {
    color: #f1f5f9;
}

.event-fields {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1rem;
    font-size: 0.9rem;
}

.event-fields th,
.event-fields td {
    text-align: left;
    padding: 0.75rem;
    border-bottom: 1px solid #334155;
}

.event-fields th {
    background: #1e293b;
    font-weight: 600;
    color: #cbd5e1;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
}

.event-fields td {
    color: #cbd5e1;
}

.event-fields td:first-child {
    font-family: 'Monaco', 'Menlo', monospace;
    font-size: 0.85rem;
    color: #f1f5f9;
}

.event-example {
    background: #1e293b;
    border-radius: 4px;
    overflow: auto;
    padding: 1rem;
}

.event-example code {
    font-family: 'Monaco', 'Menlo', monospace;
    font-size: 0.8rem;
    line-height: 1.5;
    color: #cbd5e1;
}

.event-crosslinks {
    background: #0f172a;
    border: 1px solid #334155;
    border-radius: 6px;
    padding: 1.5rem;
    margin-top: 3rem;
}

.event-crosslinks h3 {
    font-size: 1rem;
    margin-top: 0;
    margin-bottom: 1rem;
}

.event-crosslinks ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.event-crosslinks li {
    margin-bottom: 0.75rem;
}

.event-crosslinks a {
    color: #3b82f6;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-bottom-color 0.2s ease;
}

.event-crosslinks a:hover {
    border-bottom-color: #3b82f6;
}
```

## 15 Event Types (Full Definitions)

### signal.* (Amber #f59e0b)

**1. signal.created**
- When: Signal captured from any tier (CLI, MCP, agent, Slack, email)
- Fields: signal_id, source, content, confidence, timestamp
- Example: Signal detected from CLI with raw observation text

**2. signal.enriched**
- When: Dedup/context/trust pipeline completes
- Fields: signal_id, trust_score, tags (array), references (array), timestamp
- Example: After enrichment pipeline adds context tags and trust scoring

**3. signal.clustered**
- When: Signal assigned to a cluster (semantic grouping)
- Fields: signal_id, cluster_id, cluster_name, similarity_score, timestamp
- Example: Signal grouped with 3 other similar signals into a cluster

**4. signal.promoted**
- When: Signal cluster becomes an intent (human or auto approval)
- Fields: signal_id, cluster_id, intent_id, trace_id, reason, timestamp
- Example: Cluster of 4 signals promoted to intent INT-015

**5. signal.dismissed**
- When: Signal marked irrelevant (duplicate, noise, out of scope)
- Fields: signal_id, reason, dismissed_by, dismissed_at, timestamp
- Example: Signal dismissed because already captured in another signal

### intent.* (Blue #3b82f6)

**6. intent.proposed**
- When: Cluster promoted to intent (ready for spec)
- Fields: intent_id, trace_id, signals (array of signal_ids), title, timestamp
- Example: New intent INT-015 proposed from 4-signal cluster

**7. intent.accepted**
- When: Human or auto-approval accepts intent (moves to spec phase)
- Fields: intent_id, accepted_by (user or "auto"), confidence, timestamp
- Example: Intent accepted by user @brien with 0.92 confidence

### spec.* (Green #10b981)

**8. spec.created**
- When: Spec authored (human writes or agent proposes)
- Fields: spec_id, intent_id, trace_id, title, contracts (array), author, timestamp
- Example: Spec SPEC-042 created with 3 contracts

**9. spec.approved**
- When: Spec passes readiness check (all contracts defined, fields complete)
- Fields: spec_id, completeness_score, checks_passed (array), approved_by, timestamp
- Example: Spec approved with 100% completeness

### contract.* (Green #10b981)

**10. contract.started**
- When: Agent begins execution of a contract
- Fields: contract_id, spec_id, trace_id, agent, started_at, timestamp
- Example: Contract CON-042 execution started by Claude Code agent

**11. contract.assertion.passed**
- When: Verification command returns 0 (assertion succeeds)
- Fields: contract_id, assertion_id, assertion_name, evidence (output), timestamp
- Example: Assertion "file exists" passed with evidence

**12. contract.assertion.failed**
- When: Verification fails (non-zero exit or exception)
- Fields: contract_id, assertion_id, assertion_name, error (message/stack), timestamp
- Example: Assertion "lint passes" failed with linter errors

**13. contract.completed**
- When: All assertions pass (contract execution complete)
- Fields: contract_id, spec_id, duration (seconds), assertions_passed, assertions_failed, timestamp
- Example: Contract completed in 42.3 seconds with 5 assertions passed, 0 failed

### system.* (Gray #64748b)

**14. system.health**
- When: Periodic heartbeat (every 60s by default)
- Fields: timestamp, servers_active (count), event_count, uptime, memory_usage
- Example: Health check showing 3 servers active, 1247 events processed

**15. system.error**
- When: Error condition detected (agent crash, network failure, validation error)
- Fields: error_type, error_code, message, stack (optional), context, timestamp
- Example: Error "MCP connection timeout" with stack trace

## JSON Examples (from events.jsonl)

For each event card, include a realistic JSON example. These should be brief (5-8 lines) and show the essential fields. Examples below serve as templates:

```json
{
  "event_type": "signal.created",
  "signal_id": "SIG-042",
  "source": "cli",
  "content": "API latency p99 > 2s in production",
  "confidence": 0.75,
  "timestamp": "2026-03-30T14:23:45Z"
}
```

```json
{
  "event_type": "signal.enriched",
  "signal_id": "SIG-042",
  "trust_score": 0.92,
  "tags": ["performance", "prod", "p99"],
  "references": ["SIG-039", "SIG-041"],
  "timestamp": "2026-03-30T14:24:12Z"
}
```

```json
{
  "event_type": "signal.clustered",
  "signal_id": "SIG-042",
  "cluster_id": "CL-012",
  "cluster_name": "API Latency Spike",
  "similarity_score": 0.87,
  "timestamp": "2026-03-30T14:25:00Z"
}
```

```json
{
  "event_type": "intent.proposed",
  "intent_id": "INT-015",
  "trace_id": "TRACE-015",
  "signals": ["SIG-039", "SIG-041", "SIG-042", "SIG-044"],
  "title": "Investigate API latency spike in prod",
  "timestamp": "2026-03-30T14:26:30Z"
}
```

```json
{
  "event_type": "spec.created",
  "spec_id": "SPEC-042",
  "intent_id": "INT-015",
  "trace_id": "TRACE-015",
  "title": "Profile API and identify bottleneck",
  "contracts": ["CON-091", "CON-092", "CON-093"],
  "author": "claude-code",
  "timestamp": "2026-03-30T14:45:00Z"
}
```

```json
{
  "event_type": "contract.started",
  "contract_id": "CON-091",
  "spec_id": "SPEC-042",
  "trace_id": "TRACE-015",
  "agent": "claude-code",
  "started_at": "2026-03-30T14:45:30Z",
  "timestamp": "2026-03-30T14:45:30Z"
}
```

```json
{
  "event_type": "contract.assertion.passed",
  "contract_id": "CON-091",
  "assertion_id": "assert-1",
  "assertion_name": "api_profile_generated",
  "evidence": "profile.json (2.4KB)",
  "timestamp": "2026-03-30T15:02:15Z"
}
```

```json
{
  "event_type": "contract.completed",
  "contract_id": "CON-091",
  "spec_id": "SPEC-042",
  "duration": 18.45,
  "assertions_passed": 3,
  "assertions_failed": 0,
  "timestamp": "2026-03-30T15:02:30Z"
}
```

```json
{
  "event_type": "system.health",
  "timestamp": "2026-03-30T15:05:00Z",
  "servers_active": 3,
  "event_count": 1847,
  "uptime_seconds": 864000,
  "memory_usage_percent": 34.2
}
```

```json
{
  "event_type": "system.error",
  "error_type": "MCP_CONNECTION_TIMEOUT",
  "error_code": "ERR_MCP_001",
  "message": "notice MCP server did not respond within 30s",
  "context": {"server": "notice", "endpoint": "signal.ingest"},
  "timestamp": "2026-03-30T15:10:45Z"
}
```

## Cross-Links Section

Add a "Related Pages" section before the footer:

```html
<section class="event-crosslinks">
    <h3>Learn More</h3>
    <ul>
        <li><strong>See live events:</strong> <a href="dogfood.html">Observe page</a> — Real-time event stream from Intent itself</li>
        <li><strong>See the OTel ingestion stack:</strong> <a href="observability.html">Observability page</a> — How these events are collected, stored, and visualized</li>
        <li><strong>See the data model:</strong> <a href="schemas.html">Schemas page</a> — Field definitions, types, and constraints for all event types</li>
        <li><strong>Understand the loop:</strong> <a href="flow.html">Flow diagram</a> — How events connect through notice→spec→execute→observe</li>
    </ul>
</section>
```

## Page Size Target

**Minimum 8KB** (expanding from current 2KB stub). With event cards (15 × 500–700 bytes), tables, and examples, this should reach 10–12KB comfortably.

## Verification

```bash
cd ~/Workspaces/Core/frameworks/intent-site

# 1. File exists and meets size target
[ -f docs/event-catalog.html ] && echo "PASS: file exists" || echo "FAIL: file missing"
FILE_SIZE=$(wc -c < docs/event-catalog.html)
[ "$FILE_SIZE" -gt 8000 ] && echo "PASS: size ${FILE_SIZE} > 8KB" || echo "FAIL: size ${FILE_SIZE} < 8KB"

# 2. All 15 event types present
for event in "signal.created" "signal.enriched" "signal.clustered" "signal.promoted" "signal.dismissed" \
             "intent.proposed" "intent.accepted" \
             "spec.created" "spec.approved" \
             "contract.started" "contract.assertion.passed" "contract.assertion.failed" "contract.completed" \
             "system.health" "system.error"; do
  grep -q "$event" docs/event-catalog.html && echo "PASS: $event present" || echo "FAIL: $event missing"
done

# 3. Four category sections present
grep -q 'signal\.\*' docs/event-catalog.html && echo "PASS: signal.* section" || echo "FAIL: signal.* missing"
grep -q 'intent\.\*' docs/event-catalog.html && echo "PASS: intent.* section" || echo "FAIL: intent.* missing"
grep -q 'spec\.\*' docs/event-catalog.html && echo "PASS: spec.* section" || echo "FAIL: spec.* missing"
grep -q 'contract\.\*' docs/event-catalog.html && echo "PASS: contract.* section" || echo "FAIL: contract.* missing"

# 4. JSON examples present
grep -q '"event_type"' docs/event-catalog.html && echo "PASS: JSON examples" || echo "FAIL: no JSON examples"

# 5. Field tables present
grep -q '<table class="event-fields">' docs/event-catalog.html && echo "PASS: field tables" || echo "FAIL: no tables"
TABLE_COUNT=$(grep -c '<table class="event-fields">' docs/event-catalog.html)
[ "$TABLE_COUNT" -ge 15 ] && echo "PASS: 15+ field tables" || echo "FAIL: only $TABLE_COUNT tables"

# 6. Nav structure preserved
grep -q 'class="active">The System' docs/event-catalog.html && echo "PASS: primary nav correct" || echo "FAIL: primary nav"
grep -q 'event-catalog.html" class="active"' docs/event-catalog.html && echo "PASS: sub-nav active state" || echo "FAIL: sub-nav active"

# 7. Cross-links present
grep -q 'observability.html' docs/event-catalog.html && echo "PASS: observability link" || echo "FAIL: no observability link"
grep -q 'dogfood.html' docs/event-catalog.html && echo "PASS: dogfood link" || echo "FAIL: no dogfood link"
grep -q 'schemas.html' docs/event-catalog.html && echo "PASS: schemas link" || echo "FAIL: no schemas link"

# 8. Category colors applied
grep -q 'data-category="signal"' docs/event-catalog.html && echo "PASS: category attributes" || echo "FAIL: no category attributes"

# 9. Kicker present
grep -q '<span class="kicker">SYSTEM EVENTS</span>' docs/event-catalog.html && echo "PASS: kicker" || echo "FAIL: no kicker"
```

## Commit

```bash
cd ~/Workspaces/Core/frameworks/intent-site

git add docs/event-catalog.html
git commit -m "expand: event-catalog.html — all 15 event types with fields and examples

This expansion grows event-catalog.html from a 57-line stub to a full Rich page
(8KB+) showing all 15 Intent system event types:
  - 5 signal.* events (amber): created, enriched, clustered, promoted, dismissed
  - 2 intent.* events (blue): proposed, accepted
  - 2 spec.* events (green): created, approved
  - 4 contract.* events (green): started, assertion.passed/failed, completed
  - 2 system.* events (gray): health, error

Each event card includes:
  - Trigger description (when the event is emitted)
  - Field table (name, type, description)
  - JSON example from events.jsonl
  - Category color accent (left border)

Adds cross-links to observability.html, dogfood.html, and schemas.html.

Preserves existing nav structure (Pillar 2: The System → Events).

Size: 57 lines → ~350 lines, 2KB → 11KB."
```

## Notes

1. **Preserve nav:** The existing event-catalog.html has correct nav structure. Do not replace it; only expand sections below the intro.

2. **Category colors:**
   - signal.* = Amber #f59e0b (Practitioner-Architect △)
   - intent.* = Blue #3b82f6 (Product-Minded Leader ◇)
   - spec.* & contract.* = Green #10b981 (AI Agent ◉)
   - system.* = Gray #64748b (neutral infrastructure)

3. **Event card grid:** Use CSS grid with `minmax(500px, 1fr)` to create responsive 2-column layout on desktop, 1-column on mobile.

4. **JSON examples:** Keep to 5–8 lines. Focus on essential fields (event_type + 3–4 key fields + timestamp). Use realistic values from the Intent audit log.

5. **Cross-links:** Link to:
   - dogfood.html ("See live events")
   - observability.html ("See OTel ingestion stack")
   - schemas.html ("See field definitions")
   - flow.html ("Understand the loop")

6. **Field tables:** Use the pattern from architecture.html schema tables. Dark background, monospace for field names, 3 columns (Field | Type | Description).
