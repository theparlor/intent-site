---
title: Expand Decisions
type: framework
maturity: final
confidentiality: shareable
reusability: universal
domains:
  - consulting-operations
created: 2026-03-31
depth_score: 4
depth_signals:
  file_size_kb: 36.7
  content_chars: 19668
  entity_count: 0
  slide_count: 0
  sheet_count: 0
  topic_count: 1
  has_summary: 0
vocab_density: 0.15
---
# Task: Expand decisions.html with 6 full Architecture Decision Records (ADRs)

> Handoff spec for Claude Code terminal. Expands the decisions.html page from a 90-line stub (structure + explanation) to a full Rich page (~10KB) containing 6 complete ADR entries for the Intent architecture.

## Context

The current decisions.html explains the concept of decision records but contains no actual decisions. The Architecture Review Board (ARB) maintains 6 critical decisions in the ARB panel tab. This task ports those decisions into the page as proper ADR entries, expanding the page to ~10KB minimum of substantive content.

Read `site-ia.md` and `site-spec.md` before starting. This is a Pillar 3 ("The Build") depth page. Follow the CSS strategy (shared styles.css + page-specific `<style>` block). Reference the observability-page.md task for Pillar 3 page structure patterns.

The page must remain responsive and maintain the existing navigation structure (keep the hero intro and decision lifecycle sections unchanged). All changes are additive.

## Page: `docs/decisions.html` — EXPANSION

### Nav Configuration

**Primary nav:** "The Build" active (no change)
**Sub-nav:** Pillar 3 sub-nav with "Decisions" active (no change)

```html
<nav class="site-nav">
  <a href="index.html" class="logo"><span>I</span>ntent</a>
  <a href="pitch.html">The Story</a>
  <a href="work-system.html">The System</a>
  <a href="architecture.html" class="active">The Build</a>
</nav>

<nav class="sub-nav">
  <a href="architecture.html">Overview</a>
  <a href="agents.html">Agents</a>
  <a href="deployment.html">Deployment</a>
  <a href="observability.html">Observability</a>
  <a href="arb.html">ARB</a>
  <a href="decisions.html" class="active">Decisions</a>
  <a href="native-repos.html">Repos</a>
</nav>
```

### Expansion Strategy

1. **Preserve existing sections:**
   - Hero (header with title + subtitle)
   - "Decision Structure" section (explains the template)
   - "Decision Lifecycle" section (the notice→observe loop)
   - "Why Decision Records Matter" section (benefits)

2. **Insert new section after benefits:**
   ```
   <section class="adr-collection">
       <h2>Architectural Decisions (D1–D6)</h2>
       <p>Intro text + cross-link to arb.html</p>

       [ADR CARDS: D1 through D6]
   </section>
   ```

3. **Each ADR card:** Follows the ADR template structure with consistent styling. Use semantic HTML + CSS grid for the card layout.

### The 6 Decisions (D1–D6)

Port from ARB panel into full ADR format. Each decision includes: Title | Status Badge | Context | Decision | Rationale | Consequences | Alternatives Considered.

---

#### D1: Markdown for Specifications

**Status:** Accepted

**Context:** Intent needs a format for specs that is both human-readable and machine-parseable. The format must integrate with version control, IDE tooling, and the terminal-first workflow.

**Decision:** Use Markdown with YAML frontmatter for all specifications. Frontmatter contains metadata (title, ID, phase, priority, owner); body contains spec narrative, requirements, and acceptance criteria.

**Rationale:** Markdown is the lingua franca of developer tools. It integrates natively with Git diffs, most IDEs ship with preview, syntax highlighting, and linting. YAML frontmatter is battle-tested in static site generators and content management. This combination requires zero custom tooling while supporting both human review and programmatic parsing.

