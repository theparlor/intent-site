# How to Use — Intent Site Contributor Guide

> For humans and agents who want to edit site content, run contracts, or preview locally.

---

## Before You Touch Anything

1. Read [`CLAUDE.md`](../CLAUDE.md) — the authoritative agent development guide.
2. Read [`ARCHITECTURE.md`](../ARCHITECTURE.md) — three-pillar IA and deploy chain.
3. Read [`site-contracts.md`](../site-contracts.md) — the 10 verifiable assertions you must pass.

If you skip these, you will break something.

---

## Editing Site Content

### Where Pages Live

All served pages live in `docs/`. Each page has a companion `.meta.yml` sidecar — do not delete those.

```
docs/
├── pitch.html          ← Pillar 1 hero (The Story)
├── work-system.html    ← Pillar 2 hero (The System)
├── architecture.html   ← Pillar 3 hero (The Build)
├── *.html              ← All depth pages
├── styles.css          ← Shared stylesheet — edit with care
└── diagrams/           ← Mermaid source files (not served as pages)
```

### CSS Rules — Critical

Every page links `styles.css` for shared foundation. Page-specific CSS stays in inline `<style>` blocks inside the HTML file.

- **Light pages** (methodology, concept-brief, schemas, flow-diagram, visual-brief): minimal inline CSS is expected and correct.
- **Rich pages** (pitch, dogfood, arb, roadmap, signals, architecture, agents, deployment, work-system, native-repos, walkthrough, observe, getting-started, system-diagram, observability, decisions, event-catalog): these have extensive inline `<style>` blocks. **Never strip or reduce them.** The page-specific CSS is the visual content.

### Content Preservation Rules

- Never reduce a page's file size by more than 20% without Brien's explicit approval.
- Never replace a page with a skeleton or placeholder.
- Visual components (SVG diagrams, tech radar grids, stat boxes, timeline strips) are content, not decoration.
- When resolving merge conflicts on HTML files, prefer the larger version.

### Updating Factual Claims

The site makes claims about the product (`theparlor/intent`). Before editing any claim:

1. Open [`content-map.md`](../content-map.md) and find the row for your page.
2. Verify the claim against the listed source file in the product repo.
3. Update the claim to match the source, not memory.

If you're adding a new claim, add a row to `content-map.md` mapping it to its source.

---

## Running Contracts Locally

Contracts are the 10 verifiable assertions in [`site-contracts.md`](../site-contracts.md). Run them **before AND after** any change to `docs/`.

### Quick Size Check

```bash
cd docs/
for f in *.html; do SIZE=$(wc -c < "$f"); echo "$SIZE $f"; done | sort -rn
```

Compare against the baselines in `site-spec.md`. If a file shrinks by more than 20% relative to its baseline, investigate before committing.

### Full Contract Suite

Open `site-contracts.md` and run each assertion manually. Most are grep checks:

```bash
# Example: verify all pages link styles.css
grep -L 'styles.css' docs/*.html

# Example: verify all pages have the correct primary nav
grep -L 'The Story\|The System\|The Build' docs/*.html
```

The full contract list with exact checks is in `site-contracts.md`.

---

## Previewing Locally

No build step required. Open any HTML file directly:

```bash
# Option 1: open directly in browser
open docs/pitch.html

# Option 2: serve with Python (enables relative CSS/JS paths to resolve correctly)
cd /path/to/intent-site/docs
python3 -m http.server 8080
# → http://localhost:8080/pitch.html
```

---

## Adding a New Page

1. Create `docs/[page-name].html` following the nav template in `CLAUDE.md § Primary Nav`.
2. Assign the page to a pillar and add it to the correct sub-nav.
3. Create `docs/[page-name].html.meta.yml` sidecar (library-index metadata).
4. Add the page to `site-spec.md` (inventory + CSS strategy classification).
5. Update `site-ia.md` if the page changes the pillar structure.
6. Add any factual claims to `content-map.md`.
7. Run contracts. Fix failures before committing.

---

## Publishing

**Publishing to the live site is L0** — Brien's explicit approval required. Never push to `gh-pages` or any public branch without that approval.

Local commits are L4. The deploy chain is:

```
git push origin main  →  GitHub Pages auto-builds from docs/  →  live in ~30s
```

---

## Getting Help

- Architecture questions: `ARCHITECTURE.md`
- Page structure / nav templates: `CLAUDE.md`
- What a page should contain: `site-ia.md`
- Whether a claim is accurate: `content-map.md` → product repo
- What changed recently: `.intent/signals/` and `tasks/ROADMAP.md`
