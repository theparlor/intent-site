# Terminal Task: Create Getting Started Page

**Task ID:** getting-started-page
**Status:** READY FOR HANDOFF
**Owner:** Claude Code
**Estimated effort:** 4 hours

---

## Objective

Create `getting-started.html` — a Pillar 2 ("The System") depth page that serves as the adoption onramp. This page stitches deployment, native-repos, and CLI tooling into a single 30-minute path from zero to first signal.

---

## Requirements

### Page Metadata

- **File:** `/sessions/dreamy-keen-faraday/mnt/Core/frameworks/intent-site/docs/getting-started.html`
- **Pillar:** 2 — "The System"
- **Role:** Depth page (adoption pathway)
- **Navigation:**
  - Primary nav: "The System" active
  - Sub-nav: "Start" active
  - Sub-nav order: Overview · Flow · System Map · Schemas · Signals · Dogfood · Observe · Events · Start

### Content Structure

#### 1. Hero Section
```
Kicker: "Getting Started"
Headline: [TRY INTENT]
Subheading: "From zero to your first signal in 30 minutes"
Subtitle: A two-sentence hook about why adopting Intent is faster than traditional workflows
```

#### 2. Prerequisites (Rich callout)
- Git (for repo operations and signal persistence)
- Python 3.10+ (for CLI tooling and agent execution)
- Claude API key (optional for signal capture; required for agent execution)

Callout note: "You can capture signals without an API key. Agent execution requires one."

#### 3. Step 1 — Install & Setup
**Headline:** "Clone the repo and run the setup script"

Show exact commands:
```bash
git clone https://github.com/theparlor/intent my-intent-workspace
cd my-intent-workspace
python setup.py install
intent --version
```

Callout: "Setup creates `.intent/` directory, installs CLI tools, enables git hooks for signal persistence."

#### 4. Step 2 — Capture Your First Signal
**Headline:** "Notice something. Record it."

Command and explanation:
```bash
intent-signal capture "I noticed X"
```

Explanation: "The CLI opens an editor. You record the signal: source, what you observed, why it matters. Saves to `.intent/signals/` as frontmatter + markdown."

Show example signal file structure (brief):
```
---
trace_id: null
source: cli-manual
confidence: 0.7
tags: [ux, onboarding]
---
# Signal: Sign-up takes 12 taps on mobile

Observed in user testing with 3 users. Each needed 12 tap sequences to complete signup. Expected flow was 5 taps max.
```

Callout: "Signals are opinions backed by evidence. The `.intent/` directory auto-commits on save."

#### 5. Step 3 — Review & Cluster
**Headline:** "Find patterns in your signals"

Command and example output:
```bash
intent-signal review
```

Show TUI/CLI output (text-based):
```
━━ Intent Signal Review (5 signals total) ━━

[Cluster 1] UX Friction (3 signals)
  ✓ Sign-up takes 12 taps on mobile
  ✓ Dashboard has 2-second load lag
  ✓ Export button is hidden in menu

[Cluster 2] Performance (1 signal)
  ✓ API endpoint returns 5KB of unused data

[Unclustered] (1 signal)
  ? Dark mode toggle missing
```

Callout: "Review runs locally. No server calls. Uses simple keyword + semantic matching to find related signals."

#### 6. Step 4 — Promote to Intent
**Headline:** "Turn a signal into a working outcome"

Command and explanation:
```bash
intent-signal promote <signal-id>
```

Explanation: "The CLI assigns a trace_id and moves the signal from `.intent/signals/` to `.intent/intents/`. You now have an Intent with observable success criteria."

Show example intent file:
```
---
trace_id: INTENT-001
status: hypothesis
success_criteria: [sign-up completes in <5 taps on mobile]
impact: [user acquisition, retention]
---
# Intent: Reduce mobile sign-up complexity
```

Callout: "An Intent is a signal with a falsifiable outcome. Intents stay open until validated or invalidated."

#### 7. Step 5 — Write a Spec
**Headline:** "Define the desired behavior"

Command and brief explanation:
```bash
intent-spec create --from-intent INTENT-001
```

Explanation: "The CLI scaffolds a spec template: shape (what's in/out), contracts (verifiable outcomes), constraints. You edit it. Specs are what agents execute."

Show minimal spec template:
```
# spec/mobile-signup-v2.md

## Intent
INTENT-001: Reduce mobile sign-up complexity

## Shape
Reshape the signup flow: email → password → optional MFA → done.
Out of scope: profile completeness (belongs to onboarding).

## Contracts
- contract/signup-entry.md: Given mobile device, flow completes in <5 taps
- contract/mfa-optional.md: MFA checkbox is optional, pre-unchecked
```

Callout: "Specs replace user stories. Agents pick them up and execute against the contracts."

#### 8. Step 6 — Observe
**Headline:** "Watch the outcome happen"

Command and explanation:
```bash
intent-status
```

Explanation: "Shows the Intent lifecycle: spec status, execution progress, observations coming in. As agents execute and tests pass, Intent moves toward validated."

