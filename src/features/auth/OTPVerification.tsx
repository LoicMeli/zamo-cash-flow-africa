import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types/navigation';
import { LIMITS } from '../../config/constants';
import { useLanguage } from '../../providers/LanguageProvider';
import { useTheme } from '../../theme/ThemeContext';
import { ThemedText, ThemedView } from '../../components/common/ThemedView';

type VerifyOTPScreenRouteProp = RouteProp<AuthStackParamList, 'VerifyOTP'>;
type VerifyOTPScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'VerifyOTP'>;

export const OTPVerification = () => {
  const navigation = useNavigation<VerifyOTPScreenNavigationProp>();
  const route = useRoute<VerifyOTPScreenRouteProp>();
  const { phoneNumber } = route.params;
  const { t } = useLanguage();
  const { colors, isDarkMode } = useTheme();
  
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<TextInput>(null);

  const handleVerification = () => {
    if (otp.length !== LIMITS.OTP_LENGTH) {
      setError(t('auth.invalidOTPCode'));
      return;
    }
    
    // Navigate to PIN setup screen
    navigation.navigate('SetupPIN', { 
      phoneNumber: phoneNumber,
      otp: otp 
    });
  };

  const handleResendCode = () => {
    // Logic to resend OTP code
    console.log('Resending code to:', phoneNumber);
    // Reset OTP field
    setOtp('');
    setError('');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.content}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ThemedText style={styles.backButtonText}>← {t('common.back')}</ThemedText>
        </TouchableOpacity>

        <ThemedText style={styles.title}>{t('auth.verification')}</ThemedText>
        <ThemedText style={styles.subtitle} secondary>
          {t('auth.enterVerificationCode')}
        </ThemedText>

        <TextInput
          ref={inputRef}
          style={[
            styles.input, 
            { 
              backgroundColor: colors.input,
              color: colors.text,
              borderColor: error ? '#E53935' : colors.border 
            },
            error ? styles.inputError : null
          ]}
          placeholder="XXXXXX"
          placeholderTextColor={colors.textSecondary}
          keyboardType="number-pad"
          maxLength={LIMITS.OTP_LENGTH}
          value={otp}
          onChangeText={(text: string) => {
            setOtp(text);
            setError('');
          }}
        />
        
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          style={styles.button}
          onPress={handleVerification}
        >
          <Text style={styles.buttonText}>{t('auth.verify')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.resendContainer}
          onPress={handleResendCode}
        >
          <ThemedText style={styles.resendText} secondary>
            {t('auth.noCodeReceived')} <Text style={styles.resendLink}>{t('auth.resend')}</Text>
          </ThemedText>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    width: '100%',
    height: 50,
    borderWidth: 1,
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 8,
  },
  inputError: {
    borderColor: '#E53935',
  },
  errorText: {
    color: '#E53935',
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
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
  resendContainer: {
    alignItems: 'center',
    padding: 8,
  },
  resendText: {
    fontSize: 14,
    textAlign: 'center',
  },
  resendLink: {
    color: '#007BFF',
    fontWeight: '600',
  },
}); 