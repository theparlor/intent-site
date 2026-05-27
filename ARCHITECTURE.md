---
title: Architecture
type: framework
maturity: final
confidentiality: internal
reusability: adaptable
created: 2026-05-21
depth_score: 4
depth_signals:
  file_size_kb: 8.0
  content_chars: 7569
  entity_count: 0
  slide_count: 0
  sheet_count: 0
  topic_count: 0
  has_summary: 0
vocab_density: 0.26
---
# Intent Site — Architecture

> Three-pillar information architecture, content-map traceability, and deploy chain for the Intent framework's public site.

---

## Overview

`theparlor/intent-site` is a static-HTML site deployed to GitHub Pages at `theparlor.github.io/intent-site`. It is the public face of the Intent framework. Every factual claim the site makes traces back to a source file in the product repo (`theparlor/intent`).

The governance folder for this repo lives at:

```
Workspaces/Core/frameworks/intent-site/
```

---

## Three-Pillar Information Architecture

The site tells a story in three acts. Each act has one **hero page** (entry point) and several **depth pages** (details). The primary nav shows exactly three links.

```
index.html  →  pitch.html (redirect)
               │
               ├── Pillar 1: The Story  (pitch.html hero)
               │     concept-brief.html
               │     methodology.html
               │     walkthrough.html
               │     roadmap.html
               │
               ├── Pillar 2: The System  (work-system.html hero)
               │     flow-diagram.html, system-diagram.html
               │     schemas.html, signals.html, personas.html
               │     dogfood.html, observe.html
               │     event-catalog.html, getting-started.html
               │
               └── Pillar 3: The Build  (architecture.html hero)
                     agents.html, deployment.html, observability.html
                     arb.html, decisions.html, native-repos.html, products.html
```

Full pillar spec (purpose, page table, sub-nav order, cross-links): `site-ia.md`

---

## Content-Map Traceability

Every claim on the site maps to a source file in the product repo. The mapping lives in `content-map.md`.

| Source file (product repo) | Pages that depend on it |
|---------------------------|------------------------|
| `spec/intent-methodology.md` | pitch.html, methodology.html, flow-diagram.html |
| `spec/work-ontology.md` | work-system.html, flow-diagram.html, schemas.html |
| `spec/signal-trust-framework.md` | architecture.html, arb.html, signals.html |
| `spec/event-catalog.md` | event-catalog.html, dogfood.html |
| `spec/observability-stack.md` | observability.html, observe.html, roadmap.html |
| `spec/product-roadmap.md` | roadmap.html, arb.html |
| `spec/signal-capture-system.md` | architecture.html, signals.html |
| `spec/decision-log.md` | decisions.html, dogfood.html |
| `spec/spec-shaping-protocol.md` | agents.html, methodology.html, decisions.html |
| `spec/signal-amplification.md` | signals.html |
| `tools/intent-mcp/server.py` | architecture.html, deployment.html |
| `servers/` | architecture.html, agents.html, deployment.html |
| `bin/` (CLI tools) | flow-diagram.html, roadmap.html, dogfood.html |
| `.intent/events.jsonl` + `.intent/signals/` | walkthrough.html, observe.html, getting-started.html |
| `CLAUDE.md` (Three-Layer + Key Decisions) | architecture.html, pitch.html, decisions.html, roadmap.html |
| `knowledge-engine/AGENTS.md` | architecture.html, schemas.html |
| `Core/products/cast/farm/registry/` | personas.html, agents.html, arb.html, methodology.html |

When the product repo changes, run `content-map.md` as a checklist — it identifies every page that needs updating.

---

## Deploy Chain

```
theparlor/intent-site (GitHub repo)
  └── docs/              ← GitHub Pages source root
       ├── *.html        ← All pages served directly
       ├── styles.css    ← Shared stylesheet
       └── diagrams/     ← Mermaid source files

Deploy trigger: push to main → GitHub Pages auto-builds from docs/
Live URL: https://theparlor.github.io/intent-site/
Branch: main (GitHub Pages configured to serve docs/ on main)
```

