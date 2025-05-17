
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '../../components/common/Icon';
import { ThemedView, ThemedText } from '../../components/common/ThemedView';
import { ThemedButton } from '../../components/common/ThemedComponents';
import { RootStackParamList } from '../../types/navigation';
import { useTheme } from '../../theme/ThemeContext';
import { COLORS } from '../../theme/colors';

type LanguageScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Language = 'fr' | 'en' | 'pidgin' | 'camfranglais';

interface LanguageOption {
  code: Language;
  name: string;
}

const languages: LanguageOption[] = [
  { code: 'fr', name: 'Français' },
  { code: 'en', name: 'English' },
  { code: 'pidgin', name: 'Pidgin' },
  { code: 'camfranglais', name: 'Camfranglais' },
];

export const LanguageSettings: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('fr');
  const navigation = useNavigation<LanguageScreenNavigationProp>();
  const { colors } = useTheme();

  const handleSave = () => {
    // Save language preference
    navigation.goBack();
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <ThemedText style={styles.title}>Choisissez votre langue</ThemedText>
        
        <View style={styles.optionsContainer}>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.option,
                selectedLanguage === lang.code && [styles.selectedOption, { borderColor: COLORS.primary }],
                { backgroundColor: colors.card, borderColor: colors.border }
              ]}
              onPress={() => setSelectedLanguage(lang.code)}
            >
              <ThemedText style={styles.optionLabel}>{lang.name}</ThemedText>
              {selectedLanguage === lang.code && (
                <Icon name="checkmark-circle" size={24} color={COLORS.primary} />
              )}
            </TouchableOpacity>
          ))}
        </View>
        
        <ThemedButton
          title="Sauvegarder"
          onPress={handleSave}
          containerStyle={styles.saveButton}
        />
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  optionsContainer: {
    marginBottom: 32,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  selectedOption: {
    borderWidth: 2,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '500' as "500",
  },
  saveButton: {
    marginTop: 16,
  },
});

export default LanguageSettings;
