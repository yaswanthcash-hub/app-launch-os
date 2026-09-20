<!-- Verification date: 2026-09-20 -->
<!-- License: MIT -->

# Google Play Submission Checklist

> High-density pre-submission checklist for Android apps distributed via the Google Play Console. Verified against requirements current on **2026-09-20**, including the August 31, 2026 target API level deadline.

| Field | Value |
|---|---|
| **Verification date** | 2026-09-20 |
| **Target platforms** | Android phone & tablet (current stable + min SDK supported) |
| **Primary owner** | Product / Android Lead |
| **Evidence** | Play Console pre-launch report, internal test track pass |
| **Gate** | [ ] Draft &nbsp;|&nbsp; [ ] In Review &nbsp;|&nbsp; [x] Verified |

> **Educational note:** Google Play policy and the target API level timeline change over time. Completing this checklist does not guarantee approval or listing. Always consult the Developer Policy Center and Play Console requirements immediately before submitting.

## Sources
- Developer Policy Center — https://play.google.com/about/developer-content-policy/
- Target API level requirements — https://support.google.com/googleplay/android-developer/answer/11926878
- Data safety section — https://play.google.com/console/data-safety/
- App signing — https://developer.android.com/google/play/app-signing
- Metadata requirements — https://support.google.com/googleplay/android-developer/answer/9898842
- Pre-launch reports (Firebase Test Lab) — https://firebase.google.com/docs/test-lab

## 1. Target API Level & SDK Requirements (Policy: Target API Level)

> Effective **August 31, 2026**: new apps and app updates must target **Android 16 (API level 36)** or higher.
- [ ] `targetSdkVersion` ≥ **36**; `minSdkVersion` ≥ **24** (or per business min). — Owner: Android Eng · Evidence: `build.gradle`
- [ ] App bundles (`.aab`) generated with **Google Play App Signing** enrollment completed (recommended).
- [ ] APK/AAB **app-signed** with the registered signing key; key (or App Signing key) registered in Play Console.
- [ ] No **forbidden APIs** or non-SDK interface usage detected by the compatibility check (Guideline 2.5 / non-SDK).
- [ ] App meets **target API level requirements** table for the relevant device types (Wear OS / TV / Auto exemptions noted if applicable).

## 2. Testing Track & The 20-Tester Closed Test Gate

> [!CRITICAL]
> **The #1 Google Play Launch Blocker (2026 Policy)**: Personal developer accounts are **strictly blocked from production** until at least **20 testers remain opted-in for 14 continuous days** in a closed test track, actively providing feedback. Applying for production without real engagement results in rejection.
> *(Source: mjmirza/app-store-compliance & Google Play Console Policy)*

- [ ] **Closed Testing Requirement**:
  - [ ] At least **20 distinct testers** actively opted into the closed testing track.
  - [ ] Testers kept active across **14 continuous calendar days** before production request.
  - [ ] Pre-Launch Report (Firebase Test Lab) inspected; zero crashes on Google's test device matrix.
- [ ] **Review Credentials & App Access**:
  - [ ] If login is required, test credentials provided under **App Access** in Play Console.
  - [ ] Zero SMS 2FA required for the test account; live backend accessible worldwide.

## 3. App Content & Data Safety (Policy: User Data, Permissions)

> [!CRITICAL]
> **The #2 Automated Play Protect Trap**: Google's automated scanners inspect embedded SDK binaries (Firebase, AdMob, Sentry, AppsFlyer). If an SDK collects Advertising ID (`AAID`) or coarse location, but your **Data Safety form** declares no collection, the build is **flagged and rejected**.

- [ ] **Data safety section** completed in Play Console matching 100% of runtime network and SDK behaviors.
- [ ] **Data deletion mechanism**: Functional in-app and web-based account and data deletion URLs provided (mandatory policy).
- [ ] **Privacy Policy URL**: HTTPS, active, and accessible without geo-restrictions.
- [ ] **Sensitive permissions justified**:
  - [ ] Prominent in-app disclosure shown *before* requesting Location, Camera, or Contacts.
  - [ ] Background Location / Exact Alarm permissions justified with specific core feature use case.

## 3. Policy Compliance (Core Policies)

- [ ] No **restricted content**: no gambling (unless licensed), no hate speech, no CSAM, no illegal activity (Guideline 1.1–1.4).
- [ ] **Intellectual property**: all assets, names, and content are owned or licensed; no trademark/copyright infringement (Guideline Impersonation / IP).
- [ ] **Spam & functionality**: app provides substantial, non-redundant functionality; no webview-only wrappers (Guideline 4.4 Spam/Malware).
- [ ] **Device/network abuse**: no cryptocurrency mining, no Trojan/backdoor behavior, no deceptive behavior (Guideline MUwS).
- [ ] **Monetization**: ads are clearly labeled, non-deceptive, and comply with Families Self-Certified Ads SDK rules when applicable.
- [ ] **Payments**: digital goods/subscriptions use **Google Play Billing** (Billing Library v6+); no alternative payment for digital in-app goods.
- [ ] **Subscriptions**: prorated/equivalent across platforms, cancelable, with required disclosures; no "free trial hijacking."

## 4. Store Listing & Assets (Policy: Metadata)

- [ ] **App title** ≤ 50 characters; no misleading keywords, trademark violations, or "free/cheat" phrasing (Policy: Metadata).
- [ ] **Short description** ≤ 80 characters; **Full description** ≤ 4000 chars, accurate to the app experience.
- [ ] **Feature graphic** (1024×500, PNG/JPG, no text > 20% of image, no borders) uploaded.
- [ ] **App icon** 512×512 (32-bit PNG or 32-bit WebP, <1024 KB); verify the current Play Console icon mask and safe-zone preview before export.
- [ ] **Screenshots** (min 2, max 8) for each type/device; portrait preferred; no borders/cropping.
- [ ] **Promotional video** (YouTube link) optional but compliant with store listing policy.
- [ ] **Category** selected from the supported list; **content rating** questionnaire completed honestly.
- [ ] **Contact details** (email at minimum; website optional) provided and monitored.

## 5. Reviews & Ratings Compliance

- [ ] App does not incentivize fake reviews or manipulate ratings/installs (Policy: Ratings & Reviews).
- [ ] **Review responses** workflow established; negative reviews triaged within SLA.
- [ ] No **rating-gating** that hides/suppresses reviews — must not manipulate user ratings.

## 6. Distribution & Rollout

- [ ] Internal test track created (≥1 internal tester); for a new personal developer account created after November 13, 2023, run a closed test with at least **12 testers opted in continuously for 14 days** before applying for production access, if that account path applies.
- [ ] **Pre-launch report** (Firebase Test Lab) run; no **red** (crash) issues, no security certificates warnings.
- [ ] **Review binaries** (test track) distinct from **production** release; production track staged to **1% → 100%** over rollout.
- [ ] **Staged rollout** enabled with **monitoring dashboard**; halt criteria defined (crash rate / ANR threshold).
- [ ] **Release notes** accurate and concise for each production rollout.

---

*Last verified: 2026-09-20 · License: MIT · Sources linked above as canonical at time of verification.*
