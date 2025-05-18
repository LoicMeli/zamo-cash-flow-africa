
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Icon } from '../../components/common/Icon';
import { useTheme, ThemeMode } from '../../theme/ThemeContext';
import { COLORS } from '../../theme/colors';

interface ThemeSelectorProps {
  containerStyle?: object;
}

export const ThemeSettings: React.FC = () => {
  const { themeMode, setThemeMode } = useTheme();

  const options: { value: ThemeMode; label: string; icon: string }[] = [
    { value: 'system', label: 'Système', icon: '📱' },
    { value: 'light', label: 'Clair', icon: '☀️' },
    { value: 'dark', label: 'Sombre', icon: '🌙' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: COLORS.light.background }]}>
      <Text style={[styles.title, { color: COLORS.light.text }]}>Thème</Text>
      
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.option,
              themeMode === option.value && [styles.selectedOption, { borderColor: '#3B5BFE' }],
              { backgroundColor: '#F9FAFB', borderColor: '#E5E7EB' }
            ]}
            onPress={() => setThemeMode(option.value)}
          >
            <Text style={styles.optionIcon}>{option.icon}</Text>
            <Text
              style={[
                styles.optionLabel,
                { color: themeMode === option.value ? '#3B5BFE' : '#1A1A1A' }
              ]}
            >
              {option.label}
            </Text>
            {themeMode === option.value && (
              <Text style={[styles.checkIcon, { color: '#3B5BFE' }]}>✓</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
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

export default ThemeSettings;
