
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '../theme/ThemeContext';
import { COLORS } from '../theme/colors';
import { MainTabParamList } from '../types/navigation';
import { Icon } from '../components/common/Icon';

// Screens
import { Dashboard } from '../features/dashboard/Dashboard';
import { Vault } from '../features/vault/Vault';
import { Savings } from '../features/savings/Savings';
import { Profile } from '../features/profile/Profile';

const MainTab = createBottomTabNavigator<MainTabParamList>();

export const ThemedBottomTabs = () => {
  const { colors, isDarkMode } = useTheme();
  
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: colors.textSecondary,
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
        component={Vault}
        options={{
          tabBarLabel: 'Vault',
          tabBarIcon: ({ color, size }) => (
            <Icon name="wallet" size={size} color={color} />
          ),
        }}
      />
      <MainTab.Screen
        name="Savings"
        component={Savings}
        options={{
          tabBarLabel: 'Épargne',
          tabBarIcon: ({ color, size }) => (
            <Icon name="save" size={size} color={color} />
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
