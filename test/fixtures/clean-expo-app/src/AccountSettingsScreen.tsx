import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export function AccountSettingsScreen() {
  const handleDeleteAccount = async () => {
    await fetch('/api/user/delete-account', { method: 'POST' });
  };

  return (
    <View>
      <TouchableOpacity
        accessibilityLabel="Delete Account Permanently"
        onPress={handleDeleteAccount}
      >
        <Text>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
}
