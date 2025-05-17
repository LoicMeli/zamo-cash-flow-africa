import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types/navigation';
import { LoginScreen } from '../features/auth/Login';
import { RegisterScreen } from '../features/auth/Register';
import { OTPVerification } from '../features/auth/OTPVerification';
import { SetupPIN } from '../features/auth/SetupPIN';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => (
  <AuthStack.Navigator 
    screenOptions={{ 
      headerShown: false,
      animation: 'slide_from_right',
      gestureEnabled: true, // Enable swipe back gesture
      animationDuration: 300, // Animation duration in milliseconds
      contentStyle: {
        backgroundColor: '#10131A' // Dark background for consistent transitions
      }
    }}
  >
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Register" component={RegisterScreen} />
    <AuthStack.Screen name="VerifyOTP" component={OTPVerification} />
    <AuthStack.Screen name="SetupPIN" component={SetupPIN} />
    <AuthStack.Screen name="ForgotPassword" component={LoginScreen} />
    <AuthStack.Screen name="ResetPassword" component={SetupPIN} />
  </AuthStack.Navigator>
); 