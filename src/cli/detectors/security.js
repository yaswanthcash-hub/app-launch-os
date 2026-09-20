/**
 * App Launch OS — Security & Data Protection Detector
 * Audits mobile applications against OWASP MASVS baseline:
 * 1. Hardcoded secrets / API keys in source
 * 2. Unencrypted auth tokens stored in AsyncStorage instead of SecureStore
 * 3. Insecure cleartext HTTP traffic / ATS exceptions
 * 4. Production debug flags / debuggable enabled
 */

const { parseCode, analyzeAst } = require('../parse');

function auditSecurity({ appConfig, files, readFile }) {
  const results = [];
  const jsFiles = files.filter(f => /\.(tsx|jsx|ts|js)$/.test(f));

  // 1. Hardcoded Secrets in Source Code
  let foundSecret = null;
  const secretPatterns = [
    { name: 'Stripe Secret Key', regex: /sk_live_[0-9a-zA-Z]{24,}/ },
    { name: 'AWS Access Key ID', regex: /AKIA[0-9A-Z]{16}/ },
    { name: 'Private Key Header', regex: /-----BEGIN (RSA|EC|OPENSSH) PRIVATE KEY-----/ },
  ];

  for (const file of jsFiles.slice(0, 100)) {
    const content = readFile(file);
    if (!content) continue;
    const ast = parseCode(content, file);
    if (!ast) continue;
    const { stringLiterals } = analyzeAst(ast);

    for (const lit of stringLiterals) {
      for (const sp of secretPatterns) {
        if (sp.regex.test(lit)) {
          foundSecret = { file, type: sp.name };
          break;
        }
      }
      if (foundSecret) break;
    }
    if (foundSecret) break;
  }

  results.push({
    id: 'SECURITY_HARDCODED_SECRETS',
    name: 'Hardcoded secrets & private keys',
    category: 'SECURITY',
    status: foundSecret ? 'BLOCKER' : 'PASS',
    details: foundSecret
      ? `Detected ${foundSecret.type} embedded in source string: ${foundSecret.file}`
      : 'No embedded production secrets or private keys detected in source code.',
    fix: 'Move all production API secret keys to server-side endpoints or secure hardware secrets managers.'
  });

  // 2. Auth Tokens in AsyncStorage vs SecureStore
  let insecureStorageFound = false;
  let insecureStorageFile = '';

  for (const file of jsFiles.slice(0, 80)) {
    const content = readFile(file);
    if (!content) continue;
    if (!content.includes('AsyncStorage') && !content.includes('setItem')) continue;

    const ast = parseCode(content, file);
    if (!ast) continue;
    const { calls } = analyzeAst(ast);

    const hasSetItem = calls.some(c =>
      c.name === 'setItem' &&
      c.stringArgs &&
      c.stringArgs.some(arg => /^(token|authToken|access_token|refresh_token|sessionToken|jwt)$/i.test(arg))
    );

    if (hasSetItem) {
      insecureStorageFound = true;
      insecureStorageFile = file;
      break;
    }
  }

  results.push({
    id: 'SECURITY_SECURE_STORAGE',
    name: 'Secure credential storage',
    category: 'SECURITY',
    status: insecureStorageFound ? 'BLOCKER' : 'PASS',
    details: insecureStorageFound
      ? `Auth token stored in unencrypted AsyncStorage in ${insecureStorageFile}. Sensitive tokens must use hardware-backed Keychain/Keystore.`
      : 'No unencrypted auth tokens detected in plain storage.',
    fix: 'Use expo-secure-store or react-native-keychain to store session tokens.'
  });

  // 3. Cleartext Traffic / ATS Exceptions
  const expoConfig = appConfig?.expo || appConfig || {};
  let cleartextAllowed = false;

  // Check Android usesCleartextTraffic
  if (expoConfig.android?.usesCleartextTraffic === true) {
    cleartextAllowed = true;
  }
  // Check iOS ATS NSAllowsArbitraryLoads
  const iosInfo = expoConfig.ios?.infoPlist || {};
  if (iosInfo.NSAppTransportSecurity?.NSAllowsArbitraryLoads === true) {
    cleartextAllowed = true;
  }

  // Check AndroidManifest.xml if present
  const manifestFile = files.find(f => f.endsWith('AndroidManifest.xml'));
  if (manifestFile) {
    const content = readFile(manifestFile);
    if (/android:usesCleartextTraffic\s*=\s*["']true["']/i.test(content)) {
      cleartextAllowed = true;
    }
  }

  results.push({
    id: 'SECURITY_CLEARTEXT_TRAFFIC',
    name: 'Cleartext HTTP traffic',
    category: 'SECURITY',
    status: cleartextAllowed ? 'BLOCKER' : 'PASS',
    details: cleartextAllowed
      ? 'Cleartext HTTP communication enabled (usesCleartextTraffic or NSAllowsArbitraryLoads). All communication must use HTTPS.'
      : 'All network transport enforces HTTPS and Apple App Transport Security (ATS).',
    fix: 'Remove usesCleartextTraffic and NSAllowsArbitraryLoads from app.json and native manifests.'
  });

  // 4. Debug Flags in Release Config
  let debugEnabled = false;
  if (expoConfig.android?.debuggable === true) {
    debugEnabled = true;
  }

  results.push({
    id: 'SECURITY_DEBUG_FLAGS',
    name: 'Release build debug flags',
    category: 'SECURITY',
    status: debugEnabled ? 'BLOCKER' : 'PASS',
    details: debugEnabled
      ? 'debuggable: true configured in release application manifest.'
      : 'Debug flags correctly disabled for release.',
    fix: 'Ensure android.debuggable is false or omitted in app.json.'
  });

  return results;
}

module.exports = { auditSecurity };
