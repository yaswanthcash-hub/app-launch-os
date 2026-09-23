# RESOURCES.md Format

`RESOURCES.md` is the curated set of trusted sources for this topic. Knowledge for explainers should be drawn from here, not from parametric guesses. Wisdom comes from the communities listed here.

## Structure

```md
# {Topic} Resources

## Knowledge

- [Doc: Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
  Foundational guidelines on iOS UX, safe areas, tactile feedback. Use for: component interactions and navigation patterns.
- [Doc: React Native Reanimated Worklets](https://docs.swmansion.com/react-native-reanimated/)
  60/120 FPS UI-thread animations. Use for: gesture handlers and shared value interpolations.

## Wisdom (Communities)

- [r/reactnative](https://reddit.com/r/reactnative)
  High-signal mobile development subreddit. Use for: architecture critiques, SDK upgrade gotchas.
- Reactiflux Discord (#react-native)
  Use for: real-time debugging and community advice.
```

## Rules

- **High-trust only.** Prefer primary sources, official documentation, recognized experts, and communities with strong moderation. If a resource is marketing dressed as education, leave it out.
- **Annotate every entry.** A bare link is useless in three months. Add one line: what it covers and when to reach for it.
- **Group by Knowledge / Wisdom.** Mirrors the philosophy in [SKILL.md](./SKILL.md). It is fine for a resource to appear in only one group.
- **Surface gaps explicitly.** If no good resource exists for an area the mission needs, write a `## Gaps` section listing what is missing. This drives future search.
- **Prune ruthlessly.** A resource that turned out to be wrong, shallow, or off-mission should be removed, not buried.
- **Record community preferences.** If the user has opted out of joining communities, note it here so future sessions don't keep proposing them.
