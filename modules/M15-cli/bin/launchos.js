#!/usr/bin/env node
/**
 * LaunchOS CLI — Developer Pre-Flight & Compliance Tooling
 */

const { execSync } = require('child_process');
const path = require('path');

const command = process.argv[2];
const rootDir = path.resolve(__dirname, '../../..');

const usage = `
🚀 LaunchOS CLI — Mobile App Launch & Compliance Tool
Usage:
  launchos test                  Run complete audit suite (links, freshness, integrity, compliance)
  launchos compliance [apple|google|all]  Run store compliance pre-flight checks
  launchos audit [links|freshness|integrity] Run specific repo audit
  launchos --help                Show this help menu
`;

if (!command || command === '--help' || command === '-h') {
  console.log(usage);
  process.exit(0);
}

try {
  switch (command) {
    case 'test':
      execSync(`node "${path.join(rootDir, 'scripts/audit-all.js')}"`, { stdio: 'inherit' });
      break;
    case 'compliance': {
      const platform = process.argv[3] || 'all';
      execSync(`node "${path.join(rootDir, 'scripts/compliance-check.js')}" ${platform}`, { stdio: 'inherit' });
      break;
    }
    case 'audit': {
      const sub = process.argv[3] || 'links';
      if (sub === 'links') execSync(`node "${path.join(rootDir, 'scripts/audit-links.js')}"`, { stdio: 'inherit' });
      else if (sub === 'freshness') execSync(`node "${path.join(rootDir, 'scripts/check-freshness.js')}"`, { stdio: 'inherit' });
      else if (sub === 'integrity') execSync(`node "${path.join(rootDir, 'scripts/audit-integrity.js')}"`, { stdio: 'inherit' });
      else execSync(`node "${path.join(rootDir, 'scripts/audit-all.js')}"`, { stdio: 'inherit' });
      break;
    }
    default:
      console.error(`Unknown command: ${command}\n${usage}`);
      process.exit(1);
  }
} catch (err) {
  process.exit(1);
}
