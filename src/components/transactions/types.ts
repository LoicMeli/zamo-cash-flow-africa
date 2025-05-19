
// Add the transactionType property to the TransactionItemProps interface
export interface TransactionItemProps {
  transactionType: string;
  type: string;
  amount: number;
  recipient: string;
  date: string;
  onPress: () => void;
}

export interface Transaction {
  id: string;
  type: string;
  amount: number;
  name?: string;
  recipient?: string;
  date: Date | string;
  avatar?: string;
  user?: {
    name: string;
    avatar?: string;
  };
}
