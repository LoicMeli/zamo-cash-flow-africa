
import { useState, useRef, useEffect } from 'react';
import { Animated, TextInput } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../types/navigation';

export const useSendMoneyAmount = (
  navigation: NativeStackNavigationProp<RootStackParamList>,
  recipient?: { name: string; phone: string }
) => {
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
    if (parseFloat(amount.replace(/,/g, '')) > 0 && recipient) {
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
          recipient: recipient,
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
  const isNextEnabled = amount.trim().length > 0 && parseFloat(amount.replace(/,/g, '')) > 0 && recipient !== undefined;

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

  return {
    amount,
    setAmount,
    isNextEnabled,
    fadeAnim,
    handleGoBack,
    handleContinue,
    formatAmount,
    handleInputFocus,
    handleInputBlur,
    handleButtonPressIn,
    handleButtonPressOut,
    inputRef,
    isFocused,
    inputScaleAnim,
    inputBorderAnim,
    recipientCardScale,
    recipientCardTranslate,
    labelTranslate,
    buttonScale,
    buttonOpacity,
    inputBorderColor,
    inputShadowOpacity
  };
};
