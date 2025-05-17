
import React from 'react';
import { TextInput, View, Text, StyleSheet, TextInputProps } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, style, ...props }) => {
  const { colors } = useTheme();
  
  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, { color: colors.text }]}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          { borderColor: colors.border, color: colors.text },
          error && { borderColor: '#FF3B30' },
          style,
        ]}
        placeholderTextColor={colors.textSecondary}
        {...props}
      />
      {error && <Text style={[styles.errorText, { color: '#FF3B30' }]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
});
