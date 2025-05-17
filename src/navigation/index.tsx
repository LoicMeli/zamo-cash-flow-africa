import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { theme } from '../config/theme';
import {
  RootStackParamList,
  AuthStackParamList,
  MainTabParamList,
  DashboardStackParamList,
  WalletStackParamList,
  TransactionsStackParamList,
  FamilyStackParamList,
  ProfileStackParamList,
} from '../types/navigation';

// Auth Screens
import Login from '../features/auth/Login';
import Register from '../features/auth/Register';
import ForgotPassword from '../features/auth/ForgotPassword';
import ResetPassword from '../features/auth/ResetPassword';
import VerifyOTP from '../features/auth/VerifyOTP';

// Dashboard Screens
import Home from '../features/dashboard/Home';
import Notifications from '../features/dashboard/Notifications';

// Wallet Screens
import WalletHome from '../features/wallet/WalletHome';
import SendMoney from '../features/wallet/SendMoney';
import ReceiveMoney from '../features/wallet/ReceiveMoney';
import Withdraw from '../features/wallet/Withdraw';
import Deposit from '../features/wallet/Deposit';
import ScanQR from '../features/wallet/ScanQR';

// Transactions Screens
import TransactionsList from '../features/transactions/TransactionsList';
import TransactionDetails from '../features/transactions/TransactionDetails';
import FindAgent from '../features/transactions/FindAgent';

// Family Screens
import FamilyWallet from '../features/family/FamilyWallet';
import FamilyMembers from '../features/family/FamilyMembers';
import AddMember from '../features/family/AddMember';
import EditMember from '../features/family/EditMember';

// Profile Screens
import ProfileHome from '../features/profile/ProfileHome';
import Settings from '../features/settings/Settings';
import Help from '../features/help/Help';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();
const DashboardStack = createNativeStackNavigator<DashboardStackParamList>();
const WalletStack = createNativeStackNavigator<WalletStackParamList>();
const TransactionsStack = createNativeStackNavigator<TransactionsStackParamList>();
const FamilyStack = createNativeStackNavigator<FamilyStackParamList>();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

const AuthNavigator = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <AuthStack.Screen name="Login" component={Login} />
    <AuthStack.Screen name="Register" component={Register} />
    <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
    <AuthStack.Screen name="ResetPassword" component={ResetPassword} />
    <AuthStack.Screen name="VerifyOTP" component={VerifyOTP} />
  </AuthStack.Navigator>
);

const DashboardNavigator = () => (
  <DashboardStack.Navigator>
    <DashboardStack.Screen name="Home" component={Home} />
    <DashboardStack.Screen name="Notifications" component={Notifications} />
  </DashboardStack.Navigator>
);

const WalletNavigator = () => (
  <WalletStack.Navigator>
    <WalletStack.Screen name="WalletHome" component={WalletHome} />
    <WalletStack.Screen name="SendMoney" component={SendMoney} />
    <WalletStack.Screen name="ReceiveMoney" component={ReceiveMoney} />
    <WalletStack.Screen name="Withdraw" component={Withdraw} />
    <WalletStack.Screen name="Deposit" component={Deposit} />
    <WalletStack.Screen name="ScanQR" component={ScanQR} />
  </WalletStack.Navigator>
);

const TransactionsNavigator = () => (
  <TransactionsStack.Navigator>
    <TransactionsStack.Screen name="TransactionsList" component={TransactionsList} />
    <TransactionsStack.Screen name="TransactionDetails" component={TransactionDetails} />
    <TransactionsStack.Screen name="FindAgent" component={FindAgent} />
  </TransactionsStack.Navigator>
);

const FamilyNavigator = () => (
  <FamilyStack.Navigator>
    <FamilyStack.Screen name="FamilyWallet" component={FamilyWallet} />
    <FamilyStack.Screen name="FamilyMembers" component={FamilyMembers} />
    <FamilyStack.Screen name="AddMember" component={AddMember} />
    <FamilyStack.Screen name="EditMember" component={EditMember} />
  </FamilyStack.Navigator>
);

const ProfileNavigator = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="ProfileHome" component={ProfileHome} />
    <ProfileStack.Screen name="Settings" component={Settings} />
    <ProfileStack.Screen name="Help" component={Help} />
  </ProfileStack.Navigator>
);

const MainNavigator = () => (
  <MainTab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: keyof typeof Ionicons.glyphMap;

        switch (route.name) {
          case 'Dashboard':
            iconName = focused ? 'home' : 'home-outline';
            break;
          case 'Wallet':
            iconName = focused ? 'wallet' : 'wallet-outline';
            break;
          case 'Transactions':
            iconName = focused ? 'list' : 'list-outline';
            break;
          case 'Family':
            iconName = focused ? 'people' : 'people-outline';
            break;
          case 'Profile':
            iconName = focused ? 'person' : 'person-outline';
            break;
          default:
            iconName = 'help-circle-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: theme.colors.primary,
      tabBarInactiveTintColor: theme.colors.textSecondary,
      headerShown: false,
    })}
  >
    <MainTab.Screen name="Dashboard" component={DashboardNavigator} />
    <MainTab.Screen name="Wallet" component={WalletNavigator} />
    <MainTab.Screen name="Transactions" component={TransactionsNavigator} />
    <MainTab.Screen name="Family" component={FamilyNavigator} />
    <MainTab.Screen name="Profile" component={ProfileNavigator} />
  </MainTab.Navigator>
);

const Navigation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer theme={theme.navigationTheme}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <RootStack.Screen name="Main" component={MainNavigator} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation; 