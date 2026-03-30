# Intent Site — Development Continuity Guide

> This file exists so that any AI agent or human contributor can work on the Intent marketing and documentation site. Read this first.

## What Is This Repo?

This repo (`theparlor/intent-site`) contains the marketing and documentation site for Intent, a team operating model for AI-augmented product teams. The product itself lives in `theparlor/intent`.

**Owner:** Brien (theparlorhq@gmail.com) — solo practitioner, The Parlor
**Site:** https://theparlor.github.io/intent-site/
**Product repo:** github.com/theparlor/intent

## Design System

### Unified Slate Palette
- Background: `#0f172a`
- Surface: `#1e293b`
- Border: `#334155`
- Text: `#f1f5f9`
- Muted text: `#94a3b8`
- Dim text: `#64748b`
- Accent blue: `#3b82f6`
- Accent amber: `#f59e0b`
- Accent green: `#10b981`
- Accent purple: `#a855f7`
- Accent red: `#dc2626`

### Persona Colors
- Architect (△): `#f59e0b` (amber)
- PM (◇): `#3b82f6` (blue)
- Design/QA (○): `#8b5cf6` (purple)
- Agent (◉): `#10b981` (green)

## Site Information Architecture (IA v2 — Three Pillars)

**IMPORTANT: Read `site-ia.md` for the full IA specification. This section is the summary.**

The site is organized into three pillars. The primary nav has exactly 3 links (plus logo). Each pillar has a hero page and depth pages with a sub-nav.

### Primary Nav (ALL pages)
```html
<nav class="site-nav">
  <a href="index.html" class="logo"><span>I</span>ntent</a>
  <a href="pitch.html">The Story</a>
  <a href="work-system.html">The System</a>
  <a href="architecture.html">The Build</a>
</nav>
```
One pillar link gets `class="active"` based on which pillar the current page belongs to.

### Pillar 1 — The Story (pitch.html is hero)
Pages: pitch.html, concept-brief.html, methodology.html, roadmap.html
Primary nav active: "The Story"
Sub-nav: Overview · Concept Brief · Methodology · Roadmap

### Pillar 2 — The System (work-system.html is hero)
Pages: work-system.html, flow-diagram.html, schemas.html, signals.html, dogfood.html, event-catalog.html
Primary nav active: "The System"
Sub-nav: Overview · Flow · Schemas · Signals · Dogfood · Events

### Pillar 3 — The Build (architecture.html is hero)
Pages: architecture.html, agents.html, deployment.html, arb.html, decisions.html, native-repos.html
Primary nav active: "The Build"
Sub-nav: Overview · Agents · Deployment · ARB · Decisions · Repos

### Index Page
`index.html` is a meta redirect to `pitch.html`. The logo always links to `index.html`.

### Visual Brief
`visual-brief.html` is NOT a nav destination. It's a CTA link on the pitch page.

## CSS Strategy — CRITICAL RULES

**All pages link `styles.css` for shared foundation (nav, palette, typography, footer, grid, cards) AND keep page-specific CSS in inline `<style>` blocks.**

**Light pages** (methodology, concept-brief, decisions, event-catalog, schemas, flow-diagram, visual-brief)
Small or no `<style>` block. Most styling comes from styles.css.

**Rich pages** (pitch, dogfood, arb, roadmap, signals, architecture, agents, deployment, work-system, native-repos)
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
│   ├── *.html         ← All 18 pages
│   ├── styles.css     ← Shared stylesheet
│   └── visual-brief-app/  ← Vite-built React app
├── site-ia.md         ← IA specification (three pillars)
├── site-spec.md       ← Page inventory, baselines, visual components
├── site-contracts.md  ← 10 verifiable assertions
├── content-map.md     ← Maps site claims → product repo specs
├── tasks/             ← Task specs for agent handoff
├── CLAUDE.md          ← THIS FILE
└── README.md          ← Site development guide
```

## Governance Files

- `site-ia.md` — Full IA specification with page assignments and nav templates
- `site-spec.md` — Canonical page inventory with CSS strategy, file size baselines
- `site-contracts.md` — Verifiable assertions. **Run after ANY change to docs/**
- `content-map.md` — Maps every factual claim to its source in the product repo

## Agent Handoff Protocol

### Before Starting ANY Task

1. **Read these files first:**
   - `CLAUDE.md` (this file)
   - `site-ia.md` — three-pillar IA structure
   - `site-spec.md` — page inventory and baselines
   - `site-contracts.md` — verifiable assertions
   - Any task spec in `tasks/` if referenced

2. **Run contracts before AND after changes.**

3. **Check `tasks/` for pending task specs.**

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
