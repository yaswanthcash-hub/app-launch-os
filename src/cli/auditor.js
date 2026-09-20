/**
 * App Launch OS — Master Project Auditor
 * Discovers project files and runs all compliance, UX, performance, and security detectors.
 */

const fs = require('fs');
const path = require('path');
const { auditApple } = require('./detectors/apple');
const { auditGoogle } = require('./detectors/google');
const { auditUx } = require('./detectors/ux');
const { auditPerformance } = require('./detectors/performance');
const { auditSecurity } = require('./detectors/security');
const { computeScore } = require('./scorer');
const { renderReport } = require('./reporter');

function getAllFiles(dir, fileList = [], maxFiles = 300) {
  if (fileList.length >= maxFiles) return fileList;
  if (!fs.existsSync(dir)) return fileList;

  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (fileList.length >= maxFiles) break;
      const fullPath = path.join(dir, entry.name);

      if (
        entry.name === 'node_modules' ||
        entry.name === '.git' ||
        entry.name === '.expo' ||
        entry.name === 'dist' ||
        entry.name === 'build' ||
        entry.name === '.system_generated' ||
        entry.name === '.agents' ||
        entry.name === 'coverage'
      ) {
        continue;
      }

      if (entry.isDirectory()) {
        getAllFiles(fullPath, fileList, maxFiles);
      } else {
        fileList.push(fullPath);
      }
    }
  } catch (_e) {
    // Ignore permissions or access errors
  }

  return fileList;
}

function runAudit(projectDir, options = {}) {
  const pkgPath = path.join(projectDir, 'package.json');
  let pkg = {};
  if (fs.existsSync(pkgPath)) {
    try {
      pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    } catch (_e) {
      // Ignore invalid JSON
    }
  }

  const appJsonPath = path.join(projectDir, 'app.json');
  let appConfig = {};
  if (fs.existsSync(appJsonPath)) {
    try {
      appConfig = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));
    } catch (_e) {
      // Ignore invalid JSON
    }
  }

  // Phase 1.6: Project-type guard
  const hasExpoDep = Boolean(pkg.dependencies?.expo || pkg.devDependencies?.expo);
  const hasRnDep = Boolean(pkg.dependencies?.['react-native'] || pkg.devDependencies?.['react-native']);
  const hasAppJson = fs.existsSync(appJsonPath);
  const hasAndroidDir = fs.existsSync(path.join(projectDir, 'android'));
  const hasIosDir = fs.existsSync(path.join(projectDir, 'ios'));

  if (!hasExpoDep && !hasRnDep && !hasAppJson && !hasAndroidDir && !hasIosDir) {
    throw new Error(
      `No mobile project detected in "${projectDir}".\n` +
      `Project must contain an Expo/React Native dependency, an app.json configuration, or an android/ios directory.\n` +
      `Use --dir <path> to specify the mobile app root directory.`
    );
  }

  const allFiles = getAllFiles(projectDir, [], 350);
  const relativeFiles = allFiles.map(f => path.relative(projectDir, f).replace(/\\/g, '/'));

  const fileCache = new Map();
  function readFile(relPath) {
    if (fileCache.has(relPath)) return fileCache.get(relPath);
    const fullPath = path.join(projectDir, relPath);
    if (!fs.existsSync(fullPath)) return '';
    try {
      const content = fs.readFileSync(fullPath, 'utf8');
      fileCache.set(relPath, content);
      return content;
    } catch (_e) {
      return '';
    }
  }

  const ctx = {
    projectDir,
    pkg,
    appConfig,
    files: relativeFiles,
    readFile
  };

  const appleResults = auditApple(ctx);
  const googleResults = auditGoogle(ctx);
  const uxResults = auditUx(ctx);
  const perfResults = auditPerformance(ctx);
  const secResults = auditSecurity(ctx);

  const allResults = [
    ...appleResults,
    ...googleResults,
    ...uxResults,
    ...perfResults,
    ...secResults,
  ];

  const scoreData = computeScore(allResults);
  if (!options.silent) {
    renderReport(scoreData, options);
  }

  return {
    scoreData,
    ctx
  };
}

module.exports = { runAudit };
