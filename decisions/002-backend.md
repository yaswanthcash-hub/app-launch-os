# ADR-002 — Backend Agnosticism with Supabase as Primary

## Metadata

- **Status:** Accepted
- **Decision date:** 2026-09-20
- **Verification date:** 2026-09-20
- **Source of record:** `IMPLEMENTATION_PLAN.md` — Section 3 (Architecture Decisions), Section 2E (Verified Resource & Dependency Inventory), Section 8 Phases 3 & 4 (roadmap)
- **Related modules:** `M8-paywall`, `M2-research`, `starters/expo-ts/`
- **Related ADRs:** none (this is the data-layer abstraction contract)

---

## Context

### Strategic need
Indie developers, early-stage startups, and agencies have widely varying infrastructure budgets and backend preferences (self-hosted, cloud, serverless, single-file binaries). A one-size-fits-all backend choice in the starter would either over-serve low-budget teams or under-serve teams that need enterprise Postgres features. The project must provide a **production-graded default** while guaranteeing that switching backends never requires rewriting business logic.

### Evidence
- `IMPLEMENTATION_PLAN.md` Section 3 / README section 10 select **Supabase as the default production implementation**, abstracted behind clean TypeScript service interfaces; **PocketBase** and **Better Auth** are documented as full drop-in alternatives.
- The verified inventory (Section 2E, items 26–29) assigns Supabase the *Recommended* tier (Apache-2.0, Postgres BaaS with Row Level Security, realtime subscriptions, pgvector) and lists PocketBase (*Alternative*, MIT, single-file Go binary), Better Auth (*Alternative*, MIT, passkey & OAuth), and Appwrite (*Alternative*, BSD-3-Clause) as peers.
- The monetization research (Section 5 / `findings/paywall.md`) ties subscriptions to RevenueCat/Superwall, which are backend-agnostic and must therefore not assume a single auth or database provider.
- The starter (`starters/expo-ts/`) is expected to ship a working data layer out of the box, which requires a default backend with minimal friction.

