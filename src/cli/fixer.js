/**
 * App Launch OS — Safe Fixer Engine (`app-launch-os fix`)
 * Scaffolds compliant configurations, generated privacy manifests, and haptic hooks.
 * Dry-run by default. Requires --write to modify disk.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m'
};

function generateUnifiedDiff(relPath, oldText, newText) {
  const oldLines = oldText ? oldText.split('\n') : [];
  const newLines = newText ? newText.split('\n') : [];
  const lines = [];

  lines.push(`${c.bold}--- a/${relPath}${c.reset}`);
  lines.push(`${c.bold}+++ b/${relPath}${c.reset}`);

  if (oldLines.length === 0) {
    lines.push(`${c.cyan}@@ -0,0 +1,${newLines.length} @@${c.reset}`);
    for (const line of newLines) {
      lines.push(`${c.green}+${line}${c.reset}`);
    }
  } else {
    // Generate line-level unified diff
    lines.push(`${c.cyan}@@ -1,${oldLines.length} +1,${newLines.length} @@${c.reset}`);
    const max = Math.max(oldLines.length, newLines.length);
    for (let i = 0; i < max; i++) {
      const o = oldLines[i];
      const n = newLines[i];
      if (o === n) {
        lines.push(` ${o || ''}`);
      } else {
        if (o !== undefined) lines.push(`${c.red}-${o}${c.reset}`);
        if (n !== undefined) lines.push(`${c.green}+${n}${c.reset}`);
      }
    }
  }

  return lines.join('\n');
}

function generatePrivacyManifest(deps) {
  const accessedTypes = [];

  // File Timestamps (e.g. AsyncStorage, FileSystem, SQLite)
  if (['@react-native-async-storage/async-storage', 'expo-file-system', 'react-native-fs', 'realm', 'expo-sqlite'].some(d => deps[d])) {
    accessedTypes.push({
      type: 'NSPrivacyAccessedAPICategoryFileTimestamp',
      reasons: ['C617.1']
    });
  }

  // System Boot Time (e.g. device info, telemetry)
  if (['expo-device', 'react-native-device-info', 'expo-application'].some(d => deps[d])) {
    accessedTypes.push({
      type: 'NSPrivacyAccessedAPICategorySystemBootTime',
      reasons: ['35F9.1']
    });
  }

  // Disk Space (e.g. file caching)
  if (['expo-file-system', 'react-native-fs', 'expo-device'].some(d => deps[d])) {
    accessedTypes.push({
      type: 'NSPrivacyAccessedAPICategoryDiskSpace',
      reasons: ['E174.1']
    });
  }

  // User Defaults (e.g. preferences, persistent storage)
  if (['@react-native-async-storage/async-storage', 'expo-secure-store', 'react-native-mmkv'].some(d => deps[d])) {
    accessedTypes.push({
      type: 'NSPrivacyAccessedAPICategoryUserDefaults',
      reasons: ['CA92.1']
    });
  }

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">\n<plist version="1.0">\n<dict>\n\t<key>NSPrivacyTracking</key>\n\t<false/>\n\t<key>NSPrivacyCollectedDataTypes</key>\n\t<array/>\n\t<key>NSPrivacyTrackingDomains</key>\n\t<array/>\n\t<key>NSPrivacyAccessedAPITypes</key>\n\t<array>\n`;

  for (const entry of accessedTypes) {
    xml += `\t\t<dict>\n\t\t\t<key>NSPrivacyAccessedAPIType</key>\n\t\t\t<string>${entry.type}</string>\n\t\t\t<key>NSPrivacyAccessedAPITypeReasons</key>\n\t\t\t<array>\n`;
    for (const r of entry.reasons) {
      xml += `\t\t\t\t<string>${r}</string>\n`;
    }
    xml += `\t\t\t</array>\n\t\t</dict>\n`;
  }

  xml += `\t</array>\n</dict>\n</plist>\n`;
  return xml;
}

function runFixer({ projectDir, pkg, files, repoRootDir, write = false, yes = false }) {
  console.log('\n' + c.bold + c.cyan + '🚀 App Launch OS — Fix Engine' + c.reset);
  console.log(c.dim + (write ? 'Writing safe configurations to disk...\n' : 'Dry-run mode (pass --write to apply changes)...\n') + c.reset);

  if (write) {
    try {
      const gitStatus = execSync('git status --porcelain', {
        cwd: projectDir,
        stdio: ['ignore', 'pipe', 'ignore'],
        encoding: 'utf8'
      }).trim();

      if (gitStatus && !yes) {
        console.error(`${c.red}❌ Error: Git working tree in "${projectDir}" is dirty.${c.reset}`);
        console.error(`${c.dim}Commit or stash your changes before running with --write, or pass --yes to proceed.${c.reset}\n`);
        process.exit(1);
      }
    } catch (_e) {
      // Not a git repository or git unavailable; proceed
    }
  }

  const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
  const pendingChanges = [];
  let generatedPrivacy = false;

  // 1. Scaffold tailored PrivacyInfo.xcprivacy based on detected dependencies
  const hasPrivacy = files.some(f => /PrivacyInfo\.xcprivacy$/i.test(f));
  if (!hasPrivacy) {
    const targetIosDir = path.join(projectDir, 'ios');
    const targetFile = path.join(targetIosDir, 'PrivacyInfo.xcprivacy');
    const content = generatePrivacyManifest(deps);
    pendingChanges.push({
      targetFile,
      relPath: 'ios/PrivacyInfo.xcprivacy',
      oldContent: '',
      newContent: content,
      description: 'Scaffold tailored 2026 Apple Privacy Manifest at ios/PrivacyInfo.xcprivacy'
    });
    generatedPrivacy = true;
  }

  // 2. Scaffold useHaptic hook if missing
  const hasHapticHook = files.some(f => /useHaptic\.(ts|tsx|js)$/i.test(f));
  if (!hasHapticHook) {
    const hooksDir = path.join(projectDir, 'hooks');
    const targetHook = path.join(hooksDir, 'useHaptic.ts');
    const templateHook = path.join(repoRootDir, 'modules/M17-premium-ux/src/hooks/useHaptic.ts');

    if (fs.existsSync(templateHook)) {
      const hookContent = fs.readFileSync(templateHook, 'utf8');
      pendingChanges.push({
        targetFile: targetHook,
        relPath: 'hooks/useHaptic.ts',
        oldContent: '',
        newContent: hookContent,
        description: 'Inject 5-state physical haptic feedback hook at hooks/useHaptic.ts'
      });
    }
  }

  // 3. Update app.json targetSdkVersion to 36 if using Expo
  const appJsonPath = path.join(projectDir, 'app.json');
  if (fs.existsSync(appJsonPath)) {
    try {
      const rawContent = fs.readFileSync(appJsonPath, 'utf8');
      const content = JSON.parse(rawContent);
      if (content.expo) {
        if (!content.expo.android) content.expo.android = {};
        if (content.expo.android.targetSdkVersion !== 36) {
          content.expo.android.targetSdkVersion = 36;
          const newContent = JSON.stringify(content, null, 2) + '\n';
          pendingChanges.push({
            targetFile: appJsonPath,
            relPath: 'app.json',
            oldContent: rawContent,
            newContent,
            description: 'Update app.json targetSdkVersion to 36 (Android 16 requirement)'
          });
        }
      }
    } catch (_e) {
      // Ignore JSON parse errors
    }
  }

  if (pendingChanges.length === 0) {
    console.log(c.green + '✔ No automated file fixes required. Codebase configuration is up to date.' + c.reset + '\n');
    return;
  }

  // Print unified diff for all pending changes
  console.log(c.bold + 'Proposed File Changes:' + c.reset);
  for (const change of pendingChanges) {
    console.log(`\n${c.cyan}• ${change.description}${c.reset}`);
    const diff = generateUnifiedDiff(change.relPath, change.oldContent, change.newContent);
    console.log(diff);
  }

  if (!write) {
    console.log(`\n${c.yellow}ℹ️ Dry-run mode: No files were modified on disk.${c.reset}`);
    console.log(`${c.dim}To apply these changes, rerun with ${c.bold}--write${c.reset}${c.dim}.${c.reset}\n`);
  } else {
    // Write changes to disk
    for (const change of pendingChanges) {
      const dir = path.dirname(change.targetFile);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(change.targetFile, change.newContent, 'utf8');
    }
    console.log(`\n${c.green}✔ Successfully applied ${pendingChanges.length} change(s) to disk.${c.reset}\n`);

    if (generatedPrivacy) {
      console.log(`${c.yellow}⚠️ WARNING: The generated PrivacyInfo.xcprivacy was inferred from declared dependencies.`);
      console.log(`Review and verify all declared reason codes against actual runtime API usage prior to App Store submission.${c.reset}\n`);
    }
  }

  // AI Coding Agent prompt recipe for remaining complex refactors
  console.log(c.bold + '🤖 AI Agent Prompt for Remaining Refactors:' + c.reset);
  console.log(c.dim + 'Copy & paste this prompt into Claude Code, Cursor, or Google Antigravity:\n' + c.reset);

  const prompt = `Act as an Autonomous Mobile Release Engineer from App Launch OS.
Please inspect my mobile app codebase and resolve all remaining audit findings:
1. Ensure test/demo reviewer credentials work without external phone/SMS OTP (Guideline 2.1).
2. Verify all paywall components feature a working "Restore Purchases" button and clear recurring billing terms.
3. Replace naked <ActivityIndicator /> spinners with skeleton loaders.
4. Verify all pressable cards adhere to the Corner Concentricity formula (R_inner = max(0, R_outer - Padding)).
Test and verify all changes.`;

  console.log(c.cyan + prompt + c.reset + '\n');
}

module.exports = { runFixer };
