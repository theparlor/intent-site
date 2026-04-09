---
title: Delta Manifest V1.0
type: framework
maturity: final
confidentiality: shareable
reusability: universal
domains:
  - consulting-operations
created: 2026-04-07
companies:
  - subaru
depth_score: 4
depth_signals:
  file_size_kb: 8.5
  content_chars: 7826
  entity_count: 1
  slide_count: 0
  sheet_count: 0
  topic_count: 1
  has_summary: 0
vocab_density: 0.38
related_entities:
  - {pair: subaru ↔ consulting-operations, count: 836, strength: 0.43}
  - {pair: subaru ↔ automotive-manufacturing, count: 791, strength: 0.933}
  - {pair: consulting-operations ↔ automotive-manufacturing, count: 791, strength: 0.409}
  - {pair: consulting-operations ↔ engagement-management, count: 507, strength: 0.262}
  - {pair: consulting-operations ↔ turnberry, count: 472, strength: 0.226}
---
# Delta Manifest — Framework v1.0 → Site Sync

> Produced: 2026-04-06
> Source of truth: `theparlor/intent` CLAUDE.md, CHANGELOG.md, knowledge-engine/AGENTS.md, spec/spec-shaping-protocol.md
> Target: `theparlor/intent-site` docs/

## Delta Summary

8 framework changes since v0.9.0 that the site does not yet reflect.

---

## Delta 1: Three-Layer Architecture (v1.0, April 5-6)

**Source:** CLAUDE.md § "Three-Layer Architecture (v1.0 — 2026-04-05)" + Key Decision #9

**What changed:** Intent now prescribes three layers — Compiled Knowledge Base → Transformation OS → Software Spec & Code — with 6 bidirectional data flows coupling them.

**Site pages affected:**

| Page | Current state | Required update |
|------|--------------|-----------------|
| architecture.html | Shows "Three Servers, Three Phases" — no layer model | ADD: New section (Section 0 or reframe Section 1) showing the three-layer architecture with 6 data flows. The MCP servers map INTO these layers. |
| pitch.html | Has two-plane diagram (work stream + ownership) | ADD: Three-layer visual or narrative. The two-plane diagram is still valid but the three-layer model is the new primary architecture frame. |
| methodology.html | Describes the loop only | ADD: Brief reference to three-layer model as the structural context the loop operates within. Link to architecture.html. |
| roadmap.html | No reference to layers | UPDATE: Reflect three-layer model in the product vision section. |

---

## Delta 2: Knowledge Engine as Separate Product (DDR-005, April 6)

**Source:** CLAUDE.md § "⚠ CRITICAL: This Repo Contains Two Products" + Key Decision #14

**What changed:** Intent (methodology) and Knowledge Engine (product) are now formally separated. Knowledge Engine is separable — can be used without Intent. Brien's Knowledge Farm is an instance.

**Site pages affected:**

| Page | Current state | Required update |
|------|--------------|-----------------|
| pitch.html | Frames Intent as one product | ADD: Mention Knowledge Engine as a distinct, separable product. Two products, not one. |
| architecture.html | No Knowledge Engine concept | ADD: Knowledge Engine as Layer 1 product, distinct from the Intent loop (Layer 2). |
| getting-started.html | Adoption path assumes single product | UPDATE: Adoption path should acknowledge KE can be used independently. |
| methodology.html | No product separation | ADD: Brief note that the loop (Layer 2) is independent of the knowledge base (Layer 1). |

---

## Delta 3: New MCP Server — intent-knowledge (Port 8004)

**Source:** CLAUDE.md § "Decided Architecture (2026-04-06)" + Key Decision #16

**What changed:** Fourth MCP server `intent-knowledge` on port 8004 with CLI `intent-knowledge` (subcommands: ingest, query, lint). Separate from notice/spec/observe.

**Site pages affected:**

| Page | Current state | Required update |
|------|--------------|-----------------|
| architecture.html | Shows 3 servers (notice 8001, spec 8002, observe 8003) | ADD: Fourth server card for intent-knowledge (port 8004) with tools: ingest, query, lint. Update hero subtitle "Three MCP servers" → "Four MCP servers". Update ASCII diagram. |
| agents.html | 6 agents across 3 servers | ADD: Knowledge agents (knowledge-compiler, knowledge-querier) that connect to intent-knowledge server. |
| deployment.html | 3 server deployment configs | ADD: Fourth server deployment config for intent-knowledge. |
| schemas.html | Signal, Intent, Spec, Contract, Event schemas | ADD: Knowledge artifact schemas (Persona, Journey, DDR, Theme, Domain Model, Rationale) from AGENTS.md. |
| getting-started.html | CLI examples for signal/intent/spec/status | ADD: intent-knowledge CLI (ingest/query/lint subcommands). |

