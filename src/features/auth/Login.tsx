import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  Platform, 
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
  StatusBar,
  Pressable
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types/navigation';
import { useLanguage, Language, LANGUAGE_STORAGE_KEY } from '../../providers/LanguageProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../theme/ThemeContext';
import { ThemedText, ThemedView } from '../../components/common/ThemedView';
import { ThemedButton, ThemedInput } from '../../components/common/ThemedComponents';

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [phone, setPhone] = useState('');
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 375;
  const { language, setLanguage, t, forceRefresh } = useLanguage();
  const { colors, isDarkMode } = useTheme();

  // Handle language change with explicit storage update
  const handleLanguageChange = async (newLanguage: Language) => {
    // Set language in context
    setLanguage(newLanguage);
    
    // Explicitly save to AsyncStorage to ensure persistence
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage);
      console.log("Language explicitly saved from login screen:", newLanguage);
      
      // Force an immediate UI refresh after language change
      forceRefresh();
    } catch (error) {
      console.error("Failed to save language preference:", error);
    }
  };

  const handleSendOTP = () => {
    if (!phone.trim()) {
      // Add validation for empty phone
      return;
    }
    
    console.log('Send OTP to:', phone);
    
    // Navigate to OTP verification
    navigation.navigate('VerifyOTP', { phoneNumber: phone });
  };

  // Language display mapping
  const getLanguageDisplay = (lang: Language): string => {
    switch(lang) {
      case 'en': return 'EN';
      case 'fr': return 'FR';
      case 'camfran': return 'PG';
      default: return 'EN';
    }
  };

  const getLanguageFlag = (lang: Language): string => {
    switch(lang) {
      case 'en': return '🇬🇧';
      case 'fr': return '🇫🇷';
      case 'camfran': return '🇨🇲';
      default: return '����🇧';
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={colors.background} />
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header - Centered Logo */}
        <View style={styles.headerContainer}>
          <View style={styles.logoContainer}>
            <Text style={styles.plusIcon}>＋</Text>
            <Text style={styles.logoText}>Zamo</Text>
          </View>
          
          {/* Original Language Selector */}
          <View style={styles.langContainer}>
            <View style={[styles.langPill, { backgroundColor: isDarkMode ? '#2A2A2A' : '#1A2233' }]}>
              {['en', 'fr', 'camfran'].map((lang) => (
                <Pressable 
                  key={lang}
                  style={({ pressed }) => [
                    styles.langBtn,
                    language === lang && styles.langBtnActive,
                    pressed && styles.langBtnPressed
                  ]}
                  onPress={() => handleLanguageChange(lang as Language)}
                >
                  <Text style={styles.langFlag}>
                    {getLanguageFlag(lang as Language)}
                  </Text>
                  <Text style={[
                    styles.langText,
                    language === lang && styles.langTextActive
                  ]}>
                    {getLanguageDisplay(lang as Language)}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        {/* Main Login Container */}
        <View style={styles.mainContainer}>
          {/* Login Card */}
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <ThemedText style={styles.loginTitle}>{t('auth.login')}</ThemedText>
            
            <View style={styles.formGroup}>
              <ThemedText style={styles.label}>{t('auth.phoneLabel')}</ThemedText>
              <TextInput
                style={[
                  styles.input, 
                  { 
                    backgroundColor: colors.input, 
                    color: colors.text,
                    borderColor: colors.border
                  }
                ]}
                placeholder={t('auth.phonePlaceholder')}
                placeholderTextColor={colors.textSecondary}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>
            
            <TouchableOpacity 
              style={styles.button} 
              onPress={handleSendOTP} 
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>{t('auth.sendOTP')}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.linkContainer}
              onPress={() => navigation.navigate('Register')}
            >
              <ThemedText style={styles.linkText}>{t('auth.newUser')}</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  headerContainer: {
    width: '100%',
    paddingTop: Platform.OS === 'ios' ? 20 : 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  plusIcon: {
    color: '#007BFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 8,
  },
  logoText: {
    color: '#007BFF',
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    letterSpacing: 0.5,
  },
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
  langBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  langBtnActive: {
    backgroundColor: '#007BFF',
  },
  langBtnPressed: {
    opacity: 0.8,
  },
  langFlag: {
    fontSize: 16,
    marginRight: 6,
  },
  langText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  langTextActive: {
    fontWeight: 'bold',
    color: '#fff',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  card: {
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  loginTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    width: '100%',
    height: 50,
    borderWidth: 1,
  },
  inputError: {
    borderColor: '#E53935',
  },
  errorText: {
    color: '#E53935',
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 12,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkContainer: {
    alignItems: 'center',
    padding: 8,
  },
  linkText: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
