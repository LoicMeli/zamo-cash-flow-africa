
export type TransactionType = 'SEND' | 'RECEIVE' | 'WITHDRAW' | 'DEPOSIT' | 'OTHER';
export type TransactionStatus = 'COMPLETED' | 'PENDING' | 'FAILED' | 'CANCELLED';

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  description: string;
  recipient?: {
    name: string;
    phone: string;
  };
  sender?: {
    name: string;
    phone: string;
  };
  fee?: number;
  reference?: string;
  createdAt: string;
  updatedAt?: string;
}

export type Language = 'en' | 'fr' | 'camfran';
