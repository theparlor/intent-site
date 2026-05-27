---
title: Positioning
type: framework
maturity: final
confidentiality: internal
reusability: adaptable
created: 2026-05-21
depth_score: 2
depth_signals:
  file_size_kb: 4.6
  content_chars: 4363
  entity_count: 0
  slide_count: 0
  sheet_count: 0
  topic_count: 0
  has_summary: 0
vocab_density: 0.69
---
# Intent Site — Positioning

> What Intent Site IS: the public marketing and documentation surface for the Intent framework.

---

## What Is Intent Site?

Intent Site is the external face of Intent — the team operating model for AI-augmented product teams. It is what practitioners, engineers, and collaborators see when they arrive cold. It does three things:

1. **Convinces** — creates the visceral "something is broken, here's what's different" reaction (The Story pillar).
2. **Demonstrates** — shows Intent as a working system, not just a concept (The System pillar).
3. **Explains** — exposes the technical architecture and governance for builders and evaluators (The Build pillar).

The site is built with, and governed by, Intent itself. The governance folder is the dogfood proof.

---

## What It Is NOT

- Not the product. The product is [`theparlor/intent`](https://github.com/theparlor/intent) — the methodology spec, CLI tools, MCP servers, and signal pipeline.
- Not a CMS or app. It is static HTML deployed to GitHub Pages with no build step.
- Not a wiki. It is a curated, intentional narrative — three acts, ordered, with a point of view.

---

## Who It's For

| Audience | Entry point | What they need |
|----------|-------------|---------------|
| Practitioners (PMs, designers, coaches) | pitch.html → The Story | The "why this matters" emotional + conceptual hook. Concept brief, methodology walkthrough. |
| Engineers evaluating adoption | work-system.html → The System | How it actually works. Live dogfood, schema contracts, event catalog, getting started guide. |
| Architects and technical evaluators | architecture.html → The Build | MCP server topology, agent definitions, deployment options, ADRs, tech radar. |
| Collaborators arriving cold | pitch.html | Fast orientation: what is this, why does it exist, how do I go deeper. |

---

## What Makes Intent Site Distinctive

**It doesn't explain Intent. It demonstrates it.**

Most framework documentation describes the system abstractly. Intent Site runs the system live:

- The `docs/dogfood.html` page shows Intent's own signal stream, specs, and event log — the system building itself.
- The `.intent/` governance folder uses Intent's own IDD anchor, decisions, and signals.
- Every claim on every page maps back to a source of truth in the product repo (`content-map.md`).

The site is proof, not description.

---

## Positioning Statement

> Intent is a team operating model for AI-augmented product teams. It replaces the coordination tax of tickets, standups, and fragmented docs with a structured signal → spec → execute → observe loop. The loop runs at AI speed. The site is the first thing you see when you arrive — and it proves the model works by running on itself.

---

## The Three-Pillar Story Arc

The three-pillar IA (`site-ia.md`) maps onto a deliberate narrative:

| Pillar | Act | Question it answers |
|--------|-----|---------------------|
| The Story | Act 1 — Why | "Something is broken. Here's what's different." |
| The System | Act 2 — How | "Here's how it actually works, live, in production." |
| The Build | Act 3 — What | "Here's how it's constructed and governed." |

A visitor who arrives convinced by the pitch naturally moves to The System to see proof, then to The Build to evaluate the technical depth. The site is designed to support that journey without forcing it.

---

## Relationship to the Product Repo

The site makes claims. The product repo (`theparlor/intent`) is the source of truth for every claim.

```
content-map.md  ←  maps site pages to product repo source files
                    updated whenever product repo changes
                    used to identify which pages need refreshing
```

The site never makes up facts. If a claim can't be sourced to the product repo, it doesn't belong on the site.

---

## Governance

The site runs Intent governance on itself:

| Layer | Artifact |
|-------|----------|
| Notice | `.intent/INTENT.md` — purpose declaration + active objectives |
| Spec | `tasks/ROADMAP.md` — phase execution plan |
| Execute | `docs/` — the live pages |
| Observe | `site-contracts.md` — 10 verifiable assertions; `.intent/signals/` — drift signals |

This is the dogfood principle made operational. If the governance folder doesn't run Intent governance, the site is lying about Intent.
