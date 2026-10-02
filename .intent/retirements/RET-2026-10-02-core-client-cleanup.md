---
title: "Redaction: client content neutralized in intent-site (WS-DDR-153)"
type: retirement
maturity: final
created: 2026-10-02
kind: redaction
holds_it: local tag archive/pre-client-cleanup-2026-10-02 in /Users/brien/Workspaces/Core/frameworks/intent-site (never pushed)
tip: ce9ecb835a9a4b0fbc3e8b11a9c80434d8fa73f6
base: ce9ecb835a9a4b0fbc3e8b11a9c80434d8fa73f6
files_touched: 23
---

# Redaction: client content neutralized in intent-site

## Why

Core carries pointers to engagements, never client names, people, codenames, figures or
excerpts (WS-DDR-153). A scan on 2026-10-02 found client tokens in the files listed below.
Each was neutralized in place by hand: a client name became a neutral descriptor (the kind of
client, for example "the automotive client"), client people and project keys were dropped or
replaced with a role, and figures from client engagements were dropped. This is a
confidentiality correction to closed records and canon, not a rework of their substance. The
pre-change state of every file is preserved by the local tag below.

## Recover

Nothing here is gone. The tag pins the repo as it stood before the redaction. To read any
prior version:

```bash
git -C /Users/brien/Workspaces/Core/frameworks/intent-site show archive/pre-client-cleanup-2026-10-02:<path>
```

The tag is local only and is never pushed (it still holds the client wording).

## Files edited (23)

- content-map.md
- docs/archive/v1-2-multi-framing/ARCHIVE.md
- docs/archive/v1-2-multi-framing/event-catalog.html.meta.yml
- docs/archive/v1-2-multi-framing/methodology.html.meta.yml
- docs/archive/v1-2-multi-framing/pitch.html.meta.yml
- docs/archive/v1-2-multi-framing/roadmap.html.meta.yml
- docs/archive/v1-2-multi-framing/schemas.html.meta.yml
- docs/archive/v1-2-multi-framing/system-diagram.html.meta.yml
- docs/archive/v1-2-multi-framing/work-system.html.meta.yml
- docs/dogfood.html.meta.yml
- docs/event-catalog.html.meta.yml
- docs/roadmap.html.meta.yml
- docs/schemas.html.meta.yml
- docs/system-diagram.html.meta.yml
- site-ia.md
- tasks/ROADMAP.md
- tasks/delta-manifest-v1.0.md
- tasks/expand-event-catalog.md
- tasks/roadmap-observe-update.md
- tasks/sync-guardrails.md
- tasks/system-diagram-page.md
- tasks/v1.0-site-sync-audit-report.md
- tasks/walkthrough-page.md