**Consequences:**
- Specs are Git-diffable and auditable — every change is tracked
- IDE-native — no custom editors required, works in VS Code, Vim, etc.
- Natural fit with the terminal workflow — edit in your shell-native editor
- YAML parsing is trivial in any language — agents can extract metadata without a spec parser
- Limits complex nested structures (but forces simpler specs)

**Alternatives Considered:**
- JSON-only specs (lost human readability, spec diffs are noise)
- Custom format (requires custom tooling, raises adoption friction)
- Executable specs (Python, Go) (couples spec to runtime, loses version-control readability)

---

#### D2: Git as Source of Truth

**Status:** Accepted

**Context:** Intent tracks four kinds of immutable events: notices, specs, executions, and observations. Each event must be versioned, auditable, and mergeable. The system needs to support offline-first operation and decentralized collaboration.

**Decision:** Git is the single source of truth. All signals, specs, and events are stored as JSONL files in a Git repository. No external database stores the primary event log. The database (Phase 2+) is a materialized view for query performance only.

**Rationale:** Git solves version control, audit trails, branching, merging, and conflict resolution — proven for a decade in software engineering. It enables offline-first operation (critique for tools that depend on always-on network). Git repositories can be cloned, forked, merged, and rebased. Every contributor can audit the full history.

**Consequences:**
- Offline-first by design — Claude Code agents can work on any machine with a Git checkout
- Mergeable event streams — multiple agents can capture signals in parallel, then reconcile
- Auditable — every event has a commit SHA, timestamp, and author
- Scales to team size (Git supports teams of thousands) with eventual consistency
- Real-time query performance (Phase 1) is limited to in-memory or file-scan access (solved by Phase 2 materialized database)
- Requires discipline in commit messages and schema versioning

**Alternatives Considered:**
- Postgres/SQLite from day one (loses offline-first, adds infrastructure burden for solo evaluators)
- Kafka event stream (requires always-on infrastructure, not suitable for offline CLI tools)
- Cloud-hosted event store (vendor lock-in, rules out disconnected operation)

---

#### D3: Claude API for Agent Runtime

**Status:** Accepted

**Context:** Intent needs a reliable, accessible LLM runtime for executing specs. Agents must handle different task complexities (simple routing, complex reasoning, code generation). The runtime must be accessible to solo practitioners and small teams.

**Decision:** Use Claude API (via Anthropic SDK) for all LLM-powered execution. Model routing by task complexity: Haiku for simple classification/routing, Sonnet for standard spec execution, Opus for complex reasoning and multi-step problem-solving.

**Rationale:** Claude is production-grade, available via API, supports system prompts and structured output, and has favorable token pricing for agents that operate at scale. Routing by complexity optimizes cost-per-execution. The SDK is well-documented and integrates cleanly with Python + FastMCP.

**Consequences:**
- Vendor dependency — Intent's operation depends on Anthropic API availability and pricing
- Cost is proportional to token usage — agents that speculate excessively become expensive
- Model routing requires clear decision boundaries in specs (simple vs complex) — agents must declare their complexity budget upfront
- Supports the entire spectrum from solo practitioner (pay-as-you-go) to team (volume pricing)

**Alternatives Considered:**
- Open-source models (LLaMA, Mistral) self-hosted (requires infrastructure, slower iteration, no long-context support at release time)
- Competing commercial APIs (OpenAI, Google, Anthropic—Claude chosen for long-context, cost efficiency, and specialized reasoning)
- Hybrid (multi-model) (adds complexity for marginal benefit at Phase 1)

---

#### D4: SQL (SQLite → PostgreSQL) for Persistence

**Status:** Accepted

**Context:** Phase 1 operates Git-only (JSONL). Phase 2 introduces a team/server deployment where agents and humans need to query signals and specs by state, time, owner, trust score, etc. Queries must be fast and composable.

**Decision:** For Phase 1, query via in-memory dataframes (pandas) or file scan. For Phase 2+, materialize a SQL schema in SQLite (local) or PostgreSQL (team). Schema mirrors the signal, spec, and event structures. SQL is the query language for all dashboards and analytics.

