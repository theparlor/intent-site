---
id: DEC-004
title: Worldview Refresh — re-scope to coherence-stack REJECTED; hold Intent-scoped + C-minimal fenced doorway
date: 2026-06-05
status: accepted
supersedes: null
decided_by: Brien (post 4-panel Voices critique)
related:
  - SIG-INTENTSITE-2026-06-05
  - .intent/specs/2026-06-05-worldview-refresh-content-plan.md
  - .intent/critiques/2026-06-05-worldview-refresh-panel-critique.md
  - DEC-20260409-02 (intent repo — one-site / target-user-committed / multi-product-framing-removed)
  - SIG-INTENTSITE-2026-04-23 (evolves-not-deprecates)
  - Core/products/parallax/spec/2026-04-23-three-tier-umbrella-and-ecosystem-design.md
---

# DEC-004: Worldview refresh — re-scope rejected; C-minimal fenced doorway

## Context

The ecosystem matured to 21 products / 17 frameworks (`Core/ECOSYSTEM-ARCHITECTURE-2026-05-20.md`) while intent-site's `products.html` still listed 8 (incl. the old `skills-engine` name) and framed Intent as a solo framework. SIG-INTENTSITE-2026-06-05 asked whether to refresh the worldview, and posed a DDR-level question: **re-scope intent-site toward the full coherence-stack worldview now, or hold it Intent + Throughline (Phase 1) with the stack deferred to Parallax Phase 3?**

Recon established that the narrow framing is largely a **ratified positioning discipline**, not staleness: an 8-panel review on 2026-04-09 killed a broader "multi-framing" intent-site (F1 no-target-user 6/8, F3 category-confusion 5/8), and `DEC-20260409-02` ratified one-site / target-user-committed / multi-product-framing-removed. The 70%-done `docs/v2-draft/` executes that narrowing.

## Decision

**Re-scope (Option B) is REJECTED** — the 4-panel Voices critique voted **B 0/8** (positioning/product/engineering/AI-minds). Adopt **C-minimal**:

1. Hold Intent as the hero with its committed single target user (staff+ engineers on teams of 2–7 using Claude Code daily); complete + publish the v2-draft narrowing.
2. Make **dogfood-evidence the organizing principle** — the stack appears as *evidence* ("Intent governs N real repos"), never as a 21-product catalog (5/8 voices independently named this the load-bearing move).
3. Add **one structurally-fenced doorway** naming Intent as the reference implementation of the coherence discipline — a single static outbound link, **zero product enumeration, no expandable section**, enforced by a new contract **`CON-SITE-011`**.

This **affirms the existing intent-site ↔ Parallax boundary**: the coherence-stack worldview is Parallax Phase-3's domain, not intent-site's. It is therefore an intent-site product-scope decision, **not a WS-DDR** (it changes no workspace structure/placement and creates no new cross-product boundary — it affirms one).

## Gates (binding on the Phase-10 rebuild)

- **Dunford gate (pre-rebuild, blocking):** name the competitive alternative the target user faces (write own `CLAUDE.md` / build `.intent/` from scratch / do nothing) before positioning copy is written.
- **Structural fence (before any `docs/*.html`):** author `CON-SITE-011` (single outbound link, zero product cards, no-expand). "C without a hard gate is B with a longer fuse" (Markus/Karpathy).
- **Torres gate (doorway wording, non-blocking on the narrowing):** validate the doorway claim against 3–5 discovery conversations with the named target user before it goes live.

## Alternatives considered

- **Option A (hold pure — no doorway):** 4 votes. Lowest risk, but Karpathy/Nate argue it leaves the coherence-discipline positioning on the table for ~12 months as the "intent-engineering" thesis lands ("name the paradigm before someone else does"). Rejected as the *floor* but not the ceiling.
- **Option B (re-scope to 21-product worldview):** 0 votes. Re-litigates `DEC-20260409-02`; re-introduces F1/F3 risk; Nate: over-claims a worldview on N=1 self-discovery; Karpathy: "a monolith with a favicon" / building Parallax in the wrong repo.

## Consequences

- Rebuild proceeds at **C-minimal** scope as ROADMAP **Phase 10** (gated above). Nothing HTML changed this session.
- `Core/ECOSYSTEM-ARCHITECTURE-2026-05-20.md` §6 still calls intent-site "deprecating" — this **contradicts** evolves-not-deprecates canon and needs a correction-propagation pass (flagged in the SPEC §6; out of scope for the rebuild).
- The recurring "broaden intent-site to show everything" question is foreclosed until Parallax activates.

## Validation criteria

- Post-rebuild panel re-review keeps F1 (no-target-user) and F3 (category-confusion) ≤ 1/8 (the 2026-04-09 plan's bar).
- `CON-SITE-011` passes: the doorway is a single outbound link with zero enumerated product names.
- The dogfood surface frames products as governed-repos evidence, not a catalog-to-buy.
