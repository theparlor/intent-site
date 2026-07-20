---
title: Site Contracts
type: framework
maturity: final
confidentiality: shareable
reusability: universal
domains:
  - consulting-operations
created: 2026-03-31
updated: 2026-06-05
depth_score: 4
depth_signals:
  file_size_kb: 9.7
  content_chars: 9507
  entity_count: 0
  slide_count: 0
  sheet_count: 0
  topic_count: 1
  has_summary: 0
vocab_density: 0.21
---
# Intent Site Contracts

> Verifiable assertions for the Intent product site. Run these checks after ANY modification to files in `docs/`.
> Each contract is a shell command that returns pass/fail. All must pass before committing.
> **IA v3 (Phase 10, 2026-06-05):** Four-zone model — **The Hypothesis · The System · The Build · The Proof** — with the **home served at the default root (`index.html`)**, not a redirect to `pitch.html` (that URL is retired). Visual identity is the "behind-the-veil" family (Montserrat + heat accent + darker metal base) defined in `styles.css`; loop-phase / trust / persona accent colors are SEMANTIC and preserved.

## Zone page sets (the IA)

```
HYPOTHESIS  index.html (hero) · concept-brief · lineage · roadmap · when-not · who-loses · ending · neutral-zone
SYSTEM      the-system.html (hub) · methodology · walkthrough · work-system · signals · personas · event-catalog · observe · getting-started
BUILD       the-build.html (hub) · architecture · system-diagram · flow-diagram · observability · arb · decisions · schemas · agents · deployment · native-repos
PROOF       the-proof.html (hub) · dogfood · products (Governed Repos) · review-2026-04-09 (Panel Review)
SPECIAL     visual-brief.html (iframe CTA, primary nav only, no sub-nav)
```

Home is `index.html`, served at the site root. Primary nav (every page): logo → `index.html`, then `The Hypothesis` (→ `index.html`) · `The System` · `The Build` · `The Proof`. Exactly one zone link carries `class="active"`.

## CON-SITE-001: Every HTML file has the 4-zone primary nav

**Type:** structural · **Severity:** critical

```bash
cd docs/
FAIL=0
for f in *.html; do
  grep -q 'class="site-nav"' "$f" || { echo "FAIL: $f missing site-nav"; FAIL=1; }
  for link in index.html the-system.html the-build.html the-proof.html; do
    grep -q "href=\"$link\"" "$f" || { echo "FAIL: $f missing nav link to $link"; FAIL=1; }
  done
done
[ $FAIL -eq 0 ] && echo "PASS: CON-SITE-001"
```

## CON-SITE-002: Correct active states per zone

**Type:** structural · **Severity:** major

```bash
cd docs/
FAIL=0
for f in index.html concept-brief.html lineage.html roadmap.html when-not.html who-loses.html ending.html neutral-zone.html \
         the-system.html methodology.html walkthrough.html work-system.html signals.html personas.html event-catalog.html observe.html getting-started.html \
         the-build.html architecture.html system-diagram.html flow-diagram.html observability.html arb.html decisions.html schemas.html agents.html deployment.html native-repos.html \
         the-proof.html dogfood.html products.html review-2026-04-09.html; do
  [ -f "$f" ] || continue
  grep -q 'class="active"' "$f" || { echo "FAIL: $f has no active nav link"; FAIL=1; }
done
[ $FAIL -eq 0 ] && echo "PASS: CON-SITE-002"
```

## CON-SITE-003: Standard footer on all pages

**Type:** structural · **Severity:** major

```bash
cd docs/
FAIL=0
for f in *.html; do
  grep -q 'github.com/theparlor/intent' "$f" || { echo "FAIL: $f missing footer link"; FAIL=1; }
  grep -q 'Built with the Intent methodology' "$f" || { echo "FAIL: $f missing footer tagline"; FAIL=1; }
done
[ $FAIL -eq 0 ] && echo "PASS: CON-SITE-003"
```

## CON-SITE-004: All HTML pages link styles.css

