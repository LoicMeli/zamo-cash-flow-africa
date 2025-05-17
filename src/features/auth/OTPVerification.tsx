
import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types/navigation';

type OTPVerificationRouteProp = RouteProp<AuthStackParamList, 'VerifyOTP'>;
type OTPVerificationNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export const OTPVerification: React.FC = () => {
  const route = useRoute<OTPVerificationRouteProp>();
  const navigation = useNavigation<OTPVerificationNavigationProp>();
  const { phoneNumber } = route.params;
  
  const [otp, setOtp] = useState<string>('');
  
  const handleVerifyOTP = () => {
    // In a real app, we would validate the OTP here
    // For demo, we just navigate to the PIN setup screen
    navigation.navigate('SetupPIN', { phoneNumber });
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vérification OTP</Text>
      <Text style={styles.description}>
        Entrez le code envoyé au {phoneNumber}
      </Text>
      
      <View style={styles.otpContainer}>
        {/* Simple placeholder for OTP input */}
        <View style={styles.otpInput}>
          <Text style={styles.otpText}>1</Text>
        </View>
        <View style={styles.otpInput}>
          <Text style={styles.otpText}>2</Text>
        </View>
        <View style={styles.otpInput}>
          <Text style={styles.otpText}>3</Text>
        </View>
        <View style={styles.otpInput}>
          <Text style={styles.otpText}>4</Text>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={handleVerifyOTP}
      >
        <Text style={styles.buttonText}>Vérifier</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.resendContainer}>
        <Text style={styles.resendText}>Renvoyer le code</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  otpInput: {
    width: 50,
    height: 60,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpText: {
    fontSize: 24,
  },
  button: {
    backgroundColor: '#3B5BFE',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resendContainer: {
    marginTop: 20,
  },
  resendText: {
    color: '#3B5BFE',
    fontSize: 16,
  },
});
