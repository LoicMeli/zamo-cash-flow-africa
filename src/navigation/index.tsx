
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '../utils/IconComponent';

import { theme } from '../config/theme';
import { RootStackParamList, AuthStackParamList, MainTabParamList } from '../types/navigation';

// Auth Screens
import { LoginScreen } from '../features/auth/Login';
import { RegisterScreen } from '../features/auth/Register';
import { OTPVerification } from '../features/auth/OTPVerification';
import { SetupPIN } from '../features/auth/SetupPIN';

// Use our AuthNavigator from src/navigation/AuthNavigator.tsx
import { AuthNavigator } from './AuthNavigator';
import { ThemedBottomTabs } from './ThemedBottomTabs';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <RootStack.Screen name="Main" component={ThemedBottomTabs} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
