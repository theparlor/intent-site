---
id: SIG-EVOLVES-SCAN-COUNTS-CENSUS-FILENAME-AS-CLAIM-2026-07-27
title: The evolves-not-deprecates scan flags a census data row as a deprecation claim
type: signal
kind: product-level-upgrade
status: open
severity: low
created: 2026-07-27
discovered_by: weekly overwatch sweep (Section 12)
scope: infrastructure
affects: Core/frameworks/intent-site/scripts/check-evolves-not-deprecates.sh
---

# The evolves-not-deprecates scan counts a filename inside a data table as a lifecycle claim

## What the scan reported

`check-evolves-not-deprecates.sh` exited 1 (DRIFT) on the 2026-07-27 sweep, with one offending
line:

```
Core/products/_intake/2026-07-19-signal-dirt-census/census.md:114
```

## Why it is a false positive

That line is a row in a census table. Its subject is a malformed YAML field: a `catch_mechanism`
value containing an unquoted colon-plus-space, which YAML's block-mapping parser misreads. The
row's finding column is about quoting the value. The string that triggered the matcher is the
*filename* in the row's first column, `SIG-EXEC-2026-06-05-ecosystem-deprecation-correction.md`,
which contains "deprecation" as part of a filename appearing in a data cell.

The line makes no claim about intent-site's lifecycle. It does not assert that intent-site is
deprecated, is being deprecated, or will be. Canon (SIG-INTENTSITE-2026-04-23, affirmed by
DEC-004) — intent-site evolves in place, full deprecation gates on Phase 3 — is not contradicted
anywhere in the scanned tree.

## The precision gap

The scan's rule is "intent-site coupled with an unqualified 'deprecat' claim in a descriptive
doc." It already excludes `.intent/` and frozen `archive/` eras, on the correct reasoning that
those legitimately quote the old stance as point-in-time fact. The same reasoning extends to
census and inventory artifacts: a document whose job is to *enumerate other files* will
mechanically reproduce their filenames, and those filenames are data, not assertions.

Right now the fix-suggestion the script prints ("add an evolves/gated qualifier to the line, or
move it under `.intent/`") is actively wrong for this case. Editing a census row to satisfy a
grep would corrupt the record — the row accurately describes a real file with a real YAML defect,
and the filename is not the author's to rewrite.

## Why this matters beyond one line

The failure mode of a catch-net that cries wolf is that it stops being read. This scan is the
recurrence-prevention mechanism for SIG-EXEC-2026-06-05-ecosystem-deprecation-correction, so its
exit code needs to mean something. Left as-is, it will exit 1 on the identical line every week,
and the standing instruction to treat exit 2 as fail-closed loses force when exit 1 is known
noise.

## Proposed upstream control

Extend the existing exclusion set to cover enumeration artifacts — `_intake/*-census/`,
and more generally any path segment matching `*-census*` or `*-inventory*` — using the same
mechanism that already excludes `.intent/` and `archive/`.

A stricter alternative worth considering instead: require the "deprecat" token to appear outside
a markdown table cell, or outside a backtick-quoted span. That is narrower than a path exclusion
and would survive census documents living somewhere new. It is also more code. Path exclusion is
the cheaper first move and matches the pattern the script already uses.

## Closure DoD

- `upstream_control_path:` the exclusion (or token-context rule) inside
  `Core/frameworks/intent-site/scripts/check-evolves-not-deprecates.sh`
- `catch_mechanism:` overwatch Section 12, which invokes the script every sweep — a subsequent
  sweep exiting 0 with the census file still present on disk is the verification
- `pipeline_survival:` the rule lives in the script itself, so it survives any re-run

## Verification command

```
Core/frameworks/intent-site/scripts/check-evolves-not-deprecates.sh; echo $?
```

Expected after fix: exit 0, with `Core/products/_intake/2026-07-19-signal-dirt-census/census.md`
still on disk and unedited.
