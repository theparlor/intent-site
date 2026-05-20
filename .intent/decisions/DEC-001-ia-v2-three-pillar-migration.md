---
id: DEC-001
title: IA v2 — Three-Pillar Migration (from 9-link primary nav)
date: 2026-03-31
status: accepted
supersedes: null
---
# DEC-001: IA v2 — Three-Pillar Migration

## Context

The original site had a 9-link primary nav with direct links to methodology, concept-brief, schemas, flow-diagram, arb, dogfood, roadmap, and others. As the site grew beyond 18 pages, the flat nav became unwieldy and broke the site's ability to communicate a coherent mental model.

## Decision

Migrate to a three-pillar IA: The Story (pitch.html hero) / The System (work-system.html hero) / The Build (architecture.html hero). The primary nav carries exactly 3 pillar links plus the logo. Each pillar has a hero page and a sub-nav for depth pages.

`index.html` becomes a 192B meta-redirect to `pitch.html`, not a full page. This is intentional — it is not a failure of CON-SITE-001/003/004.

## Alternatives Considered

- **Flat mega-nav with categories:** Rejected — too many clicks, no clear entry point for cold visitors.
- **Sidebar nav:** Rejected — site is marketing-first, not docs-first. Sidebar signals tool documentation.

## Consequences

- All pages need updated nav HTML (one-time migration, verified by CON-SITE-010).
- CON-SITE-001/003/004 must exclude `index.html` — it is not a full page by design.
- The logo always links to `index.html` (the redirect), not `pitch.html` directly.

## Validation

- CON-SITE-010 passes: zero old 9-link nav remnants in any page.
- CON-SITE-001/007 pass for all 23 pillar pages.
- `index.html` verified at 192B (redirect only, no nav/footer/styles needed).
