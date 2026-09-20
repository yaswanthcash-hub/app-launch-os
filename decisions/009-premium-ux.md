# ADR-009: Premium UX and Conversion-Oriented Paywall Experience

- **Status:** Accepted
- **Date:** 2026-09-20
- **Verification date:** 2026-09-20
- **Decision owners:** App Launch OS maintainers

## Context

App Launch OS targets premium mobile applications where trust, speed, accessibility, and clear value communication affect both retention and conversion. The implementation plan combines the perceived-performance patterns of the premium UX system with a monetization architecture based on RevenueCat and optional remote paywall experimentation.

A paywall that is visually impressive but unclear about price, trial end, renewal, restoration, or dismissal can increase buyer resistance and create store-review risk. Conversely, delaying the offer until after peak onboarding intent can leave value uncommunicated. The system therefore needs a reusable, transparent, experimentable paywall contract rather than an isolated marketing screen.

This ADR implements [IMPLEMENTATION_PLAN.md §4](../IMPLEMENTATION_PLAN.md#4-premium-ux-interaction--motion-system) and [§5](../IMPLEMENTATION_PLAN.md#5-monetization-trial-models--high-converting-paywalls).

## Decision

Treat premium UX as a product contract spanning perceived performance, accessible interaction, and monetization. Reuse the design tokens and motion system from ADR-007 and ADR-008, including reduced-motion fallbacks, restrained haptics, Dynamic Type support, touch-target and contrast checks, and native perceived-performance patterns.

Use **RevenueCat Purchases** as the default source of truth for entitlement, subscription, trial, and purchase state. Use **Superwall** for remote paywall presentation and experimentation when dynamic layouts, copy, or pricing tests are required without an app release. RevenueCat Paywalls are an approved alternative when a RevenueCat-only integration is preferable. Keep the paywall adapter boundary explicit so the presentation layer can change without coupling business logic to a vendor.

### Trial and subscription architecture

Use a weekly subscription with a three-day free trial as the default for quick time-to-value products such as content, photo, and utility apps. Select trial duration from the user's value horizon:

- **3 days:** quick time-to-value products, including content, photo, and utility apps.
- **7 days:** medium time-to-value products, including habit, fitness, and productivity apps.
- **14 days:** complex workflows, including B2B, SaaS, and multi-project apps.

Use an opt-out, card-upfront trial only when it is legally and store-compliant for the product and market, and disclose the trial end date and renewal cost before consent. Do not treat higher conversion as permission to obscure terms. Track both opt-out and cardless variants where experimentation is appropriate.

Present the subscription offer on **Day 0 after onboarding qualification**, at the user's initial peak-intent moment. Do not block essential setup or misrepresent free functionality. Use value gates and contextual prompts when they communicate a concrete next outcome better than an immediate generic paywall.

### Paywall experience

Every paywall variant must include:

1. A frosted-glass backdrop anchored over the active app screen to create depth while preserving context.
2. A benefit-led headline and supporting outcome copy before a feature list.
3. The trial end date, renewal price and cadence, and “cancel anytime in Settings” disclosure in readable text.
4. A prominent **Restore Purchases** action and links to Terms and Privacy.
5. An obvious close or dismiss action that does not trap the user.
6. A responsive layout that remains usable with Dynamic Type, reduced motion, screen readers, and platform accessibility settings.
7. Remote configuration and experiment metadata when Superwall or RevenueCat Paywalls is used.

Use the shared motion and haptic rules: entrance and dismissal are brief and interruptible, success feedback confirms a completed purchase or restoration, and no animation or haptic is required to understand the offer.

Measure trial start, activation, purchase conversion, restore use, close rate, refund or cancellation signals, and experiment integrity. Require sample-ratio-mismatch and guardrail checks before declaring a paywall experiment a winner.

## Consequences

### Positive

- RevenueCat centralizes purchase and entitlement state while Superwall enables rapid, review-independent iteration.
- Day-0 qualified presentation captures intent without forcing a generic offer onto every user.
- Trial duration follows time-to-value instead of applying one duration to every product.
- Explicit trial, renewal, cancellation, restore, privacy, and close controls improve trust and store compliance.
- Shared design and motion tokens make paywalls feel like the product rather than a disconnected advertisement.
- Experiment metadata and guardrails make conversion improvements auditable and reversible.

### Negative

- RevenueCat and Superwall introduce vendor integration, configuration, and operational dependencies.
- Remote variants require governance so copy, pricing, and claims cannot bypass product or legal review.
- Transparent terms may reduce short-term conversion compared with ambiguous presentation, while improving trust and retention quality.
- Day-0 offers require careful onboarding qualification to avoid interrupting users before they understand the product.
- Experiment analysis requires sufficient traffic and disciplined guardrails; small or biased samples can produce false conclusions.

## Alternatives

### Static native paywall only

A static screen reduces vendor dependencies and is appropriate for a minimal starter, but it requires an app release for every copy, layout, or pricing change and makes systematic experimentation slower.

### Superwall or RevenueCat Paywalls without RevenueCat Purchases

A presentation-only integration can simplify the first screen but leaves entitlement and transaction state to custom code. RevenueCat Purchases remains the default source of truth for production subscription state.

### Cardless trials for every product

Cardless trials reduce upfront friction, but the implementation plan reports materially lower conversion for opt-in trials. The selected approach matches trial design to time-to-value and permits cardless variants only as measured alternatives.

### Delayed or passive paywall

Delaying the offer can protect onboarding flow, but passive discovery misses the documented Day-0 intent window. The decision uses qualification and contextual timing rather than an unconditional interruption.

### Feature list as the primary hierarchy

A feature list is easy to author but does not communicate the user's outcome. The selected hierarchy leads with a benefit and keeps features secondary.

## Verification

The decision was verified against the canonical implementation plan on **2026-09-20**. A conforming implementation must demonstrate RevenueCat-backed state, a Day-0 qualified presentation path, trial-duration selection by time-to-value, transparent renewal and cancellation terms, restore and close actions, accessible reduced-motion behavior, and an auditable remote-experiment path when enabled.

## Sources

- [App Launch OS implementation plan — Premium UX, Interaction and Motion System](../IMPLEMENTATION_PLAN.md#4-premium-ux-interaction--motion-system)
- [App Launch OS implementation plan — Monetization, Trial Models and High-Converting Paywalls](../IMPLEMENTATION_PLAN.md#5-monetization-trial-models--high-converting-paywalls)
- [RevenueCat React Native Purchases](https://github.com/RevenueCat/react-native-purchases)
- [Superwall React Native](https://github.com/superwall/react-native-superwall)
- [Apple App Review Guidelines — Subscriptions](https://developer.apple.com/app-store/review/guidelines/#subscriptions)
- [RevenueCat documentation](https://www.revenuecat.com/docs/)
- [Superwall documentation](https://developer.superwall.me/)
- [OpenFeature](https://github.com/open-feature)
- [WCAG 2.x](https://www.w3.org/WAI/standards-guidelines/wcag/)
