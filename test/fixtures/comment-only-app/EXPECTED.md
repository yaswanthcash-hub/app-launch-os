# Expected Behavior: comment-only-app

## Purpose
This fixture is the **false-positive reproduction test**. It contains a login screen (`src/LoginScreen.tsx`) where phone/SMS OTP is mentioned exclusively inside comments:
```tsx
// NOTE: Deprecated SMS OTP verification flow.
// We used to send an SMS phone verification code here:
// const res = await auth.signInWithPhoneNumber('+1234567890');
```
The actual executable code offers guest authentication with no SMS dependency.

## Expected Detector Results
- `APPLE_DEMO_ACCOUNT`: **PASS** (Comments must not trigger an SMS OTP blocker. The AST parser must discard or ignore comments).
- `APPLE_PRIVACY_MANIFEST`: **PASS** (`ios/PrivacyInfo.xcprivacy` present).
- `APPLE_ACCOUNT_DELETION`: **PASS** (In-app deletion endpoint call present).
- `APPLE_SUBSCRIPTION_DISCLOSURE`: **PASS** (Clear terms and `restorePurchases` present).
- `GOOGLE_TARGET_SDK`: **PASS** (SDK 36).
- `GOOGLE_16KB_PAGE`: **PASS** (React Native 0.78).
- Total blockers: **0**.
