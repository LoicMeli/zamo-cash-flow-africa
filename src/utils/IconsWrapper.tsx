
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

// This provides a fallback component for Ionicons
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
  return (
    <View style={[styles.iconContainer, { width: size, height: size }, style]}>
      <Text style={[styles.icon, { fontSize: size / 2, color }]}>
        {name.charAt(0).toUpperCase()}
      </Text>
    </View>
  );
};

export const Ionicons = {
  name: (name: string, size: number, { color }: { color: string }) => (
    <Icon name={name} size={size} color={color} />
  )
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    textAlign: 'center',
  }
});

export default { Ionicons, Icon };
