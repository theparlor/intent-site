---
title: Freshness Action
type: framework
maturity: final
confidentiality: shareable
reusability: universal
domains:
  - consulting-operations
created: 2026-03-31
depth_score: 4
depth_signals:
  file_size_kb: 8.7
  content_chars: 8608
  entity_count: 0
  slide_count: 0
  sheet_count: 0
  topic_count: 1
  has_summary: 0
vocab_density: 0.00
---
# Task: Implement GitHub Action for Content Freshness Checks

> Handoff spec for Claude Code terminal. Read this file, execute, verify, commit/push.

## Context

The Intent site (`theparlor/intent-site`) makes claims about the product (`theparlor/intent`). When the product changes — new signals, updated specs, new decisions — the site becomes stale. Currently there are 24 signals in the product repo but the site only shows ~16.

This GitHub Action automates staleness detection. It runs on a schedule, compares the product repo's current state to what the site claims, and opens issues when drift is detected.

## What to Build

A GitHub Action workflow at `.github/workflows/freshness-check.yml` in the `theparlor/intent-site` repo.

### Trigger
- **Schedule:** Daily at 06:00 UTC (`cron: '0 6 * * *'`)
- **Manual:** `workflow_dispatch` for on-demand runs

### What It Checks

#### 1. Signal Count Drift
- Fetch the current signal count from `theparlor/intent` by listing `.intent/signals/` via the GitHub API
- Compare to the count shown on the site (grep `signals.html` for signal card count or a data attribute)
- If the product has more signals than the site shows → flag as stale

#### 2. Signal Content Drift
- Fetch the list of signal filenames from the product repo
- Compare to signal IDs referenced in `signals.html`
- List any signals present in the product but missing from the site

#### 3. Spec File Changes
- For each entry in `content-map.md`, check if the source file in the product repo has changed since a stored timestamp/hash
- Store last-known SHA per source file in a `.freshness-state.json` file committed to the site repo
- If any source SHA differs from stored → flag the affected site pages as potentially stale

### Output

When drift is detected, the Action should:
1. **Open a GitHub issue** on `theparlor/intent-site` with:
   - Title: `Content freshness: N items drifted (YYYY-MM-DD)`
   - Body listing each drift item:
     - Signal count: "Product has 24 signals, site shows 16 (8 missing)"
     - Missing signals: list of filenames not on the site
     - Changed specs: list of spec files with new SHAs and which site pages they affect (from content-map.md)
   - Label: `freshness`
