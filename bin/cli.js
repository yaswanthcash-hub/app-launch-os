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
const command = process.argv[2] && !process.argv[2].startsWith('-') ? process.argv[2] : 'audit';

const usage = `
🚀 App Launch OS CLI — Launch Readiness Score & Policy Radar

Usage:
  node bin/cli.js audit               Audit mobile app for Launch Readiness Score (0-100)
  node bin/cli.js roast               Roast My App: review rejection feedback
  node bin/cli.js card                Generate the shareable ASCII Launch Score card
  node bin/cli.js radar               View active Apple & Google Store Policy Radar shifts
  node bin/cli.js fix                 Safely scaffold missing manifests & haptic hooks
  node bin/cli.js --version           Show CLI version
  node bin/cli.js --help              Show this help message

Options:
  --dir <path>                        Specify project root directory (defaults to current directory)
  --json                              Output raw JSON score object to stdout
  --min-score <N>                     Exit with code 1 if score is less than N
  --fail-on <blocker|warning>         Exit with code 1 on specified severity (default: blocker)
  --write                             Apply fixes to disk (defaults to dry-run)
  --yes, -y                           Allow --write on dirty git working tree
`;

if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(usage);
  process.exit(0);
}

if (process.argv.includes('--version') || process.argv.includes('-v')) {
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

  const isJson = process.argv.includes('--json');
  const minScoreIdx = process.argv.indexOf('--min-score');
  const minScore = minScoreIdx !== -1 && process.argv[minScoreIdx + 1] ? parseInt(process.argv[minScoreIdx + 1], 10) : null;
  const failOnIdx = process.argv.indexOf('--fail-on');
  const failOn = failOnIdx !== -1 && process.argv[failOnIdx + 1] ? process.argv[failOnIdx + 1].toLowerCase() : 'blocker';

  if (command === 'audit') {
    const { scoreData } = runAudit(projectDir, { silent: isJson });
    if (isJson) {
      console.log(JSON.stringify(scoreData, null, 2));
    }

    let shouldFail = false;
    if (scoreData.blockers > 0) shouldFail = true;
    if (failOn === 'warning' && scoreData.warnings > 0) shouldFail = true;
    if (minScore !== null && scoreData.score !== null && scoreData.score < minScore) shouldFail = true;

    if (shouldFail) {
      process.exit(1);
    }
  } else if (command === 'roast') {
    const { scoreData } = runAudit(projectDir, { silent: true });
    renderRoastReport(scoreData);
  } else if (command === 'card') {
    const { scoreData } = runAudit(projectDir, { silent: true });
    console.log(renderSocialCard(scoreData));
  } else if (command === 'radar') {
    runRadar();
  } else if (command === 'fix') {
    const isWrite = process.argv.includes('--write');
    const isYes = process.argv.includes('--yes') || process.argv.includes('-y');
    const { ctx } = runAudit(projectDir);
    runFixer({ ...ctx, repoRootDir, write: isWrite, yes: isYes });
  } else {
    // Unknown command, default to audit
    const { scoreData } = runAudit(projectDir, { silent: isJson });
    if (isJson) {
      console.log(JSON.stringify(scoreData, null, 2));
    }
    if (scoreData.blockers > 0) process.exit(1);
  }
} catch (error) {
  console.error('\n❌ Error running App Launch OS CLI:\n', error.message);
  process.exit(1);
}
