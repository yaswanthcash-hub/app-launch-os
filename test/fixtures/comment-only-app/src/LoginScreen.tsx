import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useHaptic } from '../hooks/useHaptic';

// NOTE: Deprecated SMS OTP verification flow.
// We used to send an SMS phone verification code here:
// const res = await auth.signInWithPhoneNumber('+1234567890');
// but we removed phone SMS auth in favor of native guest and passkey mode!
// Reviewers do not need any SMS verification code to test this build.

export function LoginScreen() {
  const { lightImpact } = useHaptic();

  const handleGuestLogin = () => {
    lightImpact();
  };

  return (
    <View>
      <TouchableOpacity
        accessibilityLabel="Sign in as Guest"
        onPress={handleGuestLogin}
      >
        <Text>Sign in as Guest</Text>
      </TouchableOpacity>
    </View>
  );
}
