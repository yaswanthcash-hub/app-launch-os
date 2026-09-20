# M6: Experiments & Feature Flags Kit

> **Flags-first A/B experimentation and Sample Ratio Mismatch (SRM) validation for React Native & Expo.**  
> Part of [App Launch OS](../../README.md).

---

## 🎯 The "1/3 Rule" of Mobile A/B Testing

Empirical research from Microsoft, Booking.com, and Duolingo reveals:
- **1/3** of tested ideas improve the target metric.
- **1/3** of tested ideas have no statistically significant impact.
- **1/3** of tested ideas actively **degrade** the user experience.

Shipping changes without feature flags and sample validation means shipping negative regressions straight to production.

`@app-launch-os/experiments` provides:
1. **Deterministic Bucketing**: Murmur/FNV hash allocation that works offline and synchronizes with providers like GrowthBook or PostHog.
2. **Exposure Tracking**: Automatic event triggers when variants are actually rendered.
3. **Automated SRM Detection**: Chi-square statistical test utility to catch bucketing anomalies before making business decisions.

---

## 📦 Installation

```bash
npm install @app-launch-os/experiments
```

---

## 🚀 Quickstart

### 1. Setup `<ExperimentProvider>` in Root Layout

```tsx
import React from 'react';
import { ExperimentProvider } from '@app-launch-os/experiments';

const flags = {
  enable_biometric_login: true,
  max_upload_size_mb: 25,
};

const experiments = {
  pricing_test: {
    key: 'pricing_test',
    variants: [
      { key: 'control', weight: 0.5, payload: { price: 29.99 } },
      { key: 'variant_b', weight: 0.5, payload: { price: 39.99 } },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ExperimentProvider
      userId="user_12345"
      flags={flags}
      experiments={experiments}
      onExposure={(expKey, varKey) => {
        console.log(`[Analytics Exposure] ${expKey} -> ${varKey}`);
      }}
    >
      {children}
    </ExperimentProvider>
  );
}
```

### 2. Evaluate Flags and Experiments in Components

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import { useFeatureFlag, useExperiment } from '@app-launch-os/experiments';

export function CheckoutScreen() {
  const isBiometricEnabled = useFeatureFlag('enable_biometric_login', false);
  const { variantKey, payload } = useExperiment<{ price: number }>('pricing_test', 'control');

  return (
    <View>
      <Text>Price: ${payload?.price ?? 29.99}</Text>
      {isBiometricEnabled && <Text>Biometric quick-checkout active</Text>}
    </View>
  );
}
```

### 3. Detect Sample Ratio Mismatch (SRM)

```ts
import { checkSampleRatioMismatch } from '@app-launch-os/experiments';

// After collecting 10,000 users with a 50/50 split target:
const result = checkSampleRatioMismatch([4820, 5180], [0.5, 0.5]);

if (result.hasMismatch) {
  console.error(
    `🚨 SRM detected! Chi-Square: ${result.chiSquare}, p-Value: ${result.pValue}. ` +
    `Check your tracking filters or client-side caching!`
  );
}
```

---

## 🔗 Related Resources

- [Experiments Research Digest](../../findings/experiments.md)
- [Architecture Decision Record: Experiments](../../decisions/004-experiments.md)
