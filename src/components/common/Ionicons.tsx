
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Icon, IconProps } from './Icon';

export const Ionicons = {
  name: function(name: string, size: number, { color }: { color: string }) {
    return <Icon name={name} size={size} color={color} />;
  }
};

export default Ionicons;
