# Architecture Decision Record Template

> **Educational template, not legal advice.** This document is a lightweight
> decision-record aid. It does not approve a design, determine legal or
> regulatory obligations, guarantee security or compliance, or replace
> architecture, product, threat-model, privacy, licensing, and operational
> review. Replace every placeholder and record the actual decision and evidence.

- **Template owner:** `[TEAM / OWNER]`
- **Repository:** `[REPOSITORY / PRODUCT]`
- **ADR number:** `[NNNN]`
- **Status:** `[PROPOSED / ACCEPTED / SUPERSEDED / REJECTED]`
- **Decision date:** `[DATE]`
- **Last reviewed:** 2026-09-20

## How to use this template

1. Copy this file to the repository's decisions directory using a monotonic
   filename such as `0010-use-native-keychain.md`.
2. Keep the record short enough to review and diff; link detailed evidence
   instead of copying it into the ADR.
3. Record one decision and its significant consequences. Do not silently rewrite
   an accepted decision; create a superseding ADR.
4. Update status, links, owners, and review dates as the decision changes.

## ADR-[NNNN]: `[DECISION TITLE]`

## Status

`[PROPOSED / ACCEPTED / SUPERSEDED / REJECTED]`

- **Decision owner:** `[NAME / ROLE]`
- **Decision date:** `[DATE]`
- **Supersedes:** `[ADR NUMBER / LINK, IF ANY]`
- **Superseded by:** `[ADR NUMBER / LINK, IF ANY]`
- **Review trigger:** `[DATE / RELEASE / METRIC / ARCHITECTURE CHANGE]`

## Context

Describe the situation that made a decision necessary:

- What problem, opportunity, constraint, or change prompted this ADR?
- Which users, systems, teams, platforms, data flows, or business goals are
  affected?
- What assumptions, dependencies, and non-goals matter?
- What evidence, measurements, experiments, threat models, privacy reviews,
  license reviews, or operational constraints informed the decision?

`[WRITE CONTEXT HERE]`

### Requirements

- `[REQUIREMENT]`
- `[REQUIREMENT]`
- `[REQUIREMENT]`

### Non-goals

- `[NON-GOAL]`
- `[NON-GOAL]`

### Constraints

- `[CONSTRAINT]`
- `[CONSTRAINT]`

## Decision

State the decision plainly and early. Describe what will change, what will not
change, and the boundaries of the decision.

`[WRITE THE DECISION HERE]`

### Scope

- **Included:** `[COMPONENTS / TEAMS / PLATFORMS / DATA / RELEASES]`
- **Excluded:** `[COMPONENTS / TEAMS / PLATFORMS / DATA / RELEASES]`
- **Effective release or date:** `[RELEASE / DATE]`
- **Migration or rollout:** `[PLAN / LINK]`

## Alternatives considered

| Alternative       | Description     | Benefits     | Costs / risks     | Why not selected |
| ----------------- | --------------- | ------------ | ----------------- | ---------------- |
| `[ALTERNATIVE A]` | `[DESCRIPTION]` | `[BENEFITS]` | `[COSTS / RISKS]` | `[REASON]`       |
| `[ALTERNATIVE B]` | `[DESCRIPTION]` | `[BENEFITS]` | `[COSTS / RISKS]` | `[REASON]`       |
| `[STATUS QUO]`    | `[DESCRIPTION]` | `[BENEFITS]` | `[COSTS / RISKS]` | `[REASON]`       |

## Consequences

### Positive

- `[CONSEQUENCE]`
- `[CONSEQUENCE]`

### Negative

- `[CONSEQUENCE]`
- `[CONSEQUENCE]`

### Neutral / operational

- `[CONSEQUENCE]`
- `[CONSEQUENCE]`

## Trade-offs and uncertainty

Record the most important trade-offs, unknowns, and confidence level:

- **Confidence:** `[LOW / MEDIUM / HIGH]`
- **Key uncertainty:** `[UNCERTAINTY]`
- **Risk accepted:** `[RISK AND AUTHORITY]`
- **Reversibility:** `[EASY / MODERATE / DIFFICULT / IRREVERSIBLE]`
- **Decision horizon:** `[TIME PERIOD / TRIGGER]`

## Implementation plan

| Work item | Owner     | Deliverable         | Dependency     | Due date | Status     |
| --------- | --------- | ------------------- | -------------- | -------- | ---------- |
| `[ITEM]`  | `[OWNER]` | `[LINK / ARTIFACT]` | `[DEPENDENCY]` | `[DATE]` | `[STATUS]` |

## Validation and success measures

Define how the team will know whether the decision is working:

| Measure    | Baseline     | Target     | Measurement method | Owner     | Review date |
| ---------- | ------------ | ---------- | ------------------ | --------- | ----------- |
| `[METRIC]` | `[BASELINE]` | `[TARGET]` | `[METHOD]`         | `[OWNER]` | `[DATE]`    |

Include relevant quality gates:

- [ ] Architecture and interface review completed.
- [ ] Threat model and security controls updated.
- [ ] Privacy/data-flow review completed where personal data is affected.
- [ ] License and third-party dependency review completed where software or
      assets are affected.
- [ ] Accessibility, localization, performance, reliability, and operations
      impacts reviewed.
- [ ] Migration, rollback, monitoring, and support plans are documented.
- [ ] Tests, experiments, or proof-of-concept evidence are linked.
- [ ] Product, engineering, security, privacy, and business owners have reviewed
      the decision as applicable.

## Re-evaluation triggers

Revisit this ADR when any of the following occurs:

- `[TRIGGER]`
- `[TRIGGER]`
- `[TRIGGER]`
- `[TRIGGER]`

When a trigger fires, record the evidence and either reaffirm, amend through a
superseding ADR, or retire the decision.

## References

- `[LINK TO DESIGN / RFC / ISSUE / EXPERIMENT]`
- `[LINK TO THREAT MODEL]`
- `[LINK TO DATA FLOW / PRIVACY REVIEW]`
- `[LINK TO LICENSE / VENDOR REVIEW]`
- `[LINK TO METRICS OR OPERATIONS DASHBOARD]`

## Approval record

| Role                                  | Name     | Decision                                      | Date     | Notes     |
| ------------------------------------- | -------- | --------------------------------------------- | -------- | --------- |
| Product owner                         | `[NAME]` | `[APPROVE / REJECT / COMMENT]`                | `[DATE]` | `[NOTES]` |
| Engineering lead                      | `[NAME]` | `[APPROVE / REJECT / COMMENT]`                | `[DATE]` | `[NOTES]` |
| Security reviewer                     | `[NAME]` | `[APPROVE / REJECT / COMMENT]`                | `[DATE]` | `[NOTES]` |
| Privacy/legal reviewer, if applicable | `[NAME]` | `[APPROVE / REJECT / COMMENT / NOT REQUIRED]` | `[DATE]` | `[NOTES]` |
| Business owner                        | `[NAME]` | `[APPROVE / REJECT / COMMENT]`                | `[DATE]` | `[NOTES]` |

## Reference links

Reference links were checked on **2026-09-20** and are starting points, not a
substitute for current architecture or legal review:

- [Martin Fowler: Architecture Decision Record](https://martinfowler.com/bliki/ArchitectureDecisionRecord.html)
- [MADR: Markdown Architectural Decision Records](https://github.com/adr/madr)
- [MADR user documentation](https://adr.github.io/madr/)
