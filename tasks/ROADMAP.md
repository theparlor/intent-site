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
  file_size_kb: 17.4
  content_chars: 16995
  entity_count: 0
  slide_count: 0
  sheet_count: 0
  topic_count: 2
  has_summary: 0
vocab_density: 0.24
related_entities:
  - {pair: consulting-operations ↔ teresa-torres, count: 67, strength: 0.099}
  - {pair: consulting-operations ↔ marty-cagan, count: 64, strength: 0.082}
  - {pair: consulting-operations ↔ subaru, count: 44, strength: 0.116}
  - {pair: consulting-operations ↔ slack, count: 41, strength: 0.123}
  - {pair: consulting-operations ↔ jeff-patton, count: 40, strength: 0.078}
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
| Create personas.html | new page | DONE | 79KB, 178 cards, archetype cards, persona catalog, filters |
| Update P2 sub-nav | 9 existing P2 pages | DONE | All pages have "Persona Catalog" link after "Signals" |
| Update site-ia.md | governance | DONE | P2 table, sub-nav template, cross-links |
| Update CLAUDE.md | governance | DONE | P2 page list, sub-nav label order |
| Wire cross-links | agents, arb, methodology, personas | DONE | 6 cross-links wired |
| Update site-spec.md | governance | DONE | personas.html added to inventory |
| Update content-map.md | governance | DONE | 8 persona claim mappings added |
| Contract verification | all pages | DONE | All P2 pages have Persona Catalog link |

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

---

## Phase 9: Governance Hardening — IN PROGRESS

Started 2026-05-20 (post-audit). Intent's site is now running Intent governance on itself.

| Task | Description | Status | Verification |
|------|-------------|--------|--------------|
| TASK-001: Contract index.html guard | Add `[ "$f" = "index.html" ] && continue` to CON-SITE-001/003/004 | DONE | Contracts now pass cleanly for all 23 pillar pages |
| TASK-002: .intent/INTENT.md | Create IDD anchor with purpose declaration + 3 active objectives | DONE | `.intent/INTENT.md` exists |
| TASK-003: Back-fill 3 decision atoms | DEC-001 IA v2 migration, DEC-002 personas page, DEC-003 products taxonomy | DONE | `.intent/decisions/` has 3 atoms |
| TASK-004: Persona count sync 178→242 | Update personas.html, work-system.html, content-map.md, CHANGELOG | DONE 2026-07-19 (Phase 11) — synced to live census 352 with snapshot note on the card grid; deploy push remains L0 | Count verified: 352 registry YAML files (census 2026-07-19) |
| TASK-005: Orphan page governance | Add review-2026-04-09.html to site-spec.md under Supporting Pages | DONE | site-spec.md has Supporting Pages section |
| TASK-006: v2-draft governance | Document docs/v2-draft/ in ROADMAP + site-spec.md | DONE — resolved by Phase 10 TASK-10.0 (v2-draft archived under docs/archive/v2-draft/ with ARCHIVE.md) | Archive dir exists with ARCHIVE.md |
| TASK-007: Document .meta.yml in CLAUDE.md | One-line explanation of library-index metadata files | DONE | CLAUDE.md Repo Structure updated |
| TASK-008: Align personas sub-nav label | "Voices" vs "Persona Catalog" — align governance to site | L0 — awaiting Brien approval | GAP-IA-001 documented in spec |
| TASK-009: CONTEXT.md | Create intent-site/CONTEXT.md for knowledge graph | DONE | CONTEXT.md at intent-site root |
| TASK-010: sync-config validation | scripts/verify-sync-config.sh checks product repo path | DONE | Script created |

**Note on TASK-006 (v2-draft):** `docs/v2-draft/` contains 22 files. These appear to be experimental drafts from the IA v2 migration that were never cleaned up. Until Brien confirms their disposition (promote / archive / delete), they remain ungoverned. Recommendation: evaluate in a follow-on session with Brien present.

