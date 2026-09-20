# Open-Source Licensing Guide

> **Educational guide, not legal advice.** This document is a practical
> orientation to common software-license concepts. It does not determine the
> license of a particular component, establish compatibility, or provide
> jurisdiction-specific legal advice. Review the exact license text, project
> facts, distribution model, and contracts with qualified counsel before
> release.

- **Owner:** `[TEAM / OWNER]`
- **Repository or product:** `[PRODUCT NAME]`
- **Last verified:** 2026-09-20
- **Next review:** `[DATE OR TRIGGER]`

## Purpose

Use this guide to prevent accidental license contamination, missing notices,
patent surprises, and unsupported compatibility assumptions. “Open source” does
not mean “no obligations,” and a permissive dependency can still be combined
with a copyleft dependency, proprietary SDK, asset license, or contract that
changes the result.

## Source links

All sources below were checked on **2026-09-20**:

- [Open Source Initiative: approved licenses](https://opensource.org/licenses)
- [Open Source Definition](https://opensource.org/osd)
- [SPDX License List](https://spdx.org/licenses/)
- [The MIT License — OSI](https://opensource.org/license/mit)
- [Apache License 2.0 — OSI](https://opensource.org/license/apache-2-0)
- [GNU GPL version 3 — Free Software Foundation](https://www.gnu.org/licenses/gpl-3.0.en.html)
- [GNU AGPL version 3 — Free Software Foundation](https://www.gnu.org/licenses/agpl-3.0.en.html)
- [GNU LGPL version 3 — Free Software Foundation](https://www.gnu.org/licenses/lgpl-3.0.en.html)
- [GNU GPL FAQ](https://www.gnu.org/licenses/gpl-faq.html)
- [Creative Commons licenses](https://creativecommons.org/share-your-work/cclicenses/)

## License families

| Family                            | Common examples                              | Typical obligations to investigate                                                                                       | Common risk if overlooked                                                              |
| --------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| Permissive copyright              | MIT, BSD-2-Clause, BSD-3-Clause, ISC         | Preserve copyright and permission notices; include license text where required                                           | Missing attribution in app, documentation, binaries, or source distributions           |
| Permissive with patent terms      | Apache-2.0                                   | Preserve notices; understand express patent grant and termination conditions; document modifications                     | Patent assumptions differ from a copyright-only license                                |
| Weak copyleft                     | LGPL-2.1, LGPL-3.0, MPL-2.0, EPL-2.0         | Preserve notices; provide source or modification files as the license requires; assess linking and relinking rules       | Treating weak copyleft as automatically safe for every proprietary binary              |
| Strong copyleft                   | GPL-2.0, GPL-3.0                             | Provide corresponding source and license notices when conveying covered works; assess combined and derivative work scope | Releasing a proprietary app without required source or notices                         |
| Network copyleft                  | AGPL-3.0                                     | Assess source-offering obligations triggered by remote network interaction, in addition to distribution rules            | Assuming a SaaS deployment avoids all copyleft obligations                             |
| Reciprocal or special-purpose     | CPAL, CDDL, EUPL, custom reciprocal licenses | Read the exact conditions, scope, and compatibility language                                                             | Relying on a family label instead of the license text                                  |
| Public-domain or dedication tools | CC0, Unlicense, 0BSD                         | Confirm dedication or license status and jurisdictional limitations                                                      | Assuming a label eliminates all copyright, patent, trademark, or moral-right questions |
| Proprietary or source-available   | Commercial SDKs, BSL, SSPL, custom terms     | Review permitted use, redistribution, modification, hosting, audit, termination, and support terms                       | Combining code that cannot legally be distributed with the product                     |

## Compatibility orientation

Compatibility depends on the exact versions, how code is combined, whether the
result is conveyed or only used internally, the distribution channel, and the
licenses of every component. The following is a triage aid, not a compatibility
opinion:

| Combination                                  | Initial triage question                                                                                              | Required action                                                                        |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| MIT/BSD/ISC into MIT/Apache project          | Are all notices and license texts retained?                                                                          | Preserve notices; record SPDX identifiers and source locations                         |
| Apache-2.0 into GPL-3.0 project              | Is the Apache-2.0 code compatible with the selected GPL version and are patent terms understood?                     | Review exact texts and project guidance; do not assume all GPL versions are equivalent |
| GPL code into a proprietary distributed app  | Does distribution create a combined or derivative work requiring corresponding source?                               | Stop and obtain specialist review before release                                       |
| LGPL library linked by a proprietary app     | Can the user replace or relink the library under the applicable LGPL version and are notices/source obligations met? | Review linking, relinking, reverse-engineering, and source-offer requirements          |
| AGPL service used over a network             | Does remote interaction trigger a source-offering obligation for the modified AGPL work?                             | Review network-use terms and deployment architecture before launch                     |
| MPL file combined with proprietary files     | Are modifications to MPL-covered files made available as required?                                                   | Keep file-level obligations and notices visible                                        |
| Open-source code plus proprietary SDK        | Do SDK terms restrict redistribution, modification, reverse engineering, or sublicensing?                            | Review both licenses and the SDK contract                                              |
| Open-source code plus fonts, images, or data | Are content licenses compatible with the software license and intended commercial use?                               | Maintain a separate asset/data license register                                        |

## Dependency intake workflow

1. **Identify the artifact.** Record package name, version, source URL, commit
   or checksum, and whether it is source, binary, container, plugin, font,
   model, dataset, or documentation.
2. **Identify the license.** Prefer an SPDX identifier from the package metadata
   or license file, then verify the exact text and version.
3. **Trace transitive dependencies.** Include lockfile, package-manager, native,
   build-time, test-time, container, and vendored dependencies.
4. **Classify use.** Mark development-only, build-only, runtime, linked,
   dynamically loaded, copied, modified, aggregated, network-only, and
   distributed uses.
5. **Record obligations.** Capture notice preservation, source availability,
   modification markings, patent terms, trademark restrictions, copyleft scope,
   and contract terms.
6. **Review compatibility.** Evaluate the complete distribution, not only the
   top-level repository license.
7. **Approve or isolate.** Use an allowlist, replace the dependency, isolate a
   copyleft tool in a separate process or CI container, or obtain legal review.
8. **Generate notices.** Include required copyright, license, attribution, and
   source-offer material in the appropriate distribution artifact.
9. **Recheck on change.** Re-run the review after upgrades, lockfile changes,
   vendor changes, and release-channel changes.

## App Launch OS operating rules

- The repository's intended core license is MIT, but the intended license does
  not override obligations attached to included third-party material.
- GPL and AGPL code is not approved for inclusion in the client bundle or
  boilerplate without a documented exception and specialist review.
- Copyleft security tools may be used only as isolated, standalone tools where
  the architecture and licenses support that use; isolation is not a substitute
  for reviewing the tool's license.
- Every release must include a machine-readable dependency inventory and a
  human-readable third-party notice file.
- A package's default license, marketplace listing, or README statement is not
  enough when the repository contains multiple components with different
  licenses.
- Trademarks, service marks, logos, app-store names, and brand assets require
  separate review even when the underlying code is permissively licensed.
- AI models, weights, datasets, prompts, embeddings, and generated assets need
  their own license and provenance review.

## Practical checklist

### Intake

- [ ] Package, version, source, checksum, and maintainer are recorded.
- [ ] Exact license text and SPDX identifier are stored or linked.
- [ ] Transitive dependencies and native binaries are included in the inventory.
- [ ] Runtime, build, test, container, and development-only uses are
      distinguished.
- [ ] Modified files and vendored copies are identified.

### Review

- [ ] Notice and license-text obligations are assigned to an owner.
- [ ] Source-offer and corresponding-source obligations are assessed where
      applicable.
- [ ] Patent, trademark, attribution, and modification-marking terms are
      assessed.
- [ ] Copyleft scope and network-use implications are assessed.
- [ ] Proprietary SDK and service-contract restrictions are reviewed.
- [ ] Asset, font, dataset, model, and documentation licenses are reviewed
      separately.

### Release

- [ ] Dependency inventory is generated from the release lockfile or manifest.
- [ ] Third-party notices are included in source and binary distributions as
      required.
- [ ] License allowlist and exception records are current.
- [ ] Copyleft tools are isolated according to the architecture record.
- [ ] A reviewer signs off on any exception, substitution, or unresolved
      question.

## Exception record

| Dependency  | License  | Proposed use | Conflict or question | Mitigation     | Approver | Date     |
| ----------- | -------- | ------------ | -------------------- | -------------- | -------- | -------- |
| `[PACKAGE]` | `[SPDX]` | `[USE]`      | `[RISK]`             | `[MITIGATION]` | `[NAME]` | `[DATE]` |

## Maintenance

Re-run the license review on every dependency change and at least every 90 days
for active releases. Preserve the exact license text and source reference used
for each approval because license pages and package metadata can change.