**Type:** structural · **Severity:** critical

```bash
cd docs/
FAIL=0
for f in *.html; do
  grep -q 'href="styles.css"' "$f" || { echo "FAIL: $f does not link styles.css"; FAIL=1; }
done
[ $FAIL -eq 0 ] && echo "PASS: CON-SITE-004"
```

## CON-SITE-005: Rich pages retain page-specific CSS

**Type:** quality · **Severity:** critical

```bash
cd docs/
FAIL=0
check_inline_css() { local file=$1 min=$2; [ -f "$file" ] || return; CSS=$(sed -n '/<style>/,/<\/style>/p' "$file" | wc -l); [ "$CSS" -lt "$min" ] && { echo "FAIL: $file ${CSS} inline CSS lines < ${min}"; FAIL=1; }; }
check_inline_css index.html 30
check_inline_css the-build.html 30
check_inline_css the-proof.html 30
check_inline_css arb.html 80
check_inline_css signals.html 50
check_inline_css roadmap.html 50
check_inline_css dogfood.html 30
check_inline_css architecture.html 30
check_inline_css agents.html 30
check_inline_css deployment.html 30
[ $FAIL -eq 0 ] && echo "PASS: CON-SITE-005"
```

## CON-SITE-006: File size canary — no page dropped below ~70% of baseline

**Type:** quality · **Severity:** critical

```bash
cd docs/
FAIL=0
check_size() { local file=$1 min=$2; [ -f "$file" ] || return; SIZE=$(wc -c < "$file"); [ "$SIZE" -lt "$min" ] && { echo "FAIL: $file is ${SIZE}B, expected >= ${min}B"; FAIL=1; }; }
check_size index.html 25000
check_size the-system.html 11000
check_size the-build.html 14000
check_size the-proof.html 12000
check_size work-system.html 33600
check_size signals.html 33600
check_size arb.html 27300
check_size dogfood.html 17000
check_size roadmap.html 10500
check_size methodology.html 8400
check_size concept-brief.html 7000
check_size decisions.html 7000
check_size event-catalog.html 5600
check_size walkthrough.html 10500
check_size observe.html 8400
check_size getting-started.html 7000
check_size schemas.html 5600
check_size architecture.html 10500
check_size agents.html 10500
check_size deployment.html 8400
check_size native-repos.html 9000
check_size products.html 7000
[ $FAIL -eq 0 ] && echo "PASS: CON-SITE-006"
```

## CON-SITE-007: Sub-nav on ALL zone pages

**Type:** structural · **Severity:** critical — excludes only `visual-brief.html` (iframe CTA)

```bash
cd docs/
FAIL=0
for f in index.html concept-brief.html lineage.html roadmap.html when-not.html who-loses.html ending.html neutral-zone.html \
         the-system.html methodology.html walkthrough.html work-system.html signals.html personas.html event-catalog.html observe.html getting-started.html \
         the-build.html architecture.html system-diagram.html flow-diagram.html observability.html arb.html decisions.html schemas.html agents.html deployment.html native-repos.html \
         the-proof.html dogfood.html products.html review-2026-04-09.html; do
  [ -f "$f" ] || continue
  grep -q 'class="sub-nav"' "$f" || { echo "FAIL: $f missing sub-nav"; FAIL=1; }
done
[ $FAIL -eq 0 ] && echo "PASS: CON-SITE-007"
```

## CON-SITE-008: Key visual components preserved

**Type:** quality · **Severity:** critical

