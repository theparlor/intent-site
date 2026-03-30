# Intent — Marketing & Documentation Site

The product site for [Intent](https://github.com/theparlor/intent), a team operating model for AI-augmented product teams.

**Live at:** https://theparlor.github.io/intent-site/

## Structure

```
intent-site/
├── docs/              ← GitHub Pages source (18 HTML pages + styles.css)
├── site-ia.md         ← Information architecture specification
├── site-spec.md       ← Page inventory and file size baselines
├── site-contracts.md  ← Verifiable assertions (run after any change)
├── content-map.md     ← Maps site claims → product repo specs
├── tasks/             ← Task specs for agent handoff
├── CLAUDE.md          ← Agent development guide
└── README.md          ← This file
```

## Three-Pillar Navigation

| Pillar | Hero Page | Depth Pages |
|--------|-----------|-------------|
| **The Story** | pitch.html | concept-brief, methodology, roadmap |
| **The System** | work-system.html | flow-diagram, schemas, signals, dogfood, event-catalog |
| **The Build** | architecture.html | agents, deployment, arb, decisions, native-repos |

## Development

Read `CLAUDE.md` before making changes. Run contract checks from `site-contracts.md` after any modification to `docs/`.

## Product Repo

The Intent methodology, CLI tools, MCP servers, and signal pipeline live in [theparlor/intent](https://github.com/theparlor/intent).
