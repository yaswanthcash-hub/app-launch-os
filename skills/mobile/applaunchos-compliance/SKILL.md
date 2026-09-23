---
name: applaunchos-compliance
description: Pre-submission compliance audit against 2026 Apple App Store & Google Play Store rejection triggers.
---

Audit the mobile codebase for store rejection traps and verify policy compliance before submission.

## Apple App Store Review Checks (2026 Guidelines)

1. **Guideline 2.1 (App Completeness & Demo Accounts):**
   - Check that reviewer credentials do NOT require SMS verification or two-factor SMS OTPs.
   - Verify that demo accounts include pre-populated data and sandbox Pro entitlements.
2. **Guideline 5.1.1 (Privacy Manifests):**
   - Ensure native packages accessing system boot time, disk space, or file timestamps have matching entries in `PrivacyInfo.xcprivacy`.
3. **Guideline 5.1.1(v) (In-App Account Deletion):**
   - If account creation exists, verify an in-app "Delete Account" button exists and triggers full data erasure.
4. **Guideline 3.1.1 (In-App Purchases):**
   - Verify a visible "Restore Purchases" button and upfront recurring subscription terms.

## Google Play Store Policy Checks (2026 Policies)

1. **20-Tester Rule:** Check closed testing tracks for 14+ consecutive days with 20 opted-in testers.
2. **Target API Level:** Verify `targetSdkVersion >= 36` (Android 15+).
3. **16 KB Memory Page Size Support:** Verify all native C++ `.so` libraries support 16 KB page alignment.
4. **Sensitive Permissions:** Verify `POST_NOTIFICATIONS` and Photo Picker compliance.

## Execution
Run compliance audit scripts when available:
```bash
npm run compliance:apple
npm run compliance:google
```
