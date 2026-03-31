# Task: Build signal-to-site sync pipeline

> Handoff spec for Claude Code terminal. This creates a build script that reads signal data from the product repo and updates the site's signals.html and dogfood.html with current data.

## Problem

The site hardcodes signal cards in HTML. When new signals are captured in the product repo (`theparlor/intent`), the site becomes stale. Currently: product has 24 signals (SIG-001 through SIG-024), site shows ~16. The freshness action detects this gap but can't close it.

## Solution

A Node.js build script that:
1. Reads signal files from a local checkout of the product repo (or fetches via GitHub API)
2. Parses YAML frontmatter + markdown body from each signal file
3. Generates HTML signal cards matching the site's existing visual pattern
4. Injects them into `signals.html` and updates counts on `dogfood.html`
5. Commits the changes

## What to Build

### `scripts/sync-signals.js`

A Node.js script (no dependencies beyond built-in `fs`, `path`, and `https`) that:

#### Input
- **Local mode:** Reads from a sibling directory `../intent/.intent/signals/*.md`
- **CI mode:** Fetches signal file list and contents from GitHub API (`theparlor/intent`)
- Determined by environment variable: `SIGNAL_SOURCE=local` (default) or `SIGNAL_SOURCE=github`

#### Processing
1. Parse each signal file:
   - Extract YAML frontmatter (id, date/timestamp, source, confidence, trust, autonomy_level, status, cluster, title)
   - Extract the `# Signal: ...` title line from the markdown body (for older signals that don't have `title` in frontmatter)
   - Normalize: all signals should have id, title, date, source, confidence, trust, autonomy_level, status
2. Sort by ID (SIG-001, SIG-002, ... SIG-024)
3. Group by status: active, dismissed, promoted, new

#### Output — signals.html injection
The script should:
1. Read `docs/signals.html`
2. Find the injection points (markers in the HTML):
   - `<!-- SIGNAL-COUNT -->` → replace with actual count
   - `<!-- SIGNAL-CARDS-START -->` / `<!-- SIGNAL-CARDS-END -->` → replace inner content with generated cards
3. Generate HTML cards matching the existing pattern on the page (inspect current signals.html for the CSS classes and structure)
4. Write the updated `docs/signals.html`

#### Output — dogfood.html count update
1. Read `docs/dogfood.html`
2. Update the signal count stat boxes (currently hardcoded as "16")
3. Write the updated file

#### Card HTML template
Each signal card should follow this pattern (adapted from the existing signals.html style):
```html
<div class="signal-card" data-signal-id="SIG-XXX" data-status="active">
  <div class="signal-header">
    <span class="signal-id">SIG-XXX</span>
    <span class="signal-date">Mar 30</span>
  </div>
  <div class="signal-title">Title from frontmatter or markdown heading</div>
  <div class="signal-meta">
    <span class="signal-source">source-name</span>
    <span class="signal-trust" data-level="L2">L2 · 0.55</span>
    <span class="signal-cluster">cluster-name</span>
  </div>
</div>
```

**Important:** Read the actual current signals.html to get the exact CSS class names and structure. The template above is illustrative — match what's already there.

### Injection markers

Before running the script, add HTML comment markers to signals.html:
- `<!-- SIGNAL-COUNT -->24<!-- /SIGNAL-COUNT -->` around the count display
- `<!-- SIGNAL-CARDS-START -->` before the first signal card
- `<!-- SIGNAL-CARDS-END -->` after the last signal card

These markers make the sync script idempotent — it can run repeatedly and always produce the correct output.

### Integration with freshness action

Update `.github/workflows/freshness-check.yml` to add an optional auto-sync step:
- After detecting signal count drift, if `AUTO_SYNC=true` (configurable), run `node scripts/sync-signals.js`
- Commit the updated files
- Open a PR instead of an issue (so Brien can review before merging)

For now, default to `AUTO_SYNC=false` (detect-only). Brien can enable auto-sync once the script is validated.

## Verification

```bash
cd ~/Workspaces/Core/frameworks/intent-site

# Run the sync script in local mode
SIGNAL_SOURCE=local node scripts/sync-signals.js

# Verify signal count updated
grep -o 'data-signal-id="SIG-[0-9]*"' docs/signals.html | wc -l
# Should output: 24

# Verify new signals present
grep -q 'SIG-024' docs/signals.html && echo "PASS: SIG-024 present" || echo "FAIL"
grep -q 'SIG-016' docs/signals.html && echo "PASS: SIG-016 present" || echo "FAIL"

# Verify dogfood count updated
grep -q '24' docs/dogfood.html && echo "PASS: dogfood count updated" || echo "FAIL"

# Run site contracts
# CON-SITE-006, CON-SITE-008 should pass
```

## Commit

```bash
cd ~/Workspaces/Core/frameworks/intent-site
git add scripts/sync-signals.js docs/signals.html docs/dogfood.html
git commit -m "Add signal sync pipeline and update to 24 signals

New scripts/sync-signals.js reads signal files from product repo,
generates HTML cards, and injects into signals.html. Updates
dogfood.html stats. Supports local and GitHub API modes.

Signal count: 16 → 24 (SIG-016 through SIG-024 added)

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
git push origin main
```
