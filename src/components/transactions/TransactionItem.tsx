
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '../../utils/IconComponent';
import { COLORS } from '../../config/constants';
import { Transaction } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';

interface TransactionItemProps {
  transaction: Transaction;
  onPress?: () => void;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  onPress,
}) => {
  const getTransactionIcon = () => {
    switch (transaction.type) {
      case 'SEND':
        return 'arrow-up';
      case 'RECEIVE':
        return 'arrow-down';
      case 'WITHDRAW':
        return 'cash-outline';
      case 'DEPOSIT':
        return 'cash-outline';
      default:
        return 'swap-horizontal';
    }
  };

  const getTransactionColor = () => {
    switch (transaction.type) {
      case 'SEND':
        return COLORS.danger;
      case 'RECEIVE':
        return COLORS.success;
      case 'WITHDRAW':
        return COLORS.warning;
      case 'DEPOSIT':
        return COLORS.info;
      default:
        return COLORS.secondary;
    }
  };

  const getTransactionPrefix = () => {
    switch (transaction.type) {
      case 'SEND':
        return '-';
      case 'RECEIVE':
        return '+';
      default:
        return '';
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: getTransactionColor() + '20' }]}>
        <Icon name={getTransactionIcon()} size={20} color={getTransactionColor()} />
      </View>
      <View style={styles.details}>
        <Text style={styles.description}>{transaction.description}</Text>
        <Text style={styles.date}>{formatDate(transaction.createdAt)}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={[styles.amount, { color: getTransactionColor() }]}>
          {getTransactionPrefix()}{formatCurrency(transaction.amount)} FCFA
        </Text>
        <Text style={styles.status}>{transaction.status}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  description: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: COLORS.secondary,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  status: {
    fontSize: 12,
    color: COLORS.secondary,
    textTransform: 'capitalize',
  },
});
