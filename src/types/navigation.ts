
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
};
