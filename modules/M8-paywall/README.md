# M8: High-Converting Paywall & Subscriptions Kit

> **StoreKit 2 and RevenueCat-ready subscription paywalls with Apple Guideline 3.1.1 compliance.**  
> Part of [App Launch OS](../../README.md).

---

## 🛑 Fatal App Store Rejection Traps (Guideline 3.1.1)

App Store reviewers reject subscription paywalls for four primary violations:
1. **Missing or Non-Functional "Restore Purchases" Button**: The button must be clearly visible, easily discoverable, and actually trigger a restore query.
2. **Opaque Renewal Terms**: The price, duration (e.g. 1 month, 1 year), and free trial terms must be explicitly stated immediately adjacent to or preceding the CTA.
3. **Missing Legal Disclosures**: Direct, tap-target links to both a Privacy Policy and Terms of Service (or Apple EULA) must be present on the paywall screen.
4. **Misleading Savings Claims**: Comparing monthly vs. annual pricing requires transparent baseline math.

`@app-launch-os/paywall` provides an out-of-the-box, rejection-proof paywall UI component with tactile haptics, monthly/annual toggles, and geometric corner concentricity.

---

## 📦 Installation

```bash
npm install @app-launch-os/paywall
npx expo install expo-haptics
```

---

## 🚀 Quickstart

```tsx
import React from 'react';
import { PaywallView, usePaywall } from '@app-launch-os/paywall';
import { useRouter } from 'expo-router';

const PLANS = [
  {
    id: 'annual_pro',
    title: 'Annual Plan',
    billingPeriod: 'annual' as const,
    priceDisplay: '$39.99/year',
    pricePerPeriodDisplay: '$3.33/month',
    savingsBadge: 'Save 40%',
    trialPeriodDays: 7,
    productId: 'com.myapp.pro.annual',
  },
  {
    id: 'monthly_pro',
    title: 'Monthly Plan',
    billingPeriod: 'monthly' as const,
    priceDisplay: '$6.99/month',
    pricePerPeriodDisplay: '$6.99/month',
    productId: 'com.myapp.pro.monthly',
  },
];

const FEATURES = [
  {
    title: 'Unlimited Access',
    description: 'Zero restrictions on pro features and cloud exports',
  },
  {
    title: 'Priority Cloud Sync',
    description: 'Instant multi-device background synchronization',
  },
  {
    title: 'Lifetime Policy Updates',
    description: 'Continuous store compliance checks and 2026 rules',
  },
];

export function PaywallModal() {
  const router = useRouter();
  const {
    selectedPlanId,
    setSelectedPlanId,
    subscribe,
    restorePurchases,
    loading,
  } = usePaywall({
    plans: PLANS,
    onPurchaseComplete: (plan) => {
      console.log('User upgraded to:', plan.id);
      router.back();
    },
    onRestoreComplete: () => {
      console.log('Purchases restored');
      router.back();
    },
  });

  return (
    <PaywallView
      headline="Unlock Full Potential"
      features={FEATURES}
      plans={PLANS}
      selectedPlanId={selectedPlanId}
      onSelectPlan={setSelectedPlanId}
      onSubscribe={subscribe}
      onRestorePurchases={restorePurchases}
      onClose={() => router.back()}
      termsUrl="https://example.com/terms"
      privacyUrl="https://example.com/privacy"
      loading={loading}
    />
  );
}
```

---

## 🔗 Related Resources

- [Paywall & In-App Purchase Research Digest](../../findings/paywall.md)
- [Apple Review Essentials](../../policies/apple-review-essentials.md)
- [App Store Submission Checklist](../../checklists/appstore-submission.md)
