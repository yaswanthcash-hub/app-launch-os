# Experiments Research Digest

**Verification date:** 2026-09-20
**Status:** Verified against primary sources; recommendations labeled below.

## Overview

This digest covers A/B experimentation methodology for mobile apps: the 1/3 rule, sample size, SRM checks, CUPED variance reduction, and the GrowthBook / PostHog / OpenFeature stack recommended by ADR-004.

## Methodology

Sources were checked on 2026-09-20 against official documentation and published experimentation literature. Claims backed by a specific vendor's published data set are labeled **[Vendor Data]**. General statistical best practices are labeled **[Verified]**. Actionable guidance is labeled **[Recommendation]**.

## 1. The 1/3 Rule

- **[Verified]** Kohavi, Tang, and Xu (2020, *Trustworthy Online Controlled Experiments*) describe the "1/3 rule": keep control traffic at roughly 1/3 of total traffic so the treatment bucket retains enough users for long-term metrics such as retention and LTV.
- **[Recommendation]** Reserve 1/3 of traffic for control in early-stage mobile experiments. Mature products with large samples may use 50/50 splits.

## 2. Sample Size and Power

- **[Verified]** Standard practice for conversion-rate experiments: 80% power, 5% significance, minimum ~1,000-3,000 users per variant.
- **[Recommendation]** Do not run an experiment below ~1,000 users per variant. Use sequential testing (e.g., mSPRT) to avoid peeking.

## 3. Sample Ratio Mismatch (SRM)

- **[Verified]** SRM indicates a bug in randomization or data collection. Kohavi et al. report that SRM checks surface many broken experiments before results are read.
- **[Recommendation]** Always run an SRM check before reading results. If SRM is significant, stop and investigate instrumentation.

## 4. CUPED Variance Reduction

- **[Verified]** CUPED (Controlled-experiment Using Pre-Experiment Data) reduces variance by adjusting for pre-experiment covariates. It is implemented in GrowthBook and PostHog.
- **[Recommendation]** Enable CUPED for retention and revenue metrics where pre-experiment data exists.

## 5. Stack Guidance (ADR-004)

- **[Verified]** ADR-004 specifies GrowthBook (warehouse-native) and PostHog (all-in-one) behind the OpenFeature standard.
- **[Recommendation]** Start with PostHog for solo founders; migrate to GrowthBook if warehouse-native statistics become necessary.

## Pitfalls

- Peeking at results before the pre-registered sample size is reached.
- Ignoring SRM checks.
- Running experiments during holidays or seasonal events without a control.

## Source Links

- Kohavi et al. (2020): https://www.allve.com/books/trustworthy-online-controlled-experiments
- GrowthBook docs: https://docs.growthbook.io (verified 2026-09-20)
- PostHog docs: https://posthog.com/docs (verified 2026-09-20)
- OpenFeature spec: https://openfeature.dev (verified 2026-09-20)

## Caveats

Vendor-specific conversion claims should be validated locally before relying on them.