## Phase 10: Worldview Refresh — EXECUTED 2026-06-05 (structural overhaul)

Approved 2026-06-05 (DEC-004) after a 4-panel Voices critique; executed the same day. Scope: hold Intent narrow, make **dogfood-evidence** the organizing principle, **archive the three colliding nav eras**, promote the v2-draft four-zone narrowing to root as ONE nav, and wire honest multi-doorways into the now-live **Parallax** + **portfolio** surfaces. **Re-scope to the 21-product worldview was REJECTED 8/8 — no product catalog was built.** Pre-overhaul tag `intent-site-pre-overhaul-2026-06-05` (pushed). All 11 site-contracts pass BEFORE and AFTER.

**Read first:** `.intent/specs/2026-06-05-worldview-refresh-content-plan.md` (per-page disposition) · `.intent/critiques/2026-06-05-worldview-refresh-panel-critique.md` · `.intent/decisions/DEC-004-worldview-rescope-rejected-c-minimal.md` · `site-ia.md` (new IA v3)

| Task | Description | Status | Verification |
|------|-------------|--------|------|
| TASK-10.0: Archive 3 nav eras | Tag snapshot; rename v1.2→`v1-2-multi-framing`; freeze `v1-3-three-pillar/` snapshot (23 pages); archive `v2-draft/` (mockups + ARCHIVE.md). docs/ root = ONE site, ONE nav. | **DONE** | 3 archive subdirs each w/ ARCHIVE.md; tag pushed |
| TASK-10.1: Ship v2-draft narrowing | Promoted pitch/the-system/the-build/the-proof + lineage/when-not/who-loses/ending/neutral-zone to root; de-nested links; standardized footers; per-zone sub-navs; removed `v1-banner` collision punt from every page. | **DONE** | 9 pages at root; nav unified; contracts pass |
| TASK-10.2: Dogfood-evidence reframe | `products.html` Catalog→"Repos Intent governs" (evidence, not catalog); `dogfood.html` + `the-proof.html` evidence framing; "operating model that built me" portfolio framing. | **DONE** | no in-line 21-catalog; CON-SITE-011 holds |
| TASK-10.3: Staleness fixes | `skills-engine`→Forge (work-system, 7 refs); stale "discovery wave in flight / come back Friday" dates → current reality (pitch, the-proof). Persona count L0-deferred (TASK-004); events 15→22 deferred. | **PARTIAL** | Forge + dates done; counts flagged below |
| TASK-10.4: CON-SITE-011 fence | Contract present; updated to "honest doorways into the real Parallax/portfolio surfaces" (multi-doorway per DEC-004 update). | **DONE** | CON-SITE-011 passes |
| TASK-10.5: Doorways + Dunford gate | Parallax doorway on architecture+dogfood; Parallax+portfolio doorways on pitch+dogfood+products; **Dunford competitive-alternative named** on pitch (write-own-CLAUDE.md / build-.intent-from-scratch / do-nothing). | **DONE** | doorways live; Dunford gate met |
| TASK-10.6: ECOSYSTEM correction | `Core/ECOSYSTEM-ARCHITECTURE-2026-05-20.md` §6 "deprecating" contradicts evolves-not-deprecates. | **DONE** | 2026-06-05 Core correction pass — line 240 verified evolves-in-place + NOT deprecated, +system-plane wording, canon-cited (SIG-INTENTSITE-2026-04-23; DEC-004; WS-DDR-107); founding three-tier spec §7 (line 147) aligned. No automated catch-net (hand-maintained docs; low regression risk) — SIG-EXEC-2026-06-05-ecosystem-deprecation-correction |

**Deferred / open (post-overhaul):**
- **Persona count sync (TASK-004, L0):** RESOLVED by Phase 11 (2026-07-19).
- **Torres gate (doorway wording):** 3–5 discovery conversations to validate the doorway claim — non-blocking on the narrowing; doorway wording is provisional (the whole site is hypothesis-framed).
- **Numeric counts (signals/specs/events):** RESOLVED by Phase 11 (2026-07-19) — verified against ground truth, guarded by CON-SITE-013 going forward.

