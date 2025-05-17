import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../config/theme';

interface BalanceCardProps {
  balance: number;
  onPress?: () => void;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ balance, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <Text style={styles.label}>Solde disponible</Text>
        <Text style={styles.balance}>{balance.toLocaleString()} FCFA</Text>
      </View>
      <Ionicons name="eye-outline" size={24} color={theme.colors.text} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
  },
  label: {
    color: theme.colors.light,
    fontSize: theme.typography.body.fontSize,
    marginBottom: theme.spacing.xs,
  },
  balance: {
    color: theme.colors.light,
    fontSize: 32,
    fontWeight: 'bold',
  },
}); 