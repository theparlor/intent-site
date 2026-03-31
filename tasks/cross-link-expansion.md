# Terminal Task: Add Cross-Links Across All Pillars

**Task ID:** cross-link-expansion
**Status:** READY FOR HANDOFF (run LAST, after other page creation tasks)
**Owner:** Claude Code
**Estimated effort:** 2.5 hours

---

## Objective

Add missing contextual cross-links across all three pillars of the Intent site. These links connect related content and guide visitors through the narrative, allowing them to move fluidly between "The Story," "The System," and "The Build" without navigating back to the primary nav.

**Important:** This task should run **LAST** — only after new pages (getting-started.html, observe.html, walkthrough.html) are created. It references those pages.

---

## Cross-Links to Add

### Source List (from site-ia.md lines 159-192)

All cross-links below are **additions** to existing pages. Do not remove existing cross-links; only add new ones.

#### Pillar 1 → Pillar 2
| # | From | To | Context | Placement |
|----|------|----|---------|-----------|
| 1 | pitch.html | dogfood.html | "See it working right now →" | Hero section or opening context |
| 2 | pitch.html | walkthrough.html | "Follow one intent end-to-end →" | After hero, near CTA area |
| 3 | methodology.html | signals.html | "See real signals from this system →" | In Observe phase section |
| 4 | methodology.html | walkthrough.html | "See the loop in action →" | After loop explanation section |

#### Pillar 2 → Pillar 1
| # | From | To | Context | Placement |
|----|------|----|---------|-----------|
| 5 | work-system.html | methodology.html | "Understand the model behind this dashboard →" | Above the React dashboard (in onramp section) |
| 6 | work-system.html | getting-started.html | "Try it yourself →" | After dashboard explanation |

#### Pillar 2 → Pillar 2 (internal)
| # | From | To | Context | Placement |
|----|------|----|---------|-----------|
| 7 | observe.html | observability.html | "See the OTel stack architecture →" | In Observe phase detail section |
| 8 | observe.html | dogfood.html | "See live observations from Intent building itself →" | In observation examples section |
| 9 | observe.html | signals.html | "See how observations become new signals →" | In loop closure section |
| 10 | getting-started.html | deployment.html | "See deployment options in depth →" | In Step 1 or Phase section |
| 11 | getting-started.html | native-repos.html | "See adoption tiers for existing repos →" | In Adoption Tiers section |

#### Pillar 1 → Pillar 2
| # | From | To | Context | Placement |
|----|------|----|---------|-----------|
| 12 | walkthrough.html | work-system.html | "See the full operational dashboard →" | After walkthrough explanation |
| 13 | walkthrough.html | schemas.html | "See the data contracts behind each artifact →" | In spec/contract sections |

#### Pillar 2 → Pillar 3
| # | From | To | Context | Placement |
|----|------|----|---------|-----------|
| 14 | system-diagram.html | architecture.html | "See the MCP server topology →" | Below system diagram |
| 15 | system-diagram.html | observe.html | "Understand what the Observe layer reveals →" | In observe layer section |

---

## Implementation Pattern

### HTML Pattern for Cross-Links

Each cross-link should follow the site's existing pattern (check how observability.html or methodology.html implements them):

```html
<a href="./target-page.html" class="cross-link">
  Context text →
</a>
```

**Always use relative paths** (`.` notation, e.g., `./dogfood.html`, not `/dogfood.html` or absolute URLs).

### Placement Strategy

#### For pages without a "Cross-Links" section:
1. Check if the page has a clear "Next" or "Related" area (often at the end of main content, before footer)
2. If not, create a subtle "See also" or "Continue reading" block before the footer
3. Use this CSS pattern (consistent with existing pages):
```html
<div class="cross-links">
  <h3>Continue exploring</h3>
  <ul>
    <li><a href="./related-page.html">Context →</a></li>
  </ul>
</div>
```

#### For pages WITH a cross-links section:
Simply add the new links to the existing list in alphabetical order by target page name.

#### Inline vs. Section Cross-Links:
- **Inline (within body text):** Used in narrative sections where the connection is strong and contextual (e.g., "See the loop visualized →" right after explaining the loop)
- **Section (before footer):** Used for related but not-directly-mentioned content (e.g., "See architectural decisions →" in a tech page)

### CSS Class (if not already present)