**Snapshots:** `intent-site-pre-overhaul-2026-06-05` (this overhaul) · `worldview-snapshot-2026-06-05` (pre-Phase-10 doorways). Both pushed.

## Phase 11: Ground-Truth Refresh — EXECUTED 2026-07-19 (local; deploy push L0)

Full numeric and epistemic sync of the site against the live product repo, Cast registry, and workspace census. Trigger: Brien asked what could be updated; audit found the site 3+ months behind ground truth, and the hash-based freshness tracker structurally unable to see absorbed-vs-unabsorbed drift.

| Task | Pages affected | Status | Verification |
|------|---------------|--------|--------------|
| Signal counts 43 to 194 (census 2026-07-19) | index, the-proof, dogfood, signals | DONE | ls ../intent/.intent/signals/*.md = 194 |
| Spec count 14/19 to 45 | the-proof, dogfood | DONE | ls ../intent/spec/*.md = 45 |
| Event catalog 15 to 25 cited, founding-15 detail preserved | event-catalog, dogfood | DONE | "The 25 Events" heading in spec/event-catalog.md |
| Persona counts 178/188 to live census 352 (TASK-004) | personas, agents, work-system, products, index, content-map | DONE | cast/.known-counts + registry ls = 352 |
| Decisions stat: cite ratified DEC-001 to DEC-014 | the-proof, content-map | DONE | grep DEC- ../intent/spec/decision-log.md = 14 entries |
| External evidence N=1 to 1 voice + 3 convergences (Cagan, Block, MobAI); interview wave still 0/10 | index, the-proof | DONE | ls ../intent/.intent/signals/external/ = 3 signals + README |
| Block surface-collapse logged as doctrine-level counter-example | the-proof | DONE | disconfirmation card |
| Governed-repos census 8 to 53 roots, profiled-cohort framing | products | DONE | find Workspaces -name .intent -type d (worktrees excluded) = 53 |
| Hero stamp v0 · 2026-04-09 to v0.13 · 2026-07-19 | index | DONE | ../intent/VERSION = 2026.05.29-0.13.0 |
| Snapshot honesty notes where rendered artifacts lag the stream | personas, dogfood, signals, products | DONE | census notes present |
| CON-SITE-013 numeric-parity contract (catch-net) | site-contracts.md | DONE | contract passes |
| Signals + CHANGELOG + content-map governance updates | governance files | DONE | this table |

**Open (Phase 11 residue):**
- **decisions.html re-derivation:** the page presents the historical D1-D19 ADR set; the upstream log was consolidated and renumbered to DEC-001 through DEC-014 (disjoint content). Preserve the historical set (evolves-not-deprecates), add the ratified log as current canon. Editorial rebuild, not a count fix.
- **Freshness tracker content-parity extension:** .freshness-state.json still only records hashes; CON-SITE-013 is the catch-net, but the tracker script itself could assert parity. Also: no CI runner executes the contract suite; it runs via the repo's agent protocol. A GitHub Action would harden it.
- **signals.html card sync:** founding 24 cards retained by design; a curated refresh of notable post-founding signals (or scripts/sync-signals.js run with volume/redaction gates) is an editorial decision.
- **observability.html vs current observability reality (signalbox et al.):** not audited this pass.

## Execution Protocol

Terminal Claude should follow this protocol when picking up this roadmap:

1. **Read** CLAUDE.md + this ROADMAP.md
2. **Check** which phase is current (look at the status column)
3. **Execute** the next incomplete phase IN ORDER
4. **Run verification** for each task before marking complete
5. **Update** this file: change status from blank to DONE, add verification date
6. **Commit** with message referencing the phase and task

**Do NOT skip phases. Do NOT parallelize across phases.** Tasks within a phase CAN be parallelized if they have no dependencies.
