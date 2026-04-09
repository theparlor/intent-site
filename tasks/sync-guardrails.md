---
title: Sync Guardrails
type: framework
maturity: final
confidentiality: shareable
reusability: universal
domains:
  - consulting-operations
created: 2026-03-31
companies:
  - turnberry
  - subaru
depth_score: 4
depth_signals:
  file_size_kb: 8.9
  content_chars: 8281
  entity_count: 2
  slide_count: 0
  sheet_count: 0
  topic_count: 1
  has_summary: 0
vocab_density: 0.12
related_entities:
  - {pair: subaru ↔ consulting-operations, count: 836, strength: 0.43}
  - {pair: subaru ↔ automotive-manufacturing, count: 791, strength: 0.933}
  - {pair: consulting-operations ↔ automotive-manufacturing, count: 791, strength: 0.409}
  - {pair: consulting-operations ↔ engagement-management, count: 507, strength: 0.262}
  - {pair: turnberry ↔ consulting-operations, count: 472, strength: 0.226}
---
# Task: Add trust guardrails to signal sync pipeline

> Handoff spec for Claude Code terminal. Adds safety checks to the sync pipeline so it can run at L2/L3 autonomy without publishing harmful or excessive content.

## Context

The signal sync pipeline (`scripts/sync-signals.js`) reads signals from the product repo and publishes them to the site. At L2+ autonomy, this runs without human review. Two risks need circuit breakers:

1. **Volume flood** — A burst of signals (legit work surge, runaway agent, or hostile injection) overwhelms the site with unreviewed content
2. **Content concern** — A signal contains PII, profanity, sensitive client info, or inappropriate material that shouldn't be published

## Design Principle

The pipeline should publish freely when everything looks normal. When a trigger fires, it should **hold** the suspicious content and publish the clean content. It should never silently publish risky content, and it should never block clean content because of unrelated risky content.

Think of it like a water treatment plant — the flow runs continuously, but when a sensor trips, the contaminated batch gets diverted to a holding tank while clean water keeps flowing.

## Guardrail 1: Volume Circuit Breaker

### Trigger
The number of **new signals since last sync** exceeds a configurable threshold.

### Thresholds (configurable in `sync-config.json`)
```json
{
  "volume": {
    "green": 10,
    "amber": 20,
    "red": 50
  }
}
```

- **≤ green (10):** Normal — publish all. Typical session produces 3-8 signals.
- **> green, ≤ amber (11-20):** Elevated — publish all but open a "volume surge" issue for awareness. Brien may want to review.
- **> amber, ≤ red (21-50):** High — publish only the first `green` count, hold the rest in a `held-signals.json` manifest. Open a "volume hold" issue with the list of held signals for review.
- **> red (50+):** Lockout — publish nothing. Open a "volume lockout" issue. Requires manual `RELEASE=true` run to resume.

### Investigation Flow
When signals are held:
1. Issue is opened with the held signal list (IDs + titles, not full content)
2. Brien reviews and either:
   - Runs `RELEASE=true node scripts/sync-signals.js` to publish all held signals
   - Runs `SKIP=SIG-042,SIG-043 node scripts/sync-signals.js` to publish some and skip others
   - Edits/deletes signals in the product repo and re-runs normally

### Recovery
After a lockout, the next normal-volume sync clears the lockout automatically. The lockout is volume-based, not time-based — once the surge stops, normal publishing resumes.

## Guardrail 2: Content Safety Gate

### What to Scan
Every signal's **title** and **first 500 characters of body** are checked against content rules before publishing.

### Content Rules

#### PII Detection (auto-hold)
Flag signals containing patterns that look like:
- Email addresses (`/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/`)
- Phone numbers (`/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/`)
- SSN-like patterns (`/\b\d{3}-\d{2}-\d{4}\b/`)
- Credit card patterns (`/\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/`)
- IP addresses (`/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/`)

#### Client/Org Name Detection (auto-hold)
Flag signals that reference specific external organizations by name. Configurable blocklist in `sync-config.json`:
```json
{
  "content": {
    "org_blocklist": ["Subaru", "Home Depot", "CargBerry", "Foot Locker"],
    "allowed_names": ["Brien", "The Parlor", "Intent", "Claude", "Anthropic"]
  }
}
```
Signals referencing blocklisted orgs are held — they may contain client-confidential context that shouldn't be on a public site.

#### Profanity/Toxicity (auto-hold)
Basic keyword check against a small list. Not trying to be comprehensive — just catch obvious cases:
```json
{
  "content": {
    "blocklist_terms": ["fuck", "shit", "damn", "ass", "kill", "attack", "exploit", "hack"]
  }
}
```

