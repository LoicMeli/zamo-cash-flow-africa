import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../../types/navigation';

type CardTopUpScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddMoney'>;

export const CardTopUp = () => {
  const navigation = useNavigation<CardTopUpScreenNavigationProp>();
  const [step, setStep] = useState(1);
  
  // Form state
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [amount, setAmount] = useState('');
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  
  // Format card number with spaces
  const formatCardNumber = (text: string) => {
    // Remove all non-digit characters
    const cleaned = text.replace(/\D/g, '');
    // Limit to 16 digits
    const truncated = cleaned.slice(0, 16);
    // Add a space after every 4 digits
    const formatted = truncated.replace(/(\d{4})/g, '$1 ').trim();
    setCardNumber(formatted);
  };
  
  // Format expiry date as MM/YY
  const formatExpiryDate = (text: string) => {
    // Remove all non-digit characters
    const cleaned = text.replace(/\D/g, '');
    // Limit to 4 digits
    const truncated = cleaned.slice(0, 4);
    // Add a slash after the first 2 digits if there are more than 2
    const formatted = truncated.length > 2 
      ? `${truncated.slice(0, 2)}/${truncated.slice(2)}` 
      : truncated;
    setExpiryDate(formatted);
  };
  
  // Calculate fee (example: 1.5% of amount)
  const calculateFee = () => {
    const amountValue = parseFloat(amount) || 0;
    return Math.round(amountValue * 0.015);
  };
  
  // Total amount including fee
  const totalAmount = () => {
    const amountValue = parseFloat(amount) || 0;
    return amountValue + calculateFee();
  };
  
  // Validate form inputs
  const validateStep1 = () => {
    if (!cardNumber || cardNumber.replace(/\s/g, '').length < 16) {
      alert('Please enter a valid card number');
      return false;
    }
    if (!expiryDate || expiryDate.length < 5) {
      alert('Please enter a valid expiry date (MM/YY)');
      return false;
    }
    if (!cvv || cvv.length < 3) {
      alert('Please enter a valid CVV');
      return false;
    }
    if (!cardholderName) {
      alert('Please enter the cardholder name');
      return false;
    }
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return false;
    }
    return true;
  };
  
  // Go to next step
  const goToNextStep = () => {
    if (step === 1 && !validateStep1()) {
      return;
    }
    
    // Fade out current step
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(slideAnim, {
        toValue: -20,
        duration: 200,
        useNativeDriver: true
      })
    ]).start(() => {
      // Update step
      setStep(step + 1);
      slideAnim.setValue(20);
      
      // Fade in next step
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true
        })
      ]).start();
    });
  };
  
  // Go back
  const goBack = () => {
    if (step === 1) {
      navigation.goBack();
      return;
    }
    
    // Fade out current step
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(slideAnim, {
        toValue: 20,
        duration: 200,
        useNativeDriver: true
      })
    ]).start(() => {
      // Update step
      setStep(step - 1);
      slideAnim.setValue(-20);
      
      // Fade in previous step
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true
        })
      ]).start();
    });
  };
  
  // Complete top-up
  const completeTopUp = () => {
    // Show loading animation
    alert('Processing your payment...');
    
    // Simulate API call delay
    setTimeout(() => {
      // Navigate back to wallet with success message
      navigation.navigate('Main', { 
        screen: 'Wallet',
        params: { 
          topupSuccess: true, 
          amount: parseFloat(amount)
        }
      });
    }, 2000);
  };
  
  // Animate initial step
  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true
      })
    ]).start();
  }, []);
  
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Card Top Up</Text>
          <View style={{ width: 40 }} />
        </View>
        
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Step Indicator */}
          <View style={styles.stepIndicator}>
            <View style={[styles.stepDot, step >= 1 && styles.activeStepDot]} />
            <View style={styles.stepLine} />
            <View style={[styles.stepDot, step >= 2 && styles.activeStepDot]} />
          </View>
          
          {step === 1 ? (
            <Animated.View 
              style={[
                styles.stepContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }]
                }
              ]}
            >
              <Text style={styles.stepTitle}>Enter Card Details</Text>
              
              <View style={styles.formGroup}>
                <Text style={styles.label}>Card Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="1234 5678 9012 3456"
                  placeholderTextColor="#666"
                  value={cardNumber}
                  onChangeText={formatCardNumber}
                  keyboardType="number-pad"
                  maxLength={19} // 16 digits + 3 spaces
                />
              </View>
              
              <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.label}>Expiry Date</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="MM/YY"
                    placeholderTextColor="#666"
                    value={expiryDate}
                    onChangeText={formatExpiryDate}
                    keyboardType="number-pad"
                    maxLength={5} // MM/YY
                  />
                </View>
                
                <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                  <Text style={styles.label}>CVV</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="123"
                    placeholderTextColor="#666"
                    value={cvv}
                    onChangeText={setCvv}
                    keyboardType="number-pad"
                    maxLength={4}
                    secureTextEntry
                  />
                </View>
              </View>
              
              <View style={styles.formGroup}>
                <Text style={styles.label}>Cardholder Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="John Doe"
                  placeholderTextColor="#666"
                  value={cardholderName}
                  onChangeText={setCardholderName}
                  autoCapitalize="words"
                />
              </View>
              
              <View style={styles.formGroup}>
                <Text style={styles.label}>Amount (FCFA)</Text>
                <TextInput
                  style={styles.amountInput}
                  placeholder="0"
                  placeholderTextColor="#666"
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="number-pad"
                />
              </View>
              
              <TouchableOpacity 
                style={styles.button}
                onPress={goToNextStep}
              >
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
              
              <View style={styles.securityNote}>
                <Ionicons name="lock-closed" size={16} color="#3B5BFE" />
                <Text style={styles.securityNoteText}>
                  All transactions are secured with 256-bit encryption
                </Text>
              </View>
            </Animated.View>
          ) : (
            <Animated.View 
              style={[
                styles.stepContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }]
                }
              ]}
            >
              <Text style={styles.stepTitle}>Confirm Top-Up</Text>
              
              <View style={styles.summaryCard}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Card</Text>
                  <Text style={styles.summaryValue}>
                    •••• {cardNumber.slice(-4)}
                  </Text>
                </View>
                
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Amount</Text>
                  <Text style={styles.summaryValue}>
                    {parseInt(amount).toLocaleString()} FCFA
                  </Text>
                </View>
                
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Processing Fee</Text>
                  <Text style={styles.summaryValue}>
                    {calculateFee().toLocaleString()} FCFA
                  </Text>
                </View>
                
                <View style={styles.divider} />
                
                <View style={styles.summaryRow}>
                  <Text style={styles.totalLabel}>Total</Text>
                  <Text style={styles.totalValue}>
                    {totalAmount().toLocaleString()} FCFA
                  </Text>
                </View>
              </View>
              
              <TouchableOpacity 
                style={styles.button}
                onPress={completeTopUp}
              >
                <Text style={styles.buttonText}>Confirm & Pay</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.backButton2}
                onPress={goBack}
              >
                <Text style={styles.backButtonText}>Back to edit</Text>
              </TouchableOpacity>
              
              <View style={styles.securityNote}>
                <Ionicons name="information-circle" size={16} color="#3B5BFE" />
                <Text style={styles.securityNoteText}>
                  By proceeding, you authorize Zamo to charge your card for this amount
                </Text>
              </View>
            </Animated.View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');
