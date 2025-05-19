
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

interface NextButtonProps {
  isEnabled: boolean;
  onPress: () => void;
  onPressIn: () => void;
  onPressOut: () => void;
  animatedStyle: any;
}

export const NextButton: React.FC<NextButtonProps> = ({
  isEnabled,
  onPress,
  onPressIn,
  onPressOut,
  animatedStyle
}) => {
  return (
    <Animated.View style={[styles.nextButtonContainer, animatedStyle]}>
      <TouchableOpacity 
        style={[styles.nextButton, !isEnabled && styles.nextButtonDisabled]}
        onPress={onPress}
        disabled={!isEnabled}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
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
