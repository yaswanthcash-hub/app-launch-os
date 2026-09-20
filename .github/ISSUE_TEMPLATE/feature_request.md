---
name: Feature request
description: Propose a new module, tool, or content addition to App Launch OS
title: "[feature]: "
labels: ["enhancement", "needs-triage"]
body:
  - type: markdown
    attributes:
      value: |
        App Launch OS is a curated, docs-first reference stack. Before requesting
        a new tool, confirm it is not already in `awesome.md` or
        `LICENSES/THIRD-PARTY-NOTICES.md`.
  - type: textarea
    id: problem
    attributes:
      label: Problem this solves
      description: What gap in the current coverage are you hitting?
      placeholder: "e.g. There is no recommended tool for device attestation on Android beyond Play Integrity."
    validations:
      required: true
  - type: textarea
    id: proposal
    attributes:
      label: Proposed solution
      description: The recommended tool, link, purpose, and license.
      placeholder: |
        Project: https://github.com/...
        License: MIT (or other SPDX)
        Purpose: one-line elevator pitch
    validations:
      required: true
  - type: textarea
    id: use-case
    attributes:
      label: Use case / module fit
      description: Which App Launch OS module/adoption tier does this belong to? (e.g. M9-security, Core)
    validations:
      required: true
  - type: dropdown
    id: license
    attributes:
      label: License family
      description: This must be on the client allowlist (MIT/Apache-2.0/ISC/BSD-2-Clause/BSD-3-Clause) unless isolated.
      multiple: false
      options:
        - MIT
        - Apache-2.0
        - ISC
        - BSD-3-Clause
        - BSD-2-Clause
        - 0BSD / MIT-0
        - Other permissive (specify)
        - Copyleft — isolated CI only (LGPL / GPL / AGPL)
        - Other
    validations:
      required: true
  - type: input
    id: source
    attributes:
      label: Official source URL
      description: The official GitHub/repository URL (not a blog post).
      placeholder: "https://github.com/owner/repo"
    validations:
      required: true
  - type: input
    id: date
    attributes:
      label: Verification date (YYYY-MM-DD)
      description: When was the linked information last confirmed? e.g. 2026-09-20
      placeholder: "2026-09-20"
    validations:
      required: true
  - type: textarea
    id: rationale
    attributes:
      label: Rationale
      description: Why is this better than the current default/recommended option?
  - type: checkboxes
    id: checklist
    attributes:
      label: Checklist
      options:
        - label: I confirmed this tool is not already listed in awesome.md or THIRD-PARTY-NOTICES.md.
          required: true
        - label: I provided the official source URL and an SPDX license.
          required: true
        - label: For copyleft tools, I confirmed it is isolated to standalone CI (not a client dependency).
          required: false
---

## Problem

<!-- id: problem /-->

## Proposed solution

<!-- id: proposal /-->

## Use case / module fit

<!-- id: use-case /-->

## Rationale

<!-- id: rationale /-->

---

*Proposal template for App Launch OS. Proposals for GPL/AGPL client dependencies
will be automatically rejected by `.github/workflows/license-check.yml`. All
claims must include a verification date or they will be flagged by
`.github/workflows/freshness-lint.yml`.*
