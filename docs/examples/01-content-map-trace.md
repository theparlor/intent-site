---
title: 01 Content Map Trace
type: framework
maturity: final
confidentiality: internal
reusability: adaptable
created: 2026-05-21
depth_score: 2
depth_signals:
  file_size_kb: 2.7
  content_chars: 2506
  entity_count: 0
  slide_count: 0
  sheet_count: 0
  topic_count: 0
  has_summary: 0
vocab_density: 0.00
---
# Example 01 — Content Map Trace

> How to trace a site claim back to its source in the product repo, and how to update both sides when the source changes.

---

## Scenario

You're working on `signals.html` and you see this text:

> "Trust score = clarity × 0.30 + recency × 0.25 + specificity × 0.20 + frequency × 0.15 + novelty × 0.10"

Is this accurate? Where does it come from? What do you update if the formula changes?

---

## Step 1: Open `content-map.md`

Look up `signals.html` in the content map:

```
## Source: spec/signal-trust-framework.md
| Site page | Claim | Quote/reference |
|-----------|-------|-----------------| 
| signals.html | Trust scoring on signal cards | Confidence and trust scores |
```

The source is `spec/signal-trust-framework.md` in the product repo (`theparlor/intent`).

---

## Step 2: Verify Against the Product Repo

Open `theparlor/intent/spec/signal-trust-framework.md` and look up the formula.

```bash
# Clone or pull the product repo if you don't have it locally
git clone https://github.com/theparlor/intent.git
cat intent/spec/signal-trust-framework.md | grep -A 5 "Trust"
```

Compare the formula in the spec to what's on the site.

---

## Step 3: If They Match — You're Done

If the site claim matches the spec, no update needed. Move on.

---

## Step 4: If They Diverge — Update the Site

If the spec has a different formula:

1. Update `docs/signals.html` to match the spec.
2. The `content-map.md` row itself doesn't change (the mapping is still correct).
3. Run contracts: `site-contracts.md`.
4. Commit with a message that names the source: `fix(signals): sync trust formula with spec/signal-trust-framework.md`.

---

## Step 5: If You're Adding a New Claim

If you add a new fact to a page:

1. Find the source in the product repo.
2. Add a row to `content-map.md`:

```markdown
## Source: spec/[source-file].md
| Site page | Claim | Quote/reference |
|-----------|-------|-----------------| 
| [page].html | [What you're claiming] | [Relevant quote or section] |
```

3. If no source exists yet in the product repo, either (a) add the source there first, or (b) flag it as unverified with a note in `content-map.md` pending product repo update.

---

## What You've Proven

After this trace, you know:
- The claim's source of truth
- Whether the site is in sync with the product
- Exactly what to update if either side changes

This is the content-map pattern. Every factual claim on the site should be traceable this way.
