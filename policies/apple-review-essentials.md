# Apple App Review Essentials

> **Operational guide, not legal advice.** This document is a practical
> review-preparation aid based on public Apple guidance. It does not guarantee
> approval, replace the current App Review Guidelines, or provide
> jurisdiction-specific legal advice. Verify every requirement in Apple's live
> documentation before each submission.

- **Owner:** `[TEAM / OWNER]`
- **App:** `[APP NAME]`
- **Bundle ID:** `[BUNDLE_IDENTIFIER]`
- **Last verified:** 2026-09-20
- **Next review:** `[DATE OR TRIGGER]`

## Purpose

Use this guide to identify common App Review risks early, prepare evidence for
reviewers, and create a repeatable release gate. Apple's guidelines are a living
document; platform rules, entitlements, distribution options, and review
expectations can change without notice.

## Source links

All sources below were checked on **2026-09-20**:

- [Apple App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [App Review overview](https://developer.apple.com/app-store/review/)
- [App Review notes in App Store Connect](https://developer.apple.com/help/app-store-connect/manage-submissions/add-notes-for-review/)
- [Apple Privacy Manifest Files](https://developer.apple.com/documentation/bundleresources/privacy-manifest-files)
- [App Tracking Transparency](https://developer.apple.com/documentation/apptrackingtransparency)
- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Apple brand and marketing guidelines](https://developer.apple.com/app-store/marketing/guidelines/)
- [Apple Developer terms and agreements](https://developer.apple.com/support/terms/)

## Review model

Apple groups the App Review Guidelines into five areas:

| Area        | Practical question                                                                              | Release evidence                                                          |
| ----------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Safety      | Could the app harm, exploit, deceive, or expose users to unsafe content?                        | Content policy, moderation flow, age controls, incident contacts          |
| Performance | Is the submitted build complete, stable, usable, and accurately represented?                    | Device test results, demo account, backend status, release notes          |
| Business    | Are payments, subscriptions, trials, and commercial claims clear and appropriately implemented? | StoreKit configuration, restore path, pricing screenshots, reviewer notes |
| Design      | Does the app feel complete, accessible, and native to the supported Apple platforms?            | HIG review, accessibility checks, device screenshots                      |
| Legal       | Are privacy, intellectual property, user content, and required disclosures handled responsibly? | Privacy policy, asset licenses, consent records, rights documentation     |

## Pre-submission checklist

### Product completeness and stability

- [ ] The binary is a final, reviewable build; no placeholder screens, sample
      credentials, unfinished URLs, or disabled core features remain.
- [ ] The app starts, authenticates, completes its primary workflow, and exits
      cleanly on supported devices and OS versions.
- [ ] Crash, hang, memory, thermal, battery, and network-failure tests have been
      run on physical devices where practical.
- [ ] The app works on an IPv6-only network or the team has documented and
      resolved the relevant network dependency.
- [ ] Backend services, deep links, push notifications, remote configuration,
      and content feeds are live during review.
- [ ] A fully functional demo account or demo mode is available when the app
      requires authentication.
- [ ] Review notes explain non-obvious features, test credentials, hardware
      requirements, entitlements, and in-app purchases.

### Metadata and store presentation

- [ ] App name, subtitle, keywords, description, screenshots, previews,
      category, and age rating accurately describe the shipped experience.
- [ ] Screenshots show the app in use and do not rely only on a logo, splash
      screen, or login page.
- [ ] Paid features, subscriptions, consumables, and other in-app purchases are
      visible or explained in metadata and review notes.
- [ ] Metadata does not misuse Apple or third-party trademarks, competitor
      names, prices, or unrelated search terms.
- [ ] The support URL and reviewer contact information are current and
      monitored.
- [ ] The app icon, screenshots, fonts, music, illustrations, and other assets
      have documented usage rights.

### Privacy, permissions, and tracking

- [ ] The app's data inventory includes first-party code, analytics,
      advertising, authentication, payment, crash, and other third-party SDKs.
- [ ] The App Privacy Details and privacy policy match actual collection, use,
      sharing, retention, and deletion behavior.
- [ ] Each permission has a specific purpose string and is requested close to
      the feature that needs it.
- [ ] Camera, microphone, screen recording, location, contacts, health, and
      other sensitive access is explained before collection where required.
- [ ] The team has evaluated whether App Tracking Transparency is required for
      the app's tracking behavior.
- [ ] The team has evaluated Privacy Manifest and required-reason API
      requirements for the app and every included SDK.
- [ ] Tracking, advertising, and analytics SDKs are disabled or configured
      consistently when a user declines or withdraws consent.
- [ ] Account deletion and data deletion behavior is implemented and documented
      where the app supports accounts.

### User-generated content and safety

- [ ] User-generated content can be filtered or moderated before or promptly
      after publication.
- [ ] Users can report offensive or abusive content through an accessible flow.
- [ ] Users can block abusive accounts or participants.
- [ ] Published contact information or a clearly identified support route is
      available.
- [ ] Moderation records, escalation paths, and response targets are documented.
- [ ] Age gates, parental controls, and content restrictions match the app's
      audience and category.
- [ ] Health, medical, financial, legal, or other high-risk claims have been
      reviewed by an appropriately qualified person and are not overstated.

### Payments and subscriptions

- [ ] Digital goods and functionality that require Apple in-app purchase use
      StoreKit and do not unlock through a parallel private mechanism.
- [ ] Restorable purchases have a working Restore Purchases action.
- [ ] Subscription screens clearly state duration, renewal price, trial end
      date, and what changes when the trial ends.
- [ ] The app does not use misleading urgency, hidden fees, manipulated ratings,
      or dark patterns.
- [ ] Randomized virtual items disclose odds before purchase where applicable.
- [ ] Any external-purchase entitlement or link is limited to the storefronts
      and use cases for which it is authorized.

### Design and accessibility

- [ ] The app follows the Human Interface Guidelines for supported platforms and
      device sizes.
- [ ] Dynamic Type, VoiceOver, contrast, touch targets, focus order, and
      reduced-motion behavior have been tested.
- [ ] Errors, loading states, empty states, offline states, and destructive
      confirmations are understandable.
- [ ] Ads and interstitials are clearly identified, dismissible,
      age-appropriate, and do not obscure required controls.
- [ ] The app does not alter unrelated system switches, drain resources, run
      unrelated background work, or execute hidden functionality.

## Reviewer packet

Keep this packet with the release record:

| Evidence                                      | Owner     | Location | Last checked |
| --------------------------------------------- | --------- | -------- | ------------ |
| Build number and signed binary                | `[OWNER]` | `[LINK]` | `[DATE]`     |
| Device and OS test matrix                     | `[OWNER]` | `[LINK]` | `[DATE]`     |
| Demo account or demo mode                     | `[OWNER]` | `[LINK]` | `[DATE]`     |
| Privacy inventory and SDK list                | `[OWNER]` | `[LINK]` | `[DATE]`     |
| App Privacy Details export or screenshots     | `[OWNER]` | `[LINK]` | `[DATE]`     |
| Privacy policy URL and page snapshot          | `[OWNER]` | `[LINK]` | `[DATE]`     |
| Asset and third-party license register        | `[OWNER]` | `[LINK]` | `[DATE]`     |
| Moderation and safety runbook                 | `[OWNER]` | `[LINK]` | `[DATE]`     |
| StoreKit product and subscription test record | `[OWNER]` | `[LINK]` | `[DATE]`     |
| Review notes draft                            | `[OWNER]` | `[LINK]` | `[DATE]`     |

## Release gate

Do not submit until all applicable items are complete:

- [ ] Product owner confirms the build matches the metadata and review notes.
- [ ] Engineering confirms no known release-blocking crash or data-loss defect.
- [ ] Privacy/security owner confirms the data inventory, SDK behavior,
      permissions, and deletion flow.
- [ ] Content owner confirms moderation, age controls, and support contacts.
- [ ] Commercial owner confirms StoreKit products, pricing, trials, renewals,
      and restore behavior.
- [ ] A qualified reviewer has checked regulated or high-risk claims and asset
      rights.
- [ ] The team has re-read the live Apple guidance and recorded any changes
      since the last review.

## After a rejection or removal

1. Preserve the exact reviewer message, build number, metadata, and submission
   date.
2. Map each issue to a guideline section and an internal owner.
3. Fix the underlying behavior, not only the wording in the submission.
4. Retest the affected path and adjacent paths on device.
5. Update the reviewer notes with a concise explanation and evidence.
6. Submit a new build or appeal through the available App Review workflow when
   appropriate.
7. Record the outcome and update this guide's checklist if the issue reveals a
   new control.

## Maintenance

Re-verify this guide at least every 90 days and immediately after an Apple
policy announcement, SDK upgrade, new data practice, new storefront, new
entitlement, or material app change.
