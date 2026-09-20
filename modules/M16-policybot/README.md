# M16: PolicyBot Store Policy Change Monitor

> **Store policy watcher and change detection engine for Apple App Store and Google Play.**  
> Part of [App Launch OS](../../README.md).

---

## 🔍 Continuous Policy Freshness

Store rules change unexpectedly. Apple introduces new required reason APIs (Guideline 5.1.1) and Google rolls out Android API target floors and testing mandates (20-tester rule, 16 KB page size alignment).

`@app-launch-os/policybot` provides:
1. **Automated Verification Checker (`check-policies.js`)**: Scans repository compliance playbooks against live Apple and Google documentation hubs to guarantee the 90-day verification threshold.
2. **CI Pipeline Integration**: Runs continuously in GitHub Actions to alert maintainers when guidelines are updated.

---

## 📦 Usage

```bash
node modules/M16-policybot/bin/check-policies.js
```

---

## 🔗 Related Resources

- [Apple Review Essentials](../../policies/apple-review-essentials.md)
- [Google Play Policy Essentials](../../policies/play-policy-essentials.md)
- [Privacy Compliance Guide](../../policies/privacy-compliance.md)
