#!/usr/bin/env node
/**
 * App Launch OS - Comprehensive Master Audit Runner
 * Runs Link Audit, Freshness Audit, Integrity Audit, and Compliance Engine.
 */

const { execSync } = require('child_process');
const path = require('path');

const scripts = [
  { name: 'Relative Link Integrity', file: 'audit-links.js' },
  { name: 'Documentation Freshness (<90 Days)', file: 'check-freshness.js' },
  { name: 'Repo Integrity & Hollow Shell Detection', file: 'audit-integrity.js' },
  { name: 'Store Compliance Pre-Flight Matrix', file: 'compliance-check.js' }
];

console.log('🚀 Running App Launch OS Master Audit Suite...\n');

let failed = false;

scripts.forEach(script => {
  console.log(`▶ Executing: ${script.name}...`);
  try {
    const fullPath = path.join(__dirname, script.file);
    execSync(`node "${fullPath}"`, { stdio: 'inherit' });
    console.log(`\n------------------------------------------------------------------------\n`);
  } catch (err) {
    console.error(`❌ Audit failed during: ${script.name}\n`);
    failed = true;
  }
});

if (failed) {
  console.error('❌ One or more audits FAILED. Please resolve the issues above.');
  process.exit(1);
} else {
  console.log('✨ ALL AUDITS PASSED! Repository is in 100% verified, release-ready condition.');
  process.exit(0);
}
