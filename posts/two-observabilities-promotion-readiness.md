---
title: Two-Observabilities Post — Promotion-Readiness Checklist
type: framework
created: 2026-05-27
related:
  - posts/two-observabilities.md (source markdown)
  - site-ia.md (IA definition that needs updating)
depth_score: 4
depth_signals:
  file_size_kb: 8.4
  content_chars: 8121
  entity_count: 0
  slide_count: 0
  sheet_count: 0
  topic_count: 0
  has_summary: 0
vocab_density: 0.12
status: preparation
authorizes: D4=YES (defaulted publish per Phase 1 closes record)
expected_execution_time: 30-60 minutes once started
---
# Two-Observabilities Post — Promotion-Readiness Checklist

**Status:** All preparation complete. Mechanical execution remaining.

The two-observabilities post (`posts/two-observabilities.md`) is `status: draft`. D4 (publish?) defaulted YES via the Phase 1 closes 7-day rule on 2026-06-02. This document captures everything needed to promote it from markdown post to live HTML page in Pillar 3 (The Build). Each step is mechanical — no design decisions remain.

## Promotion target

- **From:** `Core/frameworks/intent-site/posts/two-observabilities.md` (status: draft)
- **To:** `Core/frameworks/intent-site/docs/two-observabilities.html` (Pillar 3 sub-nav, slotted next to `observability.html`)

## Step 1 — Convert markdown to HTML

Use `Core/frameworks/intent-site/docs/observability.html` as the template scaffold. Copy its `<head>` (including styles + Mermaid setup), top-nav block, and sub-nav block verbatim. Replace the body content with the converted markdown from `posts/two-observabilities.md`.

