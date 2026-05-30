---
id: INTENT-SITE
title: Intent Site — Purpose Declaration
type: intent
status: active
created: 2026-05-20
updated: 2026-05-20
upstream_control_path: "Core/frameworks/intent-site/.intent/INTENT.md"
catch_mechanism: "site-contracts.md (10 verifiable assertions) + tasks/ROADMAP.md phase tracking"
pipeline_survival: "Contracts run after every docs/ change; ROADMAP phase gate enforces ordered execution; .intent/signals/ captures drift between sessions"

# === lambda_settings (managed by apply_lambda_settings.py, do not edit by hand) ===
# 2026-05-29 topology-default prior (no signals — see lambda-fit-report-2026-05-29.md)
# closure_rate=0% (n=0, gold=0, sym=0, open=0)
# lift_action: N/A (no signals)
lambda_settings:
  default: 1.75
  fit_target: 1.75  # value to apply after topology and lift work lands
  last_fit: 2026-05-29
  fit_source: Core/frameworks/intent/tools/intent_signal_inventory.py
  rationale: |
    No signals yet. Topology-default prior for solo Brien-owned product (1.5-2.0 range, midpoint 1.75). Refit after 50+ signals.
# === end lambda_settings ===
---
# Intent Site — Purpose Declaration

## What Is This?

`theparlor/intent-site` is the marketing and documentation site for the Intent framework. It is the public face of Intent — the product that other agents and practitioners encounter first. The site is built with, and governed by, the Intent methodology itself.

**Live site:** https://theparlor.github.io/intent-site/
**Product repo:** github.com/theparlor/intent (source of truth for all claims)
**Governance folder:** `Core/frameworks/intent-site/`

## Purpose

1. **Communicate** — explain the Intent framework to practitioners, engineers, and collaborators arriving cold.
2. **Demonstrate** — show that Intent's own site runs Intent governance (dogfood principle; see `docs/dogfood.html`).
3. **Anchor** — provide a stable, versioned external reference for the three-pillar IA (Story / System / Build).

## Active Objectives (Phase 9 — Governance Hardening)

| Objective | Status | Spec |
|-----------|--------|------|
| Fix contract scope bug (CON-SITE-001/003/004 false-fail on index.html) | ready | TASK-001 |
| Establish IDD anchor (.intent/INTENT.md + decisions/) | in-progress | TASK-002/003 |
| Sync persona count 178 → 242 across public pages | L0 — awaiting Brien approval | TASK-004 |
| Govern orphan pages (review-2026-04-09.html, v2-draft/) | ready | TASK-005/006 |
| Document .meta.yml in CLAUDE.md | ready | TASK-007 |
| Create CONTEXT.md for knowledge graph | ready | TASK-009 |
| Add sync-config validation script | ready | TASK-010 |

## Execution Artifacts

- `tasks/ROADMAP.md` — master phase execution plan (Phases 0–8 complete; Phase 9 pending)
- `site-contracts.md` — 10 verifiable assertions (run after every docs/ change)
- `site-ia.md` — three-pillar IA specification
- `site-spec.md` — page inventory and baselines
- `content-map.md` — maps site claims → product repo specs
- `.intent/decisions/` — architectural decision atoms
- `.intent/signals/` — drift signals and session observations

## Dogfood Principle

Intent's site must itself run Intent governance. Signals go in `.intent/signals/`. Decisions go in `.intent/decisions/`. This file is the IDD anchor (Notice layer). `tasks/ROADMAP.md` is the Spec/Execute layer. The contract suite is the Observe layer.

> If this file doesn't exist, the site is not dogfooding Intent. Creating this file closes GAP-DOD-001.
