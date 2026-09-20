# App Launch OS — Expo TypeScript Starter

**Production-grade, zero-eject Expo SDK 52+ / React Native 0.76+ boilerplate with store rejection guards, 60 FPS Reanimated motion, tactile haptics, and corner concentricity.**

## Key Features

1. **Pre-Flight Store Compliance (2026 Ready):**
   - **`ios/PrivacyInfo.xcprivacy`:** Apple Privacy Manifest declaring required reason APIs for File Timestamps, System Boot Time, Disk Space, and Active Keyboards ([Guideline 5.1.1](../../policies/privacy-compliance.md)).
   - **Self-Service Account Deletion:** Functional in-app account deletion flow in `app/(tabs)/settings.tsx` ([Guideline 5.1.1(v)](../../policies/apple-review-essentials.md)).
   - **StoreKit 2 Paywall:** Transparent pricing modal with active "Restore Purchases" button in `app/paywall.tsx` ([Guideline 3.1.1](../../findings/paywall.md)).
   - **Android 15 (Target SDK 35):** Edge-to-edge support and 16 KB page size alignment.
2. **Sensory Ergonomics & Premium UX:**
   - **Corner Concentricity:** Calculates nested radii ($R_{\text{inner}} = \max(0, R_{\text{outer}} - P)$).
   - **Physical Haptics:** Calibrated tactile feedback via `expo-haptics` on tabs, switches, and purchase actions.
   - **60/120 FPS Motion:** UI-thread animations via `react-native-reanimated`.
3. **Developer Velocity:**
   - Strict TypeScript & Expo Router (file-based navigation).
   - NativeWind v4 (Tailwind CSS) with 3-layer DTCG design tokens.

## Quickstart

```bash
# 1. Navigate to starter
cd starters/expo-ts

# 2. Install dependencies
npm install

# 3. Start development server
npx expo start
```

Press `i` for iOS Simulator or `a` for Android Emulator.

*License: MIT · App Launch OS*
