
import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../config/constants';
import { ROUTES } from '../../config/constants';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { BalanceCard } from '../../components/wallet/BalanceCard';
import { QuickActions } from '../../components/dashboard/QuickActions';
import { TransactionList } from '../../components/transactions/TransactionList';
import { Transaction } from '../../types';

// Données de test
const MOCK_USER = {
  firstName: 'John',
  lastName: 'Doe',
  balance: 250000,
};

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    type: 'RECEIVE',
    amount: 50000,
    currency: 'FCFA',
    status: 'COMPLETED',
    description: 'Reçu de Marie',
    sender: {
      name: 'Marie',
      phone: '612345678',
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    type: 'SEND',
    amount: 25000,
    currency: 'FCFA',
    status: 'COMPLETED',
    description: 'Envoyé à Pierre',
    recipient: {
      name: 'Pierre',
      phone: '623456789',
    },
    createdAt: new Date().toISOString(),
  },
];

export const Dashboard: React.FC = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simuler un chargement
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleTransactionPress = (transaction: Transaction) => {
    // Navigation vers les détails de la transaction
    console.log('Transaction pressed:', transaction);
  };

  const handleProfilePress = () => {
    // Use an explicit type for the navigation object and use correct navigation approach
    navigation.navigate('Profile' as any);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[COLORS.primary]}
          tintColor={COLORS.primary}
        />
      }
    >
      <DashboardHeader
        userName={`${MOCK_USER.firstName} ${MOCK_USER.lastName}`}
        onProfilePress={handleProfilePress}
      />
      <BalanceCard
        balance={MOCK_USER.balance}
        onShowBalance={() => setIsBalanceHidden(!isBalanceHidden)}
        isBalanceHidden={isBalanceHidden}
      />
      <QuickActions />
      <TransactionList
        transactions={MOCK_TRANSACTIONS}
        onRefresh={onRefresh}
        refreshing={refreshing}
        onTransactionPress={handleTransactionPress}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 16,
  },
}); 