Show example dashboard view (text-based):
```
┌─ INTENT-001: Reduce mobile sign-up complexity ─────────────┐
│ Status: executing                                            │
│                                                              │
│ Spec: spec/mobile-signup-v2.md                             │
│ Contracts: 2 total                                          │
│   ✓ signup-entry.md (passed)                              │
│   ⧖ mfa-optional.md (in progress)                         │
│                                                              │
│ Observations: 3 recent                                      │
│   • Agent attempted email validation fix                   │
│   • Diff: form.tsx (12 insertions, 3 deletions)          │
│   • Test: mobile flow completes in 4.2 taps               │
│                                                              │
│ Timeline: Created 2h ago                                   │
└──────────────────────────────────────────────────────────────┘
```

Link to observe.html: "See the full Observe narrative →"

#### 9. What's Next — Three Paths
**Headline:** "Choose your depth"

Three cards (Rich callout style):

**Path 1: Deeper into the Methodology**
"Understand why Intent works. The notice→spec→execute→observe loop explained phase-by-phase."
→ Link: "See the full methodology" (methodology.html)

**Path 2: Wider into the Work System**
"See the operational dashboard. Every Intent, every spec, every execution, all in one place."
→ Link: "See the work system dashboard" (work-system.html)

**Path 3: Technical Deep Dive**
"Understand the architecture. MCP servers, trust model, observability stack."
→ Link: "See the architecture" (architecture.html)

#### 10. Adoption Tiers Reference
**Headline:** "Scale to existing repos"

Brief paragraph: "Once you've tried Intent in your workspace, you can adopt it in existing repos using the native-repos adoption model."

Show quick reference (simple table or grid):
```
Observable   → Start observing with Entire.io
Instrumented → Add .intent/ structure and CLI
Autonomous   → Agents handle signal→spec→execute
Self-Observing → Loop closure: observations become new signals
```

Link: "See native repos adoption tiers →" (native-repos.html)

---

## Styling & Pattern

### Base Pattern
Follow **deployment.html** styling:
- Hero section with kicker + headline
- Labeled dividers between sections (scroll-section pattern)
- Step cards with numbered icons
- Code blocks with syntax highlighting
- Rich callouts with highlights
- Cross-links inline in body text

### Colors
- Kicker: `hl-blue` (Intent-primary)
- Step cards: active state (blue accent)
- Callouts: subtle background, highlight text for key phrases

### File Size Target
**Minimum 10KB** (Rich page). deployment.html is 248 lines; this should be 350-400 lines with full content.

---

## Implementation Checklist

### Content Creation
- [ ] Hero section with kicker + headline + subtitle
- [ ] Prerequisites callout block
- [ ] Step 1 (Install) with exact commands and callout
- [ ] Step 2 (Capture Signal) with example file structure
- [ ] Step 3 (Review) with TUI/CLI output example
- [ ] Step 4 (Promote) with example intent file
- [ ] Step 5 (Write Spec) with minimal template
- [ ] Step 6 (Observe) with example dashboard view
- [ ] "What's Next" three-path card section
- [ ] Adoption Tiers reference with native-repos link

### Navigation
- [ ] Primary nav: "The System" active
- [ ] Sub-nav showing all 9 Pillar 2 pages
- [ ] Sub-nav: "Start" link active (to getting-started.html)
- [ ] Footer with GitHub link

### Cross-Links
- [ ] methodology.html ← link from "Path 1"
- [ ] work-system.html ← link from "Path 2"
- [ ] architecture.html ← link from "Path 3"
- [ ] observe.html ← link from Step 6
- [ ] native-repos.html ← link from Adoption Tiers section
- [ ] deployment.html ← optional contextual link in Phase discussion

### Verification
- [ ] File size: `wc -l` shows 350-400+ lines
- [ ] File valid HTML: no parse errors
- [ ] All code blocks render correctly with syntax highlighting
- [ ] All links to existing pages resolve (pitch, methodology, work-system, architecture, observe, deployment, native-repos)
- [ ] Sub-nav "Start" link points to getting-started.html and is marked active
- [ ] No broken cross-links; all href paths are relative (`./filename.html`)
- [ ] Page renders in browser without console errors
- [ ] Scroll-reveal animations work (sections fade in)

---

## Git Commit Block

When implementation is complete:

```bash
git add docs/getting-started.html
git commit -m "feat: add Getting Started page (Pillar 2 adoption onramp)

- Hero: 'From zero to your first signal in 30 minutes'
- 6-step walkthrough: install → capture → review → promote → spec → observe
- 'What's Next' paths to methodology, work system, and architecture
- Adoption tiers reference to native-repos integration
- Pillar 2 sub-nav with 'Start' active
- 350+ lines, Rich page format matching deployment.html pattern
"
```

---

## References

- **Site IA:** /sessions/dreamy-keen-faraday/mnt/Core/frameworks/intent-site/site-ia.md
- **Deployment page (pattern):** docs/deployment.html (248 lines)
- **Work System (context):** docs/work-system.html (901 lines)
- **Target sub-nav position:** site-ia.md line 119 (Getting Started is listed as "Start")
