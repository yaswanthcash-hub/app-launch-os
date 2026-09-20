import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useHaptic } from '../hooks/useHaptic';

export function LoginScreen() {
  const { lightImpact } = useHaptic();

  const handleGuestLogin = () => {
    lightImpact();
  };

  return (
    <View>
      <TouchableOpacity
        accessibilityLabel="Sign in as Reviewer or Guest"
        onPress={handleGuestLogin}
      >
        <Text>Reviewer Demo Login</Text>
      </TouchableOpacity>
    </View>
  );
}
