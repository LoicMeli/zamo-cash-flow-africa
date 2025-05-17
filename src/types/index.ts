/**
 * Interface pour les informations utilisateur
 */
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  avatar?: string;
  balance: number;
  currency: string;
  isVerified: boolean;
  createdAt: Date;
}

/**
 * Interface pour les transactions
 */
export interface Transaction {
  id: string;
  type: 'SEND' | 'RECEIVE' | 'WITHDRAW' | 'DEPOSIT';
  amount: number;
  currency: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  description: string;
  recipient?: {
    name: string;
    phone: string;
  };
  sender?: {
    name: string;
    phone: string;
  };
  createdAt: Date;
}

/**
 * Interface pour les agents
 */
export interface Agent {
  id: string;
  name: string;
  phone: string;
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
  isAvailable: boolean;
  rating: number;
}

/**
 * Interface pour les portefeuilles familiaux
 */
export interface FamilyWallet {
  id: string;
  name: string;
  owner: User;
  members: User[];
  balance: number;
  currency: string;
  createdAt: Date;
}

/**
 * Interface pour les paramètres de l'application
 */
export interface AppSettings {
  language: string;
  currency: string;
  notifications: {
    transactions: boolean;
    promotions: boolean;
    security: boolean;
  };
  security: {
    biometricEnabled: boolean;
    pinEnabled: boolean;
  };
  theme: 'light' | 'dark';
} 