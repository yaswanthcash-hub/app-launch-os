# Description

<!-- Briefly describe what this PR changes and why. Reference an issue if applicable. -->

## Related issue

<!-- Close syntax: Closes #123 -->

## Type of change

- [ ] Documentation / checklist content fix
- [ ] Research digest update (date-stamped verification)
- [ ] Policy / compliance update (Apple or Google store policy)
- [ ] License / dependency addition or re-classification
- [ ] CI workflow / tooling change

## Verification (required)

- [ ] Every factual claim introduced or changed includes a cited source and a
      `YYYY-MM-DD` verification date. Dates are within 90 days of today.
- [ ] `awesome.md` / `LICENSES/THIRD-PARTY-NOTICES.md`: any new tool lists its
      official repository URL and an SPDX license identifier.
- [ ] If this PR adds a dependency: it is on the client allowlist
      (MIT, Apache-2.0, ISC, BSD-2-Clause, BSD-3-Clause). GPL/AGPL/LGPL-family
      libraries are documented as isolated CI tooling only.
- [ ] No GPL/AGPL/LGPL code is introduced into distributable client code or
      boilerplates.

## Checklist

- [ ] `npm run ci:lint` (markdown lint) passes locally, or the Markdown is valid.
- [ ] File paths under `policies/`, `checklists/`, `findings/`, `templates/`,
      `modules/`, and `awesome.md` follow the structure in `IMPLEMENTATION_PLAN.md`.
- [ ] Headers and cross-references are not broken.
- [ ] The PR is small and focused; large refactors are split into follow-ups.

## Reviewer notes

<!-- Optional: anything a reviewer should know, including freshness risk. -->
