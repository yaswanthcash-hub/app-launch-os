import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export function PaywallScreen() {
  const buy = () => {};

  return (
    <View>
      <Text>Upgrade to Pro</Text>
      <TouchableOpacity onPress={buy}>
        <Text>Buy Now $99</Text>
      </TouchableOpacity>
    </View>
  );
}
