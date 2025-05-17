import { NavigatorScreenParams } from '@react-navigation/native';
import { Transaction } from './index';

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  Settings: undefined;
  Notifications: undefined;
  SendMoney: undefined;
  SendMoneyAmount: { recipient: { name: string; phone: string } };
  SendMoneyConfirm: { recipient: { name: string; phone: string }; amount: number };
  SendMoneySuccess: { recipient: { name: string; phone: string }; amount: number; reference: string };
  ScanQR: undefined;
  Withdraw: undefined;
  FindAgent: undefined;
  FamilyWallet: undefined;
  FamilyMembers: undefined;
  PersonalScreen: undefined;
  SecurityScreen: undefined;
  Collect: undefined;
  Receive: undefined;
  RequestMoney: undefined;
  AddMoney: undefined;
  CardTopUp: undefined;
  MobileMoneyTopUp: undefined;
  RemoveMoney: undefined;
  MobileMoneyWithdraw: undefined;
  BankWithdraw: undefined;
  AgentWithdraw: undefined;
  ThemeSettings: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  VerifyOTP: { phoneNumber: string };
  SetupPIN: { phoneNumber: string; otp: string };
  ForgotPassword: undefined;
  ResetPassword: { phoneNumber: string; otp: string };
};

export type MainTabParamList = {
  Dashboard: undefined;
  Wallet: undefined;
  Savings: undefined;
  Profile: undefined;
};

export type DashboardStackParamList = {
  DashboardHome: undefined;
  Notifications: undefined;
};

export type WalletStackParamList = {
  WalletHome: undefined;
  SendMoney: undefined;
  ReceiveMoney: undefined;
  ScanQR: undefined;
  WithdrawMoney: undefined;
};

export type TransactionsStackParamList = {
  TransactionsHome: undefined;
  TransactionDetails: { transactionId: string };
};

export type FamilyStackParamList = {
  FamilyHome: undefined;
  AddFamilyMember: undefined;
  FamilyMemberDetails: { memberId: string };
};

export type ProfileStackParamList = {
  ProfileHome: undefined;
  PersonalInfo: undefined;
  SecuritySettings: undefined;
  NotificationsSettings: undefined;
  LanguageSettings: undefined;
  Help: undefined;
};

export type SavingsStackParamList = {
  SavingsHome: undefined;
  CreateSavingsGoal: undefined;
  SavingsDetails: { goalId: string };
}; 