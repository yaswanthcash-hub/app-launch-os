# M12: Deep Linking & Mobile SEO Kit

> **Universal Links, Android App Links, and deep linking validation schemas for mobile web discovery.**  
> Part of [App Launch OS](../../README.md).

---

## 🌐 Universal Web-to-App Discovery

Standard custom URL schemes (`myapp://`) fail when the user doesn't have the app installed, triggering browser errors. **Universal Links (iOS)** and **Android App Links** use standard HTTPS URLs (`https://myapp.com/join`) that seamlessly route to the installed native app, or fall back to your web landing page / App Store page.

`@app-launch-os/seo` provides:
1. **`apple-app-site-association` Template**: Validated iOS Universal Links configuration with path wildcards and modern components syntax.
2. **`assetlinks.json` Template**: Android Digital Asset Links verification schema.
3. **Automated Schema Validator (`validate-deeplinks.js`)**: Verifies your server-hosted configurations against Apple and Google specifications before deployment.

---

## 📦 Usage

### Validate Deep Links Schema

```bash
node modules/M12-seo/scripts/validate-deeplinks.js
```

### Server Deployment

1. **iOS Universal Links**:
   - Host `templates/apple-app-site-association` at `https://<your-domain>/.well-known/apple-app-site-association`
   - Header must be `Content-Type: application/json`
   - Must be served over valid HTTPS without redirects.
2. **Android App Links**:
   - Host `templates/assetlinks.json` at `https://<your-domain>/.well-known/assetlinks.json`
   - Replace `sha256_cert_fingerprints` with your release keystore SHA256 fingerprint.

---

## 🔗 Related Resources

- [SEO & Discoverability Research Digest](../../findings/seo.md)
- [App Store Submission Checklist](../../checklists/appstore-submission.md)
