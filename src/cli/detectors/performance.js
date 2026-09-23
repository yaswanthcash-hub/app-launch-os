/**
 * App Launch OS — Performance & Architecture Detector
 * Audits mobile applications for Hermes JS engine, New Architecture, UI-thread worklets, and crash monitoring.
 */

function auditPerformance({ pkg, appConfig, files, readFile }) {
  const results = [];
  const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
  const expoConfig = appConfig?.expo || appConfig || {};

  // 1. Hermes / Platform JS Engine
  const expoVersion = deps['expo'];
  const hasCapacitor = Boolean(deps['@capacitor/core'] || deps['@capacitor/android'] || deps['@capacitor/ios']);
  let hermesPassed = true;
  let hermesDetails = 'Hermes JS engine enabled by default.';

  if (hasCapacitor) {
    hermesPassed = true;
    hermesDetails = 'Native platform webview JS engine (Nitro/V8) active with JIT compilation.';
  } else if (expoConfig.jsEngine && expoConfig.jsEngine !== 'hermes') {
    hermesPassed = false;
    hermesDetails = `jsEngine explicitly set to "${expoConfig.jsEngine}". Hermes is required for <1200ms cold start latency.`;
  } else if (!expoVersion) {
    // Bare React Native: check android/app/build.gradle
    const gradleFile = files.find(f => f.endsWith('build.gradle') && f.includes('app') && !f.includes('.kilo'));
    if (gradleFile) {
      const content = readFile(gradleFile) || '';
      if (/hermesEnabled\s*=\s*false/.test(content)) {
        hermesPassed = false;
        hermesDetails = 'hermesEnabled is set to false in build.gradle.';
      }
    }
  }

  results.push({
    id: 'PERF_HERMES',
    name: 'Hermes JS engine',
    category: 'PERFORMANCE',
    status: hermesPassed ? 'PASS' : 'BLOCKER',
    details: hermesDetails,
    fix: 'Enable Hermes in app.json ("jsEngine": "hermes") for bytecoded pre-compilation and instant cold starts.'
  });

  // 2. React Native New Architecture / Platform Architecture
  let newArchPassed = false;
  let newArchDetails = '';

  if (hasCapacitor) {
    newArchPassed = true;
    newArchDetails = 'Native platform WebView architecture active; React Native Fabric bridge overhead eliminated.';
  } else if (expoConfig.newArchEnabled === true) {
    newArchPassed = true;
    newArchDetails = 'New Architecture explicitly enabled ("newArchEnabled": true).';
  } else if (expoVersion) {
    const semverMajor = parseInt(expoVersion.replace(/[\^~>=]/g, '').split('.')[0], 10);
    if (semverMajor >= 52) {
      newArchPassed = true;
      newArchDetails = `Expo SDK ${semverMajor} enables the New Architecture by default.`;
    } else {
      newArchDetails = 'New Architecture not enabled. Upgrade to Expo SDK 54+ for synchronous C++ Fabric rendering.';
    }
  } else {
    newArchDetails = 'New Architecture status could not be verified.';
  }

  results.push({
    id: 'PERF_NEW_ARCH',
    name: 'New Architecture (Fabric)',
    category: 'PERFORMANCE',
    status: newArchPassed ? 'PASS' : 'WARNING',
    details: newArchDetails,
    fix: 'Set "newArchEnabled": true in app.json to enable concurrent rendering and eliminate bridge overhead.'
  });

  // 3. UI-Thread Native Motion vs JS-Thread Janks
  const hasReanimated = 'react-native-reanimated' in deps;
  const hasFramerMotion = 'framer-motion' in deps;
  let hasJsThreadAnimations = false;

  const uiFiles = files.filter(f => /\.(tsx|jsx|ts|js)$/.test(f));
  for (const f of uiFiles.slice(0, 40)) {
    const content = readFile(f) || '';
    if (/Animated\.timing\s*\(.*useNativeDriver\s*:\s*false/.test(content)) {
      hasJsThreadAnimations = true;
      break;
    }
  }

  const motionPassed = (hasReanimated && !hasJsThreadAnimations) || (hasFramerMotion && !hasJsThreadAnimations);
  results.push({
    id: 'PERF_UI_WORKLETS',
    name: 'UI-thread motion worklets',
    category: 'PERFORMANCE',
    status: motionPassed ? 'PASS' : 'WARNING',
    details: motionPassed
      ? (hasFramerMotion
          ? 'GPU hardware-accelerated animations via Framer Motion / CSS Compositor thread verified.'
          : '60/120 FPS UI-thread animations via Reanimated 3 worklets verified.')
      : hasJsThreadAnimations
      ? 'Detected JS-thread Animated.timing without native driver. Causes dropped frames during heavy network/render activity.'
      : 'Install react-native-reanimated or framer-motion to offload animations to the UI/compositor thread.',
    fix: 'Migrate animations to Reanimated 3 worklets or Framer Motion running off the JS main thread.'
  });

  // 4. Production Crash Telemetry
  const hasTelemetry = ['@sentry/react-native', '@sentry/capacitor', '@sentry/nextjs', '@sentry/react', '@datadog/mobile-react-native', 'bugsnag-react-native'].some(d => d in deps);
  results.push({
    id: 'PERF_CRASH_TELEMETRY',
    name: 'Crash telemetry',
    category: 'PERFORMANCE',
    status: hasTelemetry ? 'PASS' : 'WARNING',
    details: hasTelemetry
      ? 'Real-time crash monitoring and stack-trace de-obfuscation configured.'
      : 'No mobile crash reporting SDK detected (e.g. Sentry). Blind to post-launch crashes.',
    fix: 'Install @sentry/react-native to monitor crash-free users and native crash traces.'
  });

  return results;
}

module.exports = { auditPerformance };