**No build step.** The site is pure static HTML + CSS. There is no bundler, no SSG, no CI pipeline. `git push` → live in ~30 seconds.

**Local preview:** open any `docs/*.html` in a browser directly, or serve with:

```bash
cd /path/to/intent-site/docs
python3 -m http.server 8080
# → http://localhost:8080
```

**L0 publishing rule:** never push to `gh-pages` or the live branch without Brien's explicit approval. Local work is L4. Publishing is L0.

---

## Repo Layout

```
intent-site/
├── docs/                    ← GitHub Pages source (23 HTML pages)
│   ├── *.html               ← All pillar pages + index.html redirect + visual-brief.html
│   ├── *.meta.yml           ← Library-index sidecar files (not served; do not delete)
│   ├── styles.css           ← Shared stylesheet
│   ├── diagrams/            ← Mermaid source files for diagram pages
│   ├── v2-draft/            ← Experimental drafts (governance pending Phase 9)
│   └── visual-brief-app/    ← Vite-built React app
├── .intent/                 ← Intent governance
│   ├── INTENT.md            ← IDD anchor (Notice layer)
│   ├── decisions/           ← Architectural decision atoms (DEC-001–DEC-003)
│   └── signals/             ← Drift signals and session observations
├── ARCHITECTURE.md          ← This file
├── CLAUDE.md                ← Full agent development guide (read first)
├── CONTEXT.md               ← Knowledge-graph metadata entry
├── README.md                ← Site development guide
├── content-map.md           ← Claims → product repo mapping
├── site-ia.md               ← Three-pillar IA specification
├── site-spec.md             ← Page inventory + CSS strategy + file-size baselines
├── site-contracts.md        ← 10 verifiable assertions (run after every docs/ change)
├── tasks/
│   └── ROADMAP.md           ← Master phase execution plan
└── scripts/
    ├── sync-signals.js      ← Sync signals from product repo
    └── verify-sync-config.sh ← Validate sync-config.json before sync
```

---

## CSS Architecture

Every page links `styles.css` for the shared foundation and carries page-specific CSS in inline `<style>` blocks.

- **Light pages** — minimal inline CSS; most styling from styles.css (methodology, concept-brief, schemas, flow-diagram, visual-brief)
- **Rich pages** — extensive inline `<style>` blocks with page-specific visual components; never strip these (pitch, dogfood, arb, roadmap, signals, architecture, agents, deployment, work-system, native-repos, walkthrough, observe, getting-started, system-diagram, observability, decisions, event-catalog)

Full CSS strategy in `CLAUDE.md § CSS Strategy`.

---

## Content Preservation Invariants

1. Never reduce a page's file size by more than 20% without explicit human approval.
2. Never replace a page with a skeleton or placeholder.
3. Visual components (SVG diagrams, tech radar grids, timeline visualizations, stat boxes) are content — not decoration.
4. When resolving merge conflicts on HTML files, prefer the larger version.

---

## Governance Layer

| Artifact | Role |
|----------|------|
| `.intent/INTENT.md` | IDD anchor — purpose declaration + active objectives |
| `site-contracts.md` | 10 verifiable assertions — run after every `docs/` change |
| `tasks/ROADMAP.md` | Master execution plan — phase status + verification scripts |
| `content-map.md` | Claims traceability — product repo as source of truth |
| `.intent/decisions/` | Architectural decision atoms |
| `.intent/signals/` | Drift signals captured between sessions |

---

## Phase Status

| Phase | Description | Status |
|-------|-------------|--------|
| 0–8 | Site build, IA v2 migration, pillar nav, page completions | Complete |
| 9 | Governance hardening (IDD anchor, contract fixes, orphan governance) | In progress |

Current phase detail: `tasks/ROADMAP.md`
