
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '../../utils/IconComponent';
import { COLORS } from '../../theme/colors';

export interface TransactionItemProps {
  transactionType: string;
  type: string;
  amount: number;
  recipient: string;
  date: string;
  onPress: () => void;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  transactionType,
  type,
  amount,
  recipient,
  date,
  onPress,
}) => {
  const getTransactionIcon = () => {
    switch (type) {
      case 'send':
        return 'arrow-up';
      case 'receive':
        return 'arrow-down';
      default:
        return 'swap-horizontal';
    }
  };

  const getTransactionColor = () => {
    switch (type) {
      case 'send':
        return COLORS.primary;
      case 'receive':
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
            { color: type === 'receive' ? '#28a745' : '#dc3545' }
          ]}
        >
          {type === 'receive' ? '+' : '-'} {amount} FCFA
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
