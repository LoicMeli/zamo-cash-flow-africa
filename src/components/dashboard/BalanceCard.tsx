
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../config/constants';

interface BalanceCardProps {
  balance: number;
  onShowBalance?: () => void;
  isBalanceHidden?: boolean;
  onPress?: () => void;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ 
  balance, 
  onShowBalance,
  isBalanceHidden = false,
  onPress 
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <Text style={styles.label}>Available balance</Text>
        <Text style={styles.balance}>
          {isBalanceHidden ? '••••••' : `${balance.toLocaleString()} FCFA`}
        </Text>
      </View>
      <TouchableOpacity onPress={onShowBalance}>
        <Text style={{ fontSize: 24, color: '#FFFFFF' }}>👁️</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 4,
  },
  balance: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
});
