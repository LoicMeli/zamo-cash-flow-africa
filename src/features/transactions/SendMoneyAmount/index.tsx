
import React from 'react';
import { SafeAreaView, Animated, Keyboard, Pressable, View } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import { Header } from './components/Header';
import { RecipientCard } from './components/RecipientCard';
import { AmountInput } from './components/AmountInput';
import { NextButton } from './components/NextButton';
import { useSendMoneyAmount } from './hooks/useSendMoneyAmount';
import { styles } from './styles';

type SendMoneyAmountScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type SendMoneyAmountScreenRouteProp = RouteProp<RootStackParamList, 'SendMoneyAmount'>;

export const SendMoneyAmount = () => {
  const navigation = useNavigation<SendMoneyAmountScreenNavigationProp>();
  const route = useRoute<SendMoneyAmountScreenRouteProp>();
  const { recipient } = route.params || { recipient: undefined };
  
  const {
    amount,
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
    inputShadowOpacity,
    setAmount
  } = useSendMoneyAmount(navigation, recipient);

  // Guard against undefined recipient
  if (!recipient) {
    return <Header title="Error: No recipient specified" onGoBack={handleGoBack} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
        <Header title="Send Money" onGoBack={handleGoBack} />
        
        <Pressable 
          style={styles.contentContainer}
          onPress={() => Keyboard.dismiss()}
        >
          <RecipientCard 
            recipient={recipient} 
            animatedStyle={{ 
              transform: [
                { scale: recipientCardScale },
                { translateY: recipientCardTranslate }
              ]
            }}
          />
          
          <View style={styles.amountContainer}>
            <Animated.Text 
              style={[
                styles.amountLabel,
                { transform: [{ translateY: labelTranslate }] }
              ]}
            >
              Amount
            </Animated.Text>
            
            <AmountInput 
              amount={amount}
              onChangeAmount={formatAmount}
              inputRef={inputRef}
              isFocused={isFocused}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              inputScaleAnim={inputScaleAnim}
              inputBorderColor={inputBorderColor}
              inputShadowOpacity={inputShadowOpacity}
            />
          </View>
          
          <NextButton 
            isEnabled={isNextEnabled}
            onPress={handleContinue}
            onPressIn={handleButtonPressIn}
            onPressOut={handleButtonPressOut}
            animatedStyle={{ 
              opacity: buttonOpacity,
              transform: [{ scale: buttonScale }]
            }}
          />
        </Pressable>
      </Animated.View>
    </SafeAreaView>
  );
};
