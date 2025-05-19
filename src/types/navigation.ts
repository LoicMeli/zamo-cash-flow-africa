export type RootStackParamList = {
  Main: undefined;
  SendMoney: undefined;
  SendMoneyAmount: {
    recipient?: {
      name: string;
      phone: string;
    };
  };
  SendMoneyConfirm: {
    recipient: {
      name: string;
      phone: string;
    };
    amount: number;
  };
  SendMoneySuccess: {
    recipient: {
      name: string;
      phone: string;
    };
    amount: number;
    reference: string;
  };
  ScanQR: undefined;
  Withdraw: undefined;
  FindAgent: undefined;
  Settings: undefined;
  FamilyMembers: undefined;
  Notifications: undefined;
  FamilyWallet: undefined;
  PersonalScreen: undefined;
  SecurityScreen: undefined;
  ThemeSettings: undefined;
  SavingsDetail: undefined;
  AddContact: undefined;
  NotificationSettings: undefined;
  Referral: undefined;
  BecomeAgent: undefined;
  AgentSpace: undefined;
  GroupSavings: undefined;
  FamilyBills: undefined;
  FinancialCoach: undefined;
  Wallet: undefined;
  WithdrawDetails: undefined;
  TopUp: undefined;
  TopUpMethod: undefined;
  FamilySettings: undefined;
  Savings: undefined;
  Profile: undefined;
  NotFound: undefined;
  Dashboard: undefined;
  CardTopUp: undefined;
  MobileMoneyTopUp: undefined;
  RequestMoney: undefined;
  MobileMoneyWithdraw: undefined;
  BankWithdraw: undefined;
  AgentWithdraw: undefined;
  TransactionsList: undefined;
  ReceiveMoney: undefined;
  Deposit: undefined;
  Collect: undefined;
  RemoveMoney: undefined;
  AddMoney: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
  Transactions: undefined;
  Auth: {
    screen: string;
    params?: any;
  };
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  VerifyOTP: { phoneNumber: string };
  SetupPIN: { phoneNumber: string; otp?: string };
  ForgotPassword: undefined;
  ResetPassword: undefined;
};

export type MainTabParamList = {
  Dashboard: undefined;
  Wallet: undefined;
  Transactions: undefined;
  Family: undefined;
  Profile: undefined;
  Savings: undefined;
  ReceiveMoney: undefined; // Added this to fix the type error
};

// These types are needed for nested navigators
export type DashboardStackParamList = {
  Home: undefined;
  Notifications: undefined;
};

export type WalletStackParamList = {
  WalletHome: undefined;
  SendMoney: undefined;
  ReceiveMoney: undefined;
  Withdraw: undefined;
  Deposit: undefined;
  ScanQR: undefined;
};

export type TransactionsStackParamList = {
  TransactionsList: undefined;
  TransactionDetails: undefined;
  FindAgent: undefined;
};

export type FamilyStackParamList = {
  FamilyWallet: undefined;
  FamilyMembers: undefined;
  AddMember: undefined;
  EditMember: undefined;
};

export type ProfileStackParamList = {
  ProfileHome: undefined;
  Settings: undefined;
  Help: undefined;
};
