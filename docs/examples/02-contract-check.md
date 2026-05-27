---
title: 02 Contract Check
type: framework
maturity: final
confidentiality: internal
reusability: adaptable
created: 2026-05-21
depth_score: 2
depth_signals:
  file_size_kb: 3.4
  content_chars: 3207
  entity_count: 0
  slide_count: 0
  sheet_count: 0
  topic_count: 0
  has_summary: 0
vocab_density: 0.00
---
# Example 02 — Running a Contract Check

> How to run the site-contracts.md assertions after making a change to `docs/`.

---

## When to Run Contracts

Run contracts:
- Before making any change to `docs/` (establish a clean baseline)
- After making any change to `docs/` (verify nothing broke)
- Before committing

If contracts fail before you started, note the failures and don't introduce new ones.

---

## The Contract Suite

The full list of 10 assertions is in `site-contracts.md`. Here's how to run the most common ones:

### Contract 1 — All pages link styles.css

```bash
grep -L 'styles\.css' docs/*.html
```

Expected output: nothing (empty). Any file listed is a failure.

### Contract 2 — Primary nav has exactly 3 links

```bash
for f in docs/*.html; do
  COUNT=$(grep -c '"The Story"\|"The System"\|"The Build"' "$f" 2>/dev/null || echo 0)
  if [ "$COUNT" -ne 3 ]; then echo "FAIL: $f has $COUNT nav links"; fi
done
```

Expected: no `FAIL` lines. Pages that are not pillar pages (index.html redirect, visual-brief.html) may legitimately differ — check `site-ia.md` for exceptions.

### Contract 3 — File size has not shrunk more than 20%

```bash
cd docs/
for f in *.html; do SIZE=$(wc -c < "$f"); echo "$SIZE $f"; done | sort -rn
```

Compare against baselines in `site-spec.md`. A page that was 45KB and is now 30KB warrants investigation.

### Contract 4 — All pages have a footer

```bash
grep -L 'github\.com/theparlor/intent' docs/*.html
```

Expected: nothing. The standard footer includes a link to the product repo.

### Contract 5 — index.html is a redirect (not a full page)

```bash
wc -c docs/index.html
```

Expected: under 500 bytes. If it's larger, the redirect has been replaced with a full page.

---

## Interpreting Failures

| Failure type | Likely cause | Fix |
|-------------|-------------|-----|
| Missing `styles.css` link | Skeleton/placeholder replaced the page | Restore the full page from git |
| Wrong nav link count | Nav template was modified | Restore nav from `CLAUDE.md § Primary Nav` |
| File shrunk >20% | Page was trimmed or replaced | Restore from git or check what was removed |
| Missing footer | Footer was stripped | Add the standard footer from `CLAUDE.md § Footer` |
| index.html too large | redirect was replaced with content | Restore the redirect from `site-ia.md § Index Page` |

---

## After Fixing Failures

Re-run the full contract suite. All 10 assertions must pass before committing.

```bash
# Quick re-check of the ones most likely to drift:
grep -L 'styles\.css' docs/*.html  # should be empty
grep -L 'github\.com/theparlor/intent' docs/*.html  # should be empty
```

---

## Committing After a Clean Contract Run

Once contracts pass:

```bash
cd /path/to/intent-site
git add docs/[changed-files]
git commit -m "fix([page]): [what changed and why]"
```

Never commit to the live branch without Brien's approval. Local commits are L4.

---

## What You've Proven

After this workflow, you know:
- The change didn't break any of the 10 structural invariants
- File sizes are within expected ranges
- Nav, footer, and stylesheet links are intact on all pages

This is the contract-check pattern. Run it every time.
