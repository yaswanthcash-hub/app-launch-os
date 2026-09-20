import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

export function HomeScreen() {
  const animatedStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      opacity: withSpring(1),
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <Text>Welcome Home</Text>
      <TouchableOpacity
        accessibilityLabel="Explore Features"
        onPress={() => {}}
      >
        <Text>Explore</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
