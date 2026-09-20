# Expected Behavior: broken-expo-app

## Purpose
Fixture demonstrating multiple fatal submission blockers and policy violations.

## Expected Violations
1. `APPLE_DEMO_ACCOUNT`: **BLOCKER** (Contains real SMS OTP call `auth().signInWithPhoneNumber(...)` with no guest or reviewer login flow).
2. `APPLE_PRIVACY_MANIFEST`: **BLOCKER** (Missing `PrivacyInfo.xcprivacy`).
3. `APPLE_SUBSCRIPTION_DISCLOSURE`: **BLOCKER** (Paywall lacks `restorePurchases` and recurring billing terms).
4. `APPLE_ACCOUNT_DELETION`: **BLOCKER** (Auth detected but no in-app account deletion flow).
5. `GOOGLE_TARGET_SDK`: **BLOCKER** (Targets SDK 33, below Google Play minimum API 36).
6. `GOOGLE_16KB_PAGE`: **BLOCKER** (React Native 0.74.0 lacks 16 KB page-aligned ELF binaries).
7. `UX_HAPTICS`: **WARNING** (No haptic feedback in project).
8. `PERFORMANCE_TELEMETRY`: **WARNING** (No crash reporting SDK configured).

## Expected Result
- CLI returns non-zero exit code (1) due to blockers > 0.
