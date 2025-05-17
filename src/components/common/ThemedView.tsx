
import React from 'react';
import { Text, View, TextProps, ViewProps } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

interface ThemedTextProps extends TextProps {
  secondary?: boolean;
}

export const ThemedText: React.FC<ThemedTextProps> = ({ 
  style, 
  secondary, 
  children, 
  ...props 
}) => {
  const { colors } = useTheme();
  
  return (
    <Text 
      style={[
        { color: secondary ? colors.textSecondary : colors.text },
        style
      ]} 
      {...props}
    >
      {children}
    </Text>
  );
};

export const ThemedView: React.FC<ViewProps> = ({ 
  style, 
  children, 
  ...props 
}) => {
  const { colors } = useTheme();
  
  return (
    <View 
      style={[
        { backgroundColor: colors.background },
        style
      ]} 
      {...props}
    >
      {children}
    </View>
  );
};