```bash
cd docs/
FAIL=0
# index.html (IA v3 hypothesis hero) components
if [ -f index.html ]; then
  for c in 'hero-loop' 'hypothesis-box' 'three-col' 'honesty-box' 'who-for' 'lineage-strip' '<svg'; do
    grep -q "$c" index.html || { echo "FAIL: index.html missing $c"; FAIL=1; }
  done
fi
if [ -f arb.html ]; then
  for c in switchTab tab-btn radar '<svg' 'class="blip"'; do
    grep -q "$c" arb.html || { echo "FAIL: arb.html missing $c"; FAIL=1; }
  done
fi
if [ -f signals.html ]; then
  grep -q 'SIG-001' signals.html || { echo "FAIL: signals.html missing SIG-001"; FAIL=1; }
  grep -q 'SIG-015' signals.html || { echo "FAIL: signals.html missing SIG-015"; FAIL=1; }
fi
[ $FAIL -eq 0 ] && echo "PASS: CON-SITE-008"
```

## CON-SITE-009: No broken internal links

**Type:** quality · **Severity:** major

```bash
cd docs/
FAIL=0
for f in *.html; do
  LINKS=$(grep -oE 'href="[^"]*\.html' "$f" 2>/dev/null | sed 's/href="//' | sort -u)
  for link in $LINKS; do
    [[ "$link" == http* ]] && continue
    [ -f "$link" ] || { echo "FAIL: $f links to $link which does not exist"; FAIL=1; }
  done
done
[ $FAIL -eq 0 ] && echo "PASS: CON-SITE-009"
```

## CON-SITE-010: No old three-pillar nav remnants

**Type:** structural · **Severity:** critical

```bash
cd docs/
FAIL=0
for f in *.html; do
  OLD=$(sed -n '/<nav class="site-nav">/,/<\/nav>/p' "$f" | grep -c '>The Story<\|href="work-system.html"\|href="architecture.html"\|href="pitch.html"')
  if [ "$OLD" -gt 0 ]; then echo "FAIL: $f still has old three-pillar primary nav ($OLD)"; FAIL=1; fi
done
[ $FAIL -eq 0 ] && echo "PASS: CON-SITE-010"
```

## CON-SITE-011: Doorway into the coherence-stack surface (no in-line catalog)

**Type:** content · **Severity:** major

Per DEC-004 (+ multi-doorway update) and WS-DDR-107: intent-site connects to the broader coherence stack via honest doorways into the **real** Parallax surface, NOT by enumerating the portfolio in-line.

```bash
cd docs/
FAIL=0
for f in architecture.html dogfood.html; do
  grep -q 'theparlor.github.io/parallax-site' "$f" || { echo "FAIL: $f missing Parallax doorway link"; FAIL=1; }
done
[ $FAIL -eq 0 ] && echo "PASS: CON-SITE-011"
```

## CON-SITE-012: personas.html stays a dogfood doorway, not Intent's own catalog

**Type:** content · **Severity:** major

Per DEC-004 + the worldview content-plan §4: `personas.html` (sub-nav label "Voices") surfaces **Cast** (identity) and **Voices** (judgment) as products Intent *dogfoods*, with honest doorways to the canonical product surfaces — it does NOT claim to own the registry or present itself as the canonical catalog. This fires if the old conflation framing returns or the doorways / two-channel naming are lost. (Persona COUNTS on the page remain L0 / TASK-004 — this contract does not touch them.)

```bash
cd docs/
FAIL=0
# Conflation tripwires — must NOT appear
while IFS= read -r phrase; do
  grep -qF "$phrase" personas.html && { echo "FAIL: personas.html reintroduces conflation phrase: \"$phrase\""; FAIL=1; }
done <<'PHRASES'
Intent's persona system
The Complete Voice Catalog
Every entity in the persona registry
PHRASES
# Required reframe tokens — must appear
for token in machine_assertions named_dissents voices-site cast-site dogfood; do
  grep -qF "$token" personas.html || { echo "FAIL: personas.html missing required reframe token: \"$token\""; FAIL=1; }
done
[ $FAIL -eq 0 ] && echo "PASS: CON-SITE-012"
```

## CON-SITE-013: Numeric parity with ground truth (freshness catch-net)

**Type:** content · **Severity:** major