```css
.cross-links {
  margin: 40px 0 20px 0;
  padding: 20px;
  background: rgba(148, 163, 184, 0.03);
  border-left: 3px solid var(--accent-blue);
  border-radius: 4px;
}

.cross-links h3 {
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-dim);
  margin-bottom: 12px;
  letter-spacing: 1px;
}

.cross-links ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.cross-links li {
  margin: 8px 0;
}

.cross-links a {
  color: var(--accent-blue);
  text-decoration: none;
  font-size: 14px;
  border-bottom: 1px solid currentColor;
}

.cross-links a:hover {
  color: var(--accent-blue-bright);
}
```

---

## Page-by-Page Checklist

### Page: pitch.html (Pillar 1 hero)
- [ ] Link 1: "See it working right now →" → dogfood.html
  - Placement: In hero context or opening section, after the pitch narrative
- [ ] Link 2: "Follow one intent end-to-end →" → walkthrough.html
  - Placement: Near CTAs in hero area

### Page: methodology.html (Pillar 1 depth)
- [ ] Link 3: "See real signals from this system →" → signals.html
  - Placement: In Observe phase section
- [ ] Link 4: "See the loop in action →" → walkthrough.html
  - Placement: After full loop explanation, before case studies or examples

### Page: walkthrough.html (Pillar 1 depth) — NEW PAGE
- [ ] Link 12: "See the full operational dashboard →" → work-system.html
  - Placement: After walkthrough conclusion, in "See also" section
- [ ] Link 13: "See the data contracts behind each artifact →" → schemas.html
  - Placement: In spec/contract detail sections

### Page: work-system.html (Pillar 2 hero)
- [ ] Link 5: "Understand the model behind this dashboard →" → methodology.html
  - Placement: In dashboard onramp section (work-system-onramp.md task)
- [ ] Link 6: "Try it yourself →" → getting-started.html
  - Placement: After dashboard overview, before tabbed interface

### Page: flow-diagram.html (Pillar 2 depth)
- [ ] Existing: Check if any links already exist
- [ ] Add contextual links if section is expanded

### Page: system-diagram.html (Pillar 2 depth)
- [ ] Link 14: "See the MCP server topology →" → architecture.html
  - Placement: Below interactive diagram, in cross-links section
- [ ] Link 15: "Understand what the Observe layer reveals →" → observe.html
  - Placement: In observe layer detail section

### Page: schemas.html (Pillar 2 depth)
- [ ] Existing: Verify no duplicate cross-links
- [ ] Add architecture or observe links if relevant

### Page: signals.html (Pillar 2 depth)
- [ ] Existing: Check current cross-links
- [ ] Add methodology or architecture links if missing

