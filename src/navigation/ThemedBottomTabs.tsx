
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '../theme/ThemeContext';
import { COLORS } from '../theme/colors';
import { MainTabParamList } from '../types/navigation';
import { Icon } from '../utils/IconComponent';

// Screens
import { Dashboard } from '../features/dashboard/Dashboard';
import { Transactions } from '../features/transactions/Transactions';
import { Profile } from '../features/profile/Profile';
import { Receive } from '../features/dashboard/Receive';

const MainTab = createBottomTabNavigator<MainTabParamList>();

export const ThemedBottomTabs = () => {
  const { colors, isDarkMode } = useTheme();
  
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.secondary,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: colors.border,
          backgroundColor: colors.card,
          paddingTop: 8,
          paddingBottom: 8,
          height: 60,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginBottom: 4,
        },
      }}
    >
      <MainTab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <MainTab.Screen
        name="Wallet"
        component={Dashboard} // Temporarily use Dashboard as a placeholder
        options={{
          tabBarLabel: 'Vault',
          tabBarIcon: ({ color, size }) => (
            <Icon name="wallet" size={size} color={color} />
          ),
        }}
      />
      <MainTab.Screen
        name="Transactions"
        component={Transactions}
        options={{
          tabBarLabel: 'Transactions',
          tabBarIcon: ({ color, size }) => (
            <Icon name="list" size={size} color={color} />
          ),
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" size={size} color={color} />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};
