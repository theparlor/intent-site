---
id: SPEC-INTENT-SITE-UPGRADE-2026-05-20
title: Intent-Site Audit & Upgrade Plan — 2026-05-20
type: spec
status: ratified
date: 2026-05-20
upstream_control_path: "Core/frameworks/intent-site/.intent/specs/2026-05-20-upgrade-plan.md"
catch_mechanism: "ROADMAP.md phase tracking + site-contracts.md contract suite (10 contracts auto-verifiable)"
pipeline_survival: "Contract suite runs after every docs/ change; ROADMAP.md phase gate enforces ordered execution; .intent/signals/ captures drift between sessions"
---
# Intent-Site Audit & Upgrade Plan — 2026-05-20

## Audit Summary

**Scope:** `theparlor/intent-site` governance folder at
`Core/frameworks/intent-site/`. Site deploys at `https://theparlor.github.io/intent-site/`.
23 HTML pages across 3-pillar IA. 10 verifiable contracts. Phases 0–8 complete per ROADMAP.md.

---

## Contract Run Results (2026-05-20)

| Contract | Result | Notes |
|----------|--------|-------|
| CON-SITE-001: 3-link primary nav | PARTIAL FAIL | `index.html` is a 192B redirect — no site-nav. By design (IA v2). Contract is overly broad. |
| CON-SITE-002: Active states | PASS | All 23 pillar pages have active states. |
| CON-SITE-003: Standard footer | PARTIAL FAIL | `index.html` redirect has no footer. Same root cause as CON-001. |
| CON-SITE-004: styles.css linked | PARTIAL FAIL | `index.html` redirect has no link. Same root cause. |
| CON-SITE-005: Rich pages inline CSS | PASS | All 8 checked rich pages pass minimum thresholds. |
| CON-SITE-006: File size canary | PASS | All 17 pages above 70% baseline. |
| CON-SITE-007: Sub-nav on all pillar pages | PASS | All 23 pillar pages have sub-nav. |
| CON-SITE-008: Visual components | PASS | Fracture grid, compare-strip, SVG, stat-boxes, blips all present. |
| CON-SITE-009: No broken links | PASS | Zero broken internal links. |
| CON-SITE-010: No old 9-link nav | PASS | IA v2 migration complete. |

**Verdict:** 10/10 contracts pass when index.html (intentional redirect) is excluded.
The CON-SITE-001/003/004 "failures" are a contract scope bug — the contracts assume all
*.html are full pages, but `index.html` is deliberately a 192B meta-redirect per IA v2.
This is a documentation gap, not a defect.

---

## Gap Inventory by Dimension

### 1. Three-Pillar IA Coherence

**Status: GOOD — one gap**