---

## Delta 4: Spec-Shaping Protocol (April 6)

**Source:** spec/spec-shaping-protocol.md + Key Decision #19

**What changed:** Intents become specs through four-persona interrogation: △ Shape, ◇ Outcome, ○ Contract, ◉ Readiness. Self-prompting, not manual authoring.

**Site pages affected:**

| Page | Current state | Required update |
|------|--------------|-----------------|
| agents.html | Shows spec-writer as a single agent | ADD: Spec-shaping protocol section showing the four-persona interrogation passes. The spec-writer agent now executes this protocol. |
| methodology.html | Describes Notice→Spec transition generically | ADD: Reference to spec-shaping as the concrete mechanism for the Notice→Spec transition. |
| architecture.html | No mention of spec-shaping | ADD: Brief reference in the Spec server section — spec-shaping protocol is the mechanism that turns intents into agent-ready specs. |

---

## Delta 5: Federated Knowledge Base Architecture

**Source:** CLAUDE.md Key Decision #13 + knowledge-engine/AGENTS.md § "9. Federation Model"

**What changed:** Core = universal substrate, engagements = bounded instances. Inherit down, promote up, never leak sideways.

**Site pages affected:**

| Page | Current state | Required update |
|------|--------------|-----------------|
| architecture.html | No federation concept | ADD: Federation model in the Knowledge Engine section — Core vs engagement instances. |
| schemas.html | No knowledge artifact schemas | ADD: Federation frontmatter fields (engagement, confidentiality) in knowledge artifact schemas. |

---

## Delta 6: Engagement Rollout Order

**Source:** CLAUDE.md Key Decision #15

**What changed:** Subaru → F&G → ASA → Cargill → Footlocker. Subaru first (most data, highest learning).

**Site pages affected:**

| Page | Current state | Required update |
|------|--------------|-----------------|
| roadmap.html | No engagement rollout | ADD: Knowledge Engine engagement rollout order in roadmap. |

---

## Delta 7: Redaction at Tool Level

**Source:** CLAUDE.md Key Decision #18 + knowledge-engine/spec/redaction.md

**What changed:** MCP server applies confidentiality projection automatically. Not a flag Brien has to remember.

**Site pages affected:**

| Page | Current state | Required update |
|------|--------------|-----------------|
| architecture.html | No redaction concept | ADD: Brief mention in the intent-knowledge server card — redaction is automatic at the tool level. |

---

## Delta 8: Key Decisions #14-19

**Source:** CLAUDE.md § "Key Decisions" items 14-19

**What changed:** Six new decisions added:
- D14: Two products, not one (Intent + Knowledge Engine)
- D15: Engagement rollout order
- D16: Knowledge Engine as new MCP server
- D17: Retroactive enrichment = suggested
- D18: Redaction at tool level
- D19: Spec-shaping is self-prompting through personas

**Site pages affected:**

| Page | Current state | Required update |
|------|--------------|-----------------|
| decisions.html | Has D1-D6 ADR entries only | ADD: D7-D12 (decisions 14-19 from CLAUDE.md, renumbered as site ADRs D7-D12). Full ADR format with context, decision, rationale, consequences, alternatives. |
| dogfood.html | Shows "6 decisions" in stats | UPDATE: Decision count to 12. |

---

## Page Impact Summary

| Page | # Deltas | Priority | Estimated effort |
|------|----------|----------|-----------------|
| architecture.html | 5 (D1,D2,D3,D5,D7) | P0 — highest | Major rewrite of sections |
| agents.html | 2 (D3,D4) | P1 | Add knowledge agents + spec-shaping |
| decisions.html | 1 (D8) | P1 | Add 6 new ADR cards |
| pitch.html | 2 (D1,D2) | P2 | Add three-layer + KE separation |
| methodology.html | 3 (D1,D2,D4) | P2 | Add layer context + spec-shaping ref |
| schemas.html | 2 (D3,D5) | P2 | Add knowledge artifact schemas |
| deployment.html | 1 (D3) | P3 | Add 4th server config |
| getting-started.html | 2 (D2,D3) | P3 | Update adoption path + KE CLI |
| roadmap.html | 2 (D1,D6) | P3 | Three-layer vision + rollout order |
| dogfood.html | 1 (D8) | P4 | Update stats counts |
