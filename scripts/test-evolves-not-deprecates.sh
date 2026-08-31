#!/bin/sh
# Falsification harness for check-evolves-not-deprecates.sh.
#
# Exists because 2026-08-31 narrowed that detector's scope (journal/ excluded,
# SIG-/JRN- filename tokens scrubbed before the 'deprecat' test). Narrowing a
# guard without a test that proves it still fires is how a guard goes quietly
# blind. This asserts BOTH directions on every run:
#   - a bald unqualified claim STILL trips it (exit 1)
#   - citations, journals and canon-qualified lines DO NOT (exit 0)
#
# Exit 0 = detector behaves correctly. Exit 1 = detector regressed.
set -u
SCRIPT="$(cd "$(dirname "$0")" && pwd)/check-evolves-not-deprecates.sh"
[ -x "$SCRIPT" ] || { echo "ERROR: detector not executable: $SCRIPT" >&2; exit 1; }
FIX="$(mktemp -d)"; trap 'rm -rf "$FIX"' EXIT
mkdir -p "$FIX/docs" "$FIX/journal"
# The sanity gate needs >=5 'intent-site' refs before it will scan at all.
i=1; while [ $i -le 6 ]; do echo "intent-site reference line $i" > "$FIX/docs/pad$i.md"; i=$((i+1)); done
echo 'See SIG-EXEC-2026-06-05-ecosystem-deprecation-correction.md. intent-site context.' > "$FIX/docs/citation.md"
echo 'intent-site is deprecating, said the old sweep.' > "$FIX/journal/JRN-x.md"
echo 'intent-site evolves in place; deprecation gates on Phase 3.' > "$FIX/docs/qualified.md"

fail=0
# Direction 1: clean corpus (citation + journal + qualified only) must pass.
"$SCRIPT" "$FIX" >/dev/null 2>&1
[ $? -eq 0 ] || { echo "FAIL: detector flagged a citation/journal/qualified-only corpus (false positive regression)"; fail=1; }
# Direction 2: add a bald claim; it MUST trip.
echo 'The intent-site product is being deprecated this quarter.' > "$FIX/docs/real-drift.md"
"$SCRIPT" "$FIX" >/dev/null 2>&1
[ $? -eq 1 ] || { echo "FAIL: detector did NOT flag a bald unqualified deprecation claim (guard has gone blind)"; fail=1; }

[ $fail -eq 0 ] && echo "OK: check-evolves-not-deprecates.sh fires on real drift and ignores citations/journals."
exit $fail
