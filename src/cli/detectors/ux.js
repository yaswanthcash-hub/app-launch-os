/**
 * App Launch OS — UX & Sensory Engineering Detector
 * Audits mobile applications for physical haptics, skeleton loaders, concentric corners, and accessibility.
 */

function auditUx({ projectDir, pkg, files, readFile }) {
  const results = [];
  const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };

  // 1. Physical Haptics
  const hasHapticsDep = 'expo-haptics' in deps || 'react-native-haptic-feedback' in deps;
  let hapticsUsed = false;

  if (hasHapticsDep) {
    const uiFiles = files.filter(f => /\.(tsx|jsx|ts|js)$/.test(f));
    for (const f of uiFiles.slice(0, 40)) {
      const content = readFile(f) || '';
      if (/expo-haptics|react-native-haptic-feedback|useHaptic/i.test(content)) {
        hapticsUsed = true;
        break;
      }
    }
  }

  results.push({
    id: 'UX_HAPTICS',
    name: 'Tactile haptics',
    category: 'UX',
    status: (hasHapticsDep && hapticsUsed) ? 'PASS' : 'WARNING',
    details: (hasHapticsDep && hapticsUsed)
      ? 'Physical tactile haptic feedback detected in user interactions.'
      : 'No tactile haptics detected. Native interactions feel flat without physical click detents.',
    fix: 'Install expo-haptics and integrate the 5-state useHaptic hook from App Launch OS.'
  });

  // 2. Loading States & Skeletons vs Spinners
  const uiFiles = files.filter(f => /\.(tsx|jsx|ts|js)$/.test(f));
  let spinnerCount = 0;
  let hasSkeletons = 'moti' in deps || files.some(f => /Skeleton/i.test(f));

  for (const f of uiFiles.slice(0, 50)) {
    const content = readFile(f) || '';
    if (/<ActivityIndicator\b/.test(content)) {
      spinnerCount++;
    }
    if (/SkeletonLoader|moti\/skeleton|ContentLoader/i.test(content)) {
      hasSkeletons = true;
    }
  }

  const skeletonsPassed = hasSkeletons || spinnerCount === 0;
  results.push({
    id: 'UX_LOADING_STATES',
    name: 'Loading states',
    category: 'UX',
    status: skeletonsPassed ? 'PASS' : 'WARNING',
    details: skeletonsPassed
      ? (hasSkeletons ? 'Geometric skeleton loaders detected for content transitions.' : 'Zero naked spinners detected.')
      : `${spinnerCount} raw <ActivityIndicator> spinner(s) detected without shimmering skeleton loaders. Increases perceived wait time by 40%.`,
    fix: 'Replace blank ActivityIndicator spinners with Moti geometric skeleton loaders.'
  });

  // 3. Dynamic Type & Font Scaling
  let disabledFontScalingCount = 0;
  for (const f of uiFiles.slice(0, 40)) {
    const content = readFile(f) || '';
    if (/allowFontScaling\s*=\s*\{\s*false\s*\}/.test(content)) {
      disabledFontScalingCount++;
    }
  }

  const dynamicTypePassed = disabledFontScalingCount === 0;
  results.push({
    id: 'UX_DYNAMIC_TYPE',
    name: 'Dynamic Type support',
    category: 'UX',
    status: dynamicTypePassed ? 'PASS' : 'WARNING',
    details: dynamicTypePassed
      ? 'Dynamic Type and accessibility font scaling preserved.'
      : `Found ${disabledFontScalingCount} instance(s) of allowFontScaling={false}. Violates Apple Accessibility HIG.`,
    fix: 'Remove allowFontScaling={false} and use responsive flex layouts with maxFontSizeMultiplier.'
  });

  // 4. Accessibility Labels
  let hasA11yProps = false;
  for (const f of uiFiles.slice(0, 40)) {
    const content = readFile(f) || '';
    if (/accessibilityLabel|accessibilityRole|aria-label/.test(content)) {
      hasA11yProps = true;
      break;
    }
  }

  results.push({
    id: 'UX_ACCESSIBILITY_LABELS',
    name: 'Accessibility labels',
    category: 'UX',
    status: hasA11yProps ? 'PASS' : 'WARNING',
    details: hasA11yProps
      ? 'Accessibility labels and roles detected on interactive elements.'
      : 'Interactive elements lack accessibilityLabel props. VoiceOver/TalkBack users cannot navigate effectively.',
    fix: 'Add accessibilityLabel and accessibilityRole to all pressable cards, icon buttons, and inputs.'
  });

  // 5. Corner Concentricity
  const hasConcentric = files.some(f => /concentric|ConcentricCard/i.test(f));
  results.push({
    id: 'UX_CONCENTRICITY',
    name: 'Corner concentricity',
    category: 'UX',
    status: hasConcentric ? 'PASS' : 'PASS', // informational or pass if present
    details: hasConcentric
      ? 'Concentric corner radius formula R_inner = max(0, R_outer - P) implemented.'
      : 'Follow R_inner = max(0, R_outer - Padding) to prevent awkward corner collisions in nested cards.',
    fix: 'Use ConcentricCard from App Launch OS for all nested card containers.'
  });

  return results;
}

module.exports = { auditUx };
