---
id: DEC-003
title: Products Taxonomy and Products Tab in work-system.html (Phase 7)
date: 2026-04-08
status: accepted
supersedes: null
---
# DEC-003: Products Taxonomy + Products Tab

## Context

By Phase 7, Intent had produced a portfolio of distinct products built with the framework: Fieldbook, Cast, Forge, Library Index, Org-Design Tooling, Loom, Topography, Voices, Throughline. These products were scattered across prose references but had no canonical structured representation on the site. The site could not answer "what has Intent produced?" without reading multiple pages.

## Decision

Create `products-taxonomy.yaml` as the canonical structured record of products built with Intent. Add a "Products" tab to `work-system.html` that renders the taxonomy as product cards with signal/decision counts, composability flows, and a GTM classification. Create `products.html` as a Pillar 3 depth page with the full taxonomy view.

## Alternatives Considered

- **Expand methodology.html to include products:** Rejected — methodology is about the framework, not its outputs.
- **Separate products site:** Rejected — premature. The intent-site is the right home until the portfolio warrants its own marketing surface.
- **Inline prose only:** Rejected — a YAML taxonomy is machine-queryable; prose is not. Other agents can read the taxonomy directly.

## Consequences

- `work-system.html` grew to 80KB (from 55KB). Still within contract bounds.
- `products-taxonomy.yaml` is the source of truth for product data; site HTML is derived.
- Products tab requires manual sync when product state changes (tracked as Phase 8 task, now DONE).
- `products.html` added to P3 sub-nav, requiring update to all 8 P3 pages.

## Validation

- `products-taxonomy.yaml` exists at intent-site root.
- `work-system.html` has Products tab with product cards.
- `products.html` exists in docs/.
- All P3 pages have Products link in sub-nav.
