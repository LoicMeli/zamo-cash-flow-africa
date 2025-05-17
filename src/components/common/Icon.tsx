
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

// This provides a fallback component for icons
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

// Mock for specific icon sets - these are similar to what @expo/vector-icons would provide
export const Ionicons = (name: string, size: number, options: { color: string }) => (
  <Icon name={name} size={size} color={options.color} />
);

// For compatibility with @expo/vector-icons imports
const ExpoVectorIcons = {
  Ionicons,
  // Add other icon sets as needed
  MaterialIcons: Ionicons,
  FontAwesome: Ionicons,
  Feather: Ionicons,
  MaterialCommunityIcons: Ionicons,
  SimpleLineIcons: Ionicons,
  AntDesign: Ionicons,
  Entypo: Ionicons,
}

export default ExpoVectorIcons;

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  icon: {
    textAlign: 'center',
  }
});
