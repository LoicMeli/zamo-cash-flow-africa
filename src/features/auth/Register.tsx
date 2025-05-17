import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  Platform, 
  Alert,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
  StatusBar,
  Pressable
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types/navigation';
import { useLanguage } from '../../providers/LanguageProvider';
import { useTheme } from '../../theme/ThemeContext';
import { ThemedText, ThemedView } from '../../components/common/ThemedView';

type RegisterScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

export const RegisterScreen = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const { t } = useLanguage();
  const { colors, isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: ''
  });
  
  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleRegister = () => {
    // Validate form data
    if (!formData.name.trim() || !formData.phoneNumber.trim()) {
      // Show error
      return;
    }
    
    // Navigate to OTP verification screen
    navigation.navigate('VerifyOTP', { phoneNumber: formData.phoneNumber });
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const { width, height } = useWindowDimensions();
  const isSmallScreen = width < 375;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={colors.background} />
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ThemedText style={styles.backButtonText}>← {t('common.back')}</ThemedText>
        </TouchableOpacity>
        
        {/* Form Header */}
        <ThemedText style={styles.title}>{t('auth.createAccount')}</ThemedText>
        
        {/* Registration Form */}
        <View style={styles.formContainer}>
          <View style={styles.formGroup}>
            <ThemedText style={styles.label}>{t('auth.name')}</ThemedText>
            <TextInput
              style={[
                styles.input,
                { 
                  backgroundColor: colors.input,
                  color: colors.text,
                  borderColor: colors.border
                }
              ]}
              placeholder={t('auth.namePlaceholder')}
              placeholderTextColor={colors.textSecondary}
              value={formData.name}
              onChangeText={(text) => handleInputChange('name', text)}
            />
          </View>
          
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
              value={formData.phoneNumber}
              onChangeText={(text) => handleInputChange('phoneNumber', text)}
            />
          </View>
          
          <View style={styles.formGroup}>
            <ThemedText style={styles.label}>{t('auth.email')} ({t('common.optional')})</ThemedText>
            <TextInput
              style={[
                styles.input,
                { 
                  backgroundColor: colors.input,
                  color: colors.text,
                  borderColor: colors.border
                }
              ]}
              placeholder={t('auth.emailPlaceholder')}
              placeholderTextColor={colors.textSecondary}
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
            />
          </View>
          
          <TouchableOpacity 
            style={styles.button} 
            onPress={handleRegister}
          >
            <Text style={styles.buttonText}>{t('auth.signUp')}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.linkContainer}
            onPress={handleLogin}
          >
            <ThemedText style={styles.linkText}>
              {t('auth.alreadyHaveAccount')} {t('auth.login')}
            </ThemedText>
          </TouchableOpacity>
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
    backgroundColor: '#1A2233',
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
    paddingVertical: 20,
  },
  card: {
    backgroundColor: '#181F2C',
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
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
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
    marginTop: 8,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkContainer: {
    marginTop: 16,
    alignItems: 'center',
    padding: 8,
  },
  linkText: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 20 : 40,
    left: 20,
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  formContainer: {
    padding: 20,
  },
}); 