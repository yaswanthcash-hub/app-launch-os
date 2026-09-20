#!/usr/bin/env node
/**
 * App Launch OS CLI (`app-launch-os`)
 * Universal Mobile Pre-Flight Audit & Fix Tool (Expo / React Native / iOS / Android)
 */

const path = require('path');
const { runAudit } = require('../src/cli/auditor');
const { runFixer } = require('../src/cli/fixer');

const repoRootDir = path.resolve(__dirname, '..');
const targetDir = process.cwd();
const command = process.argv[2] || 'audit';

const usage = `
🚀 App Launch OS CLI — Pre-Flight Store Readiness & Quality Engine

Usage:
  npx app-launch-os audit             Audit current mobile app for 2026 store compliance & UX
  npx app-launch-os fix               Automatically scaffold missing manifests & haptic hooks
  npx app-launch-os --version         Show CLI version
  npx app-launch-os --help            Show this help message

Options:
  --dir <path>                        Specify project root directory (defaults to current directory)
`;

if (command === '--help' || command === '-h') {
  console.log(usage);
  process.exit(0);
}

if (command === '--version' || command === '-v') {
  const pkg = require('../package.json');
  console.log(`app-launch-os v${pkg.version}`);
  process.exit(0);
}

try {
  let projectDir = targetDir;
  const dirIdx = process.argv.indexOf('--dir');
  if (dirIdx !== -1 && process.argv[dirIdx + 1]) {
    projectDir = path.resolve(process.argv[dirIdx + 1]);
  }

  if (command === 'audit') {
    runAudit(projectDir);
  } else if (command === 'fix') {
    const { ctx } = runAudit(projectDir);
    runFixer({ ...ctx, repoRootDir });
  } else {
    // If unknown command, treat as audit if path or run audit
    runAudit(projectDir);
  }
} catch (error) {
  console.error('\n❌ Error running App Launch OS CLI:\n', error.message);
  process.exit(1);
}