**Rationale:** SQL is the standard for structured queries. Schema migration is well-understood. Both SQLite (for teams of 1–5) and PostgreSQL (for teams of 5+) are battle-tested. This decision defers infrastructure complexity to Phase 2, letting Phase 1 stay simple and Git-only.

**Consequences:**
- Phase 2 requires a schema migration (transform JSONL to relational tables) — one-time, one-way operation
- SQL schemas are explicit and versioned — schema changes are specs themselves
- Enables fast, complex queries (e.g., "signals by owner, grouped by trust tier, with spec count")
- Requires ACID discipline — transaction boundaries must be well-defined in specs
- Limits real-time consistency (materialized view is eventually consistent with Git)

**Alternatives Considered:**
- NoSQL (MongoDB, DynamoDB) (loses ACID guarantees, schema-less makes validation harder)
- Stick with Git forever (query performance degrades as event log grows)
- Kafka/Streaming (requires always-on infrastructure, not suitable for Phase 1 solo practitioners)

---

#### D5: Static Site Dashboard (GitHub Pages + Vanilla HTML/JS)

**Status:** Accepted

**Context:** The site (pitch.html, work-system.html, etc.) is the primary communication surface. The Observe dashboard (work-system.html's signal stream, dogfood.html's live events) must work without a server. Zero-ops is a requirement.

**Decision:** Use GitHub Pages for hosting. Build the dashboard in vanilla HTML, CSS, and ES2020+ JavaScript. Data is sourced from JSON files committed to the repo (auto-generated from events.jsonl). No build step, no server, no Node.js.

**Rationale:** GitHub Pages is free, fast (CDN-backed), and requires zero ops. Vanilla JS (no framework overhead) keeps bundle size small (~50KB gzipped). Committing JSON snapshots decouples dashboard freshness from request latency. This approach supports evaluators downloading the repo and running the dashboard locally without npm install.

**Consequences:**
- Dashboard updates are batch jobs (snapshot frequency) — not real-time
- No dynamic queries — the dashboard is pre-rendered with all needed data
- Limited interactivity (no server-side filtering, but client-side JS can handle moderate complexity)
- Low operational burden — a single GitHub Pages push deploys the entire site + dashboard
- Snapshot frequency is tunable (every commit, hourly, daily) based on observability needs

**Alternatives Considered:**
- Next.js / SPA framework (adds build step, npm dependencies, deployment infrastructure)
- Grafana/Datadog dashboards (requires cloud account, vendor lock-in, not self-hostable)
- Server-rendered (Python Flask) (requires always-on infrastructure, adds compliance/security scope)

---

#### D6: Deferred Features (Kubernetes, Kafka, GraphQL, Custom ML, Blockchain)

**Status:** Accepted

**Context:** During design, several advanced features were proposed: Kubernetes orchestration, Kafka event streaming, GraphQL federation, custom ML models for trust scoring, and blockchain audit logs. Each adds power but also scope and complexity.

**Decision:** Hold all six features until Phase 3. Focus Phase 1 on core loop (notice→spec→execute→observe). Focus Phase 2 on team scaling (SQL database, multi-user). Revisit at Phase 3 after learning from Phase 1–2 production use.

**Rationale:** Scope discipline accelerates early learning. The core loop works without these features. Adding them now risks shipping nothing. Deferred features will be re-evaluated once we have real execution data to guide prioritization.

**Consequences:**
- Simpler architecture for Phase 1 and 2 — shorter time to learning
- Faster iteration on core concepts — less infrastructure to debug
- Clearer Phase 3 roadmap — informed by real usage patterns, not speculation
- May revisit decisions if market demands otherwise

**Alternatives Considered:**
- Build all six (delays MVP by 6–12 months)
- Build three immediately (still overscopes Phase 1)

---

