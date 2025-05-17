
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '../../utils/IconComponent';
import { COLORS } from '../../config/constants';
import { formatCurrency } from '../../utils/formatters';

interface BalanceCardProps {
  balance: number;
  currency?: string;
  onShowBalance?: () => void;
  isBalanceHidden?: boolean;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  balance,
  currency = 'FCFA',
  onShowBalance,
  isBalanceHidden = false,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Solde disponible</Text>
        <TouchableOpacity onPress={onShowBalance} style={styles.eyeButton}>
          <Icon
            name={isBalanceHidden ? 'eye-off' : 'eye'}
            size={24}
            color={COLORS.secondary}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.balance}>
        {isBalanceHidden ? '••••••••' : `${formatCurrency(balance)} ${currency}`}
      </Text>
      <View style={styles.footer}>
        <View style={styles.statContainer}>
          <Text style={styles.statLabel}>Revenus</Text>
          <Text style={[styles.statValue, { color: COLORS.success }]}>
            +{formatCurrency(150000)} {currency}
          </Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.statLabel}>Dépenses</Text>
          <Text style={[styles.statValue, { color: COLORS.danger }]}>
            -{formatCurrency(75000)} {currency}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: COLORS.dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    color: COLORS.secondary,
    fontWeight: '500',
  },
  eyeButton: {
    padding: 4,
  },
  balance: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 16,
  },
  statContainer: {
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.secondary,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
  },
});
