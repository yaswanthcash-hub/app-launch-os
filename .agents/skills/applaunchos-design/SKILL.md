---
name: applaunchos-design
description: Scaffold 3-tier DTCG design tokens and enforce nested Corner Concentricity for React Native / Expo apps.
---

Generate and audit design systems adhering to the 3-tier Design Tokens Community Group (DTCG) specification and hardware-respectful geometry.

## 3-Tier Token Architecture

1. **Tier 1 (Primitives):** Raw color palettes (e.g. `color.blue.500`), physical spacing (`space.4`), font families.
2. **Tier 2 (Semantics):** Intent-based aliases (`surface.primary`, `text.muted`, `action.accent`).
3. **Tier 3 (Components):** Specific bindings (`button.primary.background`, `card.radius`).

## Golden Rule of Corner Concentricity

For nested rounded containers with padding $P$, calculate inner corner radius as:
$$R_{\text{inner}} = \max(0, R_{\text{outer}} - P)$$

**Never** apply identical radii to nested parent and child containers (this creates visually discordant optical padding).

```typescript
export function getNestedRadius(outerRadius: number, padding: number): number {
  return Math.max(0, outerRadius - padding);
}
```