### Page Structure Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Decisions - Intent</title>
    <link rel="stylesheet" href="styles.css">
    <style>
        /* Page-specific ADR card styling */
        .adr-collection {
            margin-top: 4rem;
        }

        .adr-card {
            background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
            border: 1px solid #334155;
            border-radius: 0.5rem;
            padding: 2rem;
            margin-bottom: 2rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
        }

        .adr-card h3 {
            font-size: 1.5rem;
            font-weight: 700;
            color: #f1f5f9;
            margin: 0 0 0.5rem 0;
        }

        .adr-status {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            border-radius: 0.25rem;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            background: #10b981;
            color: #000;
            margin-bottom: 1rem;
        }

        .adr-section {
            margin: 1.5rem 0;
        }

        .adr-section-title {
            font-weight: 600;
            color: #cbd5e1;
            text-transform: uppercase;
            font-size: 0.875rem;
            margin-bottom: 0.5rem;
        }

        .adr-section-content {
            color: #e2e8f0;
            line-height: 1.6;
        }

        .adr-section-content ul {
            margin: 0.5rem 0 0 1.5rem;
        }

        .adr-section-content li {
            margin: 0.5rem 0;
        }

        /* Consequences list styling */
        .consequences-list {
            list-style: none;
            padding: 0;
            margin: 0.5rem 0;
        }

        .consequences-list li {
            padding-left: 1.5rem;
            position: relative;
            margin: 0.5rem 0;
        }

        .consequences-list li:before {
            content: "–";
            position: absolute;
            left: 0;
            color: #94a3b8;
        }
    </style>
