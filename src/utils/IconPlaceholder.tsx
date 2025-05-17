
import React from 'react';
import { Text } from 'react-native';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  style?: any;
}

// This is a placeholder component for Ionicons and other @expo/vector-icons
// In a real implementation, you'd use the actual icons
export const Icon: React.FC<IconProps> = ({ name, size = 24, color = '#000', style }) => {
  return (
    <Text style={[{ fontSize: size, color }, style]}>
      {name.charAt(0).toUpperCase()}
    </Text>
  );
};
