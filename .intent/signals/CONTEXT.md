---
title: Signals for intent-site
type: context
maturity: active
created: 2026-11-10
---

# Signals (.intent/signals/)

One file per thing noticed in this repository: a decision worth keeping, a surprise, a risk, a gap between what
was meant and what is. The folder is the record a later session, a sweep or a person reads cold; a decision that
lives only in a handoff, a commit message or a chat is invisible to them.

- Add one when a session decides something that a stranger could not re-derive from the code, when a risk is left
  open on purpose, or when something broke in a way worth remembering.
- Name: `SIG-<SUBJECT-IN-CAPS>-<YYYY-MM-DD>.md`. Frontmatter: `id`, `title`, `type: signal`, `status`, `severity`,
  `created`. Body in plain words: what was noticed with one concrete instance, why it matters, what would change.
- Status: `open` until someone acts; `resolved` only with `upstream_control_path` (the file that prevents a
  recurrence) and `catch_mechanism` (the check that flags one); otherwise `symptom-repaired, upstream-pending`
  (WS-DDR-113). A signal is never deleted; a superseded one says so and points at its successor.
- `session land` writes `SIG-intent-site-<task>-<date>.md` here when a session's handoff has "Decisions made" or
  "Unresolved risks or decisions" filled and the change carries no signal of its own (kit 33). Those stubs quote
  the handoff verbatim and carry `derived_by: session land`; triage them like any other signal.

This file was written by `session land` when it created the folder; the repository owns it from then on.