</head>
<body>
    <nav class="site-nav">
        <a href="index.html" class="logo"><span>I</span>ntent</a>
        <a href="pitch.html">The Story</a>
        <a href="work-system.html">The System</a>
        <a href="architecture.html" class="active">The Build</a>
    </nav>

    <nav class="sub-nav">
        <a href="architecture.html">Overview</a>
        <a href="agents.html">Agents</a>
        <a href="deployment.html">Deployment</a>
        <a href="observability.html">Observability</a>
        <a href="arb.html">ARB</a>
        <a href="decisions.html" class="active">Decisions</a>
        <a href="native-repos.html">Repos</a>
    </nav>

    <!-- KEEP EXISTING CONTENT UNCHANGED -->
    <header class="page-header">
        <div class="container">
            <h1>Decisions</h1>
            <p class="subtitle">Recording intent and outcomes</p>
        </div>
    </header>

    <main class="container">
        <section class="decisions-intro">
            <!-- existing text -->
        </section>

        <section class="decision-structure">
            <!-- existing section -->
        </section>

        <section class="decision-lifecycle">
            <!-- existing section -->
        </section>

        <section class="decision-benefits">
            <!-- existing section -->
        </section>

        <!-- NEW SECTION: ADR COLLECTION -->
        <section class="adr-collection">
            <h2>Architectural Decisions (D1–D6)</h2>
            <p>
                The following six decisions form the architectural spine of Intent. They were made by the Architecture Review Board (ARB) in the design phase and guide all development. Each decision record links back to <a href="arb.html">the ARB</a> for the full governance context.
            </p>

            <!-- D1 CARD -->
            <div class="adr-card">
                <h3>D1: Markdown for Specifications</h3>
                <span class="adr-status">Accepted</span>

                <div class="adr-section">
                    <div class="adr-section-title">Context</div>
                    <div class="adr-section-content">
                        <p>Intent needs a format for specs that is both human-readable and machine-parseable. The format must integrate with version control, IDE tooling, and the terminal-first workflow.</p>
                    </div>
                </div>

                <div class="adr-section">
                    <div class="adr-section-title">Decision</div>
                    <div class="adr-section-content">
                        <p>Use Markdown with YAML frontmatter for all specifications. Frontmatter contains metadata (title, ID, phase, priority, owner); body contains spec narrative, requirements, and acceptance criteria.</p>
                    </div>
                </div>

                <div class="adr-section">
                    <div class="adr-section-title">Rationale</div>
                    <div class="adr-section-content">
                        <p>Markdown is the lingua franca of developer tools. It integrates natively with Git diffs, most IDEs ship with preview, syntax highlighting, and linting. YAML frontmatter is battle-tested in static site generators and content management. This combination requires zero custom tooling while supporting both human review and programmatic parsing.</p>
                    </div>
                </div>

                <div class="adr-section">
                    <div class="adr-section-title">Consequences</div>
                    <div class="adr-section-content">
                        <ul class="consequences-list">
                            <li>Specs are Git-diffable and auditable — every change is tracked</li>
                            <li>IDE-native — no custom editors required, works in VS Code, Vim, etc.</li>
                            <li>Natural fit with the terminal workflow — edit in your shell-native editor</li>
                            <li>YAML parsing is trivial in any language — agents can extract metadata without a spec parser</li>
                            <li>Limits complex nested structures (but forces simpler specs)</li>
                        </ul>
                    </div>
                </div>

                <div class="adr-section">
                    <div class="adr-section-title">Alternatives Considered</div>
                    <div class="adr-section-content">
                        <ul class="consequences-list">
                            <li>JSON-only specs (lost human readability, spec diffs are noise)</li>
                            <li>Custom format (requires custom tooling, raises adoption friction)</li>
                            <li>Executable specs (Python, Go) (couples spec to runtime, loses version-control readability)</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- D2 CARD -->
            <div class="adr-card">
                <h3>D2: Git as Source of Truth</h3>
                <span class="adr-status">Accepted</span>

                <div class="adr-section">
                    <div class="adr-section-title">Context</div>
                    <div class="adr-section-content">
                        <p>Intent tracks four kinds of immutable events: notices, specs, executions, and observations. Each event must be versioned, auditable, and mergeable. The system needs to support offline-first operation and decentralized collaboration.</p>
                    </div>
                </div>

                <div class="adr-section">
                    <div class="adr-section-title">Decision</div>
                    <div class="adr-section-content">
                        <p>Git is the single source of truth. All signals, specs, and events are stored as JSONL files in a Git repository. No external database stores the primary event log. The database (Phase 2+) is a materialized view for query performance only.</p>
                    </div>
                </div>

                <div class="adr-section">
                    <div class="adr-section-title">Rationale</div>
                    <div class="adr-section-content">
                        <p>Git solves version control, audit trails, branching, merging, and conflict resolution — proven for a decade in software engineering. It enables offline-first operation (critical for tools that depend on always-on network). Git repositories can be cloned, forked, merged, and rebased. Every contributor can audit the full history.</p>
                    </div>
                </div>

                <div class="adr-section">
                    <div class="adr-section-title">Consequences</div>
                    <div class="adr-section-content">
                        <ul class="consequences-list">
                            <li>Offline-first by design — Claude Code agents can work on any machine with a Git checkout</li>
                            <li>Mergeable event streams — multiple agents can capture signals in parallel, then reconcile</li>
                            <li>Auditable — every event has a commit SHA, timestamp, and author</li>
                            <li>Scales to team size (Git supports teams of thousands) with eventual consistency</li>
                            <li>Real-time query performance (Phase 1) is limited to in-memory or file-scan access (solved by Phase 2 materialized database)</li>
                            <li>Requires discipline in commit messages and schema versioning</li>
                        </ul>
                    </div>
                </div>

                <div class="adr-section">
                    <div class="adr-section-title">Alternatives Considered</div>
                    <div class="adr-section-content">
                        <ul class="consequences-list">
                            <li>Postgres/SQLite from day one (loses offline-first, adds infrastructure burden for solo evaluators)</li>
                            <li>Kafka event stream (requires always-on infrastructure, not suitable for offline CLI tools)</li>
                            <li>Cloud-hosted event store (vendor lock-in, rules out disconnected operation)</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- D3 CARD -->
            <div class="adr-card">
                <h3>D3: Claude API for Agent Runtime</h3>
                <span class="adr-status">Accepted</span>

                <div class="adr-section">
                    <div class="adr-section-title">Context</div>
                    <div class="adr-section-content">
                        <p>Intent needs a reliable, accessible LLM runtime for executing specs. Agents must handle different task complexities (simple routing, complex reasoning, code generation). The runtime must be accessible to solo practitioners and small teams.</p>
                    </div>
                </div>

                <div class="adr-section">
                    <div class="adr-section-title">Decision</div>
                    <div class="adr-section-content">
                        <p>Use Claude API (via Anthropic SDK) for all LLM-powered execution. Model routing by task complexity: Haiku for simple classification/routing, Sonnet for standard spec execution, Opus for complex reasoning and multi-step problem-solving.</p>
                    </div>
                </div>

                <div class="adr-section">
                    <div class="adr-section-title">Rationale</div>
                    <div class="adr-section-content">
                        <p>Claude is production-grade, available via API, supports system prompts and structured output, and has favorable token pricing for agents that operate at scale. Routing by complexity optimizes cost-per-execution. The SDK is well-documented and integrates cleanly with Python and FastMCP.</p>
                    </div>
                </div>

                <div class="adr-section">
                    <div class="adr-section-title">Consequences</div>
                    <div class="adr-section-content">
                        <ul class="consequences-list">
                            <li>Vendor dependency — Intent's operation depends on Anthropic API availability and pricing</li>
                            <li>Cost is proportional to token usage — agents that speculate excessively become expensive</li>
                            <li>Model routing requires clear decision boundaries in specs (simple vs complex) — agents must declare their complexity budget upfront</li>
                            <li>Supports the entire spectrum from solo practitioner (pay-as-you-go) to team (volume pricing)</li>
                        </ul>
                    </div>
                </div>

                <div class="adr-section">
                    <div class="adr-section-title">Alternatives Considered</div>
                    <div class="adr-section-content">
                        <ul class="consequences-list">
                            <li>Open-source models (LLaMA, Mistral) self-hosted (requires infrastructure, slower iteration, no long-context support at release time)</li>
                            <li>Competing commercial APIs (OpenAI, Google) (Anthropic chosen for long-context, cost efficiency, and specialized reasoning)</li>
                            <li>Hybrid (multi-model) (adds complexity for marginal benefit at Phase 1)</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- D4 CARD -->
            <div class="adr-card">
                <h3>D4: SQL (SQLite → PostgreSQL) for Persistence</h3>
                <span class="adr-status">Accepted</span>

                <div class="adr-section">
                    <div class="adr-section-title">Context</div>
                    <div class="adr-section-content">
                        <p>Phase 1 operates Git-only (JSONL). Phase 2 introduces a team/server deployment where agents and humans need to query signals and specs by state, time, owner, trust score, etc. Queries must be fast and composable.</p>
                    </div>
                </div>

                <div class="adr-section">
                    <div class="adr-section-title">Decision</div>
                    <div class="adr-section-content">
                        <p>For Phase 1, query via in-memory dataframes (pandas) or file scan. For Phase 2+, materialize a SQL schema in SQLite (local) or PostgreSQL (team). Schema mirrors the signal, spec, and event structures. SQL is the query language for all dashboards and analytics.</p>
                    </div>
                </div>

                <div class="adr-section">
                    <div class="adr-section-title">Rationale</div>
                    <div class="adr-section-content">
                        <p>SQL is the standard for structured queries. Schema migration is well-understood. Both SQLite (for teams of 1–5) and PostgreSQL (for teams of 5+) are battle-tested. This decision defers infrastructure complexity to Phase 2, letting Phase 1 stay simple and Git-only.</p>
                    </div>
                </div>

                <div class="adr-section">
                    <div class="adr-section-title">Consequences</div>
                    <div class="adr-section-content">
                        <ul class="consequences-list">
                            <li>Phase 2 requires a schema migration (transform JSONL to relational tables) — one-time, one-way operation</li>
                            <li>SQL schemas are explicit and versioned — schema changes are specs themselves</li>
                            <li>Enables fast, complex queries (e.g., "signals by owner, grouped by trust tier, with spec count")</li>
                            <li>Requires ACID discipline — transaction boundaries must be well-defined in specs</li>
                            <li>Limits real-time consistency (materialized view is eventually consistent with Git)</li>
                        </ul>
                    </div>
                </div>

                <div class="adr-section">
                    <div class="adr-section-title">Alternatives Considered</div>
                    <div class="adr-section-content">
                        <ul class="consequences-list">
                            <li>NoSQL (MongoDB, DynamoDB) (loses ACID guarantees, schema-less makes validation harder)</li>
                            <li>Stick with Git forever (query performance degrades as event log grows)</li>
                            <li>Kafka/Streaming (requires always-on infrastructure, not suitable for Phase 1 solo practitioners)</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- D5 CARD -->
            <div class="adr-card">
                <h3>D5: Static Site Dashboard (GitHub Pages + Vanilla HTML/JS)</h3>
                <span class="adr-status">Accepted</span>

                <div class="adr-section">
                    <div class="adr-section-title">Context</div>
                    <div class="adr-section-content">
                        <p>The site (pitch.html, work-system.html, etc.) is the primary communication surface. The Observe dashboard (work-system.html's signal stream, dogfood.html's live events) must work without a server. Zero-ops is a requirement.</p>
                    </div>
                </div>

                <div class="adr-section">
                    <div class="adr-section-title">Decision</div>
                    <div class="adr-section-content">
                        <p>Use GitHub Pages for hosting. Build the dashboard in vanilla HTML, CSS, and ES2020+ JavaScript. Data is sourced from JSON files committed to the repo (auto-generated from events.jsonl). No build step, no server, no Node.js.</p>
                    </div>
                </div>

                <div class="adr-section">
                    <div class="adr-section-title">Rationale</div>
                    <div class="adr-section-content">
                        <p>GitHub Pages is free, fast (CDN-backed), and requires zero ops. Vanilla JS (no framework overhead) keeps bundle size small (~50KB gzipped). Committing JSON snapshots decouples dashboard freshness from request latency. This approach supports evaluators downloading the repo and running the dashboard locally without npm install.</p>
                    </div>
                </div>

                <div class="adr-section">
                    <div class="adr-section-title">Consequences</div>
                    <div class="adr-section-content">
                        <ul class="consequences-list">
                            <li>Dashboard updates are batch jobs (snapshot frequency) — not real-time</li>
                            <li>No dynamic queries — the dashboard is pre-rendered with all needed data</li>
                            <li>Limited interactivity (no server-side filtering, but client-side JS can handle moderate complexity)</li>
                            <li>Low operational burden — a single GitHub Pages push deploys the entire site and dashboard</li>
                            <li>Snapshot frequency is tunable (every commit, hourly, daily) based on observability needs</li>
                        </ul>
                    </div>
                </div>

                <div class="adr-section">
                    <div class="adr-section-title">Alternatives Considered</div>
                    <div class="adr-section-content">
                        <ul class="consequences-list">
                            <li>Next.js/SPA framework (adds build step, npm dependencies, deployment infrastructure)</li>
                            <li>Grafana/Datadog dashboards (requires cloud account, vendor lock-in, not self-hostable)</li>
                            <li>Server-rendered (Python Flask) (requires always-on infrastructure, adds compliance/security scope)</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- D6 CARD -->
            <div class="adr-card">
                <h3>D6: Deferred Features (Kubernetes, Kafka, GraphQL, Custom ML, Blockchain)</h3>
                <span class="adr-status">Accepted</span>

                <div class="adr-section">
                    <div class="adr-section-title">Context</div>
                    <div class="adr-section-content">
                        <p>During design, several advanced features were proposed: Kubernetes orchestration, Kafka event streaming, GraphQL federation, custom ML models for trust scoring, and blockchain audit logs. Each adds power but also scope and complexity.</p>
                    </div>
                </div>

                <div class="adr-section">
                    <div class="adr-section-title">Decision</div>
                    <div class="adr-section-content">
                        <p>Hold all six features until Phase 3. Focus Phase 1 on core loop (notice→spec→execute→observe). Focus Phase 2 on team scaling (SQL database, multi-user). Revisit at Phase 3 after learning from Phase 1–2 production use.</p>
                    </div>
                </div>

                <div class="adr-section">
                    <div class="adr-section-title">Rationale</div>
                    <div class="adr-section-content">
                        <p>Scope discipline accelerates early learning. The core loop works without these features. Adding them now risks shipping nothing. Deferred features will be re-evaluated once we have real execution data to guide prioritization.</p>
                    </div>
                </div>

                <div class="adr-section">
                    <div class="adr-section-title">Consequences</div>
                    <div class="adr-section-content">
                        <ul class="consequences-list">
                            <li>Simpler architecture for Phase 1 and 2 — shorter time to learning</li>
                            <li>Faster iteration on core concepts — less infrastructure to debug</li>
                            <li>Clearer Phase 3 roadmap — informed by real usage patterns, not speculation</li>
                            <li>May revisit decisions if market demands otherwise</li>
                        </ul>
                    </div>
                </div>

                <div class="adr-section">
                    <div class="adr-section-title">Alternatives Considered</div>
                    <div class="adr-section-content">
                        <ul class="consequences-list">
                            <li>Build all six (delays MVP by 6–12 months)</li>
                            <li>Build three immediately (still overscopes Phase 1)</li>
                        </ul>
                    </div>
                </div>
            </div>

        </section>
    </main>

    <footer>
        <div class="container">
            <p>Source: <a href="https://github.com/theparlor/intent">github.com/theparlor/intent</a> · Built with the Intent methodology</p>
        </div>
    </footer>
