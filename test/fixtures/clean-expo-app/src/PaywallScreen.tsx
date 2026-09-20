import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export function PaywallScreen() {
  const restorePurchases = async () => {
    // Restore transactions
  };

  return (
    <View>
      <Text>Annual Subscription: $49.99/year with a 7-day free trial. Recurring billing, cancel anytime.</Text>
      <TouchableOpacity
        accessibilityLabel="Restore In-App Purchases"
        onPress={restorePurchases}
      >
        <Text>Restore Purchases</Text>
      </TouchableOpacity>
      <Text>Terms of Service & Privacy Policy</Text>
    </View>
  );
}
