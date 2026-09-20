<!-- Verification date: 2026-09-20 -->
<!-- License: MIT -->

# App Store Submission Checklist

> High-density pre-submission checklist mapping each item to the App Store Review Guidelines. Verified against the stable iOS release current on **2026-09-20**.

| Field | Value |
|---|---|
| **Verification date** | 2026-09-20 |
| **Target platforms** | iOS, iPadOS (current stable release) |
| **Primary owner** | Product / Release Engineer |
| **Evidence** | App Store Connect pre-submission report, on-device test log |
| **Gate** | [ ] Draft &nbsp;/&nbsp; [ ] In Review &nbsp;/&nbsp; [x] Verified |

> **Educational note:** The App Store Review Guidelines are a living document updated by Apple at any time. Completing this checklist does not guarantee acceptance. Always cross-reference the canonical guidelines and App Store Connect Help immediately before submission.

## Sources
- App Store Review Guidelines — https://developer.apple.com/app-store/review/guidelines/
- App Store Connect Help — https://help.apple.com/app-store-connect/
- iOS Human Interface Guidelines — https://developer.apple.com/design/human-interface-guidelines/ios
- Upcoming requirements / deprecations — https://developer.apple.com/news/upcoming-requirements/

## 1. Build & Binary

- [ ] Archive built from Xcode **Product > Archive** (or EAS cloud build) with release config; zero compiler warnings. — Owner: Release Eng · Evidence: Organizer archive log
- [ ] Archive passes **Organizer validation** with no missing purpose strings or invalid bundle identifiers (Guideline 2.1(a)).
- [ ] `CFBundleShortVersionString` (version) and `CFBundleVersion` (build) are unique and incremented from the previous approved build.
- [ ] App size inspected in App Store Connect processing; no orphaned assets, stubs, or dSYM upload errors.
- [ ] App icon is **1024×1024 px PNG, RGB color, no transparency, no pre-rounded corners** (asset catalog spec; Guideline 2.3.9).
- [ ] Launch screen declared for all supported devices; no blank white flash between splash and first frame.
- [ ] App Store Connect build uploaded and **processing complete** before metadata lock.

## 2. Functional Completeness & The Demo Account Trap (Guideline 2.1)

> [!CRITICAL]
> **The #1 Reviewer Trap (2026 Data)**: Apple reviewers in Cupertino test immediately with demo credentials. If login fails, 2FA blocks them, or the account opens to an empty unseeded screen, your app is **instantly rejected under Guideline 2.1**.
> *(Source: mjmirza/app-store-compliance rejection taxonomy)*

- [ ] App tested **on-device** on the stable iOS release (not simulator only); confirmed no crashes or hangs under 10 min of use.
- [ ] All advertised features are **fully implemented** in the binary — no hidden, dormant, or undocumented functionality (Guideline 2.3.1(a)).
- [ ] Backend services are **live, persistent, and un-throttled** during review; geo-blocking / IP rate limits are disabled for Apple review IPs.
- [ ] **Demo Account Resilience**:
  - [ ] **Zero SMS 2FA**: Demo account bypasses SMS verification (reviewers cannot receive external SMS OTPs).
  - [ ] **Seeded State**: Demo account is populated with realistic user data, history, and active content — **never an empty state**.
  - [ ] **Full Entitlement**: Demo user has active Pro/Premium permissions to exercise all locked features without billing errors.
  - [ ] Credentials explicitly provided in App Store Connect **Notes for Review** (Username, Password, and role notes).
- [ ] No **placeholder text**, empty fields, or "lorem ipsum" content anywhere in UI or metadata.
- [ ] Screenshots depict the app **in use** (core workflows), not only splash/login screens (Guideline 2.3.3).
- [ ] App does not crash, freeze, or exhibit UI glitches during the review window's likely flow paths.

## 3. Performance & Technical (Guideline 2.5)

- [ ] Uses **only public APIs**; no private or undocumented symbol references (Guideline 2.5.1). — Owner: Eng Lead · Evidence: Xcode runtime warning scan
- [ ] App is **self-contained**; no runtime download of code, scripting bundles, or dynamic libraries that change functionality (Guideline 2.5.2).
- [ ] Runs on **IPv6-only** networks; no hard-coded IPv4 literals or hosts that fail dual-stack (Guideline 2.5.5).
- [ ] Background modes in `Info.plist` are **limited** to declared legitimate purposes (audio, location, Bluetooth, etc.); no silent arbitrary background fetch.
- [ ] No **cryptocurrency mining**, excessive background processing, or rapid battery drain (Guideline 2.4.2).
- [ ] No **WebView-only** shell without substantial native functionality; web content uses `WKWebView` / `SFSafariViewController`.
- [ ] Deep links / universal links handled securely with proper validation and `application:openURL:options:` error paths.

## 4. Metadata & Store Presence (Guidelines 2.3, 2.3.7–2.3.11)

