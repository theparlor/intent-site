---
title: Changelog
type: framework
maturity: final
confidentiality: shareable
reusability: universal
domains:
  - consulting-operations
created: 2026-04-07
depth_score: 2
depth_signals:
  file_size_kb: 4.1
  content_chars: 3861
  entity_count: 0
  slide_count: 0
  sheet_count: 0
  topic_count: 1
  has_summary: 0
vocab_density: 0.52
---
# Changelog — intent-site

## 2026-07-19: Ground-Truth Refresh (Phase 11)

### Changed
- **Evidence numbers synced to live census** across index, the-proof, dogfood, signals, event-catalog, personas, agents, work-system, products: 194 internal signals (was 43), 45 specs (was 14/19), 25-event catalog cited (was 15), 352 Cast registry entities (was 178/188), 14 ratified decisions DEC-001 to DEC-014 cited (was D1-D19), 53 governed .intent roots (was 8 repos), hero stamp v0.13 · 2026-07-19 (was v0 · 2026-04-09).
- **External evidence reframed**: "N=1 external" updated to 1 interview-grade voice (Ari) plus 3 published-work convergences (Cagan context-engineering, Block BuilderBot, MobAI team coherence). The interview wave remains honestly 0/10; convergences are labeled content analysis, not discovery. Block's chat-as-write-surface collapse logged as a doctrine-level counter-example on the-proof.
- **Snapshot honesty notes** added wherever a rendered artifact lags the live stream (personas card grid, dogfood signal list, signals founding counters, products profiled cohort).

### Added
- **CON-SITE-013** numeric-parity contract: catches site-vs-ground-truth drift that the hash-based freshness tracker structurally cannot see (exact match on slow canon, drift bands on fast streams).

### Open
- decisions.html still presents the historical D1-D19 ADR set; upstream log renumbered to DEC-001..DEC-014. Re-derivation pending (ROADMAP Phase 11 residue).

## 2026-04-08 — v1.1.0 Portfolio Expansion + Signal Refresh

### Added
- **products-taxonomy.yaml:** Org-Design Tooling product (27+ signals, 8 decisions, deterministic Python audit, session journal)
- **products-taxonomy.yaml:** Library Index product (OTel event emission wired across 4 scripts, LI-001 decision)
- **products-taxonomy.yaml:** Pliable IR as Skills Engine platform product (3 renderers: annotated block, copilot, future; 47 skills compiled)
- **products-taxonomy.yaml:** Compass/Forge external naming note (ODT-002 reference)
- **products-taxonomy.yaml:** Composability flows for new products (org-design-tooling → notice, declutter → library-index, methodology → pliable-ir)
- **work-system.html:** Org-Design Tooling, Library Index, and Pliable IR product cards in Products tab

### Changed
- **products-taxonomy.yaml:** Skills Engine skill_count 46 → 47, persona_count added (188), registry_entities added (178)
- **products-taxonomy.yaml:** Personas tagline updated: "178+" → "188 personas (178 registry entities, 7 archetypes)"
- **products-taxonomy.yaml:** Methodology Library tagline notes Pliable IR symlink
- **products-taxonomy.yaml:** Fieldbook notes venv rebuilt (Python 3.12, operational fix)
- **signals.html:** Static counter updated from 15 → 24 (JS array already had 24 entries; static was stale)
- **signals.html:** Label changed "Total Signals" → "Intent Signals" for namespace clarity
- **signals.html:** Cluster count static fallback updated 4 → 8
- **work-system.html:** Personas & Voices tagline updated to "188 personas (178 registry entities, 7 archetypes)"
- **work-system.html:** Methodology Library tagline notes Pliable IR symlink

### Verified (no change needed)
- **personas.html:** Already shows 178 entities + 7 archetypes — counts match current registry state

---

## 2026-04-06 — v1.0.0 Site Sync

### Added
- Three-layer architecture section on architecture.html (Layer 1: Knowledge Base, Layer 2: Transformation OS, Layer 3: Software Spec & Code)
- Fourth MCP server (intent-knowledge, port 8004) on architecture.html, deployment.html, getting-started.html
- Federation model section on architecture.html (Core vs engagement instances)
- Knowledge agents (knowledge-compiler, knowledge-querier) on agents.html
- Spec-shaping protocol section on agents.html (four-persona interrogation: △◇○◉)
- Six new ADR entries (D7-D12) on decisions.html:
  - D7: Two Products, Not One
  - D8: Engagement Rollout Order
  - D9: Knowledge Engine as New MCP Server
  - D10: Retroactive Enrichment = Suggested
  - D11: Redaction at Tool Level
  - D12: Spec-Shaping Through Personas
- Knowledge artifact schemas on schemas.html (PER, JRN, DDR, THM, DOM, RAT + dossiers + federation)
- Three-layer section on pitch.html + fourth stat box ("3 independent layers")
- Knowledge Engine standalone adoption path on getting-started.html + intent-knowledge CLI
- Knowledge Engine roadmap + engagement rollout on roadmap.html
- Spec-shaping protocol reference on methodology.html
- Three-layer context on methodology.html
- Delta manifest (tasks/delta-manifest-v1.0.md)

### Changed
- architecture.html hero: "Three MCP servers" → "Four MCP servers"
- agents.html hero: "Six Subagents" → "Eight Subagents"
- decisions.html: "D1-D6" → "D1-D12"
- dogfood.html: decisions 6→12, MCP servers 3→4, added knowledge artifacts stat
- deployment.html: 3 server configs → 4
- getting-started.html: updated "three MCP servers" → "four MCP servers"

### Updated Governance
- content-map.md: 51 new traceability entries for all added/changed content
- site-spec.md: Updated file size baselines and visual component inventory
- tasks/ROADMAP.md: Added Phase 5 (v1.0 Site Sync) as completed
- tasks/delta-manifest-v1.0.md: Full delta analysis

### Contracts
- All 10 site contracts pass (baseline and post-update)
