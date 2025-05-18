
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Icon, IconProps } from './Icon';

// This provides a consistent interface with Expo's Ionicons
export const Ionicons = {
  name: function(name: string, size: number, { color }: { color: string }) {
    return <Icon name={name} size={size} color={color} />;
  }
};

// For direct use in components
export default Ionicons;
