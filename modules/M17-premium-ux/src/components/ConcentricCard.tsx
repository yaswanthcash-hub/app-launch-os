import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { getConcentricRadius } from '../utils/concentricity';

export interface ConcentricCardProps extends ViewProps {
  outerRadius?: number;
  padding?: number;
  children: (innerRadius: number) => React.ReactNode;
}

/**
 * ConcentricCard enforces the Golden Concentricity Formula:
 * R_inner = max(0, R_outer - Padding)
 *
 * It passes the computed `innerRadius` to its children via render prop
 * so nested media, buttons, or sub-cards align seamlessly.
 */
export function ConcentricCard({
  outerRadius = 24,
  padding = 16,
  style,
  children,
  ...props
}: ConcentricCardProps) {
  const innerRadius = getConcentricRadius(outerRadius, padding);

  return (
    <View
      style={[
        styles.card,
        {
          borderRadius: outerRadius,
          padding,
        },
        style,
      ]}
      {...props}
    >
      {children(innerRadius)}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E293B',
    overflow: 'hidden',
  },
});
