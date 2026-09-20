#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const POLICY_SOURCES = [
  {
    name: 'Apple App Store Review Guidelines',
    url: 'https://developer.apple.com/app-store/review/guidelines/',
    localDoc: 'policies/apple-review-essentials.md',
  },
  {
    name: 'Google Play Developer Program Policy',
    url: 'https://play.google.com/about/developer-program-policy/',
    localDoc: 'policies/play-policy-essentials.md',
  },
  {
    name: 'Apple Privacy Manifests & Required Reason APIs',
    url: 'https://developer.apple.com/documentation/bundleresources/privacy_manifest_files',
    localDoc: 'policies/privacy-compliance.md',
  },
];

function checkPolicies() {
  console.log('🤖 App Launch OS — PolicyBot Change Monitor');
  console.log('============================================');

  const rootDir = path.resolve(__dirname, '../../../');
  let allUpToDate = true;

  for (const source of POLICY_SOURCES) {
    const docPath = path.join(rootDir, source.localDoc);
    console.log(`\n🔍 Checking source: ${source.name}`);
    console.log(`   Source URL: ${source.url}`);

    if (!fs.existsSync(docPath)) {
      console.error(`   ❌ Local documentation missing: ${source.localDoc}`);
      allUpToDate = false;
      continue;
    }

    const content = fs.readFileSync(docPath, 'utf8');
    const dateMatch = content.match(/(?:Last\s+verified|Last\s+updated|Verification\s+date)[\s\S]{0,20}?(\d{4}-\d{2}-\d{2})/i);

    if (dateMatch) {
      const verifiedDate = new Date(dateMatch[1]);
      const now = new Date();
      const diffDays = Math.floor((now.getTime() - verifiedDate.getTime()) / (1000 * 60 * 60 * 24));

      console.log(`   📅 Verified Date: ${dateMatch[1]} (${diffDays} days ago)`);
      if (diffDays <= 90) {
        console.log('   ✅ Current & Fresh (<90 days threshold)');
      } else {
        console.warn(`   ⚠️  STALE WARNING: Document exceeds 90-day verification threshold!`);
        allUpToDate = false;
      }
    } else {
      console.warn('   ⚠️  No valid date stamp found.');
      allUpToDate = false;
    }
  }

  console.log('\n============================================');
  if (allUpToDate) {
    console.log('✨ All monitored store policies are fully verified and up to date.');
    process.exit(0);
  } else {
    console.warn('⚠️  Some policies require review or date updates.');
    process.exit(0); // non-fatal warning
  }
}

if (require.main === module) {
  checkPolicies();
}

module.exports = { checkPolicies };
