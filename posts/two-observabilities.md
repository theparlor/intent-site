---
title: Two Observabilities — Why the Cockpit Recorder and the Engine Telemetry Are Not the Same Thing
type: post
status: draft
created: 2026-05-26
author: brien
hook: cockpit/aircraft metaphor (per DEC-009 §"What it observes" table)
length_target: 600-800 words
ratifies: DEC-009 (Entire scoped as authoring provenance — supersedes DEC-007)
related:
  - spec/decision-log.md → DEC-009
  - spec/substrate-exposure-architecture.md
  - WS-DDR-099 (substrate exposure mechanism)
source_session: 2026-05-26 Cowork Phase 1 (substrate exposure + Witness/Entire composition)
promotion_path: "If/when promoted to a full HTML page, lands as `docs/two-observabilities.html` in Pillar 3 (The Build) sub-nav, slotted near observability.html. Requires site-ia.md update + sub-nav update on all Pillar 3 pages + .meta.yml sidecar + site-contracts.md run."
---

# Two Observabilities

> Why the cockpit recorder and the engine telemetry are not the same thing — and why software has been treating them as one.

A modern airliner carries two independent recording systems. Both are called "the black box." Neither replaces the other.

The **Cockpit Voice Recorder** captures what the pilots said and did. Why this radio call? Why this control input? Why this checklist deviation? It's the record of *how the flight was operated.* After an incident, investigators listen to the CVR to understand the decisions that led there.

The **Flight Data Recorder** captures what the airplane did. Altitude. Airspeed. Engine RPMs. Control-surface positions. It's the record of *how the machine behaved.* Investigators read the FDR to understand the physical conditions the decisions were responding to.

You can't substitute one for the other. The CVR can't tell you the engine N1 at the moment of stall. The FDR can't tell you that the captain was distracted by a non-normal checklist. Investigators need both because they answer different questions.

Software has the same shape — and we've been conflating it.

## Two observabilities in Intent

Intent runs **two observability paths** because they answer different questions:

**Authoring observability.** [Entire.io](https://entire.io) captures the prompts, the tool calls, the file diffs, the agent-session transcript. Granularity: git commit + intra-session checkpoint. Capture window: *during* the agent session. It tells you *how the artifact got made.* This is the cockpit recorder.

**Running-system observability.** OpenTelemetry → Grafana → Tempo / Mimir / Loki captures the running artifact's behavior. Contract assertions pass or fail. Latency distributions shift. Error rates spike. Granularity: per-request span. Capture window: *while the artifact is in production.* It tells you *whether the artifact works.* This is the engine telemetry.

These are siblings, not substitutes.

## The conflation we just corrected

Until [DEC-009](https://github.com/theparlor/intent/blob/main/spec/decision-log.md) (filed 2026-05-26), the Intent docs treated Entire.io as *"the observability layer."* That was over-broad. It conflated the cockpit recorder with the engine telemetry.

The symptom was subtle: anywhere the docs said "the observability layer" they implicitly claimed Entire could tell you whether your artifact worked in production. It can't. Entire's capture window closes when the session ends. Once the artifact is deployed, Entire is silent. The OTel stack picks up from there — different pipeline, different storage, different dashboards.

The framework's `observe/` directory and `observations/` runtime-feedback directory were *already* OTel-native. The dev-continuity docs just hadn't caught up to the architecture. DEC-009 aligns them.

## Why the distinction matters

Two reasons.

**First, the loop only closes if both paths exist.** Intent's Observe phase is supposed to feed back into Notice — observations become new signals. But *observations* splits in two:

- *Authoring observations* surface drift in how the artifact got built. "We took 12 turns to write a 30-line patch. Was the spec ambiguous?"
- *Runtime observations* surface drift in how the artifact behaves. "P99 latency drifted from 180 ms to 240 ms after Tuesday's deploy. What changed?"

Both feed the next Notice cycle. Conflating them flattens the signal space — and the framework loses half its loop-closure surface.

**Second, the substrate is shared.** Both paths land their records in the same place — the `.intent/` directory family, federated through Witness (per WS-DDR-099). That's what makes them composable. The authoring trace and the runtime telemetry meet in a single addressable substrate. You can ask:

> "Show me the session that produced this code, and show me the metrics it's now emitting."

That's only possible because they share a canonical OTel-shaped schema (per DEC-004) and share substrate. Conflate the two and the query degenerates to "show me the session" *or* "show me the metrics" — never the lineage between them.

## The architectural commitment

After DEC-009:

- **Entire** is the authoring-provenance recorder. One event source feeding `.intent/events/events.jsonl`. Sibling-composed with other sources (intent-events hooks, Granola transcripts, session-ledger MD).
- **OTel** is the runtime-telemetry stack. Separate pipeline, separate emitters, same final substrate.
- **Witness** federates events from both. Its conservation law — verbatim source preservation, contradictory claims produce two events, never a merged one — keeps the two paths distinguishable inside the federated store.
- **The Observe phase** consumes both. New signals can originate from either.

Not "Entire is the observability layer." Not "OTel is the observability layer." **Two observabilities, sibling-composed.**

## The closing image

The pilots flew the airplane. The airplane behaved a certain way. Both are recorded. Both are observability.

The investigator who reads only the cockpit recorder hears half the story.

The investigator who reads only the flight data recorder sees half the story.

The framework that records only one of them ships half a feedback loop.

---

*Source decisions: [DEC-009](https://github.com/theparlor/intent/blob/main/spec/decision-log.md) supersedes DEC-007; [WS-DDR-099](https://github.com/theparlor/workspaces-governance/blob/main/.context/DECISIONS.md) commits the substrate to MCP-front + repo-as-truth composition; [WS-DDR-079](https://github.com/theparlor/workspaces-governance/blob/main/.context/DECISIONS.md) locks the Conduit ↔ Witness OTel composition seam. Filed 2026-05-26 from the Cowork Phase 1 session on substrate exposure + Witness/Entire composition.*
