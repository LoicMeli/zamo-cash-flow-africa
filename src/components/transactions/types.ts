
export type Transaction = {
  id: string;
  type: 'send' | 'receive' | 'payment' | 'deposit' | 'withdrawal';
  amount: number;
  name?: string;
  date: Date;
  avatar?: string;
  fee?: number;
  status?: string;
  user?: {
    name: string;
    phone: string;
  };
};

export interface TransactionListProps {
  className?: string;
  limit?: number;
  transactions?: Transaction[];
}
