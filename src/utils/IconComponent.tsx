
import React from 'react';
import { Text, StyleSheet } from 'react-native';

// This provides a fallback for all Ionicons usages
export interface IconProps {
  name: string;
  size?: number;
  color?: string;
  style?: any;
}

export const Icon: React.FC<IconProps> = ({ 
  name, 
  size = 24, 
  color = '#000', 
  style 
}) => {
  // Simple fallback that shows the first character of the icon name
  return (
    <Text style={[styles.icon, { fontSize: size, color }, style]}>
      {name.charAt(0).toUpperCase()}
    </Text>
  );
};

// Mock for specific Ionicons components
export const Ionicons = {
  name: (name: string, size: number, { color }: { color: string }) => (
    <Icon name={name} size={size} color={color} />
  )
};

export default {
  Ionicons,
  Icon
};

const styles = StyleSheet.create({
  icon: {
    textAlign: 'center',
  }
});
