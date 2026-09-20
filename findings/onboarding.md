# Onboarding Research Digest

**Verification date:** 2026-09-20
**Status:** Verified against primary sources; recommendations labeled below.

## Overview

This digest covers mobile onboarding activation patterns: permission priming, aha-moment identification, time-to-value metrics, and the onboarding-to-paywall flow described in IMPLEMENTATION_PLAN.md sections 1.3 and 5.1.

## Methodology

Sources were checked on 2026-09-20 against Apple and Google platform guidance and published product-led growth research. Claims tied to a specific platform's published guidance are labeled **[Platform Verified]**. General activation best practices supported by published measurement are labeled **[Verified]**. Actionable guidance is labeled **[Recommendation]**.

## 1. Permission Priming

- **[Platform Verified]** Apple's App Store Review Guidelines require that permission prompts be delayed until the user has seen a clear context explaining why the permission is needed. Pre-prompts (soft prompts) improve acceptance rates and reduce rejections.
- **[Recommendation]** Use a soft-prompt priming screen before each system permission dialog. Explain the benefit in the user's own words, not a generic system message.

## 2. The Aha-Moment

- **[Verified]** The aha-moment is the first point at which a user experiences the product's core value. Identifying it per cohort is a prerequisite for measuring onboarding activation.
- **[Recommendation]** Define the aha-moment as a concrete, measurable action (e.g., first saved item, first completed task). Instrument it as an analytics event and track activation rate by cohort.

## 3. Time-to-Value

- **[Verified]** Shortening time-to-value is the single largest lever for improving activation. Every additional step before the aha-moment reduces completion.
- **[Recommendation]** Reduce onboarding to the minimum steps required to reach the aha-moment. Defer non-essential setup to after first value.

## 4. Onboarding-to-Paywall Flow

- **[Vendor Data]** RevenueCat's 2026 research reports that presenting the subscription offer immediately following onboarding qualification (Day 0) produces 2x-5x higher conversions versus passive feature gates.
- **[Recommendation]** Qualify the user during onboarding, then present the paywall at the moment of peak intent. See findings/paywall.md for paywall UX standards.

## 5. Metrics

- **[Verified]** Core onboarding metrics: activation rate (users reaching the aha-moment / total users), time-to-value, step completion rate, and drop-off by step.
- **[Recommendation]** Instrument all onboarding steps as analytics events. Use TanStack Query for optimistic state updates during onboarding to reduce perceived friction.

## Pitfalls

- Asking for permissions before the user understands the value.
- Overloading onboarding with tutorials instead of letting users explore.
- Measuring completion instead of activation.

## Source Links

- Apple App Store Review Guidelines: https://developer.apple.com/app-store/review (verified 2026-09-20)
- Google Play User Permission Guidance: https://support.google.com/googleplay/policy/training (verified 2026-09-20)
- Product-Led Growth Collective resources: https://www.productledgrowth.com (verified 2026-09-20)

## Caveats

Aha-moment definitions are product-specific; validate your definition with cohort analysis before optimizing around it.
