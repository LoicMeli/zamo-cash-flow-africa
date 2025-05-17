import React, { useState } from 'react';
import { View, StyleSheet, Text, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList, RootStackParamList } from '../../types/navigation';
import { LIMITS } from '../../config/constants';
import { useLanguage } from '../../providers/LanguageProvider';
import { useTheme } from '../../theme/ThemeContext';
import { ThemedText } from '../../components/common/ThemedView';

type SetupPINScreenRouteProp = RouteProp<AuthStackParamList, 'SetupPIN'>;
type SetupPINScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

export const SetupPIN = () => {
  const navigation = useNavigation<SetupPINScreenNavigationProp>();
  const route = useRoute<SetupPINScreenRouteProp>();
  const { phoneNumber, otp } = route.params;
  const { t } = useLanguage();
  const { colors, isDarkMode } = useTheme();
  
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [error, setError] = useState('');
  const [isConfirmStep, setIsConfirmStep] = useState(false);

  const handleContinue = () => {
    if (pin.length !== LIMITS.PIN_LENGTH) {
      setError(t('auth.pinMustBeDigits'));
      return;
    }
    
    setIsConfirmStep(true);
  };
  
  const handleBack = () => {
    if (isConfirmStep) {
      setIsConfirmStep(false);
      setConfirmPin('');
      setError('');
    } else {
      navigation.goBack();
    }
  };

  const handleSetupPIN = () => {
    if (pin.length !== LIMITS.PIN_LENGTH) {
      setError(t('auth.pinMustBeDigits'));
      return;
    }

    if (pin !== confirmPin) {
      setError(t('auth.pinsDoNotMatch'));
      return;
    }

    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ThemedText style={styles.backButtonText}>← {t('common.back')}</ThemedText>
        </TouchableOpacity>

        <ThemedText style={styles.title}>
          {isConfirmStep ? t('auth.confirmation') : t('auth.pinSetup')}
        </ThemedText>
        <ThemedText style={styles.subtitle} secondary>
          {isConfirmStep 
            ? t('auth.confirmPinCode') 
            : t('auth.createPinDescription')
          }
        </ThemedText>

        {!isConfirmStep ? (
          <View style={styles.formGroup}>
            <ThemedText style={styles.label}>{t('auth.pinCode')}</ThemedText>
            <TextInput
              style={[
                styles.input,
                { 
                  backgroundColor: colors.input,
                  color: colors.text,
                  borderColor: colors.border
                }
              ]}
              placeholder="XXXX"
              placeholderTextColor={colors.textSecondary}
              keyboardType="number-pad"
              maxLength={LIMITS.PIN_LENGTH}
              secureTextEntry
              value={pin}
              onChangeText={(text: string) => {
                setPin(text);
                setError('');
              }}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            
            <TouchableOpacity
              style={styles.button}
              onPress={handleContinue}
            >
              <Text style={styles.buttonText}>{t('common.next')}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <View style={styles.formGroup}>
              <ThemedText style={styles.label}>{t('auth.confirmPin')}</ThemedText>
              <TextInput
                style={[
                  styles.input, 
                  { 
                    backgroundColor: colors.input,
                    color: colors.text,
                    borderColor: error ? '#E53935' : colors.border
                  },
                  error ? styles.inputError : null
                ]}
                placeholder="XXXX"
                placeholderTextColor={colors.textSecondary}
                keyboardType="number-pad"
                maxLength={LIMITS.PIN_LENGTH}
                secureTextEntry
                value={confirmPin}
                onChangeText={(text: string) => {
                  setConfirmPin(text);
                  setError('');
                }}
              />
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
            </View>
            
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                onPress={handleBack}
              >
                <Text style={styles.secondaryButtonText}>{t('common.back')}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.button, styles.primaryButton]}
                onPress={handleSetupPIN}
              >
                <Text style={styles.buttonText}>{t('common.confirm')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
  formGroup: {
    marginBottom: 20,
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
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  primaryButton: {
    flex: 1,
    marginLeft: 8,
  },
  secondaryButton: {
    flex: 1,
    marginRight: 8,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007BFF',
  },
  secondaryButtonText: {
    color: '#007BFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
