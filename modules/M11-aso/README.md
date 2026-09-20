# M11: App Store Optimization (ASO) Kit

> **App Store Optimization (ASO) metadata validator and keyword density analyzer.**
> Part of [App Launch OS](../../README.md).

---

## 🎯 Prevent ASO Metadata Rejections

Both Apple App Store Connect and Google Play Console enforce hard limits on metadata strings:
- **Apple**: Title (30 chars max), Subtitle (30 chars max), Promotional Text (170 chars max), Keywords (100 chars max).
- **Google Play**: Title (30 chars max), Short Description (80 chars max), Full Description (4,000 chars max). Over-saturating descriptions with repetitive keywords (>3% density) triggers keyword spam penalties in Google Play indexing algorithms.

`@app-launch-os/aso` provides:
1. **`aso-check` CLI**: Verifies metadata files against strict store limits before manual copy-pasting or automated API uploads.
2. **Keyword Density Analyzer**: Evaluates top recurring keywords to balance search ranking and avoid spam penalties.

---

## 📦 Usage

### Run ASO Validator

```bash
# Validate your local metadata.json
node modules/M11-aso/bin/aso-check.js --file path/to/metadata.json
```

### Metadata JSON Schema

```json
{
  "apple": {
    "title": "AppName - Daily Planner",
    "subtitle": "Track Tasks & Focus",
    "promotionalText": "Launch special: 50% off Pro membership this week.",
    "keywords": "task,planner,focus,todo,calendar,routine,habit",
    "description": "Full marketing description here..."
  },
  "google": {
    "title": "AppName - Daily Planner",
    "shortDescription": "Track tasks, build routines, and maintain daily focus.",
    "fullDescription": "Full marketing description here..."
  }
}
```

---

## 🔗 Related Resources

- [ASO Research Digest](../../findings/aso.md)
- [App Store Submission Checklist](../../checklists/appstore-submission.md)
- [Google Play Submission Checklist](../../checklists/playstore-submission.md)
