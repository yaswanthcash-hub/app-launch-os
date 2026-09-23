# Productivity Agent Skills

> **General workflow and interaction tools for AI coding assistants and developers.**
> Inspired by Matt Pocock's skills architecture and integrated into [App Launch OS](../../README.md).

---

## 🛠️ Included Skills

| Skill | Invocation Type | Purpose & Description |
| :--- | :--- | :--- |
| [`grill-me`](./grill-me/SKILL.md) | **User-invoked** | Relentlessly interview the user about a plan, architecture, or design before touching code. |
| [`grilling`](./grilling/SKILL.md) | **Model-invoked** | The core interview engine: visits the decision tree frontier round-by-round until shared understanding is reached. |
| [`handoff`](./handoff/SKILL.md) | **User-invoked** | Compact the current conversation into a structured handoff doc for the next agent session. |
| [`teach`](./teach/SKILL.md) | **User-invoked** | Multi-session stateful teaching workspace (`MISSION.md`, `RESOURCES.md`, `learning-records/`, `lessons/`). |
| [`to-questionnaire`](./to-questionnaire/SKILL.md) | **User-invoked** | Convert an unresolved decision into an async markdown questionnaire for stakeholders. |
| [`wait-what`](./wait-what/SKILL.md) | **User-invoked** | Stop and re-pitch an unclear explanation in Simplified Technical English using domain vocabulary. |
| [`writing-for-agents`](./writing-for-agents/SKILL.md) | **Model-invoked** | Authoritative reference on writing skills, `AGENTS.md`, progressive disclosure, and context pointers. |
| [`ponytail`](./ponytail/SKILL.md) | **User-invoked** | Minimalist coding persona enforcing the 7-rung ladder (YAGNI, stdlib, one-liner). |
| [`ponytail-audit`](./ponytail-audit/SKILL.md) | **User-invoked** | Scans for bloat, over-engineering, and heavy packages. |
| [`ponytail-debt`](./ponytail-debt/SKILL.md) | **User-invoked** | Manages intentional shortcuts (`ponytail:` markers). |
| [`ponytail-review`](./ponytail-review/SKILL.md) | **Model-invoked** | Code review focusing on diff minimization and avoiding over-engineering. |

---

## 🚀 How to Use

In your AI assistant prompt or slash command bar:
- `/grill-me` or "Grill me on my mobile auth architecture"
- `/handoff` or "Create a handoff document for the next session"
- `/teach React Native Reanimated worklets`
- `/to-questionnaire`
- `/wait-what`
