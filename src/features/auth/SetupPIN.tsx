import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '../../providers/LanguageProvider';
import { COLORS, LIMITS } from '../../config/constants';

export const SetupPIN = () => {
  const { t } = useLanguage();
  const navigation = useNavigation();
  
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);
  
  const pinInputRef = useRef<TextInput>(null);
  const confirmPinInputRef = useRef<TextInput>(null);
  
  useEffect(() => {
    // Focus PIN input on mount
    setTimeout(() => pinInputRef.current?.focus(), 300);
  }, []);
  
  const validatePin = (value: string): boolean => {
    // Only allow digits and ensure length is 4
    if (!/^\d+$/.test(value) && value.length > 0) {
      setPinError(t('auth.pinMustBeDigits'));
      return false;
    }
    
    setPinError('');
    return true;
  };
  
  const handlePinChange = (value: string) => {
    if (validatePin(value)) {
      setPin(value);
      
      // Auto-proceed to confirm when PIN is complete
      if (value.length === LIMITS.PIN_LENGTH) {
        setPinError('');
        setIsConfirming(true);
        setTimeout(() => confirmPinInputRef.current?.focus(), 100);
      }
    }
  };
  
  const handleConfirmPinChange = (value: string) => {
    if (validatePin(value)) {
      setConfirmPin(value);
      
      // Auto-submit when confirm PIN is complete
      if (value.length === LIMITS.PIN_LENGTH) {
        handleSubmit(value);
      }
    }
  };
  
  const handleBackPress = () => {
    if (isConfirming) {
      setIsConfirming(false);
      setConfirmPin('');
      setTimeout(() => pinInputRef.current?.focus(), 100);
    } else {
      navigation.goBack();
    }
  };
  
  const handleSubmit = (confirmedPin: string) => {
    // Hide keyboard first
    Keyboard.dismiss();
    
    // Verify PIN matches
    if (pin !== confirmedPin) {
      setPinError(t('auth.pinsDoNotMatch'));
      setConfirmPin('');
      return;
    }
    
    // PIN setup success
    // In a real app, would save the PIN securely
    Alert.alert(
      "PIN Setup Complete",
      "Your PIN has been set up successfully.",
      [
        { 
          text: "Continue", 
          onPress: () => {
            // Navigate to dashboard or next onboarding step
            navigation.navigate('Dashboard');
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBackPress}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        
        <Text style={styles.title}>
          {isConfirming ? t('auth.confirmPin') : t('auth.pinSetup')}
        </Text>
        
        <Text style={styles.description}>
          {isConfirming ? 
            t('auth.confirmPinCode') : 
            t('auth.createPinDescription')
          }
        </Text>
        
        <View style={styles.pinContainer}>
          {isConfirming ? (
            <>
              <View style={styles.pinIndicators}>
                {Array.from({ length: 4 }).map((_, index) => (
                  <View 
                    key={`confirm-${index}`}
                    style={[
                      styles.pinDot,
                      index < confirmPin.length ? styles.pinDotFilled : {}
                    ]}
                  />
                ))}
              </View>
              
              <TextInput
                ref={confirmPinInputRef}
                style={styles.hiddenInput}
                value={confirmPin}
                onChangeText={handleConfirmPinChange}
                keyboardType="number-pad"
                maxLength={4}
                secureTextEntry
                autoFocus
              />
            </>
          ) : (
            <>
              <View style={styles.pinIndicators}>
                {Array.from({ length: 4 }).map((_, index) => (
                  <View 
                    key={`pin-${index}`}
                    style={[
                      styles.pinDot,
                      index < pin.length ? styles.pinDotFilled : {}
                    ]}
                  />
                ))}
              </View>
              
              <TextInput
                ref={pinInputRef}
                style={styles.hiddenInput}
                value={pin}
                onChangeText={handlePinChange}
                keyboardType="number-pad"
                maxLength={4}
                secureTextEntry
              />
            </>
          )}
        </View>
        
        {pinError ? (
          <Text style={styles.errorMessage}>{pinError}</Text>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007BFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  pinIndicators: {
    flexDirection: 'row',
  },
  pinDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007BFF',
    marginHorizontal: 8,
  },
  pinDotFilled: {
    backgroundColor: '#007BFF',
  },
  hiddenInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
  errorMessage: {
    color: '#E53935',
    fontSize: 14,
    marginTop: 10,
  },
});
