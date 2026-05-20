#!/usr/bin/env bash
# verify-sync-config.sh — Check that sync-config.json product_repo_path resolves before any sync
# Run before scripts/sync-signals.js or any other sync operation.
# Usage: bash scripts/verify-sync-config.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INTENT_SITE_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
CONFIG="$INTENT_SITE_ROOT/sync-config.json"

if [ ! -f "$CONFIG" ]; then
  echo "ERROR: sync-config.json not found at $CONFIG"
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
  exit 1
fi

echo "PASS: product_repo_path '$PRODUCT_REPO_PATH' resolves to '$RESOLVED' — directory exists."
