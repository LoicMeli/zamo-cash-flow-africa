
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useLanguage, Language } from '../providers/LanguageProvider';

interface LanguageSelectorProps {
  pillStyle?: 'light' | 'dark';
  containerStyle?: object;
  showLocalNames?: boolean;
  compact?: boolean;
}

/**
 * A reusable language selector component that shows all available languages
 * and allows the user to switch between them.
 */
export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  pillStyle = 'dark',
  containerStyle,
  showLocalNames = false,
  compact = false,
}) => {
  const { language, setLanguage, getSupportedLanguages } = useLanguage();
  const supportedLanguages = getSupportedLanguages();
  
  // Get flag emoji for language
  const getLanguageFlag = (langCode: Language): string => {
    switch (langCode) {
      case 'en': return '🇬🇧';
      case 'fr': return '🇫🇷';
      default: return '🌐';
    }
  };
  
  // Get display name for language in UI
  const getDisplayName = (langCode: Language): string => {
    if (compact) {
      // Shorter names for compact mode
      switch (langCode) {
        case 'en': return 'EN';
        case 'fr': return 'FR';
        default: return 'XX'; // Fallback for unknown languages
      }
    }
    
    const lang = supportedLanguages.find(l => l.code === langCode);
    return showLocalNames ? lang?.localName || langCode : lang?.name || langCode;
  };

  return (
    <View style={[styles.langContainer, containerStyle]}>
      <View style={[
        styles.langPill, 
        pillStyle === 'light' ? styles.langPillLight : styles.langPillDark
      ]}>
        {supportedLanguages.map((lang) => (
          <Pressable 
            key={lang.code}
            style={({ pressed }) => [
              styles.langBtn,
              language === lang.code && styles.langBtnActive,
              pressed && styles.langBtnPressed
            ]}
            onPress={() => setLanguage(lang.code)}
          >
            <Text style={styles.langFlag}>
              {getLanguageFlag(lang.code)}
            </Text>
            <Text style={[
              styles.langText,
              language === lang.code && styles.langTextActive,
              pillStyle === 'light' && styles.langTextLight,
              pillStyle === 'light' && language === lang.code && styles.langTextActiveLight,
            ]}>
              {getDisplayName(lang.code)}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  langContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 16,
  },
  langPill: {
    flexDirection: 'row',
    borderRadius: 24,
    padding: 4,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  langPillDark: {
    backgroundColor: '#1A2233',
  },
  langPillLight: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  langBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginHorizontal: 2,
  },
  langBtnActive: {
    backgroundColor: '#3B5BFE',
  },
  langBtnPressed: {
    opacity: 0.8,
  },
  langFlag: {
    fontSize: 16,
    marginRight: 6,
  },
  langText: {
    color: '#AAAAAA',
    fontSize: 14,
    fontWeight: '500',
  },
  langTextLight: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  langTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  langTextActiveLight: {
    color: '#FFFFFF',
  },
});
