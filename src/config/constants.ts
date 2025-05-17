/**
 * Configuration des routes de l'application
 */
export const ROUTES = {
  AUTH: {
    LOGIN: 'Login',
    OTP: 'OTPVerification',
    SETUP_PIN: 'SetupPIN',
  },
  MAIN: {
    DASHBOARD: 'Dashboard',
    WALLET: 'Wallet',
    SAVINGS: 'Savings',
    PROFILE: 'Profile',
  },
  TRANSACTIONS: {
    SEND: 'SendMoney',
    SCAN: 'ScanQR',
    WITHDRAW: 'Withdraw',
    FIND_AGENT: 'FindAgent',
  },
  FAMILY: {
    WALLET: 'FamilyWallet',
    MEMBERS: 'FamilyMembers',
  },
  PROFILE: {
    PERSONAL: 'PersonalScreen',
    SECURITY: 'SecurityScreen',
    THEME: 'ThemeSettings',
    NOTIFICATIONS: 'Notifications',
    LANGUAGE: 'Settings',
    HELP: 'Settings',
  },
  SETTINGS: 'Settings',
  NOTIFICATIONS: 'Notifications',
};

/**
 * Configuration des couleurs de l'application
 */
export const COLORS = {
  primary: '#007AFF',
  secondary: '#5856D6',
  success: '#34C759',
  danger: '#FF3B30',
  warning: '#FF9500',
  info: '#5AC8FA',
  light: '#F2F2F7',
  dark: '#1C1C1E',
  background: '#FFFFFF',
  text: '#000000',
  border: '#C7C7CC',
  error: '#FF3B30',
};

/**
 * Configuration des messages de l'application
 */
export const MESSAGES = {
  ERRORS: {
    NETWORK: 'Erreur de connexion. Veuillez vérifier votre connexion internet.',
    AUTH: 'Identifiants incorrects. Veuillez réessayer.',
    OTP: 'Code OTP incorrect. Veuillez réessayer.',
    PIN: 'Code PIN incorrect. Veuillez réessayer.',
    GENERIC: 'Une erreur est survenue. Veuillez réessayer.',
  },
  SUCCESS: {
    LOGIN: 'Connexion réussie !',
    OTP: 'Code OTP vérifié avec succès !',
    PIN: 'Code PIN configuré avec succès !',
    TRANSACTION: 'Transaction effectuée avec succès !',
  },
};

/**
 * Configuration des limites de l'application
 */
export const LIMITS = {
  TRANSACTION: {
    MIN: 1000,
    MAX: 1000000,
  },
  PIN_LENGTH: 4,
  OTP_LENGTH: 6,
  PHONE_LENGTH: 9,
};

/**
 * Configuration des délais de l'application
 */
export const TIMEOUTS = {
  OTP_EXPIRY: 300, // 5 minutes en secondes
  SESSION: 3600, // 1 heure en secondes
  ANIMATION: 300, // 300ms
};

export const APP_NAME = 'Zamo Cash Flow Africa';

export const STORAGE_KEYS = {
  AUTH_TOKEN: '@zamo/auth_token',
  USER_DATA: '@zamo/user_data',
  SETTINGS: '@zamo/settings',
  LANGUAGE: '@zamo/language',
  THEME: '@zamo/theme',
} as const;

export const TRANSACTION_TYPES = {
  SEND: 'send',
  RECEIVE: 'receive',
  WITHDRAW: 'withdraw',
  DEPOSIT: 'deposit',
} as const;

export const TRANSACTION_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
} as const;

export const FAMILY_ROLES = {
  PARENT: 'parent',
  CHILD: 'child',
  SPOUSE: 'spouse',
  SIBLING: 'sibling',
} as const;

export const SUPPORTED_LANGUAGES = {
  FR: 'fr',
  EN: 'en',
  AR: 'ar',
  SW: 'sw',
} as const;

export const DEFAULT_LANGUAGE = SUPPORTED_LANGUAGES.FR;

export const CURRENCY = {
  CODE: 'XOF',
  SYMBOL: 'FCFA',
  DECIMAL_PLACES: 0,
};

export const TRANSACTION_LIMITS = {
  MIN_AMOUNT: 1000,
  MAX_AMOUNT: 500000,
  DAILY_LIMIT: 1000000,
  MONTHLY_LIMIT: 5000000,
};

export const SECURITY = {
  MAX_LOGIN_ATTEMPTS: 3,
  OTP_EXPIRY_MINUTES: 5,
  SESSION_TIMEOUT_MINUTES: 30,
};

export const API_ENDPOINTS = {
  BASE_URL: 'https://api.zamo.cash',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
  },
  TRANSACTIONS: {
    LIST: '/transactions',
    CREATE: '/transactions',
    DETAILS: '/transactions/:id',
  },
  WALLET: {
    BALANCE: '/wallet/balance',
    HISTORY: '/wallet/history',
  },
  FAMILY: {
    MEMBERS: '/family/members',
    ADD_MEMBER: '/family/members',
    REMOVE_MEMBER: '/family/members/:id',
  },
  PROFILE: {
    UPDATE: '/profile',
    CHANGE_PASSWORD: '/profile/password',
    UPLOAD_PHOTO: '/profile/photo',
  },
  SETTINGS: {
    UPDATE: '/settings',
    NOTIFICATIONS: '/settings/notifications',
    LANGUAGE: '/settings/language',
  },
}; 