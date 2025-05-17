
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

type SetupPINScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const SetupPIN: React.FC = () => {
  const [pin, setPin] = useState<string>('');
  const [confirmPin, setConfirmPin] = useState<string>('');
  const [step, setStep] = useState<'create' | 'confirm'>('create');
  
  const navigation = useNavigation<SetupPINScreenNavigationProp>();

  const handlePinInput = (digit: string) => {
    if (step === 'create' && pin.length < 4) {
      setPin(pin + digit);
      if (pin.length === 3) {
        setTimeout(() => {
          setStep('confirm');
        }, 500);
      }
    } else if (step === 'confirm' && confirmPin.length < 4) {
      setConfirmPin(confirmPin + digit);
      if (confirmPin.length === 3) {
        setTimeout(() => {
          // In a real app, we would validate the PIN here
          navigation.navigate('Dashboard');
        }, 500);
      }
    }
  };

  const handleDeletePin = () => {
    if (step === 'create' && pin.length > 0) {
      setPin(pin.slice(0, -1));
    } else if (step === 'confirm' && confirmPin.length > 0) {
      setConfirmPin(confirmPin.slice(0, -1));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {step === 'create' ? 'Créer un code PIN' : 'Confirmer votre code PIN'}
      </Text>
      
      <View style={styles.pinDisplay}>
        <View style={[styles.pinDot, pin.length >= 1 && styles.pinDotFilled]} />
        <View style={[styles.pinDot, pin.length >= 2 && styles.pinDotFilled]} />
        <View style={[styles.pinDot, pin.length >= 3 && styles.pinDotFilled]} />
        <View style={[styles.pinDot, pin.length >= 4 && styles.pinDotFilled]} />
      </View>
      
      <View style={styles.keypad}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
          <TouchableOpacity
            key={number}
            style={styles.keypadButton}
            onPress={() => handlePinInput(number.toString())}
          >
            <Text style={styles.keypadButtonText}>{number}</Text>
          </TouchableOpacity>
        ))}
        <View style={styles.keypadButton} />
        <TouchableOpacity
          style={styles.keypadButton}
          onPress={() => handlePinInput('0')}
        >
          <Text style={styles.keypadButtonText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.keypadButton}
          onPress={handleDeletePin}
        >
          <Text style={styles.keypadButtonText}>←</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  pinDisplay: {
    flexDirection: 'row',
    marginBottom: 50,
  },
  pinDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 10,
  },
  pinDotFilled: {
    backgroundColor: '#3B5BFE',
  },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '80%',
  },
  keypadButton: {
    width: '30%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  keypadButtonText: {
    fontSize: 28,
    fontWeight: '500',
  },
});
