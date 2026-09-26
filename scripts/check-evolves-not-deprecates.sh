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
#
# Each run reports one Witness event, intent_site.check_evolves (WS-DDR-150,
# fail-open, never changes the exit code): ok when clean, blocked on drift
# (exit 1), error when the scan cannot run (exit 2).
set -u

ROOT="${1:-${WORKSPACES_ROOT:-$HOME/Workspaces}/Core}"

_wx_product="intent-site"
_wx_event="intent_site.check_evolves"
_wx_target="$(basename "$ROOT")"
# Snippet below is witness_bash_snippet.sh v2, verbatim. This script also calls
# _wx_on_exit_emit <status> before each explicit exit, so a run under bash 3.2 with nounset
# (where v2 installs no trap) still records its verdict; the trap's later call is a no-op.
# Claude Code sets CLAUDE_CODE_SESSION_ID (not CLAUDE_SESSION_ID); name the session as the caller.
: "${WITNESS_CALLER:=${CLAUDE_CODE_SESSION_ID:+session:$CLAUDE_CODE_SESSION_ID}}"
# --- Witness (WS-DDR-150), witness-bash-snippet v2: one event per run; fail-open, never changes the exit status.
# Set _wx_product, _wx_event (static; underscores only in the event name) and optionally _wx_target
# before this block.
# - Safe under set -euo pipefail: setup runs in a function called with "|| true" (errexit is off inside
#   it); the EXIT handler captures the status first (rc=$?), turns errexit, nounset and pipefail off,
#   and ends with exit "$rc".
# - witness-emit is resolved ONCE, at startup, from this script's own directory, so a later cd cannot
#   lose it. Not found (a sparse tree, a copy outside Core/): the handler emits nothing.
# - bash 3.2 (macOS /bin/bash, and Legatus has nothing newer) runs an EXIT trap with $? = 0 after a
#   "set -u" unbound-variable abort, so ANY EXIT trap turns that failure into exit 0. When this block
#   runs under bash < 4 with nounset on, it does NOT install the trap; call _wx_emit_now [outcome] at
#   the script's normal end instead (that run's failures then go unrecorded, which is the fail-open
#   choice). Known gap everywhere: a script killed by a signal bash does not trap (SIGPIPE, SIGKILL)
#   never runs the EXIT trap and emits nothing.
# - If the script already sets an EXIT trap, do not add a second one (it replaces the first): call
#   _wx_on_exit_emit "$rc" from the existing trap after capturing rc=$? there.
_wx_init() {
  local d
  _wx_emitted=""
  _wx_t0=$(/usr/bin/perl -MTime::HiRes=time -e 'printf "%d", time*1000' 2>/dev/null) || _wx_t0=0
  [ -n "$_wx_t0" ] || _wx_t0=0
  _wx_run="${WITNESS_RUN_ID:-}"
  if [ -z "$_wx_run" ]; then
    _wx_run=$(/usr/bin/uuidgen 2>/dev/null) || _wx_run="$$-$(date +%s)"
    _wx_run=$(printf '%s' "$_wx_run" | tr 'A-Z' 'a-z' | tr -d '-')
  fi
  _wx_trap_safe=1
  case "$-" in *u*) [ "${BASH_VERSINFO[0]:-0}" -ge 4 ] || _wx_trap_safe="" ;; esac
  _wx_emit_bin=""
  if [ -n "${WITNESS_ROOT:-}" ] && [ -x "$WITNESS_ROOT/bin/witness-emit" ]; then
    _wx_emit_bin="$WITNESS_ROOT/bin/witness-emit"; return 0
  fi
  d="$(cd "$(dirname "${BASH_SOURCE[0]}")" 2>/dev/null && pwd)" || d=""
  while [ -n "$d" ] && [ "$d" != "/" ]; do
    if [ "$(basename "$d")" = "Core" ] && [ -x "$d/products/witness/bin/witness-emit" ]; then
      _wx_emit_bin="$d/products/witness/bin/witness-emit"; return 0
    fi
    d="$(dirname "$d")"
  done
  if [ -n "${HOME:-}" ] && [ -x "$HOME/Workspaces/Core/products/witness/bin/witness-emit" ]; then
    _wx_emit_bin="$HOME/Workspaces/Core/products/witness/bin/witness-emit"
  fi
  return 0
}
_wx_on_exit_emit() {  # $1 = the script's exit status; never fails, never exits
  local rc="${1:-0}" t1 outcome caller
  [ -z "${_wx_emitted:-}" ] || return 0
  _wx_emitted=1
  [ -n "${_wx_emit_bin:-}" ] && [ -x "$_wx_emit_bin" ] || return 0
  t1=$(/usr/bin/perl -MTime::HiRes=time -e 'printf "%d", time*1000' 2>/dev/null) || t1=""
  [ -n "$t1" ] || t1="${_wx_t0:-0}"
  outcome=ok; [ "$rc" = "0" ] || outcome=error
  if [ -n "${WITNESS_CALLER:-}" ]; then caller="$WITNESS_CALLER"
  elif [ -n "${CLAUDE_SESSION_ID:-}" ]; then caller="session:$CLAUDE_SESSION_ID"
  elif [[ "${XPC_SERVICE_NAME:-}" == com.brien.* ]]; then caller="launchd:$XPC_SERVICE_NAME"
  else caller="manual:${USER:-unknown}"; fi
  "$_wx_emit_bin" --product "${_wx_product:-unknown}" --event "${_wx_event:-unknown.run}" --caller "$caller" \
    --outcome "${_wx_outcome:-$outcome}" --duration-ms "$(( t1 - ${_wx_t0:-0} ))" --target "${_wx_target:-}" \
    --run-id "${_wx_run:-}" --attr "exit_code=$rc" >/dev/null 2>&1 </dev/null || true
  return 0
}
_wx_on_exit() {
  local rc=$?
  set +eu
  set +o pipefail
  _wx_on_exit_emit "$rc"
  exit "$rc"
}
_wx_emit_now() {  # explicit emit at a normal end (for bash 3.2 + set -u scripts); $1 outcome, default ok
  local o="${1:-ok}"
  if [ "$o" = "ok" ]; then _wx_on_exit_emit 0 || true; else _wx_outcome="$o"; _wx_on_exit_emit 1 || true; fi
  return 0
}
_wx_init || true
if [ -n "${_wx_trap_safe:-}" ]; then trap _wx_on_exit EXIT; fi
# --- end Witness

if [ ! -d "$ROOT" ]; then
  echo "ERROR: scan root not found: $ROOT" >&2
  _wx_on_exit_emit 2
  exit 2
fi

# Sanity guard: intent-site appears in many Core .md docs. If the broad scan
# returns near-nothing, the search did not actually run -- fail closed.
broad="$(grep -rniE 'intent-site' "$ROOT" --include='*.md' --exclude-dir='.git' 2>/dev/null | wc -l | tr -d ' ')"
if [ "${broad:-0}" -lt 5 ]; then
  echo "ERROR: catch-net sanity check failed -- only ${broad:-0} 'intent-site' matches under $ROOT (expected many)." >&2
  echo "The search is broken (tool/path); refusing to report a false OK." >&2
  _wx_on_exit_emit 2
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
  _wx_outcome=blocked
  _wx_on_exit_emit 1
  exit 1
fi

echo "OK: no intent-site deprecation drift in descriptive Core docs ($ROOT) [scanned $broad intent-site refs]."
_wx_on_exit_emit 0
exit 0