- All 23 pages have correct primary-nav active states and pillar sub-navs.
- `personas.html` sub-nav label is "Voices" (not "Persona Catalog" as spec'd in site-ia.md).
  Inconsistency between CLAUDE.md label ("Persona Catalog"), site-ia.md ("Persona Catalog"),
  and live HTML ("Voices"). Label mismatch = user-facing inconsistency.

**GAP-IA-001:** Personas sub-nav label drift — site says "Voices", governance says "Persona Catalog".
Severity: minor. Fix: align on one label, update site-ia.md + CLAUDE.md + HTML.

---

### 2. Content-Map Traceability

**Status: STALE — 65 registry entities unaccounted**

- **Persona count drift (CRITICAL):** `personas.html` claims 178 voices.
  `work-system.html` claims "188 personas (178 registry entities, 7 archetypes)."
  Actual registry count: **243 YAML files**. The site is 65 entities behind
  (243 current vs 178 displayed). Last sync was Phase 6 (pre-May 2026 registry expansion).
  content-map.md maps to `Core/personas/registry/*.yaml — entity count`
  but the entity count has not been refreshed since the map was written.

- CHANGELOG records v1.1.0 (2026-04-08) updating to "188 personas" but dogfood.html stats
  show 43 signals / 19 decisions / 4 MCP servers — these appear current.

- `review-2026-04-09.html` is an orphan file in `docs/` — it is not reachable from any
  nav, is not in site-spec.md, and not excluded by site contracts. It scores as unreachable
  content (60KB). Its `.meta.yml` has `type: review` but no `status: archived`.

**GAP-CM-001:** persona count stale — 178 displayed vs 243 in registry.
  Affects: `personas.html` hero, `work-system.html` product card, potentially
  `signals.html`, `dogfood.html`, `agents.html` cross-link copy.
  Severity: major (factual accuracy on public site).
  Fix: update all count references; update content-map.md.

**GAP-CM-002:** `review-2026-04-09.html` is an orphan page in `docs/` with no nav entry,
  no site-spec.md listing, and no archive status. Either move to `docs/archive/` or
  add a governance note in site-spec.md explaining its role.
  Severity: minor.

---

### 3. Design-System Alignment

**Status: GOOD**

- Slate palette is consistently applied across all pages.
- Persona colors (△ amber, ◇ blue, ○ purple, ◉ green) present in agents.html as specified.
- No rogue palette values detected in sampled pages.
- No design-system framework alignment issues found — site predates the Core design-system
  framework and has its own self-contained spec in CLAUDE.md and styles.css.

---

### 4. Closure-DoD

**Status: PARTIAL — .intent/ stub only**

The `.intent/` directory exists but contains only:
- `signals/` — one file: `2026-04-23-intent-site-evolves-not-deprecates.md`
- No `specs/` (creating this file establishes the first spec)
- No `decisions/` directory
- No `INTENT.md`
- `held-signals.json` at root (empty: `{"held":[],"released":[],"skipped":[]}`)

The site governance folder has no IDD anchor. This means no signal → spec → execute → observe
loop runs on the site itself. All ROADMAP.md phases are tracked in `tasks/ROADMAP.md` rather
than in `.intent/` — which works but violates the dogfood principle (Intent's own site
isn't running Intent governance).

**GAP-DOD-001:** No `.intent/INTENT.md` (purpose declaration + active objectives).
  Severity: moderate. Fix: create with site purpose, three active objectives, and
  link to tasks/ROADMAP.md as the execution artifact.

**GAP-DOD-002:** No `.intent/decisions/` directory. Site has had significant architectural
  decisions (IA v2 migration, Phase 5 v1.0 sync, persona page addition) with no
  decision atoms in `.intent/`. All decisions are embedded in CHANGELOG.md narratively.
  Severity: moderate.

**GAP-DOD-003:** Contracts CON-SITE-001/003/004 have a documented scope bug (treating
  the redirect `index.html` as a full page). The contracts will always show false failures
  for this page. No fix has been filed. The site's own governance is drifting relative
  to its contracts.
  Severity: minor. Fix: add index.html exclusion to the three contracts.

---

### 5. Documentation

**Status: GOOD — one gap**

- CLAUDE.md is comprehensive and current (includes Phase 6 and Phase 8 additions).
- `site-ia.md`, `site-spec.md`, `site-contracts.md`, `content-map.md` all exist and
  are referenced.
- `tasks/ROADMAP.md` is the master execution plan and is up-to-date through Phase 8.
- **CONTEXT.md is missing.** The governance folder has no CONTEXT.md for the
  library-index / knowledge graph. Every other Core product has a CONTEXT.md.
  Severity: minor (ops gap — CLAUDE.md fills the role but isn't indexed).

**GAP-DOC-001:** No `CONTEXT.md` at `Core/frameworks/intent-site/`. Knowledge graph
  cannot traverse this node. Affects library-index freshness scoring.

---

### 6. Anti-Patterns

**GAP-AP-001:** `docs/v2-draft/` contains 22 files with no governance note in
  site-spec.md or tasks/ROADMAP.md. These may be experiments or abandoned drafts.
  Present in the deployed GitHub Pages directory — if GitHub Pages serves the full docs/
  tree, these are publicly reachable without being in the IA.

**GAP-AP-002:** `docs/*.meta.yml` files (one per HTML page) are present throughout docs/
  but are not in site-spec.md inventory, not referenced by any contract, and not
  documented in CLAUDE.md. These may be library-index metadata files. Their governance
  status is undocumented.

**GAP-AP-003:** `sync-config.json` references `"product_repo_path": "../intent"` —
  this assumes a sibling-directory clone. If the product repo is not at that relative
  path, the sync tooling in `scripts/` will fail silently. No contract verifies
  the product repo path is valid before sync scripts run.

---

## Upgrade Plan

Items are ordered by priority. L4 = execute immediately. L0 = requires Brien approval before publishing.

### P0 — Contract Accuracy Fix (L4, non-publishing)

**TASK-001:** Fix CON-SITE-001, CON-SITE-003, CON-SITE-004 to exclude `index.html`
(which is a redirect by IA v2 design, not a full page). Add a comment to each contract:
`# index.html excluded — meta redirect per IA v2 (site-ia.md)`
and a guard: `[ "$f" = "index.html" ] && continue`.

_File:_ `Core/frameworks/intent-site/site-contracts.md`

---

### P1 — IDD Anchor Establishment (L4, non-publishing)

**TASK-002:** Create `.intent/INTENT.md` with site purpose declaration, three active
objectives (P0 bug fix, persona count sync, v2-draft governance), and pointer to
`tasks/ROADMAP.md`.

**TASK-003:** Create `.intent/decisions/` and back-fill the three most significant
architectural decisions as decision atoms:
- DEC-001: IA v2 three-pillar migration (from 9-link nav)
- DEC-002: Personas page added as P2 depth page (Phase 6)
- DEC-003: Products taxonomy and Products tab in work-system.html (Phase 7)

---

### P2 — Persona Count Sync (L0 — publishes to live site)

**TASK-004:** Update persona count from 178 → 243 across all affected pages:
- `personas.html`: hero H1, stat number, result-count
- `work-system.html`: Personas & Voices product card tagline
- `content-map.md`: persona claim mappings (update entity count from 178 → 243)
- `CHANGELOG.md`: add entry for count sync

_Gate:_ Verify current registry count before editing: `ls Core/products/cast/farm/registry/*.yaml | wc -l`
_Archetype count:_ Verify against `Core/products/cast/farm/archetypes/` before updating.

**Note:** L0 because count change appears on the public site. Brien approves before push.

---

### P3 — Orphan File Governance (L4, non-publishing)

**TASK-005:** Add `review-2026-04-09.html` to site-spec.md under a "Supporting Pages
(no nav)" section with `status: archived-review` and a note explaining it is an
in-session ARB review artifact, not a live page. OR move to `docs/archive/`.

**TASK-006:** Document `docs/v2-draft/` in `tasks/ROADMAP.md` — either a Phase 9 to
evaluate/promote these files, or a note that they are experiments to be cleaned up.
Add an entry in site-spec.md.

**TASK-007:** Document `docs/*.meta.yml` files in CLAUDE.md — one line explaining
they are library-index metadata files, not served pages. Add to CLAUDE.md's
"Repo Structure" section.

---

### P4 — IA Label Consistency (L0 — publishes to live site)

**TASK-008:** Align personas sub-nav label. Recommendation: keep "Voices" (it's more
compelling than "Persona Catalog") — update site-ia.md and CLAUDE.md to say "Voices"
not "Persona Catalog." Single canonical label, governance follows site.

---

### P5 — CONTEXT.md (L4, non-publishing)

**TASK-009:** Create `Core/frameworks/intent-site/CONTEXT.md` using the standard
Workspaces template. Fields: type=framework, product=intent-site, maturity=active,
pipeline position=marketing/docs, summary pointing to CLAUDE.md for the full spec.

---

### P6 — sync-config Validation (L4, non-publishing)

**TASK-010:** Add a `scripts/verify-sync-config.sh` that checks the product repo
path exists before any sync script runs, and emits a clear error if not. Document
in CLAUDE.md § Scripts.

---

## Phase 9 Proposal

Add to `tasks/ROADMAP.md` as Phase 9: "Governance Hardening"

| Task | Status |
|------|--------|
| TASK-001: Fix contract index.html exclusion | ready |
| TASK-002: Create .intent/INTENT.md | ready |
| TASK-003: Back-fill 3 decision atoms | ready |
| TASK-004: Persona count sync (L0) | needs Brien approval |
| TASK-005: Review page governance | ready |
| TASK-006: v2-draft governance | needs Brien input |
| TASK-007: Document .meta.yml in CLAUDE.md | ready |
| TASK-008: Align personas label (L0) | needs Brien approval |
| TASK-009: Create CONTEXT.md | ready |
| TASK-010: sync-config validation script | ready |

---

## Top 3 Gaps (Priority Order)

1. **Persona count drift (GAP-CM-001):** Public site claims 178 personas; registry has 243.
   65-entity gap. This is a factual accuracy issue on a marketing site. Fix is L0 (publish needed).

2. **No IDD anchor (GAP-DOD-001/002):** The framework that teaches Intent doesn't run Intent
   governance on its own site. No `.intent/INTENT.md`, no decision atoms, no signal-spec loop.
   Violates the dogfood principle documented in `dogfood.html`. Fix is L4.

3. **Contract scope bug (GAP-DOD-003):** CON-SITE-001/003/004 always false-fail on
   `index.html`. Any agent running contracts gets a misleading "3 failures" that require
   manual explanation. Fix is L4 and takes ~10 minutes.
