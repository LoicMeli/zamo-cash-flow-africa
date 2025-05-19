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
  Platform,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '../../../utils/IconComponent'; // Using our own Icon component
import { RootStackParamList } from '../../../types/navigation';

type MobileMoneyTopUpScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddMoney'>;

// Mobile money operators
const OPERATORS = [
  {
    id: 'mtn',
    name: 'MTN Mobile Money',
    color: '#FFCC00',
    icon: 'phone-portrait-outline' as const
  },
  {
    id: 'orange',
    name: 'Orange Money',
    color: '#FF6600',
    icon: 'phone-portrait-outline' as const
  },
  {
    id: 'moov',
    name: 'Moov Money',
    color: '#00AEEF',
    icon: 'phone-portrait-outline' as const
  },
  {
    id: 'airtel',
    name: 'Airtel Money',
    color: '#EE1C25',
    icon: 'phone-portrait-outline' as const
  }
];

export const MobileMoneyTopUp = () => {
  const navigation = useNavigation<MobileMoneyTopUpScreenNavigationProp>();
  const [step, setStep] = useState(1);
  
  // Form state
  const [selectedOperator, setSelectedOperator] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  
  // Format phone number
  const formatPhoneNumber = (text: string) => {
    // Remove all non-digit characters
    const cleaned = text.replace(/\D/g, '');
    // Limit to 12 digits
    const truncated = cleaned.slice(0, 12);
    setPhoneNumber(truncated);
  };
  
  // Get operator by ID
  const getOperator = (id: string | null) => {
    if (!id) return null;
    return OPERATORS.find(op => op.id === id) || null;
  };
  
  // Get operator color
  const getOperatorColor = (id: string | null) => {
    const operator = getOperator(id);
    return operator ? operator.color : '#3B5BFE';
  };
  
  // Calculate fee (example: 1% of amount)
  const calculateFee = () => {
    const amountValue = parseFloat(amount) || 0;
    return Math.round(amountValue * 0.01);
  };
  
  // Total amount including fee
  const totalAmount = () => {
    const amountValue = parseFloat(amount) || 0;
    return amountValue + calculateFee();
  };
  
  // Validate form inputs
  const validateStep1 = () => {
    if (!selectedOperator) {
      alert('Please select a mobile money operator');
      return false;
    }
    if (!phoneNumber || phoneNumber.length < 9) {
      alert('Please enter a valid phone number');
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
    alert('Processing your mobile money request...\n\nYou will receive a prompt on your mobile device.');
    
    // Simulate API call delay
    setTimeout(() => {
      // Navigate back to wallet with success message
      navigation.goBack();
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
            <Icon name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mobile Money</Text>
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
              <Text style={styles.stepTitle}>Mobile Money Top Up</Text>
              
              <View style={styles.formGroup}>
                <Text style={styles.label}>Select Mobile Money Operator</Text>
                <View style={styles.operatorsGrid}>
                  {OPERATORS.map(operator => (
                    <TouchableOpacity
                      key={operator.id}
                      style={[
                        styles.operatorCard,
                        selectedOperator === operator.id && {
                          borderColor: operator.color,
                          backgroundColor: `${operator.color}15`
                        }
                      ]}
                      onPress={() => setSelectedOperator(operator.id)}
                    >
                      <View 
                        style={[
                          styles.operatorIcon,
                          { backgroundColor: operator.color }
                        ]}
                      >
                        <Icon name={operator.icon} size={20} color="#FFF" />
                      </View>
                      <Text style={styles.operatorName}>{operator.name}</Text>
                      {selectedOperator === operator.id && (
                        <Icon name="checkmark-circle" size={20} color={operator.color} style={styles.checkIcon} />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              
              <View style={styles.formGroup}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter mobile money number"
                  placeholderTextColor="#666"
                  value={phoneNumber}
                  onChangeText={formatPhoneNumber}
                  keyboardType="phone-pad"
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
                style={[
                  styles.button,
                  { backgroundColor: selectedOperator ? getOperatorColor(selectedOperator) : '#3B5BFE' }
                ]}
                onPress={goToNextStep}
              >
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
              
              <View style={styles.securityNote}>
                <Icon name="information-circle" size={16} color="#3B5BFE" />
                <Text style={styles.securityNoteText}>
                  You will receive a prompt on your mobile device to confirm the transaction.
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
              <Text style={styles.stepTitle}>Confirm Top Up</Text>
              
              <View 
                style={[
                  styles.operatorBanner,
                  { backgroundColor: getOperatorColor(selectedOperator) }
                ]}
              >
                <Icon name="phone-portrait-outline" size={24} color="#FFF" />
                <Text style={styles.operatorBannerText}>
                  {getOperator(selectedOperator)?.name}
                </Text>
              </View>
              
              <View style={styles.summaryCard}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Mobile Number</Text>
                  <Text style={styles.summaryValue}>
                    {phoneNumber}
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
              
              <View style={styles.instructionCard}>
                <Icon name="alert-circle" size={20} color="#FF9500" />
                <Text style={styles.instructionText}>
                  You'll receive an approval prompt on your phone. Please approve the transaction when it appears.
                </Text>
              </View>
              
              <TouchableOpacity 
                style={[
                  styles.button,
                  { backgroundColor: getOperatorColor(selectedOperator) }
                ]}
                onPress={completeTopUp}
              >
                <Text style={styles.buttonText}>Proceed</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.backButton2}
                onPress={goBack}
              >
                <Text style={styles.backButtonText}>Back to edit</Text>
              </TouchableOpacity>
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
  label: {
    fontSize: 14,
    color: '#BBBBBB',
    marginBottom: 12,
  },
  operatorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  operatorCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
    width: '48%',
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    position: 'relative',
  },
  operatorIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  operatorName: {
    color: '#FFFFFF',
    fontSize: 13,
    textAlign: 'center',
  },
  checkIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
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
  operatorBanner: {
    backgroundColor: '#3B5BFE',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  operatorBannerText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 12,
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
  instructionCard: {
    backgroundColor: 'rgba(255, 149, 0, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  instructionText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
});
