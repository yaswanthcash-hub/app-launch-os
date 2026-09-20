---
name: Bug report
description: Report a defect or breakage in App Launch OS
title: "[bug]: "
labels: ["bug", "needs-triage"]
body:
  - type: markdown
    attributes:
      value: |
        Thanks for reporting. Please fill out the details below. If this is a
        security issue, use the security policy instead of this template.
  - type: textarea
    id: description
    attributes:
      label: Description
      description: What went wrong, and where? (checklist, guide, template, or workflow)
      placeholder: "e.g. The App Store submission checklist references guideline 5.1.2, but Apple now requires 5.1.3..."
    validations:
      required: true
  - type: textarea
    id: steps
    attributes:
      label: Steps to reproduce
      description: Steps that a maintainer can follow to confirm the bug.
      placeholder: |
        1. Open the file at ...
        2. Observe ...
        3. Expected ... vs actual ...
    validations:
      required: true
  - type: textarea
    id: expected
    attributes:
      label: Expected behavior
      placeholder: "e.g. The policy source link should resolve to the current Apple doc URL."
    validations:
      required: true
  - type: dropdown
    id: severity
    attributes:
      label: Severity
      description: How much does this block accuracy or policy compliance?
      multiple: false
      options:
        - Low (typo, broken link, minor inaccuracy)
        - Medium (outdated guideline reference, stale example)
        - High (incorrect compliance claim, misleading policy guidance)
        - Critical (unsafe legal/technical instruction)
    validations:
      required: true
  - type: input
    id: affected
    attributes:
      label: Affected file(s) or module
      description: e.g. checklists/appstore-submission.md, policies/apple-review-essentials.md
      placeholder: "file path or module name"
    validations:
      required: true
  - type: textarea
    id: evidence
    attributes:
      label: Evidence / policy source
      description: Link(s) to the authoritative source or screenshot showing the correct state.
      placeholder: "Apple App Store Review Guidelines URL (with date), or screenshot."
  - type: textarea
    id: proposed
    attributes:
      label: Proposed fix
      description: Optional — what change resolves this? (Maintainers will triage anyway.)
  - type: checkboxes
    id: checklist
    attributes:
      label: Checklist
      options:
        - label: I have searched the existing issues to avoid duplicates.
          required: true
        - label: I have included a policy source with a verification date where applicable.
          required: false
  - type: input
    id: version
    attributes:
      label: Verification date (YYYY-MM-DD)
      description: When was the referenced material last verified? Use the date of the source document, not the bug date.
      placeholder: "2026-09-20"
---

## Details

**Affected area:**

<!-- id: affected /-->

**Severity:**

<!-- id: severity /-->

**Verification date of referenced material:**

<!-- id: version /-->

## Description

<!-- id: description /-->

## Steps to reproduce

<!-- id: steps /-->

## Expected behavior

<!-- id: expected /-->

## Evidence

<!-- id: evidence /-->

## Proposed fix

<!-- id: proposed /-->

---

*Filled: App Launch OS bug report. Reports without evidence or a verification date
may be closed as not actionable. This template is linted by
`.github/workflows/ci.yml` and freshness-checked by
`.github/workflows/freshness-lint.yml`.*
