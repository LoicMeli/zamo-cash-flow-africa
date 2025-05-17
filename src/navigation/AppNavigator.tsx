import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../config/constants';
import { RootStackParamList } from '../types/navigation';
import { useTheme } from '../theme/ThemeContext';
import { COLORS } from '../theme/colors';
import { ThemedBottomTabs } from './ThemedBottomTabs';

// Auth Screens
import { AuthNavigator } from './AuthNavigator';

// Transaction Screens
import { SendMoney } from '../features/transactions/SendMoney';
import { ScanQR } from '../features/transactions/ScanQR';
import { Withdraw } from '../features/transactions/Withdraw';
import { FindAgent } from '../features/transactions/FindAgent';
import { SendMoneyAmount } from '../features/transactions/SendMoneyAmount';
import { SendMoneyConfirm } from '../features/transactions/SendMoneyConfirm';
import { SendMoneySuccess } from '../features/transactions/SendMoneySuccess';

// Family Screens
import { FamilyWallet } from '../features/family/FamilyWallet';
import { FamilyMembers } from '../features/family/FamilyMembers';

// Profile Screens
import { PersonalScreen } from '../features/profile/PersonalScreen';
import { SecurityScreen } from '../features/profile/SecurityScreen';
import { ThemeSettings } from '../features/profile/ThemeSettings';

// Settings
import { Settings } from '../features/settings/Settings';
import { Notifications } from '../features/notifications/Notifications';

// New Screens
import { Collect } from '../features/wallet/Collect';
import { Receive } from '../features/dashboard/Receive';
import { RequestMoney } from '../features/wallet/RequestMoney';
import { AddMoney } from '../features/wallet/AddMoney';
import { CardTopUp } from '../features/wallet/topup/CardTopUp';
import { MobileMoneyTopUp } from '../features/wallet/topup/MobileMoneyTopUp';
import { RemoveMoney } from '../features/wallet/RemoveMoney';
import { MobileMoneyWithdraw } from '../features/wallet/withdraw/MobileMoneyWithdraw';
import { BankWithdraw } from '../features/wallet/withdraw/BankWithdraw';
import { AgentWithdraw } from '../features/wallet/withdraw/AgentWithdraw';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const { colors, isDarkMode } = useTheme();
  
  // Create navigation theme based on current theme
  const navigationTheme = {
    dark: isDarkMode,
    colors: {
      primary: colors.text,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
      notification: COLORS.danger,
    },
  };
  
  return (
    <NavigationContainer
      theme={navigationTheme}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="Main" component={ThemedBottomTabs} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="SendMoney" component={SendMoney} />
        <Stack.Screen name="SendMoneyAmount" component={SendMoneyAmount} />
        <Stack.Screen name="SendMoneyConfirm" component={SendMoneyConfirm} />
        <Stack.Screen name="SendMoneySuccess" component={SendMoneySuccess} />
        <Stack.Screen name="ScanQR" component={ScanQR} />
        <Stack.Screen name="Withdraw" component={Withdraw} />
        <Stack.Screen name="FindAgent" component={FindAgent} />
        <Stack.Screen name="FamilyWallet" component={FamilyWallet} />
        <Stack.Screen name="FamilyMembers" component={FamilyMembers} />
        <Stack.Screen name="PersonalScreen" component={PersonalScreen} />
        <Stack.Screen name="SecurityScreen" component={SecurityScreen} />
        <Stack.Screen name="Collect" component={Collect} />
        <Stack.Screen name="Receive" component={Receive} />
        <Stack.Screen name="RequestMoney" component={RequestMoney} />
        <Stack.Screen name="AddMoney" component={AddMoney} />
        <Stack.Screen name="CardTopUp" component={CardTopUp} />
        <Stack.Screen name="MobileMoneyTopUp" component={MobileMoneyTopUp} />
        <Stack.Screen name="RemoveMoney" component={RemoveMoney} />
        <Stack.Screen name="MobileMoneyWithdraw" component={MobileMoneyWithdraw} />
        <Stack.Screen name="BankWithdraw" component={BankWithdraw} />
        <Stack.Screen name="AgentWithdraw" component={AgentWithdraw} />
        <Stack.Screen name="ThemeSettings" component={ThemeSettings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}; 