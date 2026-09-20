# ADR-004: Dual Experimentation Strategy

**Status**: Accepted
**Date**: 2026-09-20
**Deciders**: App Launch OS Core Team

## Context

App Launch OS must support experimentation for indie developers, startups, and agencies with vastly different needs:

- **Solo founders** need a single SDK that handles analytics, feature flags, and A/B testing with minimal setup
- **Data teams** require warehouse-native experimentation with advanced statistics (CUPED, SRM checks, Bayesian/Frequentist engines)
- **All users** must avoid vendor lock-in and be able to swap providers without refactoring feature flag code

The verified dependency inventory (Section 2F) identifies:
- GrowthBook: Warehouse-native feature flags & A/B testing (MIT, Recommended)
- PostHog: All-in-one product suite with analytics, session replays, feature toggles (MIT, Recommended)
- OpenFeature: Vendor-neutral toggles standard (Apache-2.0, Standard)

## Decision

Provide first-class integrations for both **GrowthBook** and **PostHog**, unified behind the **OpenFeature** standard.

### Implementation Approach

1. **OpenFeature Provider Abstraction**: All feature flag access goes through OpenFeature client with provider-agnostic evaluation API
2. **GrowthBook Provider**: `openfeature-growthbook-provider` for warehouse-native experimentation with CUPED variance reduction and SRM validation
3. **PostHog Provider**: `openfeature-posthog-provider` for all-in-one analytics + flags + session replay
4. **Provider Selection**: Configuration-driven via `EXPO_PUBLIC_EXPERIMENTATION_PROVIDER` (values: `growthbook` | `posthog`)
5. **Migration Path**: Zero-code migration between providers — only the provider initialization changes

### Module Structure

```
modules/M6-experiments/
├── src/
│   ├── providers/
│   │   ├── openfeature-client.ts      # Unified OpenFeature client singleton
│   │   ├── growthbook-provider.ts     # GrowthBook OpenFeature provider wrapper
│   │   └── posthog-provider.ts        # PostHog OpenFeature provider wrapper
│   ├── hooks/
│   │   ├── useFlag.ts                 # Type-safe flag evaluation hook
│   │   ├── useExperiment.ts           # Experiment assignment with exposure tracking
│   │   └── useVariant.ts              # Variant payload access for A/B tests
│   ├── validation/
│   │   ├── srm-check.ts               # Sample Ratio Mismatch detection
│   │   └── cuped-adjustment.ts        # CUPED variance reduction utilities
│   └── index.ts                       # Public API exports
├── config/
│   ├── experimentation.config.ts      # Provider selection & feature flag schema
│   └── flags.schema.json              # JSON Schema for flag definitions
└── docs/
    ├── provider-comparison.md         # GrowthBook vs PostHog decision guide
    └── migration-guide.md             # Switching providers without refactoring
```

## Consequences

### Positive
- **Complete flexibility**: Start with PostHog's all-in-one suite, migrate to GrowthBook for advanced stats without touching feature flag call sites
- **Standards compliance**: OpenFeature is the CNCF-incubating vendor-neutral standard
- **Type safety**: Flag definitions validated against JSON Schema at build time
- **SRM protection**: Built-in Sample Ratio Mismatch detection prevents invalid experiment conclusions
- **CUPED support**: Variance reduction for faster statistical significance

### Negative
- **Additional abstraction layer**: OpenFeature adds indirection vs direct SDK calls
- **Provider parity**: Not all GrowthBook/PostHog features map 1:1 to OpenFeature spec
- **Bundle size**: Two provider packages + OpenFeature core increase JS bundle

## Alternatives Considered

| Alternative | Pros | Cons | Rejected Because |
|-------------|------|------|------------------|
| Direct GrowthBook SDK only | Best stats, native CUPED/SRM | No analytics, no session replay, vendor lock-in | Excludes solo founders needing all-in-one |
| Direct PostHog SDK only | Single SDK, analytics + flags + replay | Limited stats (no CUPED/SRM), vendor lock-in | Excludes data teams needing warehouse-native |
| Custom feature flag service | Full control, no vendor | High maintenance, no standards, reinventing wheel | Violates "compose verified repos" principle |
| LaunchDarkly | Enterprise-grade | Proprietary, expensive, not open-source | Conflicts with MIT license & zero hosting cost goals |

## Verification

**Date**: 2026-09-20
**Criteria**:
- [ ] OpenFeature client initializes with both providers
- [ ] `useFlag`, `useExperiment`, `useVariant` hooks work identically across providers
- [ ] SRM check triggers alert when allocation deviates >5% from expected
- [ ] CUPED adjustment reduces variance by ≥20% in simulated data
- [ ] Migration from PostHog → GrowthBook requires only config change
- [ ] TypeScript types infer flag keys from `flags.schema.json`

## Source Links

- OpenFeature Specification: https://openfeature.dev/specification/
- GrowthBook Documentation: https://docs.growthbook.io/
- PostHog Feature Flags: https://posthog.com/docs/product-analytics/feature-flags
- CUPED (Controlled-experiment Using Pre-Experiment Data): https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/cuped.pdf
- SRM (Sample Ratio Mismatch): https://www.kdd.org/kdd2016/papers/files/rfp0112-liangA.pdf
- Kohavi et al. "Trustworthy Online Controlled Experiments": https://www.microsoft.com/en-us/research/publication/trustworthy-online-controlled-experiments/