- [ ] App Name is ≤ 30 characters; no trademark stuffing, popular app names, pricing, or irrelevant keyword phrases.
- [ ] Subtitle ≤ 30 characters; descriptive and audience-appropriate (4+ safe) (Guideline 2.3.7, 2.3.8).
- [ ] Keywords ≤ 100 characters, comma-separated, no competitor names or unverifiable terms (Guideline 2.3.7).
- [ ] **Privacy Policy URL** present, loads on iOS, and matches the app's data practices.
- [ ] **Support URL** present and is monitored by a reachable team (Guideline 1.5).
- [ ] Screenshots: correct device sizes (incl. iPad); first three show (1) value proposition, (2) key differentiator, (3) social proof/trust — per the 60/40 rule.
- [ ] App Store preview video (if used) is **native screen capture only**; no marketing overlays that obscure the experience (Guideline 2.3.4).
- [ ] Category selected per App Store Category Definitions (Guideline 2.3.5).
- [ ] Age rating classification reviewed honestly; if Kids Category, parental-gate requirements met (Guideline 1.3).
- [ ] No references to **Android / Play Store** or competing platforms in UI or metadata (Guideline 2.3.10).

## 5. Privacy & Data (Guidelines 5.1.1, 5.1.2; App Privacy labels)

> [!CRITICAL]
> **The #2 Automated Trap (2026 Data)**: Apple's ingestion scanner analyzes binary symbols of every embedded SDK (Firebase, Sentry, AppsFlyer, AdMob). If an SDK collects device or diagnostic data but your App Store Connect Privacy nutrition label declares "No Data Collected", the build is **automatically rejected**.
> *(Source: mjmirza/app-store-compliance)*

- [ ] App Privacy **Data Types** declared accurately in App Store Connect for the app and **all third-party SDKs/partners**.
- [ ] **Runtime SDK Audit**: Every third-party library is audited against its declared data types (crash logs, device IDs, diagnostics).
- [ ] **Privacy Manifests (`PrivacyInfo.xcprivacy`)**:
  - [ ] Every listed third-party SDK includes a valid `PrivacyInfo.xcprivacy` bundle.
  - [ ] Required Reason APIs (`NSPrivacyAccessedAPITypes`) declared with legitimate, Apple-approved reason codes.
  - [ ] Tracking domains (`NSPrivacyTrackingDomains`) listed if applicable.
- [ ] "Data Used to Track" declared if the app uses IDFA or ATT-tracked behavior.
- [ ] **App Tracking Transparency (ATT)** prompt wired correctly; IDFA is **not** read before user authorization (Guideline 5.1.1).
- [ ] No IDFA collection without ATT authorization; no silent clipboard or network access unrelated to user action.
- [ ] SDK partner list audited for declared data collection; **data handling dictionary** maintained for review.
- [ ] Health, financial, children's, and other sensitive data practices receive the applicable platform and jurisdictional review; encryption and retention claims are documented truthfully.
- [ ] Account deletion flow available within the app if accounts can be created (Guideline 5.1.1 deletion requirement).

## 6. Business Model & Monetization (Guideline 3.1)

- [ ] All **digital goods, subscriptions, and unlocks** sold via **StoreKit In-App Purchase** (Guideline 3.1.1).
- [ ] Physical goods, real-world services, or eligible peer-to-peer may use external payment **only** if clearly qualifying and approved.
- [ ] Auto-renewable subscriptions: ≥ 7-day minimum, **work across the user's devices**, and include a **Restore Purchases** mechanism.
- [ ] Subscriptions disclose price, duration, renewal, and cancellation path clearly in-app (Guideline 3.1.2(a)).
- [ ] "Restore Purchases" is **prominent and functional**; Terms & Privacy links present on the paywall.
- [ ] Paywall provides an obvious **close/dismiss** affordance; no flow trapping (Guideline 3.1.1, App Store UX expectations).
- [ ] Pricing aligned to App Store **price tiers**; no external price references or misleading discount claims.

## 7. Design & Human Interface (Guideline 4)

- [ ] Follows iOS HIG principles: clarity, deference, depth, and meaningful motion.
- [ ] Touch targets provide at least a 44×44 pt effective hit area; verify the current Apple HIG and physical-device behavior rather than relying on a fixed millimeter conversion.
- [ ] No UI mimicking **system controls** (switches, sliders) with divergent behavior (Guideline 4).
- [ ] No **interstitials or scareware** that block or mislead users into purchasing.
- [ ] Web content opens via **In-App Purchase / SFSafariViewController** where appropriate, not external browsers for core flows.
- [ ] First-run experience is lightweight; avoid forcing a paywall before meaningful value unless the product and store-review context support that flow.

## 8. Legal & Age (Guidelines 1.x, 5.x)

- [ ] Age-classified content (if any) is behind a verified **parental gate** when Kids Category applies.
- [ ] No objectionable, defamatory, or mean-spirited content visible in the default state (Guideline 1.1).
- [ ] Health/fitness features use HealthKit where applicable, explain accuracy and methodology, and link regulatory clearance when making regulated claims (Guideline 1.4.1).
- [ ] COPPA/GDPR compliance in effect for children or EU users; data minimization applied.
- [ ] **Export compliance (encryption)** answered truthfully in App Store Connect (typically "Yes" with year-over-year reassessment).

---

*Last verified: 2026-09-20 · License: MIT · Sources linked above as canonical at time of verification.*
