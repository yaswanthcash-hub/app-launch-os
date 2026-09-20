# Event Taxonomy Template

> **Educational template, not legal advice.** This document is a drafting and
> governance aid for product analytics and operational events. It does not
> determine which data practices, consent rules, store disclosures, or privacy
> laws apply, and it does not claim or guarantee compliance. Validate the
> taxonomy against actual code, SDK behavior, user expectations, and qualified
> legal/privacy review before collection or publication.

- **Owner:** `[TEAM / OWNER]`
- **Product:** `[APP OR SERVICE NAME]`
- **Taxonomy version:** `[MAJOR.MINOR.PATCH]`
- **Status:** `[DRAFT / PROPOSED / ACCEPTED / DEPRECATED]`
- **Effective date:** `[DATE]`
- **Last verified:** 2026-09-20
- **Next review:** `[DATE OR TRIGGER]`

## Purpose

Use this template to make analytics events discoverable, stable, comparable, and
safe to collect. A good taxonomy lets product, engineering, data, security, and
privacy teams agree on what an event means without embedding raw personal data
or changing names ad hoc.

## Source links

All sources below were checked on **2026-09-20**:

- [OpenTelemetry semantic conventions](https://opentelemetry.io/docs/specs/semconv/)
- [OpenTelemetry general events](https://opentelemetry.io/docs/specs/semconv/general/events/)
- [OpenTelemetry mobile semantic conventions](https://opentelemetry.io/docs/specs/semconv/mobile/)
- [Google Play Data safety guidance](https://support.google.com/googleplay/android-developer/answer/10787469?hl=en)
- [Apple Privacy Manifest Files](https://developer.apple.com/documentation/bundleresources/privacy-manifest-files)
- [OWASP MASVS Privacy](https://mas.owasp.org/MASVS/12-MASVS-PRIVACY/)

## Taxonomy principles

1. **One meaning per event.** An event name describes one user, system, or
   business occurrence.
2. **Stable names, versioned schemas.** Do not silently change an event's
   meaning. Add a new event or schema version when semantics change.
3. **Object-action-result grammar.** Prefer `[object]_[action]_[result]`, such
   as `account_created`, `subscription_started`, or `payment_failed`.
4. **Use plain ASCII names.** Use lowercase letters, numbers, and underscores;
   avoid spaces, punctuation, personal names, and ambiguous abbreviations.
5. **Separate facts from interpretation.** Record the observed event and its
   properties; calculate segments, cohorts, and conclusions downstream.
6. **Minimize personal data.** Do not put names, email addresses, raw tokens,
   free-form messages, precise location, government identifiers, or sensitive
   content into event names or properties.
7. **Make consent visible.** Include consent or collection state in the event
   envelope or pipeline metadata without turning it into a user-tracking
   identifier.
8. **Design for deletion.** Every event must have an owner, retention rule,
   deletion behavior, and linkage strategy.

## Event envelope

Every event should carry a consistent envelope. Properties that are not
applicable may be omitted according to the pipeline contract.

| Field                    | Type      | Required | Definition                                          | Example                      |
| ------------------------ | --------- | -------: | --------------------------------------------------- | ---------------------------- |
| `event_id`               | string    |      Yes | Unique identifier for the event instance            | `01J...`                     |
| `event_name`             | string    |      Yes | Stable taxonomy name                                | `subscription_started`       |
| `event_version`          | integer   |      Yes | Schema version for this event                       | `1`                          |
| `occurred_at`            | timestamp |      Yes | Time the occurrence happened, with timezone         | `2026-09-20T06:56:18Z`       |
| `ingested_at`            | timestamp |      Yes | Time the collector received the event               | `2026-09-20T06:56:19Z`       |
| `source`                 | enum      |      Yes | App, web, server, SDK, or integration               | `mobile_ios`                 |
| `app_version`            | string    |       No | Version of the emitting application                 | `1.4.2`                      |
| `os_name` / `os_version` | string    |       No | Operating system context                            | `iOS 26.0`                   |
| `session_id`             | string    |       No | Pseudonymous session identifier with retention rule | `s_...`                      |
| `user_key`               | string    |       No | Pseudonymous user key; never a raw identifier       | `u_...`                      |
| `consent_state`          | object    |      Yes | Relevant collection/processing state at emission    | `{"analytics":"granted"}`    |
| `schema_url`             | URI       |       No | Machine-readable schema location                    | `https://[HOST]/schemas/...` |
| `properties`             | object    |      Yes | Event-specific attributes                           | `{}`                         |
| `context`                | object    |       No | Non-user-specific technical context                 | `{}`                         |

## Naming grammar

### Recommended pattern

```text
<object>_<action>_<result>
```

Examples:

- `account_created`
- `profile_updated`
- `content_shared`
- `subscription_started`
- `subscription_renewed`
- `subscription_cancelled`
- `payment_authorized`
- `payment_failed`
- `password_reset_requested`
- `data_export_completed`

### Result suffixes

| Suffix       | Meaning                                                          |
| ------------ | ---------------------------------------------------------------- |
| `_started`   | A multi-step action began                                        |
| `_completed` | The action succeeded                                             |
| `_failed`    | The action failed; include a non-sensitive error code            |
| `_cancelled` | The user or system intentionally stopped the action              |
| `_viewed`    | A screen or meaningful object was rendered                       |
| `_selected`  | A user made a selection                                          |
| `_submitted` | Data was sent for processing; success is not implied             |
| `_rejected`  | A validation, policy, or authorization check rejected the action |

### Avoid

- `button_clicked` without an object or business meaning;
- `user_event`, `misc`, `test`, or `debug`;
- personal data in names, such as `john_doe_logged_in`;
- version numbers in names unless the event itself represents a versioned
  artifact;
- synonyms for the same concept, such as `signup_completed` and
  `account_created`, without a documented migration.

## Property rules

| Rule           | Requirement                                                                                |
| -------------- | ------------------------------------------------------------------------------------------ |
| Type stability | Keep a property type stable across versions; use a new schema version for breaking changes |
| Naming         | Use lowercase snake_case and define units in the property name or metadata                 |
| Cardinality    | Keep enumerated values bounded; do not use free-form text as a dimension                   |
| Sensitivity    | Mark each property as public, internal, confidential, or restricted                        |
| Necessity      | Record why the property is needed and who uses it                                          |
| Retention      | Assign a retention class to every property or event                                        |
| Linkability    | Document whether a property can identify or re-identify a person                           |
| Validation     | Define allowed values, ranges, formats, and null behavior                                  |

## Property classification

| Classification | Examples                                                   | Collection rule                                                  |
| -------------- | ---------------------------------------------------------- | ---------------------------------------------------------------- |
| Public         | Feature flag name, app version, non-sensitive result       | May be used in broad reporting                                   |
| Internal       | Error code, experiment assignment, performance bucket      | Limit to authorized operational users                            |
| Confidential   | Pseudonymous user key, account segment, purchase tier      | Encrypt, restrict, and apply deletion rules                      |
| Restricted     | Sensitive data, precise location, health data, raw content | Do not collect unless specifically approved and legally reviewed |

## Event catalog template

Duplicate this section for each event.

### `[OBJECT]_[ACTION]_[RESULT]`

- **Status:** `[PROPOSED / ACCEPTED / DEPRECATED]`
- **Owner:** `[TEAM / OWNER]`
- **Schema version:** `[VERSION]`
- **Description:** `[ONE-SENTENCE MEANING]`
- **Trigger:** `[EXACT CONDITION THAT EMITS THE EVENT]`
- **Non-trigger:** `[NEARBY CONDITION THAT MUST NOT EMIT IT]`
- **Business question:** `[DECISION OR MEASURE SUPPORTED]`
- **Source:** `[CLIENT / SERVER / SDK / INTEGRATION]`
- **Collection basis:**
  `[FUNCTIONAL / ANALYTICS / CONSENTED / OTHER — REVIEW REQUIRED]`
- **Retention:** `[PERIOD OR CRITERIA]`
- **Deletion behavior:**
  `[DELETE / ANONYMIZE / AGGREGATE / RETAIN UNDER DOCUMENTED BASIS]`
- **PII or sensitive-data review:** `[NONE / DETAILS / APPROVAL LINK]`

| Property          | Type                            |   Required | Allowed values / range | Sensitivity | Purpose     | Retention  |
| ----------------- | ------------------------------- | ---------: | ---------------------- | ----------- | ----------- | ---------- |
| `[property_name]` | `[string/integer/boolean/enum]` | `[YES/NO]` | `[VALUES]`             | `[CLASS]`   | `[PURPOSE]` | `[PERIOD]` |

## Lifecycle event families

| Family         | Example events                                                                                  | Typical properties                                   |
| -------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| Acquisition    | `install_opened`, `referral_viewed`, `campaign_link_opened`                                     | channel category, campaign key, consent state        |
| Authentication | `login_started`, `login_completed`, `login_failed`, `password_reset_requested`                  | method category, non-sensitive error code, step      |
| Onboarding     | `onboarding_started`, `permission_prompt_viewed`, `onboarding_completed`                        | step, outcome, permission category                   |
| Activation     | `first_project_created`, `first_value_action_completed`, `activation_threshold_reached`         | time-to-value bucket, feature category               |
| Engagement     | `screen_viewed`, `feature_used`, `content_created`, `content_shared`                            | object category, result, experiment key              |
| Monetization   | `paywall_viewed`, `trial_started`, `subscription_started`, `payment_failed`, `refund_requested` | product key, price bucket, currency, result          |
| Retention      | `notification_opted_in`, `return_session_started`, `subscription_cancelled`                     | reason category, channel, consent state              |
| Privacy        | `privacy_settings_viewed`, `consent_updated`, `data_export_requested`, `account_deleted`        | choice category, request status, verification method |
| Reliability    | `app_error_observed`, `api_request_failed`, `sync_completed`                                    | error code, retry count, latency bucket              |
| Security       | `session_invalidated`, `suspicious_login_blocked`, `device_trust_failed`                        | risk category, control outcome, no raw credentials   |

## Example event

```json
{
  "event_id": "[UNIQUE EVENT ID]",
  "event_name": "subscription_started",
  "event_version": 1,
  "occurred_at": "[ISO-8601 TIMESTAMP]",
  "ingested_at": "[ISO-8601 TIMESTAMP]",
  "source": "[mobile_ios/mobile_android/web/server]",
  "app_version": "[VERSION]",
  "session_id": "[PSEUDONYMOUS SESSION ID]",
  "user_key": "[PSEUDONYMOUS USER KEY]",
  "consent_state": {
    "analytics": "[not_requested/granted/denied/withdrawn]",
    "marketing": "[not_requested/granted/denied/withdrawn]"
  },
  "properties": {
    "product_key": "[PRODUCT KEY]",
    "billing_period": "[monthly/yearly]",
    "trial_days": 3,
    "price_bucket": "[PRICE BUCKET]",
    "currency": "[ISO CURRENCY CODE]",
    "experiment_key": "[EXPERIMENT KEY]"
  },
  "context": {
    "app_build": "[BUILD]",
    "os_name": "[OS]",
    "network_type": "[NETWORK BUCKET]"
  }
}
```

## Governance workflow

1. **Propose:** Submit the event catalog entry, business question, trigger,
   properties, sensitivity classification, and retention rule.
2. **Review:** Product, engineering, data, privacy/security, and the event owner
   review necessity and naming.
3. **Implement:** Add schema validation, tests, documentation, and consent
   checks before enabling collection.
4. **Observe:** Monitor volume, null rates, invalid values, duplicates, latency,
   and unexpected sensitive payloads.
5. **Version:** Publish breaking changes as a new schema version; retain a
   migration and deprecation plan.
6. **Retire:** Stop emitters, update dashboards, document the replacement, and
   delete or anonymize data according to the retention rule.

## Validation checklist

### Definition

- [ ] The event has one unambiguous meaning and a named owner.
- [ ] The trigger and non-trigger are testable.
- [ ] The event name follows the agreed grammar.
- [ ] The business question and downstream use are documented.
- [ ] Alternatives such as an existing event or aggregate metric were
      considered.

### Privacy and security

- [ ] Every property has a necessity, sensitivity, and retention classification.
- [ ] No raw personal, authentication, payment, government-identifier, health,
      contact, precise-location, or free-form sensitive content is collected.
- [ ] Pseudonymous identifiers cannot be linked to raw identifiers by
      unauthorized users.
- [ ] Consent and platform permission states are checked before emission.
- [ ] SDK and server-side collection are included in the data inventory and
      store disclosures where applicable.
- [ ] Access controls, encryption, logging, and deletion behavior are
      documented.

### Implementation

- [ ] Schema validation and unit tests cover required fields and allowed values.
- [ ] Event volume and duplicate behavior are tested under retry and offline
      conditions.
- [ ] Clock, timezone, session, and user-key behavior are documented.
- [ ] Backfills and migrations have an owner and rollback plan.
- [ ] Dashboards and alerts use the approved event and property definitions.

### Operations

- [ ] Event catalog, schema registry, and code references agree.
- [ ] Deprecated events have a removal date and replacement.
- [ ] Data-quality checks run in staging and production.
- [ ] Privacy requests and deletion jobs cover the event data.
- [ ] Taxonomy changes are reviewed at least `[FREQUENCY]`.

## Reference links

Reference links were checked on **2026-09-20** and are starting points, not a
substitute for current product, privacy, or security review:

- [OpenTelemetry semantic conventions](https://opentelemetry.io/docs/specs/semconv/)
- [OpenTelemetry mobile semantic conventions](https://opentelemetry.io/docs/specs/semconv/mobile/)
- [Google Play Data safety guidance](https://support.google.com/googleplay/android-developer/answer/10787469?hl=en)
- [Apple Privacy Manifest Files](https://developer.apple.com/documentation/bundleresources/privacy-manifest-files)
