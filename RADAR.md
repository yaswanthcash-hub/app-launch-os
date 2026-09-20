# 📡 App Store Policy Radar

> Real-time monitoring of breaking policy shifts, store review crackdowns, and SDK requirements across the Apple App Store, Google Play Store, and Expo / React Native ecosystems.
>
> **Last updated:** 2026-09-20 · **Update frequency:** Weekly / Breaking Notice

---

## 🚦 Current Store Policy Status

| Ecosystem | Status | Active Notices | Immediate Action Required |
| :--- | :--- | :--- | :--- |
| **Apple App Store** | 🟡 Active Review Notices | 2 enforcement shifts | SMS OTP demo blocker & `PrivacyInfo.xcprivacy` |
| **Google Play Store** | 🔴 Breaking Enforcement | 1 hard rule | Target SDK 35 & 16 KB ELF page alignment |
| **Expo / React Native** | 🟢 Stable | 0 breaking changes | Expo SDK 52 / React Native 0.76+ recommended |

---

## 🚨 Active Policy Radar Shifts

### 1. 🔴 Google Play: Android 15 Target SDK 35 & 16 KB Memory Page Size Mandate
* **Source:** [Google Play Target API Requirements](https://developer.android.com/google/play/requirements/target-sdk) & [16 KB Page Support](https://developer.android.com/guide/practices/page-sizes)
* **Date Stamp:** 2026-09-20
* **Severity:** 🔴 **Fatal Ingestion Block**
* **The Shift:** Google Play rejects all new app submissions and major updates that do not target Android API 35 (Android 15) or higher. Furthermore, native C/C++ libraries (`.so` files) must support 16 KB ELF memory page alignment.
* **Affected Modules:** [modules/M10-release](modules/M10-release/README.md) and [starters/expo-ts](starters/expo-ts/README.md).
* **Recommended Action:**
  1. Set `"android.targetSdkVersion": 35` in `app.json`.
  2. Upgrade to React Native 0.76+ or Expo SDK 52+ which compile native dependencies with 16 KB page size support by default.

---

### 2. 🟡 Apple: Reviewer Demo Access (Guideline 2.1) SMS OTP Rejections
* **Source:** [Apple App Review Guidelines 2.1](https://developer.apple.com/app-store/review/guidelines/#information-needed)
* **Date Stamp:** 2026-09-20
* **Severity:** 🔴 **Fatal Review Rejection**
* **The Shift:** App Store review teams are operating in zero-trust sandboxes. They cannot receive SMS OTP codes or phone verification. Supplying demo credentials that prompt for phone 2FA results in an immediate Guideline 2.1 rejection.
* **Affected Modules:** [modules/M5-onboarding](modules/M5-onboarding/README.md) and [checklists/appstore-submission.md](checklists/appstore-submission.md).
* **Recommended Action:**
  1. Add a hardcoded reviewer demo toggle or mock login (`reviewer@apple.com`).
  2. Pre-seed active user content and Pro sandbox entitlements so reviewers never encounter a blank or locked screen.

---

### 3. 🟡 Apple: PrivacyInfo.xcprivacy Required Reason API Enforcement
* **Source:** [Apple Developer Privacy Manifests](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files)
* **Date Stamp:** 2026-09-20
* **Severity:** 🔴 **Automated Upload Rejection**
* **The Shift:** Any iOS binary containing SDK symbols that inspect file timestamps (`C617.1`), system boot time (`35F9.1`), or disk space (`E174.1`) must include a declared `PrivacyInfo.xcprivacy` with an approved Apple reason code.
* **Affected Modules:** [policies/privacy-compliance.md](policies/privacy-compliance.md) and [starters/expo-ts](starters/expo-ts/README.md).
* **Recommended Action:**
  1. Run `npx app-launch-os fix` to automatically scaffold `ios/PrivacyInfo.xcprivacy`.
  2. Audit third-party SDK dependencies using [scripts/compliance-check.js](scripts/compliance-check.js).

---

## 🤝 Become a Policy Contributor

You don't need to write TypeScript or native code to contribute to App Launch OS!

If Apple or Google announced a policy shift, or your app was rejected for a new reason, submit a **Policy Report**:

1. Open an issue using the [Policy Change Report Template](.github/ISSUE_TEMPLATE/policy-change.md).
2. Include the source link, date, affected platforms, and your recommended workaround.
3. Our maintainers review submissions weekly and update the Radar.

---

*Verified weekly by the App Launch OS Maintainers · License: MIT*
