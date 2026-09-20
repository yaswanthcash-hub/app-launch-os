---
name: Policy update
description: Flag an Apple / Google / platform policy change affecting App Launch OS
title: "[policy]: "
labels: ["policy", "needs-triage"]
body:
  - type: markdown
    attributes:
      value: |
        Use this issue when Apple, Google, or another platform changes a review
        guideline, policy, or store requirement that affects the checklists,
        research digests, or templates in this repository. The freshness-lint
        workflow also flags stale dates automatically.
  - type: dropdown
    id: source
    attributes:
      label: Policy source
      description: The platform or document that changed.
      multiple: false
      options:
        - Apple App Store Review Guidelines
        - Apple App Store Connect / App Store guidelines
        - Google Play Console / Google Play Policy
        - Apple Human Interface Guidelines
        - Google Developer Policy / API terms
        - EU Digital Services Act / DMA
        - Other platform (specify in details)
    validations:
      required: true
  - type: input
    id: section
    attributes:
      label: Guideline section / clause
      description: e.g. "3.1.1", "Payments and monetization", "App Store Review Guideline 5.1.2"
      placeholder: "e.g. 3.1.1"
    validations:
      required: true
  - type: input
    id: effective
    attributes:
      label: Effective / change date (YYYY-MM-DD)
      description: Date the change takes effect or was published.
      placeholder: "2026-09-20"
    validations:
      required: true
  - type: textarea
    id: summary
    attributes:
      label: Change summary
      description: What changed, in one or two sentences, in plain language.
      placeholder: "Apple now requires a privacy manifest for apps that ..."
    validations:
      required: true
  - type: textarea
    id: url
    attributes:
      label: Official source URL
      description: Link to the canonical, citable source (with date if possible).
      placeholder: "https://developer.apple.com/app-store/review/guidelines/ (accessed 2026-09-20)"
    validations:
      required: true
  - type: textarea
    id: impact
    attributes:
      label: Impact on App Launch OS
      description: Which checklists, playbooks, or templates need updating?
      placeholder: "Affects checklists/appstore-submission.md and policies/apple-review-essentials.md"
    validations:
      required: true
  - type: textarea
    id: proposed
    attributes:
      label: Proposed doc changes
      description: The exact edits to keep claims accurate.
  - type: input
    id: verify
    attributes:
      label: Verification date (YYYY-MM-DD)
      description: Date you confirmed the cited source content.
      placeholder: "2026-09-20"
    validations:
      required: true
  - type: checkboxes
    id: checklist
    attributes:
      label: Checklist
      options:
        - label: I linked the official, authoritative source URL (not a third-party summary).
          required: true
        - label: I included an effective/verification date for the cited change.
          required: true
        - label: I listed the affected App Launch OS files specifically.
          required: true
---

## Details

**Source:**

<!-- id: source /-->

**Section / clause:**

<!-- id: section /-->

**Effective date:**

<!-- id: effective /-->

**Verification date:**

<!-- id: verify /-->

**Official source URL:**

<!-- id: url /-->

## Change summary

<!-- id: summary /-->

## Impact on App Launch OS

<!-- id: impact /-->

## Proposed doc changes

<!-- id: proposed /-->

---

*Filing this issue does not bypass the freshness-lint check
(`.github/workflows/freshness-lint.yml`): stale dates are flagged within 90 days
and must be re-verified. License implications of any new tool recommendations are
gated by `.github/workflows/license-check.yml`.*
