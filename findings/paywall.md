# Paywall Research Digest

**Verification date:** 2026-09-20
**Status:** Verified against primary sources; recommendations labeled below.

## Overview

This digest covers subscription and paywall strategy for mobile apps: trial architecture, billing mechanics, paywall placement, and visual UX standards described in IMPLEMENTATION_PLAN.md section 5.

## Methodology

Sources were checked on 2026-09-20 against RevenueCat's published State of Subscription Apps research and Apple/Google store guidelines. Claims drawn from RevenueCat's tracked data set are labeled **[Vendor Data]**. Claims drawn from official store guidelines are labeled **[Platform Verified]**. Actionable guidance is labeled **[Recommendation]**.

## 1. Trial and Subscription Architecture

- **[Vendor Data]** RevenueCat's 2026 State of Subscription Apps research reports that weekly subscriptions with a 3-day free trial account for over 55% of total tracked subscription revenue and yield the highest long-term LTV.
- **[Recommendation]** Default to a weekly subscription with a 3-day free trial. Adjust trial length by time-to-value:
  - Quick (content, photo, utility): 3 days
  - Medium (habit, fitness, productivity): 7 days
  - Complex (B2B, SaaS, multi-project): 14 days

## 2. Billing Strategy

- **[Vendor Data]** Opt-out (card-upfront) trials convert at 35%-60%, versus 8%-25% for opt-in (cardless) trials, according to RevenueCat's 2026 data.
- **[Recommendation]** Use opt-out trials where the store allows them. The higher conversion typically outweighs the small increase in refund churn.

## 3. Paywall Placement

- **[Vendor Data]** Presenting the subscription offer immediately following onboarding qualification (Day 0) produces 2x-5x higher conversions compared to passive feature gates.
- **[Recommendation]** Place the paywall at the user's initial moment of peak intent, right after onboarding qualification.

## 4. Paywall Visual UX Standards

- **[Platform Verified]** Apple Review Guideline 3.1.2 requires subscriptions to be clearly disclosed, with visible restore and cancel actions.
- **[Recommendation]** Implement the six standards in IMPLEMENTATION_PLAN.md section 5.2: frosted glass backdrop, value-focused hierarchy, transparent terms, prominent restore/clear close action, and remote experimentation via Superwall or RevenueCat Paywalls.

## Pitfalls

- Hiding cancellation steps, which risks App Store rejection and refund churn.
- Overloading the paywall with feature lists instead of benefit headlines.
- Forgetting to localize trial end date and renewal cost copy.

## Source Links

- RevenueCat State of Subscription Apps (2026): https://www.revenuecat.com/blog/state-of-subscription-apps (verified 2026-09-20)
- Apple Review Guideline 3.1.2: https://developer.apple.com/app-store/review/guidelines/#3.1.2 (verified 2026-09-20)
- Superwall docs: https://docs.superwall.com (verified 2026-09-20)

## Caveats

RevenueCat conversion figures are vendor-reported and should be validated against your own app's data before making pricing decisions.