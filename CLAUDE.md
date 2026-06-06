---
title: Claude
type: framework
maturity: final
confidentiality: shareable
reusability: universal
domains:
  - consulting-operations
created: 2026-03-31
depth_score: 4
depth_signals:
  file_size_kb: 8.5
  content_chars: 8147
  entity_count: 0
  slide_count: 0
  sheet_count: 0
  topic_count: 1
  has_summary: 0
vocab_density: 0.25
---
# Intent Site — Development Continuity Guide

> This file exists so that any AI agent or human contributor can work on the Intent marketing and documentation site. Read this first.

## What Is This Repo?

This repo (`theparlor/intent-site`) contains the marketing and documentation site for Intent, a team operating model for AI-augmented product teams. The product itself lives in `theparlor/intent`.

**Owner:** Brien (theparlorhq@gmail.com) — solo practitioner, The Parlor
**Site:** https://theparlor.github.io/intent-site/
**Product repo:** github.com/theparlor/intent

## Design System

### Palette — "behind-the-veil" family (IA v3, 2026-06-05; single source: `docs/styles.css`)
- Background (base): `#0b0f14` (darker graphite-metal; was slate `#0f172a`)
- Surface: `#151b23` (was `#1e293b`)
- Border: `#334155`
- Text: `#f1f5f9`
- Muted text: `#94a3b8`
- Dim text: `#64748b`
- **Heat accent: `#f7660a`** — the veil-tier "heat," shared with Parallax (`--altitude`) + portfolio (`--molten`). Used for the logo mark, primary CTAs, the hero highlight. Body type stays system-sans; headings/nav use **Montserrat**; code stays SF Mono.

**SEMANTIC colors — do NOT repurpose for chrome** (they encode meaning):
- Accent blue: `#3b82f6` · Accent amber: `#f59e0b` · Accent green: `#10b981` · Accent purple: `#8b5cf6` · Accent red: `#dc2626`
- Map to loop phases (Notice=amber, Spec=blue, Execute=green, Observe=purple), trust levels (L0–L4), and the persona symbols below.

### Persona Colors
- Architect (△): `#f59e0b` (amber)
- PM (◇): `#3b82f6` (blue)
- Design/QA (○): `#8b5cf6` (purple)
- Agent (◉): `#10b981` (green)

## Site Information Architecture (IA v3 — Four Zones)

**IMPORTANT: Read `site-ia.md` for the full IA specification. This section is the summary.**

The site is ONE site with ONE nav (Phase 10, 2026-06-05, DEC-004). Primary nav = 4 zone links + logo. Every page carries the same primary nav + a within-zone sub-nav. Prior eras are archived under `docs/archive/` (`v1-2-multi-framing`, `v1-3-three-pillar`, `v2-draft`) plus the tag `intent-site-pre-overhaul-2026-06-05`. **Do NOT reintroduce a second IA at root or a banner that punts to another draft.**

### Primary Nav (ALL pages except index.html)
```html
<nav class="site-nav">
  <a href="index.html" class="logo"><span>I</span>ntent</a>
  <a href="index.html">The Hypothesis</a>
  <a href="the-system.html">The System</a>
  <a href="the-build.html">The Build</a>
  <a href="the-proof.html">The Proof</a>
</nav>
```
The page's home-zone link gets `class="active"`. The logo links to `index.html` (the home, at the default root).

### Zone 1 — The Hypothesis (index.html is hero, served at the default root)
Pages: index, concept-brief, lineage, roadmap, when-not, who-loses, ending, neutral-zone
Sub-nav: Overview · Concept Brief · Lineage · Roadmap · When Not · Who Loses · The Ending · Neutral Zone

### Zone 2 — The System (the-system.html is hub)
Pages: the-system, methodology, walkthrough, work-system, signals, personas, event-catalog, observe, getting-started
Sub-nav: Overview · Methodology · Walkthrough · Work System · Signals · Voices · Events · Observe · Start

### Zone 3 — The Build (the-build.html is hub)
Pages: the-build, architecture, system-diagram, flow-diagram, observability, arb, decisions, schemas, agents, deployment, native-repos
Sub-nav: Overview · Architecture · System Map · Flow · Observability · ARB · Decisions · Schemas · Agents · Deployment · Repos

### Zone 4 — The Proof (the-proof.html is hub)
Pages: the-proof, dogfood, products (Governed Repos), review-2026-04-09 (Panel Review)
Sub-nav: Overview · Dogfood · Governed Repos · Panel Review
**Organizing principle:** dogfood-evidence — "Intent governs N real repos" as *evidence*, never a catalog to buy.

### Index / Visual Brief / Doorways
`index.html` IS the home/hero, served at the default root (the `pitch.html` URL is retired; the hero content lives directly at `index.html`). `visual-brief.html` is a CTA off the home (primary nav only, no sub-nav). Honest doorways link to the real **Parallax** (`parallax-site`) + **portfolio** (`portfolio-site`) surfaces; the 21-product worldview is NOT enumerated here (DEC-004 / CON-SITE-011). Re-scoping intent-site into the worldview surface was rejected 8/8 — do not reopen it.

## CSS Strategy — CRITICAL RULES

**All pages link `styles.css` for shared foundation (nav, palette, typography, footer, grid, cards) AND keep page-specific CSS in inline `<style>` blocks.**

