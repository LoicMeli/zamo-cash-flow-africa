import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '../../utils/IconComponent';
import { COLORS } from '../../theme/colors';
import { Transaction } from '../../types';

export interface TransactionItemProps {
  transaction: Transaction;
  onPress: () => void;
  // Keeping other props for backward compatibility
  transactionType?: string;
  type?: string;
  amount?: number;
  recipient?: string;
  date?: string;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  onPress,
  // Default values from transaction if direct props not provided
  type = transaction?.type.toLowerCase(),
  amount = transaction?.amount,
  recipient = transaction?.recipient?.name || 'Unknown',
  date = transaction?.createdAt,
}) => {
  const getTransactionIcon = () => {
    switch (type) {
      case 'send':
      case 'SEND':
        return 'arrow-up';
      case 'receive':
      case 'RECEIVE':
        return 'arrow-down';
      default:
        return 'swap-horizontal';
    }
  };

  const getTransactionColor = () => {
    switch (type) {
      case 'send':
      case 'SEND':
        return COLORS.primary;
      case 'receive':
      case 'RECEIVE':
        return '#28a745';
      default:
        return '#6c757d';
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View 
        style={[
          styles.iconContainer, 
          { backgroundColor: `${getTransactionColor()}20` }
        ]}
      >
        <Icon name={getTransactionIcon()} size={24} color={getTransactionColor()} />
      </View>
      <View style={styles.details}>
        <Text style={styles.recipient}>{recipient}</Text>
        <Text style={styles.date}>{new Date(date).toLocaleDateString()}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text 
          style={[
            styles.amount, 
            { color: type.toLowerCase() === 'receive' ? '#28a745' : '#dc3545' }
          ]}
        >
          {type.toLowerCase() === 'receive' ? '+' : '-'} {amount} FCFA
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  recipient: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#6c757d',
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
  },
});