### Forces
1. **No lock-in**: switching Supabase → PocketBase → a custom Node/Go backend must require changing only the client adapter, not the rest of the app.
2. **Auth portability**: authentication must support passkeys, OAuth, and multi-session flows regardless of the backing provider — aligning with the OWASP MASVS Tier 1 secure-storage guidance (Section 1.3).
3. **Postgres ecosystem**: the default should offer a real SQL engine with Row Level Security so developers can scale from prototype to regulated apps without a data-layer rewrite.
4. **Self-hosted fallback**: a subset of users cannot adopt a cloud SaaS; an offline-capable, single-binary option must be a documented first-class path.
5. **Open-source purity**: all recommended backends must remain on permissive licenses so the License Contamination Shield (Section 1, guarantee #2) and the allowlist CI workflow are not violated.

---

## Decision

Adopt a **provider-agnostic data-access layer** (clean TypeScript service interfaces) and ship **Supabase** as the default production backend, while documenting **PocketBase** and **Better Auth** with complete drop-in guides.

### What this means operationally
1. The starter app exposes a `services/` interface (e.g., `services/auth.ts`, `services/data.ts`) whose concrete implementations are injected at build time. The interface types are framework-neutral.
2. **Default implementation**: Supabase client (`@supabase/supabase-js`) using Postgres, Row Level Security (RLS), realtime subscriptions, and `pgvector` for embeddings. Auth flows delegate to Supabase Auth (or a Better Auth-compatible adapter).
3. **Drop-in alternative #1 — PocketBase**: documented migration where the same interface is satisfied by PocketBase's single-file Go binary and its TypeScript SDK, suitable for rapid indie MVPs with zero infrastructure.
4. **Drop-in alternative #2 — Better Auth**: documented where the same auth interface is satisfied by Better Auth (zero vendor lock-in, multi-session, passkey & OAuth support) — useful when teams want auth only and pair it with a custom backend for data.
5. Appwrite (BSD-3-Clause) is documented as an additional self-hosted REST/GraphQL alternative for teams that prefer a container-based BaaS over a single binary.

### Non-goals
- The project does **not** mandate or bundle Firebase. Firebase's proprietary Terms of Service and runtime licensing are incompatible with the MIT-first, copyleft-free posture described in Section 1 and `policies/licensing-guide.md`.

---

## Consequences

### Positive
- **Vendor-portable business logic**: per Section 3, "changing only the client adapter" is sufficient to swap Supabase ↔ PocketBase ↔ a custom backend. The interface contract is the unit of change.
- **Production-scale default with Postgres**: teams inheriting the default gain Row Level Security, realtime subscriptions, and vector search (`pgvector`) without re-architecting, satisfying regulated-app paths to Tier 2/3 security (Section 1.3 roadmap: Phases 4+).
- **Zero-infrastructure friction for MVPs**: PocketBase's single-file Go binary lets indie founders launch without standing up a Postgres instance; the documented drop-in keeps the same interface.
- **Auth flexibility without rewrites**: Better Auth provides a passkey-first, OAuth-capable auth layer that can replace Supabase Auth (or any provider) behind the same contract, supporting the Tier 1 secure-storage mandate via `react-native-keychain` / Expo SecureStore.
- **License safety**: Supabase (Apache-2.0), PocketBase (MIT), Better Auth (MIT), and Appwrite (BSD-3-Clause) all satisfy the project's permissive-only allowlist; the MIT-licensed core repo remains uncontaminated.

### Negative
- **Interface design is a one-time forcing function**: the service interface must be expressive enough to cover all four backends' feature surfaces, which constrains the initial schema. Prematurely narrow interfaces cause migration pain later.
- **PocketBase caps scale**: a single-file SQLite backend cannot trivially grow into a multi-region Postgres deployment; teams outgrowing it must plan a migration window.
- **Better Auth requires a host**: unlike Supabase (hosted SaaS) or PocketBase (single binary), Better Auth must be deployed to a runtime the team manages; the drop-in guide must document the minimal hosting requirements.
- **Postgres vendor features**: `pgvector` and realtime subscriptions are Supabase-first; equivalent PocketBase/Appwrite/BetterAuth capabilities differ and are documented with their limits.

---

## Alternatives Considered

| Option | Description | Why not chosen |
|---|---|---|
| **Firebase (Firestore + Firebase Auth)** | Google's hosted BaaS with real-time DB and first-party RN SDKs. | Proprietary Terms of Service and paid-tier lock-in conflict with the MIT / copyleft-free posture (Section 1 guarantees, `policies/licensing-guide.md`). Would violate the License Contamination Shield philosophy. |
| **Appwrite only (BSD-3-Clause)** | Self-hosted container BaaS, REST & GraphQL over MariaDB. | Excellent for self-host purists, but container orchestration is a higher operational lift than PocketBase's single binary for MVPs, and it lacks Supabase's Postgres/RLS/pgvector ecosystem that the monetization and security tiers lean on. |
| **PocketBase only** | Single-file Go binary, SQLite. | Ideal for solo founders but lacks multi-region scaling, managed TLS, and Postgres-level RLS that regulated apps (Phase 4 security hardening) require. Chosen as a documented alternative, not the default. |
| **Better Auth only** | TypeScript-first auth suite with passkeys & OAuth. | Auth-only; does not provide a managed data layer, so it leaves the database choice open. Chosen as an auth adapter, not a full-backend default. |
| **Custom backend (Node/Go) built from scratch** | No BaaS; hand-rolled API + Postgres. | Maximizes control and vendor freedom but maximizes time-to-value — directly opposes the "cut time-to-launch from months to weeks" objective (Section 1). Supabase provides the same Postgres surface with managed infra. |
| **Supabase only, no abstraction** | Ship the starter hard-wired to Supabase. | Eliminates switchability, violates the "never experience lock-in" consequence in Section 3, and forces PocketBase/Better Auth users to port business logic. Rejected. |

---

## Source Links

All sources verified on **2026-09-20**:

- Supabase (Postgres BaaS, RLS, realtime, pgvector, Apache-2.0): https://github.com/supabase/supabase (verified 2026-09-20)
- PocketBase (single-file Go binary, MIT): https://github.com/pocketbase/pocketbase (verified 2026-09-20)
- Better Auth (TypeScript auth suite, passkeys & OAuth, MIT): https://github.com/better-auth/better-auth (verified 2026-09-20)
- Appwrite (self-hosted container BaaS, BSD-3-Clause): https://github.com/appwrite/appwrite (verified 2026-09-20)
- react-native-keychain (hardware-backed keystore, MIT, Tier 1 secure storage): https://github.com/oblador/react-native-keychain (verified 2026-09-20)
- OWASP MASVS (mobile security verification, CC BY-SA 4.0): https://mas.owasp.org/MASVS (verified 2026-09-20)
- RevenueCat Purchases (StoreKit 2 / Play Billing, MIT): https://github.com/RevenueCat/react-native-purchases (verified 2026-09-20)

## Caveats

- Supabase is the default because it best matches the project's dual mandate of "managed Postgres at MVP friction" and "permissive-open-source-compatible." Teams that cannot use a cloud SaaS should default to the PocketBase drop-in guide.
- The auth interface is auth-provider-agnostic by design; replacing Supabase Auth with Better Auth is a documented one-adapter swap, but teams must still configure redirect URIs, webhooks, and email templates in their chosen provider.
- `pgvector` and realtime subscriptions are documented as Supabase-first capabilities; PocketBase/Appwrite/Better Auth offer functionally different equivalents, and their limits are itemized in the respective drop-in guides (not in this ADR).
