---
name: applaunchos-security
description: Implement mobile biometric auth hooks, hardware Keychain/Keystore secure storage, and threat modeling.
---

Enforce zero-trust mobile security and hardware-backed credential storage.

## Security Baseline

1. **Hardware Keychain / Keystore:**
   - Store access tokens, session keys, and refresh tokens using `expo-secure-store` (backed by iOS Keychain and Android Keystore).
   - Never store sensitive credentials in plaintext `AsyncStorage` or unencrypted SQLite databases.
2. **Biometric Authentication:**
   - Use `expo-local-authentication` to support Face ID / Touch ID / Biometric Prompt with device passcode fallback.
3. **In-App Account Deletion Flow:**
   - Provide an authenticated endpoint call to purge user data server-side and clear local hardware storage upon completion.
