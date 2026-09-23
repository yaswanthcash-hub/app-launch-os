# M13: AI Agent Tooling & Context Kit

> **Codebase context packing tool and agent prompt generators for AI coding assistants.**
> Part of [App Launch OS](../../README.md).

---

## 🧠 Eliminate LLM Hallucinations

AI coding agents (Google Antigravity, Claude Code, OpenAI Codex, Cursor, Windsurf) frequently hallucinate outdated mobile patterns (deprecated `AsyncStorage`, missing Apple Privacy Manifests, or SMS 2FA demo accounts).

`@app-launch-os/ai-kit` provides:
1. **`pack-context` CLI**: Compresses the authoritative ADRs, store compliance policies, and design token specifications into an optimized context prompt.
2. **Deterministic Agent Execution**: Works in tandem with [AGENTS.md](../../AGENTS.md) and [llms.txt](../../llms.txt) to enforce the Planning-First gate and Corner Concentricity.

---

## 📦 Usage

```bash
# Pack core App Launch OS policies and ADRs into a single markdown context file
node modules/M13-ai-kit/bin/pack-context.js --output ai-context.md
```

Then provide `ai-context.md`, `@AGENTS.md`, or the portable Agent Skills (`skills/`) directly to your AI agent.

---

## 🧰 Agent Skills Suite

App Launch OS includes portable Agent Skills adhering to the Agent Skills standard:
- **Productivity:** `grill-me`, `grilling`, `handoff`, `teach`, `to-questionnaire`, `wait-what`, `writing-for-agents`.
- **Mobile Engineering:** `applaunchos-plan`, `applaunchos-compliance`, `applaunchos-design`, `applaunchos-ux`, `applaunchos-paywall`, `applaunchos-security`.

See [skills/README.md](../../skills/README.md) for complete documentation.

---

## 🔗 Related Resources

- [Agent Skills Directory (skills/)](../../skills/README.md)
- [AI Agent Execution Contract (AGENTS.md)](../../AGENTS.md)
- [Machine-Readable Documentation (llms.txt)](../../llms.txt)

