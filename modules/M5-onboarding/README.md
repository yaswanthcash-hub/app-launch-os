# M5: Onboarding & Permission Priming Kit

> **Production permission priming and interactive value walkthroughs for React Native & Expo.**  
> Part of [App Launch OS](../../README.md).

---

## 🎯 Why Soft Permission Priming Matters

Triggering the native OS permission alert (Push Notifications, App Tracking Transparency, Camera, Location) on cold launch results in a **~70% rejection rate**. Once denied by the user at the system level, the app cannot prompt again; the user must manually navigate to iOS/Android system settings.

`@app-launch-os/onboarding` provides:
1. **Pre-Permission Priming Modal (`PermissionPrimer`)**: A soft dialog explaining the clear value exchange before invoking native APIs, lifting permission acceptance from 30% to over 70%.
2. **Value Walkthrough Carousel (`OnboardingCarousel`)**: Gesture-driven, haptic-enhanced onboarding with corner concentricity and smooth pagination.

---

## 📦 Installation

```bash
# In your Expo or React Native app
npm install @app-launch-os/onboarding
npx expo install expo-haptics
```

---

## 🚀 Quickstart

### 1. Pre-Permission Priming Modal

```tsx
import React, { useState } from 'react';
import { PermissionPrimer } from '@app-launch-os/onboarding';
import * as Notifications from 'expo-notifications';

export function NotificationOptIn() {
  const [visible, setVisible] = useState(true);

  const requestNotifications = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
  };

  return (
    <PermissionPrimer
      visible={visible}
      type="notifications"
      title="Never Miss Critical Updates"
      description="Enable real-time push alerts to stay notified of account activity and release milestones."
      benefitBullets={[
        'Instant security alerts when logging in from new devices',
        'Direct tracking for time-sensitive status updates',
        'Zero spam — customize or disable alerts anytime',
      ]}
      ctaText="Enable Notifications"
      skipText="Not Now"
      onRequestNativePermission={requestNotifications}
      onDismiss={() => setVisible(false)}
      onSuccess={() => {
        setVisible(false);
        console.log('Permission granted successfully!');
      }}
    />
  );
}
```

### 2. Interactive Value Carousel

```tsx
import React from 'react';
import { OnboardingCarousel } from '@app-launch-os/onboarding';
import { useRouter } from 'expo-router';

export function OnboardingScreen() {
  const router = useRouter();

  const slides = [
    {
      id: '1',
      badgeText: 'Instant Setup',
      title: 'Launch in Days, Not Months',
      subtitle: 'Pre-configured compliance engines and DTCG tokens handle the heavy lifting.',
    },
    {
      id: '2',
      badgeText: 'Store Approval',
      title: 'Zero Rejection Traps',
      subtitle: 'Automated 2026 Apple & Google Play policies verify your app before submission.',
    },
    {
      id: '3',
      badgeText: '60 FPS Ergonomics',
      title: 'Crafted for Touch',
      subtitle: 'Hardware-calibrated haptics and corner concentricity create a fluid native feel.',
    },
  ];

  return (
    <OnboardingCarousel
      slides={slides}
      primaryButtonText="Get Started"
      onComplete={() => router.replace('/(tabs)')}
      onSkip={() => router.replace('/(tabs)')}
    />
  );
}
```

---

## 📐 Concentric Design & Haptics

- **Concentric Radii**: All cards calculate internal child radii using $R_{\text{inner}} = \max(0, R_{\text{outer}} - P)$ to avoid visual corner collision.
- **Physical Haptic Feedback**: Uses `expo-haptics` on slide changes (`selectionAsync`), button taps (`impactAsync(Medium)`), and successful grants (`notificationAsync(Success)`).

---

## 🔗 Related Resources

- [App Store Submission Checklist](../../checklists/appstore-submission.md)
- [Onboarding Research Digest](../../findings/onboarding.md)
- [Apple Review Essentials](../../policies/apple-review-essentials.md)
