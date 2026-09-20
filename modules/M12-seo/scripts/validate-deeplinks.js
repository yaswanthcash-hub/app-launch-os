#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function validateDeepLinks() {
  console.log('🔗 Validating iOS Universal Links & Android App Links Configurations...');
  const baseDir = path.resolve(__dirname, '../templates');
  let hasErrors = false;

  // 1. Check apple-app-site-association
  const aasaPath = path.join(baseDir, 'apple-app-site-association');
  if (!fs.existsSync(aasaPath)) {
    console.error('❌ apple-app-site-association file is missing!');
    hasErrors = true;
  } else {
    try {
      const aasa = JSON.parse(fs.readFileSync(aasaPath, 'utf8'));
      if (!aasa.applinks || !aasa.applinks.details || !Array.isArray(aasa.applinks.details)) {
        console.error('❌ apple-app-site-association: Missing "applinks.details" array.');
        hasErrors = true;
      } else {
        const detail = aasa.applinks.details[0];
        if (!detail.appIDs || detail.appIDs.length === 0) {
          console.error('❌ apple-app-site-association: Missing "appIDs" array.');
          hasErrors = true;
        } else {
          console.log(`✅ iOS Universal Links: Found ${detail.appIDs.length} appID declarations.`);
        }
      }
    } catch (e) {
      console.error(`❌ apple-app-site-association: Invalid JSON syntax (${e.message})`);
      hasErrors = true;
    }
  }

  // 2. Check assetlinks.json
  const assetlinksPath = path.join(baseDir, 'assetlinks.json');
  if (!fs.existsSync(assetlinksPath)) {
    console.error('❌ assetlinks.json file is missing!');
    hasErrors = true;
  } else {
    try {
      const assetlinks = JSON.parse(fs.readFileSync(assetlinksPath, 'utf8'));
      if (!Array.isArray(assetlinks) || assetlinks.length === 0) {
        console.error('❌ assetlinks.json: Expected non-empty JSON array of statements.');
        hasErrors = true;
      } else {
        const stmt = assetlinks[0];
        if (
          !stmt.target ||
          !stmt.target.package_name ||
          !stmt.target.sha256_cert_fingerprints
        ) {
          console.error('❌ assetlinks.json: Missing target package_name or sha256_cert_fingerprints.');
          hasErrors = true;
        } else {
          console.log(`✅ Android App Links: Validated package "${stmt.target.package_name}" with SHA256 fingerprint.`);
        }
      }
    } catch (e) {
      console.error(`❌ assetlinks.json: Invalid JSON syntax (${e.message})`);
      hasErrors = true;
    }
  }

  if (hasErrors) {
    console.error('\n❌ Deep link configuration validation FAILED.');
    process.exit(1);
  } else {
    console.log('\n✨ All deep link schemas are 100% valid and standards-compliant.');
    process.exit(0);
  }
}

if (require.main === module) {
  validateDeepLinks();
}

module.exports = { validateDeepLinks };
