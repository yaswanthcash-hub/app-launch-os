---
name: applaunchos-paywall
description: StoreKit 2 paywall builder with transparent billing disclosures, restore purchases trigger, and subscription toggle.
---

Scaffold high-converting, App Store Guideline 3.1.1 compliant mobile paywalls.

## Compliance & Conversion Requirements

1. **Transparent Subscription Terms:**
   - Clearly display recurring price, billing period (e.g. `/year`, `/month`), and trial duration before purchase.
   - If a free trial applies, state the exact date and amount charged when the trial ends.
2. **Mandatory StoreKit 2 Triggers:**
   - Provide a prominent `Restore Purchases` button calling `RevenueCat.restorePurchases()` or `Purchases.restorePurchases()`.
   - Include direct clickable links to `Terms of Service` and `Privacy Policy`.
3. **Conversion Best Practices:**
   - Default to annual billing with upfront monthly equivalence savings callout (e.g., "$4.99/mo, billed annually").
   - Pair billing plan toggle with light tactile haptic feedback.
   - Provide an obvious, accessible close button (with adequate tap target $\ge 44 \times 44\text{ pt}$).
