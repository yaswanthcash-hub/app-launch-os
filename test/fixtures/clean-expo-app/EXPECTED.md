# Expected Behavior: clean-expo-app

## Purpose
A reference Expo app that complies with all Apple and Google Play 2026 store requirements and best practices.

## Expected Results
- `APPLE_DEMO_ACCOUNT`: **PASS** (Reviewer/guest demo credentials provided without external phone OTP).
- `APPLE_PRIVACY_MANIFEST`: **PASS** (`ios/PrivacyInfo.xcprivacy` present).
- `APPLE_ACCOUNT_DELETION`: **PASS** (In-app account deletion flow present).
- `APPLE_SUBSCRIPTION_DISCLOSURE`: **PASS** (Clear recurring terms, `restorePurchases` button, privacy/terms links).
- `APPLE_IPV6`: **PASS** (Compliant networking).
- `APPLE_SDK_BASELINE`: **PASS** (Expo SDK 54+ builds against Xcode 26 / iOS 26 SDK).
- `GOOGLE_TARGET_SDK`: **PASS** (Target SDK 36 / Android 16).
- `GOOGLE_16KB_PAGE`: **PASS** (React Native 0.78+ with 16 KB page-aligned native ELF libraries).
- `GOOGLE_CLOSED_TESTING`: **PASS** or **MANUAL** (20-tester checklist present).
- `GOOGLE_DATA_SAFETY`: **PASS** (Clean permissions).
- `UX_HAPTICS`: **PASS** (`useHaptic` hook and `expo-haptics` integrated).
- `UX_ACCESSIBILITY`: **PASS** (Interactive elements have `accessibilityLabel`).
- `PERFORMANCE_HERMES`: **PASS** (Hermes engine enabled).
- `PERFORMANCE_FABRIC`: **PASS** (New Architecture enabled).
- `PERFORMANCE_MOTION`: **PASS** (Reanimated worklets on UI thread).
- `PERFORMANCE_TELEMETRY`: **PASS** (Sentry crash telemetry present).

## Score
- **0 Blockers**
- **0 Warnings**
- Numeric Score: **100/100**
