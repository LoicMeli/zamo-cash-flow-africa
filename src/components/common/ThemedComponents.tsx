import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
  TextInputProps,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { COLORS } from '../../theme/colors';

// Themed Button
interface ThemedButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  fullWidth?: boolean;
  textStyle?: TextStyle;
  containerStyle?: ViewStyle;
}

export const ThemedButton: React.FC<ThemedButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  fullWidth = false,
  textStyle,
  containerStyle,
  disabled,
  ...rest
}) => {
  const { colors, isDarkMode } = useTheme();
  
  // Determine background color based on variant
  let backgroundColor;
  let textColor = '#FFFFFF';
  let borderColor;
  
  switch (variant) {
    case 'primary':
      backgroundColor = COLORS.primary;
      break;
    case 'secondary':
      backgroundColor = isDarkMode ? '#333' : '#E5E7EB';
      textColor = isDarkMode ? '#FFF' : '#333';
      break;
    case 'outline':
      backgroundColor = 'transparent';
      textColor = COLORS.primary;
      borderColor = COLORS.primary;
      break;
    case 'danger':
      backgroundColor = COLORS.danger;
      break;
    default:
      backgroundColor = COLORS.primary;
  }
  
  // Determine size
  let paddingVertical;
  let fontSize;
  
  switch (size) {
    case 'small':
      paddingVertical = 8;
      fontSize = 14;
      break;
    case 'large':
      paddingVertical = 16;
      fontSize = 18;
      break;
    default:
      paddingVertical = 12;
      fontSize = 16;
  }
  
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: disabled ? colors.disabled : backgroundColor,
          paddingVertical,
          width: fullWidth ? '100%' : undefined,
          borderColor: borderColor,
          borderWidth: variant === 'outline' ? 1 : 0,
          opacity: disabled ? 0.7 : 1,
        },
        containerStyle,
      ]}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <Text
          style={[
            styles.buttonText,
            {
              color: textColor,
              fontSize,
            },
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

// Themed Input
interface ThemedInputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
}

export const ThemedInput: React.FC<ThemedInputProps> = ({
  label,
  error,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  placeholder,
  ...rest
}) => {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.inputContainer, containerStyle]}>
      {label && (
        <Text style={[styles.inputLabel, { color: colors.text }, labelStyle]}>
          {label}
        </Text>
      )}
      
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.input,
            color: colors.text,
            borderColor: error ? COLORS.danger : colors.border,
          },
          inputStyle,
        ]}
        placeholderTextColor={colors.textSecondary}
        placeholder={placeholder}
        {...rest}
      />
      
      {error && (
        <Text style={[styles.errorText, errorStyle]}>
          {error}
        </Text>
      )}
    </View>
  );
};

// Themed Card
interface ThemedCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const ThemedCard: React.FC<ThemedCardProps> = ({ children, style }) => {
  const { colors } = useTheme();
  
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

// Themed Divider
interface ThemedDividerProps {
  style?: ViewStyle;
}

export const ThemedDivider: React.FC<ThemedDividerProps> = ({ style }) => {
  const { colors } = useTheme();
  
  return (
    <View
      style={[
        styles.divider,
        {
          backgroundColor: colors.divider,
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    fontWeight: '600',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: 12,
    marginTop: 4,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    width: '100%',
    marginVertical: 16,
  },
}); 