Added 2026-07-19 after the 15-vs-25 event-count drift slipped past the hash-based freshness tracker (`.freshness-state.json` records that a source changed, not whether the site absorbed the change). This contract compares the site's headline numbers against the live product repo and Cast registry. Slow-moving canon (event-catalog count) must match exactly; fast-moving streams (signals, registry) tolerate a drift band before failing, so routine growth does not produce alarm fatigue.

```bash
cd docs/
FAIL=0
SRC="../../intent"
CAST="../../../products/cast/farm/registry"
if [ -d "$SRC" ]; then
  EV=$(grep -oE '^## The [0-9]+ Events' "$SRC/spec/event-catalog.md" | grep -oE '[0-9]+' | head -1)
  if [ -n "$EV" ]; then
    grep -q "${EV} event types" event-catalog.html || { echo "FAIL: event-catalog.html does not carry the catalog's ${EV}-event count"; FAIL=1; }
    grep -q "${EV} event types" dogfood.html || { echo "FAIL: dogfood.html event-catalog card does not carry ${EV} event types"; FAIL=1; }
  fi
  LIVE=$(ls "$SRC/.intent/signals/" 2>/dev/null | grep -c '\.md$')
  SITE=$(grep -oE '<div class="num amber">[0-9]+</div>' the-proof.html | grep -oE '[0-9]+' | head -1)
  if [ -n "$LIVE" ] && [ -n "$SITE" ] && [ "$SITE" -gt 0 ]; then
    DRIFT=$(( (LIVE - SITE) * 100 / SITE )); DRIFT=${DRIFT#-}
    [ "$DRIFT" -gt 25 ] && { echo "FAIL: the-proof.html internal-signal stat ${SITE} drifted ${DRIFT}% from live count ${LIVE}"; FAIL=1; }
  fi
fi
if [ -d "$CAST" ]; then
  REG=$(ls "$CAST"/*.yaml 2>/dev/null | wc -l | tr -d ' ')
  SITEREG=$(grep -oE '[0-9]{3} entities' personas.html | head -1 | grep -oE '[0-9]+')
  if [ -n "$REG" ] && [ "$REG" -gt 0 ] && [ -n "$SITEREG" ] && [ "$SITEREG" -gt 0 ]; then
    RDRIFT=$(( (REG - SITEREG) * 100 / SITEREG )); RDRIFT=${RDRIFT#-}
    [ "$RDRIFT" -gt 5 ] && { echo "FAIL: personas.html census ${SITEREG} drifted ${RDRIFT}% from live registry count ${REG}"; FAIL=1; }
  fi
fi
[ $FAIL -eq 0 ] && echo "PASS: CON-SITE-013"
```

## Contract Summary

| ID | Name | Severity | What It Catches |
|----|------|----------|-----------------|
| CON-SITE-001 | 4-zone primary nav present | critical | Missing zone navigation |
| CON-SITE-002 | Active state correct per zone | major | Wrong zone/page highlighted |
| CON-SITE-003 | Standard footer | major | Missing/wrong footer |
| CON-SITE-004 | All pages link styles.css | critical | Missing shared foundation |
| CON-SITE-005 | Rich pages retain inline CSS | critical | Stripped page-specific visuals |
| CON-SITE-006 | File size canary | critical | Content loss detection |
| CON-SITE-007 | Sub-nav on all zone pages | critical | Missing within-zone navigation |
| CON-SITE-008 | Visual components intact | critical | Lost diagrams/interactives |
| CON-SITE-009 | No broken links | major | Dead internal links |
| CON-SITE-010 | No old three-pillar/pitch.html nav remnants | critical | Incomplete IA v3 / home-at-root migration |
| CON-SITE-011 | Doorway into Parallax (no in-line catalog) | major | Worldview off-loaded to the real Parallax/portfolio surface |
| CON-SITE-012 | personas.html dogfood doorway (no conflation) | major | Registry-ownership conflation returns / Cast+Voices doorways + two-channel naming lost |
| CON-SITE-013 | Numeric parity with ground truth | major | Site headline numbers drifting from the product repo and Cast registry (the drift class the hash-based freshness tracker cannot see) |
