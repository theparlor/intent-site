---
title: Work System Onramp
type: framework
maturity: final
confidentiality: shareable
reusability: universal
domains:
  - consulting-operations
created: 2026-03-31
depth_score: 4
depth_signals:
  file_size_kb: 10.1
  content_chars: 9976
  entity_count: 0
  slide_count: 0
  sheet_count: 0
  topic_count: 1
  has_summary: 0
vocab_density: 0.20
---
# Terminal Task: Add Dashboard Onramp to Work System Page

**Task ID:** work-system-onramp
**Status:** READY FOR HANDOFF
**Owner:** Claude Code
**Estimated effort:** 1.5 hours

---

## Objective

Enhance `work-system.html` by adding an introductory "How to read this dashboard" section **above the existing tabbed interface**. This helps new visitors understand what the Work System shows, what each tab means, and how to navigate it before diving into the interactive dashboard.

---

## Requirements

### Critical Constraints

**DO NOT reduce file size.** This is an **additive change only**. The existing tabbed interface and all React components remain untouched. Current file size: 901 lines. After changes: should be 950+ lines.

**Modification location:** Insert new section immediately after the sub-nav and before the `<div id="root"></div>` element where the React dashboard renders.

### Content Structure

#### Collapsible "How to read this dashboard" Section

Use an HTML `<details>` element or a custom collapsible div with subtle styling:

```html
<details class="dashboard-guide" open>
  <summary>How to read this dashboard</summary>
  <div class="guide-content">
    <!-- 4-5 paragraphs of explanation -->
  </div>
</details>
```

If using custom collapsible div (preferred for visual consistency):
```html
<div class="dashboard-guide">
  <button class="guide-toggle" data-expanded="true">How to read this dashboard</button>
  <div class="guide-content" id="guide-content">
    <!-- Content hidden/shown by JS toggle -->
  </div>
</div>
```

#### Paragraph 1: What This Dashboard Shows
Explain that the Work System dashboard is the operational centerpiece of Intent. It surfaces:
- All signals entering the system (sources: traces, user research, agents)
- Intents with their lifecycle status (hypothesis → exploring → validated → invalidated)
- Specs under execution and their contracts
- Live observations flowing back into the system

One sentence positioning: "This is where you see Intent in operation — every artifact from signal to observation."

#### Paragraph 2: The Five Tabs
Brief description of each tab:
- **Work Ontology:** The unit definitions (Signal, Intent, Spec, Contract, Capability, Feature, Product) and how they relate
- **Three Dimensions:** The work system's structural axes (work stream, ownership, governance)
- **Agent Flow:** How agents move work through the system (signal intake, spec execution, observation writeback)
- **Dashboard:** (Current section) The live view — upcoming, in-progress, completed work with status indicators
- **Agile → Intent:** A translation table for teams migrating from Agile/Scrum vocabulary

One sentence each, no more.

#### Paragraph 3: How to Navigate
- Start with "Work Ontology" if you're new to the units
- Jump to "Agent Flow" if you want to understand how work moves through the system
- Use "Dashboard" to see live status and track progress
- Check "Agile → Intent" if you're comparing to familiar Agile vocabulary

Tone: "Pick your entry point based on what you're trying to understand."

#### Paragraph 4: Key Concepts at a Glance
A short callout or highlighted section showing the four key signals:
- **Signals** (orange): Observed changes, insights, opportunities
- **Intents** (blue): Desired outcomes with success criteria
- **Specs** (blue): Declarative behavior — the unit agents execute
- **Observations** (purple): Results flowing back from execution

Subtitle: "These four artifacts form the loop: notice → spec → execute → observe → notice again."

#### Paragraph 5: Next Steps (Optional)
"Ready to dive deeper? See the full methodology →" (link to methodology.html)
"Want to try it yourself? See the Getting Started guide →" (link to getting-started.html)

### Styling Requirements

#### CSS Classes (add to `<style>` block in `<head>`)

```css
/* Dashboard guide section */
.dashboard-guide {
  background: rgba(148, 163, 184, 0.04);  /* Very subtle muted background */
  border: 1px solid rgba(148, 163, 184, 0.1);
  border-radius: 8px;
  padding: 20px;
  margin: 24px 0 32px 0;
  font-size: 14px;
  line-height: 1.6;
}

.guide-toggle {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text);
  font-size: 14px;
  font-weight: 600;
  padding: 0;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.guide-toggle::before {
  content: "▶";  /* Expand/collapse arrow */
  display: inline-block;
  transition: transform 0.2s ease;
  font-size: 12px;
}

.guide-toggle[data-expanded="true"]::before {
  transform: rotate(90deg);
}

.guide-content {
  display: none;
}

.guide-content.visible {
  display: block;
}

.guide-content p {
  margin-bottom: 16px;
  color: var(--text-muted);
}

.guide-content p strong {
  color: var(--text);
  font-weight: 600;
}

.guide-content a {
  color: var(--accent-blue);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}

.guide-content a:hover {
  color: var(--accent-blue-bright);
}

/* Concept callout */
.concept-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
  margin: 16px 0;
  padding: 16px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 6px;
}

.concept-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.concept-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.concept-dot.signal { background: var(--accent-amber); }
.concept-dot.intent { background: var(--accent-blue); }
.concept-dot.spec { background: var(--accent-blue); }
.concept-dot.observe { background: var(--accent-purple); }
```

