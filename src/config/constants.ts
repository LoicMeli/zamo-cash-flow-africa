
// COLORS
export const COLORS = {
  // Base colors (consistent across themes)
  primary: '#3B5BFE',  // Zamo Blue
  secondary: '#666666',
  success: '#22C55E',
  warning: '#FF9500',
  danger: '#FF3B30',
  info: '#007AFF',
  text: '#1A1A1A',
  background: '#FFFFFF',
  border: '#E5E5E5',
  dark: '#121212',
  white: '#FFFFFF',
  
  // Routes
  ROUTES: {
    MAIN: {
      HOME: 'Home',
      PROFILE: 'Profile',
      WALLET: 'Wallet',
      TRANSACTIONS: 'Transactions'
    },
    SEND: 'SendMoney',
    RECEIVE: 'ReceiveMoney',
    SCAN_QR: 'ScanQR',
    WITHDRAW: 'Withdraw',
    FIND_AGENT: 'FindAgent'
  }
};

// App Routes
export const ROUTES = {
  AUTH: {
    LOGIN: 'Login',
    REGISTER: 'Register',
    VERIFY_OTP: 'VerifyOTP',
    SETUP_PIN: 'SetupPIN'
  },
  MAIN: {
    HOME: 'Home',
    PROFILE: 'Profile',
    WALLET: 'Wallet',
    SEND: 'SendMoney',
    SCAN: 'ScanQR',
    FIND_AGENT: 'FindAgent',
    FAMILY: 'Family',
    SAVINGS: 'Savings',
    SETTINGS: 'Settings'
  },
  SEND: {
    AMOUNT: 'SendMoneyAmount',
    CONFIRM: 'SendMoneyConfirm',
    SUCCESS: 'SendMoneySuccess'
  },
  FAMILY: {
    MEMBERS: 'FamilyMembers',
    ADD_MEMBER: 'AddFamilyMember',
    SETTINGS: 'FamilySettings'
  }
};

// App Constants
export const APP_CONSTANTS = {
  APP_NAME: 'Zamo',
  CURRENCY: 'FCFA',
  MAX_TRANSACTION_AMOUNT: 1000000,
  MIN_TRANSACTION_AMOUNT: 100,
  TRANSACTION_FEE_PERCENT: 1,
  API_BASE_URL: 'https://api.zamoapp.com/v1'
};

// App Limits
export const LIMITS = {
  PIN_LENGTH: 4,
  OTP_LENGTH: 6,
  MAX_PIN_ATTEMPTS: 3,
  PASSWORD_MIN_LENGTH: 8
};