### Page: dogfood.html (Pillar 2 depth)
- [ ] Existing: Check current cross-links
- [ ] No new links to add (it's a sink page — people read it to see Intent in action)

### Page: observe.html (Pillar 2 depth) — NEW PAGE
- [ ] Link 7: "See the OTel stack architecture →" → observability.html
  - Placement: In Observe phase detail section
- [ ] Link 8: "See live observations from Intent building itself →" → dogfood.html
  - Placement: In observation examples section
- [ ] Link 9: "See how observations become new signals →" → signals.html
  - Placement: In loop closure section

### Page: event-catalog.html (Pillar 2 depth)
- [ ] Existing: Verify structure
- [ ] No new links required (reference page)

### Page: getting-started.html (Pillar 2 depth) — NEW PAGE
- [ ] Link 10: "See deployment options in depth →" → deployment.html
  - Placement: In Step 1 or installation phase section
- [ ] Link 11: "See adoption tiers for existing repos →" → native-repos.html
  - Placement: In Adoption Tiers section

### Page: architecture.html (Pillar 3 hero)
- [ ] Existing: Check current cross-links
- [ ] Verify system-diagram link exists

### Page: agents.html (Pillar 3 depth)
- [ ] Existing: Verify current links
- [ ] No new links required (technical reference)

### Page: deployment.html (Pillar 3 depth)
- [ ] Existing: Check current links
- [ ] No new links required (already has getting-started reciprocal)

### Page: observability.html (Pillar 3 depth)
- [ ] Existing: Check current links
- [ ] Verify observe.html reciprocal will exist

### Page: arb.html (Pillar 3 depth)
- [ ] Existing: Verify current links
- [ ] No new links required (governance page)

### Page: decisions.html (Pillar 3 depth)
- [ ] Existing: Check current links
- [ ] No new links required (ADR reference)

### Page: native-repos.html (Pillar 3 depth)
- [ ] Existing: Verify getting-started reciprocal will exist
- [ ] No new links required beyond reciprocal

---

## Verification Checklist

### Link Completeness
- [ ] Link 1 (pitch → dogfood): Check pitch.html contains exact string and href
- [ ] Link 2 (pitch → walkthrough): Check pitch.html contains exact string and href
- [ ] Link 3 (methodology → signals): Check methodology.html contains exact string and href
- [ ] Link 4 (methodology → walkthrough): Check methodology.html contains exact string and href
- [ ] Link 5 (work-system → methodology): Check work-system.html contains exact string and href
- [ ] Link 6 (work-system → getting-started): Check work-system.html contains exact string and href
- [ ] Link 7 (observe → observability): Check observe.html contains exact string and href
- [ ] Link 8 (observe → dogfood): Check observe.html contains exact string and href
- [ ] Link 9 (observe → signals): Check observe.html contains exact string and href
- [ ] Link 10 (getting-started → deployment): Check getting-started.html contains exact string and href
- [ ] Link 11 (getting-started → native-repos): Check getting-started.html contains exact string and href
- [ ] Link 12 (walkthrough → work-system): Check walkthrough.html contains exact string and href
- [ ] Link 13 (walkthrough → schemas): Check walkthrough.html contains exact string and href
- [ ] Link 14 (system-diagram → architecture): Check system-diagram.html contains exact string and href
- [ ] Link 15 (system-diagram → observe): Check system-diagram.html contains exact string and href

### Technical Verification
- [ ] All href paths use relative notation: `./filename.html` (not `/filename.html` or absolute URLs)
- [ ] No broken links (verify target pages exist)
- [ ] No duplicate links on the same page (run grep to check)
- [ ] All link text ends with " →" (arrow character)
- [ ] CSS for cross-links section is present (or uses existing styling)
- [ ] Mobile layout: cross-links are readable on small screens

### Content Quality
- [ ] Link contexts are specific and helpful (e.g., not just "See more →")
- [ ] Placements are contextual (links appear near relevant content, not random)
- [ ] No more than 3-4 cross-links per page (don't overwhelm)
- [ ] Cross-links enhance navigation without interrupting reading flow

### Grep Commands for Verification

Run these to verify each cross-link exists:

```bash
# Link 1
grep -n "dogfood.html" docs/pitch.html

# Link 2
grep -n "walkthrough.html" docs/pitch.html

# Link 3
grep -n "signals.html" docs/methodology.html

# Link 4
grep -n "walkthrough.html" docs/methodology.html

# Link 5
grep -n "methodology.html" docs/work-system.html

# Link 6
grep -n "getting-started.html" docs/work-system.html

# ... and so on
```

---

## Git Commit Block

When implementation is complete:

```bash
git add docs/*.html
git commit -m "feat: add cross-links across all pillars

Add 15 contextual cross-links connecting related content:
- Pillar 1 → Pillar 2 (methodology, pitch to signals, dogfood, walkthrough)
- Pillar 2 → Pillar 1 (work-system to methodology; walkthrough to work-system)
- Pillar 2 ↔ Pillar 2 (observe, dogfood, signals integration)
- Pillar 2 → Pillar 3 (system-diagram to architecture, observe)
- Getting Started ↔ Deployment, Native Repos

All cross-links use relative paths (./target.html).
Placements are contextual and enhance narrative flow.
No links removed; only additions.
Grep verification: all 15 links present and correctly placed.
"
```

---

## Notes for Agent

### Critical Order
This task runs **LAST**. Only proceed if:
- [ ] getting-started.html has been created (getting-started-page.md task)
- [ ] observe.html has been created (or exists)
- [ ] walkthrough.html has been created (or exists)

If any of these pages don't exist, skip the links that reference them and note the blocker in the git commit message.

### Pattern Recognition
Look at existing cross-links in:
- observability.html (Pillar 3)
- methodology.html (Pillar 1)
- system-diagram.html (Pillar 2)

These pages already have cross-link sections or inline links. Follow their style and placement pattern.

### Relative Path Format
Always use `./filename.html` format:
- ✓ `<a href="./dogfood.html">See it working →</a>`
- ✗ `<a href="/dogfood.html">See it working →</a>`
- ✗ `<a href="https://theparlor.github.io/intent/dogfood.html">See it working →</a>`

---

## References

- **Site IA (cross-links spec):** /sessions/dreamy-keen-faraday/mnt/Core/frameworks/intent-site/site-ia.md (lines 159-192)
- **Related tasks:**
  - getting-started-page.md (creates getting-started.html)
  - work-system-onramp.md (enhances work-system.html, includes Link 5)
  - observe.html creation task (new page, will contain Links 7-9)
  - walkthrough.html creation task (new page, will contain Links 12-13)
