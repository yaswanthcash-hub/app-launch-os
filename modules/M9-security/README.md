# M9: Mobile Security Baseline Kit

> **Mobile application security baseline helpers, hardware biometric authentication, and Keychain storage.**
> Part of [App Launch OS](../../README.md).

---

## 🛡️ Mobile Security Baseline Protection (MASVS)

Storing API tokens or session credentials in plain `AsyncStorage` is a catastrophic security vulnerability on mobile:
- **Android**: `AsyncStorage` writes unencrypted SQLite databases into sandbox storage accessible to rooted devices and backup exploits.
- **iOS**: Unencrypted files can be dumped via unencrypted iTunes backups.

`@app-launch-os/security` adheres strictly to **OWASP Mobile Application Security Verification Standard (MASVS v2.1)**:
1. **Hardware-Backed Storage (`secureStorage`)**: Encrypts data with AES-256 GCM using the iOS Keychain (`kSecAttrAccessibleWhenUnlockedThisDeviceOnly`) and Android Keystore.
2. **Biometric Authentication (`useBiometrics`)**: Simple, robust hook for Face ID, Touch ID, and Android BiometricPrompt with passcode fallback.
3. **Session Purge**: Synchronous wiping of all local auth tokens during account deletion or logout.

---

## 📦 Installation

```bash
npm install @app-launch-os/security
npx expo install expo-secure-store expo-local-authentication
```

---

## 🚀 Quickstart

### 1. Store and Retrieve Sensitive Tokens Securely

```ts
import { secureStorage } from '@applaunchos/security';

// Store user auth token safely
await secureStorage.setItem('auth_token', 'eyJhbGciOiJIUzI1Ni...');

// Retrieve token
const token = await secureStorage.getItem('auth_token');

// Purge completely on logout / account deletion
await secureStorage.purgeSession(['auth_token', 'refresh_token', 'user_profile']);
```

### 2. Protect Actions with Biometric Authentication

```tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useBiometrics } from '@applaunchos/security';

export function SecuritySettings() {
  const { isHardwareAvailable, isEnrolled, supportedTypes, authenticate } = useBiometrics();

  const handleUnlockVault = async () => {
    const result = await authenticate('Confirm your identity to access secret notes');
    if (result.success) {
      console.log('Access granted');
    } else {
      console.warn('Biometric failed:', result.error);
    }
  };

  return (
    <View>
      <Text>Supported: {supportedTypes.join(', ') || 'None'}</Text>
      {isHardwareAvailable && isEnrolled && (
        <TouchableOpacity onPress={handleUnlockVault}>
          <Text>Unlock with {supportedTypes[0] || 'Biometrics'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
```

---

## 🔗 Related Resources

- [Security Baseline Checklist](../../checklists/security-baseline.md)
- [Threat Model Template](../../templates/threat-model.md)
