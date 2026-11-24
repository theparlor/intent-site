#!/usr/bin/env python3
"""This repository's caller for the land reviewer (report only).

The reviewer lives in Forge (outputs/claude-code/governance/land-review). This file only finds it
and runs it against this worktree, so `.agents/repository-policy.json` can name a path inside the
repository. It never stops a land: every path out of here is exit 0. The same file is used in
every repository; the copy to change is Forge's `caller.py`.
"""
import subprocess
import sys
from pathlib import Path

SKILL = Path("outputs") / "claude-code" / "governance" / "land-review" / "land_review.py"


def find_runner(top: Path):
    for up in top.parents:  # a product beside forge, a framework beside products/, the root above Core/
        for forge in (up / "forge", up / "products" / "forge", up / "Core" / "products" / "forge"):
            if (forge / SKILL).is_file():
                return forge / SKILL
    for forge in (top / "Core" / "products" / "forge",):
        if (forge / SKILL).is_file():
            return forge / SKILL
    return None


def main() -> int:
    try:
        out = subprocess.run(["git", "-C", str(Path(__file__).resolve().parent), "rev-parse", "--show-toplevel"],
                             text=True, capture_output=True)
        top = Path(out.stdout.strip()) if out.returncode == 0 and out.stdout.strip() else Path(__file__).resolve().parent
        runner = find_runner(top)
        if runner is None:
            print("land-review: Forge's runner was not found from here; the land goes on unreviewed")
            return 0
        subprocess.run([sys.executable, str(runner), "--root", str(top)], timeout=700)
    except Exception as e:
        print(f"land-review: could not run ({type(e).__name__}); the land goes on unreviewed")
    return 0


if __name__ == "__main__":
    sys.exit(main())
