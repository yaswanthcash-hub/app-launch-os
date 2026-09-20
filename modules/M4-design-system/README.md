# @applaunchos/design-system

**Three-layer DTCG Design Token System and NativeWind v4 Preset.**

## Features
- **W3C Design Tokens Community Group (DTCG) Standard:** Formatted in `primitives.json`, `semantics.json`, and `components.json`.
- **8-Point Spatial Grid:** Standardized spacing scale (`2, 4, 8, 12, 16, 24, 32, 48, 64px`).
- **Corner Concentricity:** Pre-calculated inner/outer radii tokens ensuring concentric curves ($R_{\text{inner}} = R_{\text{outer}} - P$).
- **NativeWind v4 / Tailwind Integration:** Ready-to-use theme preset.

## Usage in `tailwind.config.js`

```javascript
const launchOsPreset = require('@applaunchos/design-system');

module.exports = {
  presets: [launchOsPreset],
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  // ...
};
```

*License: MIT · App Launch OS*
