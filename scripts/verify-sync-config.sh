#!/usr/bin/env bash
# verify-sync-config.sh — Check that sync-config.json product_repo_path resolves before any sync
# Run before scripts/sync-signals.js or any other sync operation.
# Usage: bash scripts/verify-sync-config.sh
# Each run reports one Witness event, intent_site.verify_sync_config (WS-DDR-150, fail-open,
# never changes the exit code): ok when the path resolves, blocked when it does not.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INTENT_SITE_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
CONFIG="$INTENT_SITE_ROOT/sync-config.json"

_wx_product="intent-site"
_wx_event="intent_site.verify_sync_config"
_wx_target="sync-config.json"
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

if [ ! -f "$CONFIG" ]; then
  echo "ERROR: sync-config.json not found at $CONFIG"
  _wx_outcome=blocked
  _wx_on_exit_emit 1
  exit 1
fi

# Extract product_repo_path from sync.product_repo_path (portable jq or python fallback)
if command -v jq &>/dev/null; then
  PRODUCT_REPO_PATH=$(jq -r '.sync.product_repo_path' "$CONFIG")
else
  PRODUCT_REPO_PATH=$(python3 -c "import json; c=json.load(open('$CONFIG')); print(c['sync']['product_repo_path'])")
fi

# Resolve relative to intent-site root
RESOLVED="$INTENT_SITE_ROOT/$PRODUCT_REPO_PATH"
RESOLVED=$(cd "$INTENT_SITE_ROOT" && python3 -c "import os,sys; print(os.path.realpath('$PRODUCT_REPO_PATH'))" 2>/dev/null || echo "$RESOLVED")

if [ ! -d "$RESOLVED" ]; then
  echo "ERROR: product_repo_path '$PRODUCT_REPO_PATH' resolves to '$RESOLVED' — directory does not exist."
  echo "       Update sync-config.json product_repo_path to a valid path before running sync scripts."
  _wx_outcome=blocked
  _wx_on_exit_emit 1
  exit 1
fi

echo "PASS: product_repo_path '$PRODUCT_REPO_PATH' resolves to '$RESOLVED' — directory exists."
_wx_on_exit_emit 0
