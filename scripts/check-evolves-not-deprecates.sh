#!/usr/bin/env bash
# check-evolves-not-deprecates.sh
# Catch-net for the intent-site "deprecating" anti-pattern.
# Origin: SIG-EXEC-2026-06-05-ecosystem-deprecation-correction.
#
# Canon (SIG-INTENTSITE-2026-04-23): intent-site EVOLVES IN PLACE into the
# Intent + Throughline / system-plane surface. It does NOT deprecate at launch;
# full deprecation of the standalone identity is GATED on Phase 3 (eventual
# Stage 4). DEC-004 affirms this.
#
# This guard flags any DESCRIPTIVE Core doc (.md) line that couples "intent-site"
# with a bald "deprecat" claim lacking a canon qualifier (evolves / NOT
# deprecated / gates on Phase 3 / deprecation gate / eventual / Stage 4).
#
# Historical records under .intent/ and frozen archive/ eras are EXCLUDED on
# purpose: they legitimately quote the old stance as point-in-time fact.
#
# Uses grep -r (POSIX, always present; traverses gitignored sibling product
# repos parallax/warp since they are physically on disk). NO rg dependency --
# an earlier rg-based version false-passed when rg was off the script PATH.
#
# Exit 0 = clean. Exit 1 = drift found. Exit 2 = the scan could not run
# (fails CLOSED -- never reports a false OK). Verified zero-violation on
# Core state 2026-06-05.
set -u

ROOT="${1:-/Users/brien/Workspaces/Core}"

if [ ! -d "$ROOT" ]; then
  echo "ERROR: scan root not found: $ROOT" >&2
  exit 2
fi

# Sanity guard: intent-site appears in many Core .md docs. If the broad scan
# returns near-nothing, the search did not actually run -- fail closed.
broad="$(grep -rniE 'intent-site' "$ROOT" --include='*.md' --exclude-dir='.git' 2>/dev/null | wc -l | tr -d ' ')"
if [ "${broad:-0}" -lt 5 ]; then
  echo "ERROR: catch-net sanity check failed -- only ${broad:-0} 'intent-site' matches under $ROOT (expected many)." >&2
  echo "The search is broken (tool/path); refusing to report a false OK." >&2
  exit 2
fi

# The 'deprecat' test runs against a SCRUBBED copy of each line with SIG-*/JRN-*
# filename tokens removed, while the ORIGINAL line is what gets reported. A line
# that merely CITES a signal or journal whose filename contains "deprecation" is a
# citation, not an assertion about intent-site's status. Reporting those was a
# false positive that GREW every week, because each sweep's journal recorded the
# previous sweep's triage and became next week's match.
# See SIG-2026-08-31-s12-detector-flags-its-own-journals.
matches="$(grep -rniE 'intent-site' "$ROOT" \
  --include='*.md' \
  --exclude-dir='.git' \
  --exclude-dir='.intent' \
  --exclude-dir='archive' \
  --exclude-dir='journal' \
  2>/dev/null \
  | awk '{ scrub=$0; gsub(/(SIG|JRN)-[A-Za-z0-9._-]*/, "", scrub);
           if (tolower(scrub) ~ /deprecat/) print $0 }' \
  | grep -ivE 'evolv|not[ -]deprecat|gates? on phase|deprecation gate|eventual|stage 4')"

if [ -n "$matches" ]; then
  echo "DRIFT: intent-site coupled with an unqualified 'deprecat' claim in descriptive doc(s):"
  echo "$matches"
  echo
  echo "Canon (SIG-INTENTSITE-2026-04-23): intent-site EVOLVES IN PLACE; full deprecation gates on Phase 3."
  echo "Fix: add an evolves/gated qualifier to the line, or (if it is a point-in-time record) move it under .intent/."
  exit 1
fi

echo "OK: no intent-site deprecation drift in descriptive Core docs ($ROOT) [scanned $broad intent-site refs]."
exit 0
