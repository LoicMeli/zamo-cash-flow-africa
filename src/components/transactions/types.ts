
// Add the transactionType property to the TransactionItemProps interface
export interface TransactionItemProps {
  transactionType?: string;
  type?: string;
  amount: number;
  recipient: string;
  date: string;
  onPress: () => void;
}
