import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export function Paywall() {
  const restorePurchases = async () => {
    // Restore transactions
  };

  return (
    <View>
      <Text>Annual Plan: $39.99/year. Recurring billing, cancel anytime.</Text>
      <TouchableOpacity
        accessibilityLabel="Restore Purchases"
        onPress={restorePurchases}
      >
        <Text>Restore Purchases</Text>
      </TouchableOpacity>
      <Text>Terms of Service and Privacy Policy</Text>
    </View>
  );
}
