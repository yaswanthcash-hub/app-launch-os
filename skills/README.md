# App Launch OS — Agent Skills Directory

> **Portable, open-source agent skills for AI coding assistants (Antigravity, Claude Code, Cursor, Windsurf, Devin, Copilot).**
> Built according to the [Agent Skills standard](https://github.com/agentskills/agentskills) and inspired by Matt Pocock's skills architecture.

---

## 📂 Skills Index

### ⚡ Productivity & General Workflow (`skills/productivity/`)
General-purpose workflow tools that make AI coding agents more disciplined, transparent, and resilient.

- [**`grill-me`**](./productivity/grill-me/SKILL.md): Relentlessly interview the user about a plan or architecture until every branch of the design tree is resolved before touching code.
- [**`grilling`**](./productivity/grilling/SKILL.md): The underlying model-invoked interview engine: visits the decision tree frontier round-by-round.
- [**`handoff`**](./productivity/handoff/SKILL.md): Compact the current conversation into a structured handoff document for the next agent session.
- [**`teach`**](./productivity/teach/SKILL.md): Multi-session stateful teaching workspace with `MISSION.md`, `RESOURCES.md`, `learning-records/`, `lessons/`, and `reference/`.
- [**`to-questionnaire`**](./productivity/to-questionnaire/SKILL.md): Turn an unresolved decision into an async markdown questionnaire for stakeholders.
- [**`wait-what`**](./productivity/wait-what/SKILL.md): Immediately stop and re-pitch an unclear explanation in Simplified Technical English using domain vocabulary.
- [**`writing-for-agents`**](./productivity/writing-for-agents/SKILL.md): Authoritative guide on writing skills, `AGENTS.md`, progressive disclosure, and context pointers.
- [**`ponytail`**](./productivity/ponytail/SKILL.md): Minimalist coding persona enforcing the 7-rung ladder (YAGNI, stdlib, native, etc).
- [**`ponytail-audit`**](./productivity/ponytail-audit/SKILL.md): Scans for bloat, over-engineering, and heavy packages.
- [**`ponytail-debt`**](./productivity/ponytail-debt/SKILL.md): Manages intentional shortcuts marked with `ponytail:` comments.
- [**`ponytail-review`**](./productivity/ponytail-review/SKILL.md): Code review focused on diff minimization and unnecessary complexity elimination.

---

### 📱 Mobile App Launch OS Skills (`skills/mobile/`)
Specialized mobile engineering skills designed to eliminate 2026 App Store / Google Play rejections and build premium apps.

- [**`applaunchos-plan`**](./mobile/applaunchos-plan/SKILL.md): Mobile architecture discovery interview & phased milestone planning.
- [**`applaunchos-compliance`**](./mobile/applaunchos-compliance/SKILL.md): Pre-flight compliance audit for Apple 2026 and Google Play Store 2026.
- [**`applaunchos-design`**](./mobile/applaunchos-design/SKILL.md): 3-tier DTCG design tokens and corner concentricity formula.
- [**`applaunchos-ux`**](./mobile/applaunchos-ux/SKILL.md): 5-state tactile haptics, Reanimated 3 UI worklets (60/120 FPS), and 12 HCI cognitive laws.
- [**`applaunchos-paywall`**](./mobile/applaunchos-paywall/SKILL.md): StoreKit 2 paywalls with transparent billing terms and restore purchase triggers.
- [**`applaunchos-security`**](./mobile/applaunchos-security/SKILL.md): Biometrics hook, Keychain/Keystore hardware storage, and threat modeling.

---

## 🔌 Using with AI Coding Assistants

### 1. Antigravity & Claude Code
Skills placed in `.agents/skills/` or referenced in `AGENTS.md` are auto-discovered during agent turns. You can also trigger them directly with slash commands:
```text
/grill-me
/handoff
/teach React Native Animations
/applaunchos-compliance
```

### 2. Cursor & Windsurf
Add `@skills/productivity/grill-me/SKILL.md` or `@skills/mobile/applaunchos-compliance/SKILL.md` to your agent context prompt.
