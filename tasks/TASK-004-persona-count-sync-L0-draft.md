---
id: TASK-004
title: Persona Count Sync — L0 Draft (awaiting Brien publish approval)
type: task
status: ready-for-brien-approval
gate: "external-comms-boundary — content visible on public marketing site theparlor.github.io/intent-site/"
created: 2026-05-20
---
# TASK-004: Persona Count Sync 178 → 242

## Gate

L0 required. This task edits `docs/` files that deploy to the live public site.
**Do NOT apply these edits until Brien approves.**

Named gate: `external-comms-boundary` — changes appear on `https://theparlor.github.io/intent-site/`.

## Verified Counts (2026-05-20)

```bash
ls Core/products/cast/farm/registry/*.yaml | wc -l   # → 242
ls Core/products/cast/farm/archetypes/               # → 14 directories
```

## Edits Required

### 1. `docs/personas.html`

| Line | Current | New |
|------|---------|-----|
| ~394 | `<h1>178 Voices. 7 <span class="accent">Archetypes.</span></h1>` | `<h1>242 Voices. 14 <span class="accent">Archetypes.</span></h1>` |
| ~402 | `<div class="num">178</div>` | `<div class="num">242</div>` |
| ~625 | `Every entity in the persona registry -- 171 named-human thought leaders and 7 composite archetypes.` | `Every entity in the persona registry -- 228 named-human thought leaders and 14 composite archetypes.` |
| ~639 | `<div class="result-count" id="resultCount">Showing 178 voices</div>` | `<div class="result-count" id="resultCount">Showing 242 voices</div>` |

### 2. `docs/work-system.html`

| Line | Current | New |
|------|---------|-----|
| ~1035 | `tagline: "188 personas (178 registry entities, 7 archetypes) rendered as advisory voices."` | `tagline: "242 personas (228 registry entities, 14 archetypes) rendered as advisory voices."` |

### 3. `content-map.md`

Update all persona count claims from 178 → 242 and archetype count from 7 → 14.

### 4. `CHANGELOG.md`

Add entry for count sync:
```
## 2026-05-20 — v1.2.0 Persona Count Sync

### Changed
- personas.html: hero count updated 178 → 242 voices, 7 → 14 archetypes
- work-system.html: Personas & Voices product card tagline updated to 242/228/14
- content-map.md: persona entity count mappings updated
```

## Execution

When Brien approves: apply all 4 edits above, run full contract suite, commit + push to intent-site main.
The contract suite will not flag count changes (no contract checks numeric values in HTML).
Manual verification: load personas.html and confirm hero number and result-count show 242.

## Signal

`SIG-EXEC-INTENT-SITE-L0-PERSONA-COUNT` — filed in .intent/signals/ at task creation.