const isSmallScreen = width < 375;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#333',
  },
  activeStepDot: {
    backgroundColor: '#3B5BFE',
    width: 12,
    height: 12,
  },
  stepLine: {
    width: 50,
    height: 2,
    backgroundColor: '#333',
    marginHorizontal: 8,
  },
  stepContainer: {
    maxWidth: 420,
    width: '100%',
    alignSelf: 'center',
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 24,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 20,
  },
  formRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#BBBBBB',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1A1A1A',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333',
    color: '#FFFFFF',
    fontSize: 16,
    padding: 12,
    height: 50,
  },
  amountInput: {
    backgroundColor: '#1A1A1A',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333',
    color: '#FFFFFF',
    fontSize: 24,
    padding: 12,
    height: 60,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#3B5BFE',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton2: {
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  backButtonText: {
    color: '#AAAAAA',
    fontSize: 14,
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    padding: 12,
    backgroundColor: 'rgba(59, 91, 254, 0.1)',
    borderRadius: 8,
  },
  securityNoteText: {
    color: '#AAAAAA',
    fontSize: 12,
    marginLeft: 8,
    flex: 1,
  },
  summaryCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    color: '#AAAAAA',
    fontSize: 14,
  },
  summaryValue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 12,
  },
  totalLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalValue: {
    color: '#3B5BFE',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 