</body>
</html>
```

### Verification Checklist

- [ ] Page renders cleanly in browser (check mobile responsiveness)
- [ ] All 6 ADR cards are visible and readable (use Firefox DevTools for font rendering)
- [ ] Navigation is correct: "The Build" primary nav active, "Decisions" sub-nav active
- [ ] Cross-link to arb.html is working
- [ ] Page is approximately 10KB+ (verify with Chrome DevTools Network tab)
- [ ] CSS styling matches site aesthetic (fonts, colors, spacing consistent with observability-page.html)
- [ ] No console errors (open DevTools console, refresh, verify clean)

### Commit Block

```
commit: Expand decisions.html with 6 full Architecture Decision Records

This commit expands the decisions.html stub (90 lines, explanation only)
to a full Rich page (~10KB) containing 6 complete ADR entries (D1–D6).

Each decision record includes: Context, Decision, Rationale, Consequences,
Alternatives Considered.

D1: Markdown for specs
D2: Git as source of truth
D3: Claude API for agent runtime
D4: SQL (SQLite→PostgreSQL) for persistence
D5: Static site dashboard (GitHub Pages + vanilla JS)
D6: Deferred features (K8s, Kafka, GraphQL, ML, blockchain)

Pillar 3 ("The Build") depth page. Preserves hero intro and decision
lifecycle sections (no changes to foundational content). All expansions
are additive.

Task spec: tasks/expand-decisions.md
Verified: navigation, mobile rendering, cross-links, page weight, CSS consistency
```

---

## File 2: observe-page.md

Now creating the observe-page task spec:
