# M10: Cloud Builds & Store Release Automation Kit

> **Production EAS Build configurations, Fastlane deployment lanes, and automated App Store changelog generators.**
> Part of [App Launch OS](../../README.md).

---

## 🚀 Painless Store Deployments

Managing native mobile compilation credentials, iOS provisioning profiles, and Google Play track submissions manually is error-prone.

`@app-launch-os/release` provides:
1. **Production `eas.json` Profile**: Ready for EAS Build with Android 15 edge-to-edge and iOS 18 Privacy Manifest inclusions.
2. **Fastlane Fastfile**: Turnkey lanes for Apple TestFlight and Google Play Closed Testing.
3. **Automated Changelog Generator**: Parses conventional commits into clear, user-facing App Store release notes.

---

## 📦 Usage

### 1. Run Automated Changelog Generator

```bash
node modules/M10-release/scripts/generate-changelog.js
```

### 2. Configure EAS Cloud Builds

Copy `templates/eas.json` into your project root:

```bash
cp modules/M10-release/templates/eas.json eas.json
eas build --profile production --platform all
```

### 3. Deploy via Fastlane

```bash
fastlane ios beta
fastlane android beta
```

---

## 🔗 Related Resources

- [Architecture Decision Record: CI/CD](../../decisions/003-cicd.md)
- [App Store Submission Checklist](../../checklists/appstore-submission.md)
- [Google Play Submission Checklist](../../checklists/playstore-submission.md)
