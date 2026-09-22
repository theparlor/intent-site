#!/usr/bin/env bash
# test-no-hardcoded-home.sh: catch-net for SIG-HOOKS-HARDCODE-HOME-PATH-2026-09-22.
#
# Scripts in this repo run on whichever machine cloned it. A literal
# /Users/<account>/ path resolves to nothing on a machine whose account is named
# differently. Use "$HOME/..." or "${WORKSPACES_ROOT:-$HOME/Workspaces}" in bash
# and "~/..." in comments and messages.
#
# Scope: every tracked code or config file. Prose (.md, .html, .txt) is out of
# scope. Run: bash tests/test-no-hardcoded-home.sh  (exit 0 clean, 1 on a hit)
set -u
cd "$(dirname "${BASH_SOURCE[0]}")/.." || exit 1

hits=$(git ls-files -z -- '*.sh' '*.bash' '*.py' '*.js' '*.mjs' '*.ts' '*.json' '*.yml' '*.yaml' '*.toml' '*.mermaid' \
  | xargs -0 grep -Hn '/Users/[A-Za-z0-9_.-]\+/' 2>/dev/null || true)
if [ -n "$hits" ]; then
  echo "FAIL hardcoded-home-path"
  echo "$hits" | sed 's/^/      /'
  echo "      Use \"\$HOME/...\" or \"\${WORKSPACES_ROOT:-\$HOME/Workspaces}\" (bash), \"~/...\" in prose."
  exit 1
fi
echo "PASS no-hardcoded-home-path"