**Conversion rules:**
- H1 → `<h1>` inside `<header>` block matching observability.html shape
- H2 → `<h2>` with anchor IDs derived from the heading slug
- H3 → `<h3>`
- Code fences → `<pre><code>` blocks (no Mermaid in this post — pure prose)
- Bold + italic → `<strong>` + `<em>`
- Markdown links → `<a href="...">` — preserve external (https://) and internal (relative) distinction
- Blockquote → `<blockquote>` with class="callout" (matches observability.html callouts)

**Title for `<title>` tag:** "Intent — Two Observabilities"

**Hero section:** The post's first paragraph + the cockpit-recorder metaphor should be the hero block, styled like observability.html's hero section.

## Step 2 — Create sidecar

Path: `Core/frameworks/intent-site/docs/two-observabilities.html.meta.yml`

Template (fill in `content_chars` + `vocab_density` after HTML is final):

```yaml
---
title: Two Observabilities
type: framework
maturity: final
confidentiality: shareable
reusability: universal
domains:
  - consulting-operations
created: 2026-05-26
summary: "Intent — Two Observabilities: why the cockpit voice recorder and the engine telemetry are not the same thing. Authoring observability (Entire.io) and running-system observability (OTel/Grafana stack) are siblings, not substitutes; conflating them flattens the feedback loop."
content_excerpt: "Why the cockpit recorder and the engine telemetry are not the same thing — and why software has been treating them as one. A modern airliner carries two independent recording systems. Both are called 'the black box.' Neither replaces the other..."
depth_score: 4
depth_signals:
  file_size_kb: 6.5
  content_chars: 5890
  entity_count: 0
  slide_count: 0
  sheet_count: 0
  topic_count: 1
  has_summary: 1
vocab_density: 0.51
ratifies:
  - DEC-009 (Entire.io scoped as authoring provenance — supersedes DEC-007)
references:
  - WS-DDR-099 (substrate exposure via MCP-front + repo-as-truth)
  - WS-DDR-079 (Conduit↔Witness OTel composition seam)
  - DEC-004 (file-native, git-tracked, OTel-compatible)
---
```

## Step 3 — Update Pillar 3 sub-nav on 8 pages

The sub-nav HTML block at `site-ia.md` lines 154-165 names 8 Pillar 3 pages. **Edit each of these 8 files** to add the new entry between Observability and ARB:

Files to edit:
1. `docs/architecture.html`
2. `docs/agents.html`
3. `docs/deployment.html`
4. `docs/observability.html`
5. `docs/arb.html`
6. `docs/decisions.html`
7. `docs/native-repos.html`
8. `docs/products.html`

In each file, find the `<nav class="sub-nav">` block and insert:

```html
<a href="two-observabilities.html">Two Observabilities</a>
```

Between the existing `<a href="observability.html">Observability</a>` line and `<a href="arb.html">ARB</a>` line.

**Use sed-style bulk edit (verified pattern):**
```bash
for f in architecture.html agents.html deployment.html observability.html arb.html decisions.html native-repos.html products.html; do
  sed -i.bak '/<a href="observability.html">Observability<\/a>/a\
  <a href="two-observabilities.html">Two Observabilities</a>\
' "Core/frameworks/intent-site/docs/$f"
done
# Verify, then remove .bak files
diff /tmp/before.txt /tmp/after.txt  # spot-check one file
find Core/frameworks/intent-site/docs/ -name "*.bak" -delete
```

## Step 4 — Update site-ia.md

In `Core/frameworks/intent-site/site-ia.md`, edit the Pillar 3 sub-nav definition block at lines 154-165 to include the new entry:

```html
<nav class="sub-nav">
  <a href="architecture.html">Overview</a>
  <a href="agents.html">Agents</a>
  <a href="deployment.html">Deployment</a>
  <a href="observability.html">Observability</a>
  <a href="two-observabilities.html">Two Observabilities</a>  <!-- ADD THIS LINE -->
  <a href="arb.html">ARB</a>
  <a href="decisions.html">Decisions</a>
  <a href="native-repos.html">Repos</a>
  <a href="products.html">Products</a>
</nav>
```

## Step 5 — Run site-contracts.md verification

```bash
cd /Users/brien/Workspaces/Core/frameworks/intent-site
bash scripts/verify-sync-config.sh  # or whatever the contract runner is
```

If site-contracts.md defines specific tests for navigation consistency or page presence, run those. The known checks include:
- Every Pillar 3 sub-nav block matches site-ia.md's canonical definition
- Every docs/ HTML file has a corresponding .meta.yml sidecar
- Internal links resolve

## Step 6 — Update source markdown status

In `Core/frameworks/intent-site/posts/two-observabilities.md`, flip the frontmatter:

```yaml
status: draft  →  status: promoted-to-html
promoted_at: 2026-05-27  (or actual promotion date)
canonical_html: docs/two-observabilities.html
```

The markdown source stays in `posts/` as the authoring record; the canonical externally-readable form is the HTML.

## Step 7 — Commit + push

```bash
git add docs/two-observabilities.html docs/two-observabilities.html.meta.yml \
        docs/{architecture,agents,deployment,observability,arb,decisions,native-repos,products}.html \
        site-ia.md \
        posts/two-observabilities.md
git commit -m "publish(two-observabilities): promote post to Pillar 3 sub-nav

Promotes posts/two-observabilities.md to docs/two-observabilities.html
per the promotion_path declared in the post's frontmatter and D4=YES
from the Phase 1 closes record (defaulted via 7-day rule).

- Convert MD → HTML using observability.html template
- Add Two Observabilities entry to Pillar 3 sub-nav across all 8 pages
- Update site-ia.md canonical sub-nav definition
- Create docs/two-observabilities.html.meta.yml sidecar
- Mark source markdown as promoted-to-html

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
git push origin main
```

## Validation after push

GitHub Pages will rebuild and the live URL `https://theparlor.github.io/intent-site/two-observabilities.html` should be reachable within ~2 minutes. The Pillar 3 sub-nav should show "Two Observabilities" next to Observability on every Pillar 3 page.

## What this preparation doc does NOT do

- Does not auto-promote the post (D4=YES authorizes publication, but content-quality review of the rendered HTML belongs to Brien).
- Does not convert MD to HTML (that's Step 1, kept manual to preserve the prose nuance — automated conversion risks losing the cockpit-recorder metaphor's voice).
- Does not modify any live state. This document is preparation only.

## Why this exists as a preparation doc rather than full promotion

The two-observabilities post is high-visibility content (Pillar 3 hero-adjacent placement in a public-facing site). Promotion is L4 (solo repo, reversible) but content-quality review of the rendered HTML is the right gate. This document makes the actual promotion a 30-60 minute mechanical execution when Brien has time, rather than a multi-hour task he has to scope from scratch.

This is itself an instance of the architecture-first content-sequenced principle: the surface (this preparation doc) is designed for the full population of promotion steps; the content (the actual HTML conversion + execution) sequences in tactically when Brien is ready.
