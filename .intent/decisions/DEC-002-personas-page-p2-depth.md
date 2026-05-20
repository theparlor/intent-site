---
id: DEC-002
title: Personas Page Added as Pillar 2 Depth Page (Phase 6)
date: 2026-04-07
status: accepted
supersedes: null
---
# DEC-002: Personas Page as Pillar 2 Depth Page

## Context

By Phase 6, the Cast persona system had grown to 178+ registry entities across named-human, archetype, and discipline types. The system was referenced on work-system.html and agents.html but had no dedicated page. The site was underselling one of Intent's most distinctive capabilities — a curated library of thought-leader personas that agents can embody during critique and discovery.

## Decision

Create `personas.html` as a depth page under Pillar 2 (The System), after Signals in the sub-nav. The page renders all 178 registry entities as filterable cards with archetype cards at the top.

Sub-nav label in CLAUDE.md and site-ia.md was originally specified as "Persona Catalog." The live page uses "Voices" in the sub-nav. As of 2026-05-20 audit, this is a documented inconsistency (GAP-IA-001). Resolution pending L0 approval (TASK-008).

## Alternatives Considered

- **Keep personas as a section of work-system.html:** Rejected — the system tab was already 55KB; a full persona catalog would have made the page unmanageable.
- **External persona browser only:** Rejected — the browser generator produces 178 detail pages, but the site needs a curated hub page with context and filters.

## Consequences

- All 9 P2 pages needed sub-nav update to include the Personas link.
- content-map.md gained 8 persona claim mappings.
- Persona count on the page (178 at time of creation) will require periodic sync as registry grows.
- Persona count sync is a recurring maintenance task — tracked as GAP-CM-001 (2026-05-20: 242 in registry vs 178 on site).

## Validation

- `personas.html` present in docs/, ~79KB.
- All P2 sub-navs link to personas.html.
- CON-SITE-007 passes for all P2 pages.
