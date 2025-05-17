
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
// Replace Ionicons with a simpler approach for now
import { useTheme, ThemeMode } from '../theme/ThemeContext';

interface ThemeSelectorProps {
  containerStyle?: object;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ containerStyle }) => {
  const { themeMode, setThemeMode, colors } = useTheme();

  const options: { value: ThemeMode; label: string; icon: string }[] = [
    { value: 'system', label: 'Système', icon: '📱' },
    { value: 'light', label: 'Clair', icon: '☀️' },
    { value: 'dark', label: 'Sombre', icon: '🌙' },
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
              themeMode === option.value && [styles.selectedOption, { borderColor: colors.primary }],
              { backgroundColor: colors.card, borderColor: colors.border }
            ]}
            onPress={() => setThemeMode(option.value)}
          >
            <Text style={styles.optionIcon}>{option.icon}</Text>
            <Text
              style={[
                styles.optionLabel,
                { color: themeMode === option.value ? colors.primary : colors.text }
              ]}
            >
              {option.label}
            </Text>
            {themeMode === option.value && (
              <Text style={[styles.checkIcon, { color: colors.primary }]}>✓</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

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
    fontSize: 22,
  },
  optionLabel: {
    fontSize: 15,
    fontWeight: '500',
    flex: 1,
  },
  checkIcon: {
    marginLeft: 8,
    fontSize: 18,
  },
});