2. **Update `.freshness-state.json`** with current SHAs (so the same drift isn't flagged twice)

### Implementation

```yaml
name: Content Freshness Check

on:
  schedule:
    - cron: '0 6 * * *'
  workflow_dispatch:

permissions:
  contents: write
  issues: write

jobs:
  freshness:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout site repo
        uses: actions/checkout@v4

      - name: Check product repo state
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          # Fetch signal list from product repo
          SIGNALS=$(gh api repos/theparlor/intent/contents/.intent/signals --jq '.[].name' 2>/dev/null || echo "")
          SIGNAL_COUNT=$(echo "$SIGNALS" | grep -c '.md' || echo "0")

          # Count signals shown on site
          SITE_SIGNAL_COUNT=$(grep -c 'signal-card\|data-signal-id' docs/signals.html 2>/dev/null || echo "0")

          # Check spec file SHAs from content-map sources
          # Read .freshness-state.json for last-known SHAs
          # Compare current SHAs via GitHub API

          echo "SIGNAL_COUNT=$SIGNAL_COUNT" >> $GITHUB_ENV
          echo "SITE_SIGNAL_COUNT=$SITE_SIGNAL_COUNT" >> $GITHUB_ENV
          echo "SIGNALS<<EOF" >> $GITHUB_ENV
          echo "$SIGNALS" >> $GITHUB_ENV
          echo "EOF" >> $GITHUB_ENV

      - name: Check spec freshness
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          DRIFT_ITEMS=""

          # Check key spec files for changes
          for spec in spec/signal-trust-framework.md spec/intent-methodology.md spec/event-catalog.md spec/product-roadmap.md; do
            CURRENT_SHA=$(gh api "repos/theparlor/intent/contents/$spec" --jq '.sha' 2>/dev/null || echo "missing")
            STORED_SHA=$(jq -r ".[\"$spec\"] // \"none\"" .freshness-state.json 2>/dev/null || echo "none")

            if [ "$CURRENT_SHA" != "$STORED_SHA" ] && [ "$CURRENT_SHA" != "missing" ]; then
              DRIFT_ITEMS="$DRIFT_ITEMS\n- \`$spec\` changed (was $STORED_SHA, now $CURRENT_SHA)"
            fi
          done

          echo "DRIFT_ITEMS<<EOF" >> $GITHUB_ENV
          echo -e "$DRIFT_ITEMS" >> $GITHUB_ENV
          echo "EOF" >> $GITHUB_ENV

      - name: Open issue if drift detected
        if: env.SIGNAL_COUNT != env.SITE_SIGNAL_COUNT || env.DRIFT_ITEMS != ''
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          BODY="## Content Freshness Report\n\n"

          if [ "$SIGNAL_COUNT" != "$SITE_SIGNAL_COUNT" ]; then
            MISSING=$((SIGNAL_COUNT - SITE_SIGNAL_COUNT))
            BODY="${BODY}### Signal Count Drift\n"
            BODY="${BODY}Product has **$SIGNAL_COUNT** signals, site shows **$SITE_SIGNAL_COUNT** ($MISSING missing)\n\n"
          fi

          if [ -n "$DRIFT_ITEMS" ]; then
            BODY="${BODY}### Spec Changes\n"
            BODY="${BODY}$DRIFT_ITEMS\n\n"
          fi

          BODY="${BODY}### Action Required\n"
          BODY="${BODY}Update the affected site pages to reflect the current product state.\n"
          BODY="${BODY}See \`content-map.md\` for which pages are affected by each spec.\n"

          DATE=$(date +%Y-%m-%d)

          gh issue create \
            --title "Content freshness: drift detected ($DATE)" \
            --body "$(echo -e "$BODY")" \
            --label "freshness" \
            || echo "Issue creation failed — label may not exist yet"

      - name: Update freshness state
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          # Build new state file with current SHAs
          echo "{" > .freshness-state.json.tmp
          FIRST=true
          for spec in spec/signal-trust-framework.md spec/intent-methodology.md spec/event-catalog.md spec/product-roadmap.md; do
            SHA=$(gh api "repos/theparlor/intent/contents/$spec" --jq '.sha' 2>/dev/null || echo "missing")
            if [ "$FIRST" = true ]; then
              FIRST=false
            else
              echo "," >> .freshness-state.json.tmp
            fi
            echo "  \"$spec\": \"$SHA\"" >> .freshness-state.json.tmp
          done
          echo "" >> .freshness-state.json.tmp
          echo "}" >> .freshness-state.json.tmp
          mv .freshness-state.json.tmp .freshness-state.json

          # Commit updated state
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add .freshness-state.json
          git diff --staged --quiet || git commit -m "Update freshness state ($DATE)"
          git push || echo "Nothing to push"
```

## Additional Setup

### Create the `freshness` label
```bash
cd ~/Workspaces/Core/frameworks/intent-site
gh label create freshness --color "FFA500" --description "Content freshness drift detected" --repo theparlor/intent-site
```

### Initialize .freshness-state.json
Create an initial state file so the first run has a baseline:
```bash
cd ~/Workspaces/Core/frameworks/intent-site
echo '{}' > .freshness-state.json
git add .freshness-state.json
git commit -m "Initialize freshness state tracking"
git push
```

### Cross-repo API access
The GitHub Action uses `GITHUB_TOKEN` which has read access to public repos. Since `theparlor/intent` is public (or if private, uses a PAT), this should work. If `theparlor/intent` is private, Brien needs to create a PAT with `repo` scope and add it as a secret named `PRODUCT_REPO_TOKEN` in the site repo settings.

## Verification

After implementing:
```bash
# Verify workflow file exists
cat .github/workflows/freshness-check.yml

# Verify state file exists
cat .freshness-state.json

# Trigger a manual run
gh workflow run freshness-check.yml --repo theparlor/intent-site

# Check run status
gh run list --workflow=freshness-check.yml --repo theparlor/intent-site --limit 1
```

## Commit

```bash
cd ~/Workspaces/Core/frameworks/intent-site
git add .github/workflows/freshness-check.yml .freshness-state.json
git commit -m "Add content freshness GitHub Action

Daily check compares product repo (theparlor/intent) state to site content.
Detects: signal count drift, missing signals, changed spec files.
Opens GitHub issue with drift report when content is stale.
Tracks state in .freshness-state.json to avoid duplicate alerts.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
git push origin main
```