**Light pages** (methodology, concept-brief, schemas, flow-diagram, visual-brief)
Small or no `<style>` block. Most styling comes from styles.css.

**Rich pages** (pitch, dogfood, arb, roadmap, signals, architecture, agents, deployment, work-system, native-repos, walkthrough, observe, getting-started, system-diagram, observability, decisions, event-catalog)
Extensive `<style>` blocks with page-specific visual components. **Never strip or reduce inline `<style>` blocks from these pages.** The page-specific CSS IS the page's value.

## Content Preservation Rules

1. **Never reduce a page's file size by more than 20%** without explicit human approval.
2. **Never replace a page with a skeleton/placeholder.**
3. **Visual components are content.** Tech radar grids, SVG loop diagrams, comparison strips, timeline visualizations, stat box layouts — these are not decoration.
4. **When resolving merge conflicts on HTML files, prefer the LARGER version.**

## Footer (ALL pages)
```html
<footer>
  <p>Source: <a href="https://github.com/theparlor/intent">github.com/theparlor/intent</a> · Built with the Intent methodology</p>
</footer>
```

## Repo Structure

```
intent-site/
├── docs/              ← GitHub Pages source
│   ├── *.html         ← Four-zone pages (Hypothesis/System/Build/Proof) + index redirect + visual-brief + review artifact
│   ├── *.meta.yml     ← Library-index metadata sidecar files (one per HTML page; not served pages)
│   ├── styles.css     ← Shared stylesheet
│   ├── diagrams/      ← Mermaid source files for diagram pages
│   ├── archive/       ← Prior IA eras, frozen + browsable: v1-2-multi-framing/ · v1-3-three-pillar/ · v2-draft/ (each has an ARCHIVE.md)
│   └── visual-brief-app/  ← Vite-built React app
├── .intent/           ← Intent governance (IDD anchor, decisions, signals)
│   ├── INTENT.md      ← Purpose declaration + active objectives
│   ├── decisions/     ← Architectural decision atoms (DEC-001, DEC-002, DEC-003)
│   └── signals/       ← Drift signals and session observations
├── CONTEXT.md         ← Knowledge graph entry (library-index metadata)
├── site-ia.md         ← IA specification (three pillars)
├── site-spec.md       ← Page inventory, baselines, visual components
├── site-contracts.md  ← 10 verifiable assertions
├── content-map.md     ← Maps site claims → product repo specs
├── tasks/             ← Task specs for agent handoff
│   └── ROADMAP.md     ← **MASTER EXECUTION PLAN — READ THIS FIRST**
├── scripts/           ← Utility scripts (sync, verify)
├── CLAUDE.md          ← THIS FILE
└── README.md          ← Site development guide
```

**Note on `docs/*.meta.yml` files:** Each HTML page has a corresponding `.meta.yml` sidecar file. These are library-index metadata files used by the knowledge graph to index and score the page. They are not served pages and are not part of the site IA. Do not delete them — the library-index scanner depends on them.

## Scripts

| Script | Purpose |
|--------|---------|
| `scripts/sync-signals.js` | Syncs signals from the product repo into the site (reads `sync-config.json`) |
| `scripts/verify-sync-config.sh` | Validates `sync-config.json sync.product_repo_path` resolves before any sync script runs. **Run this before sync-signals.js.** |

## Diagram Source Policy

**Every interactive diagram page MUST link to its Mermaid source file.** The interactive page is the storytelling surface; the Mermaid source is the working artifact engineers copy into PRs and docs. Mermaid files live in `docs/diagrams/`. See `site-ia.md` § Diagram Source Policy for the full spec.

## Governance Files

- `site-ia.md` — Full IA specification with page assignments and nav templates
- `site-spec.md` — Canonical page inventory with CSS strategy, file size baselines
- `site-contracts.md` — Verifiable assertions. **Run after ANY change to docs/**
- `content-map.md` — Maps every factual claim to its source in the product repo
- `tasks/ROADMAP.md` — Master execution plan with phase status and verification scripts

## Agent Handoff Protocol

### Before Starting ANY Task

1. **Read these files first, IN THIS ORDER:**
   - `CLAUDE.md` (this file)
   - `tasks/ROADMAP.md` — **master execution plan with phase status and verification scripts**
   - `site-ia.md` — three-pillar IA structure
   - `site-spec.md` — page inventory and baselines
   - `site-contracts.md` — verifiable assertions

2. **Follow the ROADMAP.** It tells you which phase is current, what to execute next, and how to verify. Do NOT skip phases. Do NOT parallelize across phases.

3. **Run contracts before AND after changes.**

4. **Check `tasks/` for individual task specs** if the roadmap references them.

### Verification (run after EVERY change to docs/)

```bash
cd docs/
for f in *.html; do SIZE=$(wc -c < "$f"); echo "$SIZE $f"; done | sort -rn
# Then run full contracts from site-contracts.md
```

### Content Freshness

The site makes claims about the product. Before editing, verify claims against the product repo (`theparlor/intent`):
- Trust formula → `spec/signal-trust-framework.md`
- CLI tools → `bin/`
- Event types → `spec/event-catalog.md`
- Agent definitions → `servers/`

See `content-map.md` for the full mapping.
