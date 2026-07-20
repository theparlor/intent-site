---
title: Readme
type: framework
maturity: final
confidentiality: shareable
reusability: universal
domains:
  - consulting-operations
created: 2026-03-31
updated: 2026-05-20
---
# Intent — Marketing & Documentation Site

The public marketing and documentation site for [Intent](https://github.com/theparlor/intent), a team operating model for AI-augmented product teams.

**Live at:** https://theparlor.github.io/intent-site/
**Governance folder:** `Workspaces/Core/frameworks/intent-site/`

## Quick Links

| Resource | Purpose |
|----------|---------|
| [`CLAUDE.md`](CLAUDE.md) | Full agent development guide — **read before making any change** |
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | Three-pillar IA, content-map traceability, deploy chain |
| [`tasks/ROADMAP.md`](tasks/ROADMAP.md) | Master phase execution plan |
| [`site-contracts.md`](site-contracts.md) | 10 verifiable assertions — run after every `docs/` change |
| [`docs/how-to-use.md`](docs/how-to-use.md) | Editing site content; running contracts locally |
| [`docs/positioning.md`](docs/positioning.md) | What Intent Site IS — public marketing/documentation surface |

## Three-Pillar Navigation

The site is organized into three pillars. Primary nav has exactly 3 links (plus logo).

| Pillar | Hero Page | Depth Pages |
|--------|-----------|-------------|
| **The Story** | pitch.html | concept-brief, methodology, walkthrough, roadmap |
| **The System** | work-system.html | flow-diagram, system-diagram, schemas, signals, personas, dogfood, observe, event-catalog, getting-started |
| **The Build** | architecture.html | agents, deployment, observability, arb, decisions, native-repos, products |

## Repo Structure

```
intent-site/
├── docs/              ← GitHub Pages source (34 HTML pages + styles.css)
│   ├── how-to-use.md  ← Contributor guide: editing content, running contracts
│   ├── positioning.md ← What Intent Site IS (marketing/docs surface)
│   └── examples/      ← Worked examples for contributors
├── ARCHITECTURE.md    ← Three-pillar IA + deploy chain
├── CLAUDE.md          ← Full agent development guide (read first)
├── site-ia.md         ← Information architecture specification
├── site-spec.md       ← Page inventory and file size baselines
├── site-contracts.md  ← Verifiable assertions (run after any change)
├── content-map.md     ← Maps site claims → product repo specs
└── tasks/             ← Task specs for agent handoff
    └── ROADMAP.md     ← Master execution plan
```

## Development

1. Read `CLAUDE.md` before making any change.
2. Run contracts from `site-contracts.md` before AND after any modification to `docs/`.
3. See `docs/how-to-use.md` for the contributor workflow.

## Publishing

**L0 — never push to gh-pages or the live branch without Brien's explicit approval.**
Local work is L4. Deploy chain: `git push origin main` → GitHub Pages auto-builds from `docs/` in ~30 seconds.

## Product Repo

The Intent methodology, CLI tools, MCP servers, and signal pipeline live in [theparlor/intent](https://github.com/theparlor/intent). Every factual claim on the site traces back to a source file there. See `content-map.md`.
