
export const COLORS = {
  primary: '#3B5BFE',
  secondary: '#666666',
  success: '#4CAF50',
  warning: '#FF9800',
  danger: '#F44336',
  info: '#2196F3',
  white: '#FFFFFF',
  black: '#000000',
  background: '#F5F7FA',
  dark: '#121212',
  text: '#333333',
  border: '#E0E0E0',
  placeholder: '#AAAAAA',
  disabled: '#DDDDDD',
  badge: '#FF3B30',
  ROUTES: {
    MAIN: {
      HOME: 'Home',
      PROFILE: 'Profile',
      WALLET: 'Wallet',
      TRANSACTIONS: 'Transactions',
    },
    AUTH: {
      LOGIN: 'Login',
      REGISTER: 'Register',
      VERIFY_OTP: 'VerifyOTP',
      SETUP_PIN: 'SetupPIN',
    },
    SEND: {
      SEND_MONEY: 'SendMoney',
      SEND_TO: 'SendTo',
      SEND_CONFIRM: 'SendConfirm',
      SEND_SUCCESS: 'SendSuccess',
    },
    SCAN: 'ScanQR',
    FIND_AGENT: 'FindAgent',
    FAMILY: {
      MEMBERS: 'FamilyMembers',
      SETTINGS: 'FamilySettings',
      WALLET: 'FamilyWallet',
    },
  }
};

export const LIMITS = {
  PIN_LENGTH: 4,
  OTP_LENGTH: 6,
  MAX_TRANSFER_AMOUNT: 5000000,
};

export const theme = {
  colors: {
    primary: '#3B5BFE',
    secondary: '#666666',
    success: '#4CAF50',
    warning: '#FF9800',
    danger: '#F44336',
    info: '#2196F3',
    white: '#FFFFFF',
    black: '#000000',
    text: '#333333',
    background: '#F5F7FA',
    light: {
      background: '#F5F7FA',
      surface: '#FFFFFF',
      card: '#FFFFFF',
      text: '#333333',
      textSecondary: '#666666',
      border: '#E0E0E0',
      input: '#F5F7FA',
      icon: '#666666',
      divider: '#E0E0E0',
      disabled: '#DDDDDD',
      overlay: 'rgba(0,0,0,0.1)',
      cardGradient: 'linear-gradient(135deg, #FFFFFF 0%, #F5F7FA 100%)',
      buttonGradient: {
        start: '#3B5BFE',
        end: '#2C4BD0',
      }
    },
    dark: {
      background: '#121212',
      surface: '#1E1E1E',
      card: '#2C2C2C',
      text: '#FFFFFF',
      textSecondary: '#AAAAAA',
      border: '#333333',
      input: '#2C2C2C',
      icon: '#AAAAAA',
      divider: '#333333',
      disabled: '#444444',
      overlay: 'rgba(0,0,0,0.3)',
      cardGradient: 'linear-gradient(135deg, #2C2C2C 0%, #1E1E1E 100%)',
      buttonGradient: {
        start: '#3B5BFE',
        end: '#2C4BD0',
      }
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
  },
  typography: {
    h1: {
      fontSize: 24,
      lineHeight: 32,
      fontFamily: 'System',
      fontWeight: 'bold',
    },
    h2: {
      fontSize: 20,
      lineHeight: 28,
      fontFamily: 'System',
      fontWeight: 'bold',
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
      fontFamily: 'System',
      fontWeight: '400',
    },
    caption: {
      fontSize: 12,
      lineHeight: 16,
      fontFamily: 'System',
      fontWeight: '400',
    }
  },
};

export const ROUTES = {
  MAIN: {
    HOME: 'Home',
    PROFILE: 'Profile',
    WALLET: 'Wallet',
    SEND: 'SendMoney',
    SCAN: 'ScanQR',
    FIND_AGENT: 'FindAgent',
    FAMILY: 'FamilyWallet',
    SAVINGS: 'Savings',
    SETTINGS: 'Settings',
    DASHBOARD: 'Dashboard',
  },
  AUTH: {
    LOGIN: 'Login',
    REGISTER: 'Register',
    VERIFY_OTP: 'VerifyOTP',
    SETUP_PIN: 'SetupPIN',
  },
  SEND: {
    AMOUNT: 'SendMoneyAmount',
    CONFIRM: 'SendMoneyConfirm',
    SUCCESS: 'SendMoneySuccess',
  },
  FAMILY: {
    MEMBERS: 'FamilyMembers',
    SETTINGS: 'FamilySettings',
    WALLET: 'FamilyWallet',
  },
};
