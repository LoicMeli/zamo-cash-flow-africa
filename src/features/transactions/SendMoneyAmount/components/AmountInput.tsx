
import React from 'react';
import { View, TextInput, Text, StyleSheet, Animated } from 'react-native';

interface AmountInputProps {
  amount: string;
  onChangeAmount: (text: string) => void;
  inputRef: React.RefObject<TextInput>;
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  inputScaleAnim: Animated.Value;
  inputBorderColor: Animated.AnimatedInterpolation<string | number>;
  inputShadowOpacity: Animated.AnimatedInterpolation<string | number>;
}

export const AmountInput: React.FC<AmountInputProps> = ({
  amount,
  onChangeAmount,
  inputRef,
  onFocus,
  onBlur,
  inputScaleAnim,
  inputBorderColor,
  inputShadowOpacity,
}) => {
  return (
    <Animated.View style={{ transform: [{ scale: inputScaleAnim }] }}>
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
          onChangeText={onChangeAmount}
          keyboardType="numeric"
          placeholder="0"
          placeholderTextColor="#565656"
          textAlign="center"
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <Text style={styles.currencyText}>FCFA</Text>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
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
});
