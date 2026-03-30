# Task: Fix disconnected routing outputs on system-diagram.html

> Handoff spec for Claude Code terminal. Fixes an architectural gap where Human Review Queue and Auto-promote Pipeline are dead ends — they receive signals from Route but don't connect forward to Signal Clustering.

## Problem

On the live system-diagram.html:
1. **Auto-promote Pipeline** has no outbound arrow — signals routed L3-L4 go nowhere
2. **Human Review Queue** has no outbound arrow — signals routed L0-L2 go nowhere
3. Clicking Auto-promote Pipeline does not update the detail panel below the diagram
4. The Mermaid source (`docs/diagrams/system-architecture.mermaid`) has the same gap

## Correct Architecture

Both routing outputs converge at **Signal Clustering**. The difference is governance, not destination:

- **Human Review Queue (L0-L2):** Human triages signals, decides whether to cluster. Arrow → Signal Clustering, labeled "human triages"
- **Auto-promote Pipeline (L3-L4):** System auto-clusters without human input. Arrow → Signal Clustering, labeled "auto-clusters"

The old `pipeline --> clustering` generic connection should be replaced by these two explicit paths through the routing outputs.

## Fix 1: Update SVG arrows in system-diagram.html

Remove any generic "pipeline → clustering" arrow. Add two new arrows:

1. **Human Review Queue → Signal Clustering** (amber color, labeled "human triages")
2. **Auto-promote Pipeline → Signal Clustering** (green color, labeled "auto-clusters")

Both arrows should terminate at the Signal Clustering box. The exact coordinates depend on the current SVG layout — find the Human Review Queue and Auto-promote Pipeline rect elements and draw `<line>` + `<polygon>` arrowheads from their bottom/left edges to the Signal Clustering box.

## Fix 2: Fix detail panel for Auto-promote and Human Review

Ensure clicking Auto-promote Pipeline and Human Review Queue updates the detail panel below the diagram. The detail data should already exist (check the `details` JavaScript object). If not, add:

**humanreview:**
- Title: "Human Review Queue (L0–L2)"
- Items: L0 trust < 0.2 — Human drives; L1 0.2–0.4 — Agent assists; L2 0.4–0.6 — Agent decides, human approves; Review surface: signals appear in intent-signal review

**autopromote:**
- Title: "Auto-promote Pipeline (L3–L4)"
- Items: L3 0.6–0.85 — Agent executes, human monitors; L4 ≥ 0.85 — Full autonomy; Auto-cluster + promote: High-trust signals skip human queue; Circuit breakers: max_files_changed: 5, max_blast_radius: service

## Fix 3: Mermaid source already updated

The file `docs/diagrams/system-architecture.mermaid` has already been updated with the correct connections:
```
HUMAN -->|"human triages"| CLUSTER
AUTO -->|"auto-clusters"| CLUSTER
```

Verify this is deployed. If the terminal's copy differs from the Cowork-managed version, pull the updated Mermaid file from the Core workspace.

## Verification

```bash
cd ~/Workspaces/Core/frameworks/intent-site

# 1. SVG has arrows from both routing outputs
grep -c 'human triages\|auto-clusters' docs/system-diagram.html | xargs -I{} test {} -ge 2 && echo "PASS: routing arrows present" || echo "FAIL: missing routing arrows"

# 2. Detail panel works for both
grep -q '"humanreview"' docs/system-diagram.html && echo "PASS: humanreview detail data" || echo "FAIL: no humanreview detail"
grep -q '"autopromote"' docs/system-diagram.html && echo "PASS: autopromote detail data" || echo "FAIL: no autopromote detail"

# 3. Mermaid source has connections
grep -q 'human triages' docs/diagrams/system-architecture.mermaid && echo "PASS: mermaid human path" || echo "FAIL: mermaid human path missing"
grep -q 'auto-clusters' docs/diagrams/system-architecture.mermaid && echo "PASS: mermaid auto path" || echo "FAIL: mermaid auto path missing"

# 4. No orphan generic pipeline→clustering connection
grep -c 'pipeline.*clustering\|pipeline --> clustering' docs/diagrams/system-architecture.mermaid | xargs -I{} test {} -eq 0 && echo "PASS: no orphan generic connection" || echo "WARN: old generic connection still present"
```

## Commit

```bash
cd ~/Workspaces/Core/frameworks/intent-site
git add docs/system-diagram.html docs/diagrams/system-architecture.mermaid
git commit -m "Fix disconnected routing outputs in system diagram

Human Review Queue and Auto-promote Pipeline were dead ends — signals
routed by the L0-L4 autonomy split had no forward path to Signal
Clustering. Both now connect explicitly:

- Human Review (L0-L2) → Signal Clustering (labeled 'human triages')
- Auto-promote (L3-L4) → Signal Clustering (labeled 'auto-clusters')

Also fixed detail panel click handler for both routing output boxes.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```
