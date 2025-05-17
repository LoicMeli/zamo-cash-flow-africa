import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, ThemeMode } from '../theme/ThemeContext';

interface ThemeSelectorProps {
  containerStyle?: object;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ containerStyle }) => {
  const { themeMode, setThemeMode, colors } = useTheme();

  const options: { value: ThemeMode; label: string; icon: string }[] = [
    { value: 'system', label: 'Système', icon: 'phone-portrait-outline' },
    { value: 'light', label: 'Clair', icon: 'sunny-outline' },
    { value: 'dark', label: 'Sombre', icon: 'moon-outline' },
  ];

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.title, { color: colors.text }]}>Thème</Text>
      
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.option,
              themeMode === option.value && [styles.selectedOption, { borderColor: COLORS.primary }],
              { backgroundColor: colors.card, borderColor: colors.border }
            ]}
            onPress={() => setThemeMode(option.value)}
          >
            <Ionicons
              name={option.icon as any}
              size={24}
              color={themeMode === option.value ? COLORS.primary : colors.icon}
              style={styles.optionIcon}
            />
            <Text
              style={[
                styles.optionLabel,
                { color: themeMode === option.value ? COLORS.primary : colors.text }
              ]}
            >
              {option.label}
            </Text>
            {themeMode === option.value && (
              <Ionicons name="checkmark-circle" size={18} color={COLORS.primary} style={styles.checkIcon} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// Import primary color
import { COLORS } from '../theme/colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  optionsContainer: {
    width: '100%',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
  },
  selectedOption: {
    borderWidth: 2,
  },
  optionIcon: {
    marginRight: 12,
  },
  optionLabel: {
    fontSize: 15,
    fontWeight: '500',
    flex: 1,
  },
  checkIcon: {
    marginLeft: 8,
  },
}); 