#### Behavior

- **Default state:** Expanded (guide is visible when page loads)
- **Toggle:** Click the header to collapse/expand; arrow rotates
- **Dismissal:** Optional "Got it" button that hides the guide (uses localStorage to remember preference per user)
- **Mobile:** Full width, no side-by-side layout

### Placement in HTML

Insert immediately after the sub-nav:

```html
  </nav>  <!-- End of sub-nav -->

  <!-- NEW: Dashboard Guide Section -->
  <div class="dashboard-guide">
    <button class="guide-toggle" data-expanded="true" id="guide-toggle">
      How to read this dashboard
    </button>
    <div class="guide-content visible" id="guide-content">
      <!-- 5 paragraphs + callout -->
    </div>
  </div>
  <!-- END: Dashboard Guide Section -->

  <div id="root"></div>  <!-- React dashboard renders here -->
```

---

## Implementation Checklist

### Content
- [ ] Paragraph 1: What the dashboard shows (1-2 sentences)
- [ ] Paragraph 2: Description of each of the 5 tabs (5 items, brief)
- [ ] Paragraph 3: How to navigate (3-4 sentences)
- [ ] Paragraph 4: Concept callout with 4 key artifacts (Signal, Intent, Spec, Observation)
- [ ] Paragraph 5: Next steps with links to methodology and getting-started

### HTML Structure
- [ ] Dashboard guide div with class `.dashboard-guide`
- [ ] Toggle button with id `#guide-toggle` and `data-expanded="true"`
- [ ] Guide content div with id `#guide-content` and class `visible` (expanded by default)
- [ ] Concept grid callout with color-coded dots
- [ ] All cross-links use relative paths (`.` notation)

### CSS
- [ ] Subtle background color (muted gray, `rgba(148, 163, 184, 0.04)`)
- [ ] Toggle button styling (no border, cursor pointer, arrow with rotation)
- [ ] Guide content padding and text color (muted for secondary content)
- [ ] Concept grid with color dots matching the tabs (amber, blue, purple)
- [ ] Mobile-responsive (full width, stacked if needed)

### JavaScript (add to existing script block)
- [ ] Toggle button click handler: toggle `.visible` class on guide content
- [ ] Toggle arrow rotation on expand/collapse
- [ ] Optional localStorage save/restore for user preference (dismissed = hidden on next load)

### Verification
- [ ] File size increases to 950+ lines (do NOT reduce existing content)
- [ ] Sub-nav still visible and functional (no layout shift)
- [ ] React dashboard (tabs, tables) still renders below guide
- [ ] Toggle button works: click expands/collapses guide
- [ ] Styling does NOT interfere with existing page CSS (no override conflicts)
- [ ] All links in guide content resolve (methodology.html, getting-started.html)
- [ ] Mobile view: guide section is readable and toggle works
- [ ] Guide visible on first page load (expanded by default)
- [ ] No console errors

---

## Git Commit Block

When implementation is complete:

```bash
git add docs/work-system.html
git commit -m "feat: add dashboard onramp section to work-system page

- Add collapsible 'How to read this dashboard' guide above React dashboard
- 5 paragraphs: what the dashboard shows, tab descriptions, navigation tips, key concepts, next steps
- Subtle muted background styling, doesn't compete with dashboard
- Toggle button with localStorage persistence (optional dismiss)
- Concept callout with 4 color-coded artifacts (Signal, Intent, Spec, Observation)
- Cross-links to methodology.html and getting-started.html
- File size: 901 → 950+ lines (additive only)
"
```

---

## References

- **Site IA:** /sessions/dreamy-keen-faraday/mnt/Core/frameworks/intent-site/site-ia.md
- **Work System file:** docs/work-system.html (currently 901 lines)
- **Context:** The React dashboard starts at `<div id="root"></div>` on line 28
- **Related pages:**
  - methodology.html (Pillar 1, explains the loop)
  - getting-started.html (Pillar 2, adoption pathway)

---

## Notes for Agent

The Work System page is a React app rendering a tabbed dashboard. This task adds explanatory content **before** the dashboard, not modifying the React component itself. The guide section should feel like a "welcome overlay" — subtle, helpful, dismissible, and non-intrusive.

Key insight: New visitors land on this page and see a complex tabbed interface with no context. This guide is the on-ramp. After reading it, they understand what they're looking at and how to navigate it.
