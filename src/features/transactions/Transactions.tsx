import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { TransactionItem } from '../../components/dashboard/TransactionItem';
import { Button } from '../../components/common/Button';
import { theme } from '../../config/theme';
import { ROUTES } from '../../config/constants';
import { RootStackParamList } from '../../types/navigation';

type TransactionsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

const mockTransactions = [
  {
    id: '1',
    type: 'send',
    amount: 25000,
    recipient: 'John Doe',
    date: '2024-03-20T10:30:00',
  },
  {
    id: '2',
    type: 'receive',
    amount: 50000,
    recipient: 'Jane Smith',
    date: '2024-03-19T15:45:00',
  },
  {
    id: '3',
    type: 'send',
    amount: 15000,
    recipient: 'Mike Johnson',
    date: '2024-03-18T09:15:00',
  },
];

export const Transactions = () => {
  const navigation = useNavigation<TransactionsScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Transactions</Text>
        <Button
          title="Nouvelle transaction"
          onPress={() => navigation.navigate(ROUTES.TRANSACTIONS.SEND)}
          style={styles.newTransactionButton}
        />
      </View>

      <FlatList
        data={mockTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionItem
            type={item.type}
            amount={item.amount}
            recipient={item.recipient}
            date={item.date}
            onPress={() => {}}
          />
        )}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.lg,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  newTransactionButton: {
    marginTop: theme.spacing.md,
  },
  listContainer: {
    padding: theme.spacing.lg,
  },
}); 