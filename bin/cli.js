#!/usr/bin/env node
/**
 * App Launch OS CLI (`app-launch-os`)
 * Universal Mobile Pre-Flight Audit, Roast & Policy Radar Engine
 */

const path = require('path');
const { runAudit } = require('../src/cli/auditor');
const { runFixer } = require('../src/cli/fixer');
const { runRadar } = require('../src/cli/radar');
const { renderSocialCard, renderRoastReport } = require('../src/cli/reporter');

const repoRootDir = path.resolve(__dirname, '..');
const targetDir = process.cwd();
const command = process.argv[2] || 'audit';

const usage = `
🚀 App Launch OS CLI — Launch Readiness Score™ & Policy Radar

Usage:
  npx app-launch-os audit             Audit mobile app for Launch Readiness Score™ (0-100)
  npx app-launch-os roast             Roast My App: brutally honest review rejection feedback
  npx app-launch-os card              Generate the shareable ASCII Launch Score card
  npx app-launch-os radar             View active Apple & Google Store Policy Radar shifts
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
  } else if (command === 'roast') {
    const { scoreData } = runAudit(projectDir, { silent: true });
    renderRoastReport(scoreData);
  } else if (command === 'card') {
    const { scoreData } = runAudit(projectDir, { silent: true });
    console.log(renderSocialCard(scoreData));
  } else if (command === 'radar') {
    runRadar();
  } else if (command === 'fix') {
    const { ctx } = runAudit(projectDir);
    runFixer({ ...ctx, repoRootDir });
  } else {
    // Unknown command, default to audit
    runAudit(projectDir);
  }
} catch (error) {
  console.error('\n❌ Error running App Launch OS CLI:\n', error.message);
  process.exit(1);
}
