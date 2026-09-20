import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export function AccountSettings() {
  const handleDeleteAccount = async () => {
    await fetch('/api/user/delete-account', { method: 'POST' });
  };

  return (
    <View>
      <TouchableOpacity
        accessibilityLabel="Delete Account and Purge Data"
        onPress={handleDeleteAccount}
      >
        <Text>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
}