#### URL Detection (flag but publish)
Signals containing URLs get a warning in the sync log but are published. URLs in signal titles are more suspicious than URLs in body text.

### Behavior on Content Flag

When a signal is flagged:
1. Signal is **held** (not published)
2. A `held-signals.json` file is updated with the signal ID, the rule that triggered, and the matched text
3. The sync issue includes a "Content holds" section listing flagged signals with their trigger reasons
4. Clean signals in the same batch are still published

### Held Signal Manifest (`held-signals.json`)
```json
{
  "held": [
    {
      "id": "SIG-042",
      "title": "Signal title here",
      "rule": "pii_email",
      "match": "john@client.com",
      "held_at": "2026-03-31T06:00:00Z"
    }
  ],
  "released": [],
  "skipped": []
}
```

### Release Flow
```bash
# Review what's held
cat held-signals.json | jq '.held[] | "\(.id): \(.rule) — \(.match)"'

# Release specific signals after reviewing
RELEASE=SIG-042,SIG-043 node scripts/sync-signals.js

# Release all held signals
RELEASE=all node scripts/sync-signals.js

# Permanently skip signals (won't be flagged again)
SKIP=SIG-044 node scripts/sync-signals.js
```

## Implementation

### `sync-config.json` (new file at repo root)
```json
{
  "volume": {
    "green": 10,
    "amber": 20,
    "red": 50
  },
  "content": {
    "org_blocklist": ["Subaru", "Home Depot", "CargBerry", "Foot Locker", "Turnberry"],
    "allowed_names": ["Brien", "The Parlor", "Intent", "Claude", "Anthropic", "GitHub"],
    "blocklist_terms": ["fuck", "shit", "damn", "kill", "attack", "exploit"],
    "pii_patterns": {
      "email": "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
      "phone": "\\b\\d{3}[-.]?\\d{3}[-.]?\\d{4}\\b",
      "ssn": "\\b\\d{3}-\\d{2}-\\d{4}\\b",
      "credit_card": "\\b\\d{4}[-\\s]?\\d{4}[-\\s]?\\d{4}[-\\s]?\\d{4}\\b"
    }
  },
  "sync": {
    "source": "local",
    "product_repo_path": "../intent",
    "product_repo_github": "theparlor/intent"
  }
}
```

### Changes to `scripts/sync-signals.js`

Add these functions:

```
checkVolume(newSignals, config) → { status: "green"|"amber"|"red"|"lockout", publishable: [...], held: [...] }
checkContent(signal, config) → { clean: bool, rule: string|null, match: string|null }
updateHeldManifest(held, released, skipped)
```

The main sync flow becomes:
1. Read all signals from product repo
2. Identify new signals (not already on site and not in held/skipped)
3. Run `checkVolume` on the new set → split into publishable and volume-held
4. Run `checkContent` on each publishable signal → split into clean and content-held
5. Publish clean signals to signals.html
6. Update held-signals.json with all held signals
7. Update dogfood.html counts
8. If any signals were held, open/update a GitHub issue with the hold manifest

### Changes to `.github/workflows/freshness-check.yml`

Add a `sync` job that runs after the `freshness` job:
- Only runs if drift was detected AND `AUTO_SYNC` is true
- Runs `node scripts/sync-signals.js` with the guardrails
- Commits updated files
- Opens a PR (not direct commit) if any signals were held

## Verification

```bash
cd ~/Workspaces/Core/frameworks/intent-site

# Test with current signals (should publish all — count is under threshold)
SIGNAL_SOURCE=local node scripts/sync-signals.js
echo $?  # Should be 0

# Verify held manifest is empty
cat held-signals.json | jq '.held | length'  # Should be 0

# Test volume circuit breaker (create fake signals to exceed threshold)
# (manual test — create 25+ dummy signal files, run sync, verify hold behavior)

# Test content gate (create a signal with PII)
# (manual test — create signal with email address, run sync, verify it's held)
```

## Trust Assessment

This pipeline at L2 autonomy:
- **Confidence: 0.85** — Signal sync is mechanical and well-defined
- **Trust: 0.6** — Content gates handle the primary risks; volume breaker handles floods
- **Blast radius: Low** — Worst case is a bad signal on a marketing site; reversible by removing and re-syncing
- **Reversibility: High** — Any published signal can be removed by re-running sync without it

The guardrails specifically address the two identified risks while keeping the pipeline autonomous for normal operation. Brien only gets pulled in when something unusual happens — which is exactly the L2/L3 boundary.
