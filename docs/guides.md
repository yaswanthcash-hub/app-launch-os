# App Launch OS — Guides & Architecture Reference

This document contains extended reference material, launch timelines, and module catalogs moved from the root README for quick reference.

---

## Step-by-Step Launch Timeline (T-60 Days to Launch)

| Phase | Key Actions & Playbooks |
| :--- | :--- |
| **T-60 Days** | Read [decisions/001-ui-stack.md](../decisions/001-ui-stack.md). Establish 3-tier UI tokens in [modules/M4-design-system](../modules/M4-design-system/README.md). Scaffold event taxonomy in [templates/event-taxonomy.md](../templates/event-taxonomy.md). |
| **T-45 Days** | Setup StoreKit 2 & RevenueCat sandbox in TestFlight. Implement [modules/M8-paywall](../modules/M8-paywall/README.md) with transparent renewal pricing. |
| **T-30 Days** | **Google Play:** Launch 20-tester closed test (14 days minimum). Audit accessibility with [checklists/accessibility.md](../checklists/accessibility.md). |
| **T-14 Days** | Generate `PrivacyInfo.xcprivacy` with [policies/privacy-compliance.md](../policies/privacy-compliance.md). Setup Apple demo account without SMS 2FA. |
| **T-7 Days** | Run pre-flight verification: `node bin/cli.js audit`. Submit release builds to App Store and Google Play closed tracks. |
| **T-0 Launch** | Execute [checklists/launch-day.md](../checklists/launch-day.md). Track real-time crash rates in Sentry and monitor ASO keywords via [modules/M11-aso](../modules/M11-aso/README.md). |

---

## Universal Store Compliance Master Matrix

| Review Vector | Apple App Store Trap (iOS) | Google Play Store Trap (Android) | Solution & Checklist |
| :--- | :--- | :--- | :--- |
| **1. Reviewer Access** | **Guideline 2.1:** Reviewers cannot receive SMS OTPs. Phone login causes immediate rejection. | **20-Tester Rule:** Personal accounts require 20 opted-in testers for 14 continuous days. | [App Store Checklist](../checklists/appstore-submission.md) & [Play Store Checklist](../checklists/playstore-submission.md) enforce reviewer access protocols. |
| **2. Privacy Manifests** | **Guideline 5.1.1:** Missing `PrivacyInfo.xcprivacy` API declarations for timestamps, boot time, disk space. | Automated scanners reject apps where Data Safety forms don't match `AndroidManifest.xml` 1:1. | [Privacy Compliance Guide](../policies/privacy-compliance.md) and turnkey [PrivacyInfo.xcprivacy](../starters/expo-ts/ios/PrivacyInfo.xcprivacy). |
| **3. Account Deletion** | **Guideline 5.1.1(v):** Email links (`support@...`) are forbidden. Must be a self-service in-app flow. | Requires a public web URL where users can request data deletion without having the app installed. | [starters/expo-ts](../starters/expo-ts/README.md) in-app deletion flow + [templates/privacy-policy.md](../templates/privacy-policy.md) public web deletion page. |
| **4. Paywall & IAP** | **Guideline 3.1.1:** Rejects paywalls missing a functional **Restore Purchases** button or clear renewal pricing. | Requires explicit billing terms, charging frequencies, and easy subscription cancellation steps. | [modules/M8-paywall](../modules/M8-paywall/README.md) & [findings/paywall.md](../findings/paywall.md) provide store-approved paywall components. |
| **5. Modern SDK Specs** | iOS 26 SDK (Xcode 26) + IPv6-only network compatibility required. | Target SDK 36 (Android 16) + 16 KB ELF memory page alignment for native C/C++ libraries. | Pre-configured [starters/expo-ts/app.json](../starters/expo-ts/app.json) with edge-to-edge layout and SDK 36 support. |
| **6. Minimum Utility** | **Guideline 4.2:** Rejects web wrappers that do not offer native hardware features or gestures. | Webview Spam Policy: Must provide native offline caching and responsive mobile UI. | [policies/apple-review-essentials.md](../policies/apple-review-essentials.md) & [policies/play-policy-essentials.md](../policies/play-policy-essentials.md). |

---

## Directory Index

| Directory / Layer | Purpose & Key Resources |
| :--- | :--- |
| **`modules/`** *(Copy-Paste Source)* | 13 production modules covering Design Systems, Onboarding, Paywalls, Experiments, Growth, and Security. |
| **`starters/`** *(Full Boilerplates)* | [starters/expo-ts](../starters/expo-ts/README.md) (Expo SDK 54, React Native 0.78, StoreKit 2, PrivacyInfo). |
| **`checklists/`** *(Store & QA)* | Pre-launch checklists for App Store, Play Store, UX, Security, Accessibility, and Release. |
| **`policies/`** *(Store Rules)* | Guidelines digests for Apple Review, Google Play policies, Privacy, and Reviewer Access. |
| **`findings/`** *(Research Digests)* | Research syntheses on Experiments, Paywalls, ASO, Onboarding, and Deep Links. |
| **`templates/`** *(Legal & Arch)* | Privacy Policy, Terms of Service, DPA, Threat Model, and Event Taxonomy. |
| **`decisions/`** *(ADRs)* | Architecture Decision Records covering UI stack, Backend, CI/CD, Design System, Motion, and Scoring. |
