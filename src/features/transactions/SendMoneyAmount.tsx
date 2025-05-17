import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  TextInput,
  Animated,
  Pressable,
  Keyboard,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types/navigation';

type SendMoneyAmountScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type SendMoneyAmountScreenRouteProp = RouteProp<RootStackParamList, 'SendMoneyAmount'>;

export const SendMoneyAmount = () => {
  const navigation = useNavigation<SendMoneyAmountScreenNavigationProp>();
  const route = useRoute<SendMoneyAmountScreenRouteProp>();
  const { recipient } = route.params;
  
  const [amount, setAmount] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const recipientCardScale = useRef(new Animated.Value(0.95)).current;
  const recipientCardTranslate = useRef(new Animated.Value(-20)).current;
  const inputScaleAnim = useRef(new Animated.Value(1)).current;
  const inputBorderAnim = useRef(new Animated.Value(0)).current;
  const labelTranslate = useRef(new Animated.Value(-20)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  
  // Input ref
  const inputRef = useRef<TextInput>(null);
  
  useEffect(() => {
    // Entrance animations - staggered for a more premium feel
    const animationSequence = Animated.stagger(100, [
      // Fade in the entire screen
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }),
      
      // Animate recipient card
      Animated.parallel([
        Animated.spring(recipientCardScale, {
          toValue: 1,
          tension: 70,
          friction: 8,
          useNativeDriver: true
        }),
        Animated.timing(recipientCardTranslate, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true
        })
      ]),
      
      // Animate label
      Animated.spring(labelTranslate, {
        toValue: 0,
        tension: 70,
        friction: 8,
        useNativeDriver: true
      }),
      
      // Animate button appearance
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      })
    ]);
    
    animationSequence.start(() => {
      // Focus the input after animations complete
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    });
  }, []);

  // Apply separate animations for amount change
  useEffect(() => {
    // Animate button appearance based on amount validity
    const isValid = parseFloat(amount.replace(/,/g, '')) > 0;
    
    Animated.timing(buttonOpacity, {
      toValue: isValid ? 1 : 0.5,
      duration: 200,
      useNativeDriver: true
    }).start();
  }, [amount]);

  const handleGoBack = () => {
    // Fade out animation
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start(() => {
      navigation.goBack();
    });
  };

  const handleContinue = () => {
    if (parseFloat(amount.replace(/,/g, '')) > 0) {
      // Button press animation
      Animated.sequence([
        Animated.timing(buttonScale, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true
        }),
        Animated.timing(buttonScale, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true
        })
      ]).start();
      
      // Exit animation before navigation
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }).start(() => {
        navigation.navigate('SendMoneyConfirm', {
          recipient,
          amount: parseFloat(amount.replace(/,/g, ''))
        });
      });
    }
  };

  // Format amount to have commas for thousands
  const formatAmount = (text: string) => {
    // Remove all non-numeric characters
    const cleaned = text.replace(/[^0-9]/g, '');
    
    // Convert to number and format
    if (cleaned) {
      const formatted = parseInt(cleaned, 10).toLocaleString();
      setAmount(formatted);
    } else {
      setAmount('');
    }
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    
    // Scale animation
    Animated.timing(inputScaleAnim, {
      toValue: 1.02,
      duration: 300,
      useNativeDriver: true
    }).start();
    
    // Border animation
    Animated.timing(inputBorderAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false
    }).start();
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    
    // Scale animation
    Animated.timing(inputScaleAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start();
    
    // Border animation
    Animated.timing(inputBorderAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false
    }).start();
  };

  const handleButtonPressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      friction: 5,
      tension: 60,
      useNativeDriver: true
    }).start();
  };

  const handleButtonPressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true
    }).start();
  };

  // Determine if the Next button should be enabled
  const isNextEnabled = amount.trim().length > 0 && parseFloat(amount.replace(/,/g, '')) > 0;

  // Interpolate input border color based on focus state
  const inputBorderColor = inputBorderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#3F3F3F', '#3B5BFE']
  });
  
  // Interpolate input shadow for glow effect
  const inputShadowOpacity = inputBorderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5]
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.title}>Send Money</Text>
        </View>
        
        <Pressable 
          style={styles.contentContainer}
          onPress={() => Keyboard.dismiss()}
        >
          {/* Recipient Card */}
          <Animated.View 
            style={[
              styles.recipientContainer,
              { 
                transform: [
                  { scale: recipientCardScale },
                  { translateY: recipientCardTranslate }
                ]
              }
            ]}
          >
            <View style={styles.recipientAvatar}>
              <Ionicons name="person" size={32} color="#3B5BFE" />
            </View>
            <View style={styles.recipientInfo}>
              <Text style={styles.recipientName}>{recipient.name}</Text>
              <Text style={styles.recipientPhone}>{recipient.phone}</Text>
            </View>
          </Animated.View>
          
          <View style={styles.amountContainer}>
            <Animated.Text 
              style={[
                styles.amountLabel,
                { transform: [{ translateY: labelTranslate }] }
              ]}
            >
              Amount
            </Animated.Text>
            
            {/* Amount Input Container */}
            <Animated.View 
              style={[
                { transform: [{ scale: inputScaleAnim }] }
              ]}
            >
              <Animated.View 
                style={[
                  styles.amountInputContainer,
                  { 
                    borderColor: inputBorderColor,
                    borderWidth: 1,
                    shadowColor: '#3B5BFE',
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: inputShadowOpacity,
                    shadowRadius: 8,
                  }
                ]}
              >
                <TextInput
                  ref={inputRef}
                  style={styles.amountInput}
                  value={amount}
                  onChangeText={formatAmount}
                  keyboardType="numeric"
                  placeholder="0"
                  placeholderTextColor="#565656"
                  textAlign="center"
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
                <Text style={styles.currencyText}>FCFA</Text>
              </Animated.View>
            </Animated.View>
          </View>
          
          {/* Next Button */}
          <Animated.View 
            style={[
              styles.nextButtonContainer,
              { 
                opacity: buttonOpacity,
                transform: [{ scale: buttonScale }]
              }
            ]}
          >
            <TouchableOpacity 
              style={[styles.nextButton, !isNextEnabled && styles.nextButtonDisabled]}
              onPress={handleContinue}
              disabled={!isNextEnabled}
              onPressIn={handleButtonPressIn}
              onPressOut={handleButtonPressOut}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </Animated.View>
        </Pressable>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  recipientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  recipientAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(59, 91, 254, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  recipientInfo: {
    flex: 1,
  },
  recipientName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  recipientPhone: {
    color: '#C2C2C2',
    fontSize: 14,
  },
  amountContainer: {
    marginBottom: 32,
  },
  amountLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1B1B1B',
    borderRadius: 12,
    height: 70,
    paddingHorizontal: 20,
  },
  amountInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
    height: '100%',
  },
  currencyText: {
    color: '#888888',
    fontSize: 18,
    marginLeft: 10,
  },
  nextButtonContainer: {
    marginTop: 'auto',
    paddingBottom: 16,
  },
  nextButton: {
    backgroundColor: '#3B5BFE',
    borderRadius: 16,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  nextButtonDisabled: {
    backgroundColor: '#1F1F1F',
    opacity: 0.5,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 