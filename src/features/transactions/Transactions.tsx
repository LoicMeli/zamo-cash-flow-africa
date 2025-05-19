import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '../../components/common/Icon';
import { TransactionItem } from '../../components/dashboard/TransactionItem';
import { Button } from '../../components/common/Button';
import { theme } from '../../config/theme';
import { RootStackParamList } from '../../types/navigation';
import { useTheme } from '../../theme/ThemeContext';
import { COLORS } from '../../theme/colors';

type TransactionsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

const mockTransactions = [
  {
    id: '1',
    transactionType: 'send',
    type: 'send',
    amount: 25000,
    recipient: 'John Doe',
    date: '2024-03-20T10:30:00',
  },
  {
    id: '2',
    transactionType: 'receive',
    type: 'receive',
    amount: 50000,
    recipient: 'Jane Smith',
    date: '2024-03-19T15:45:00',
  },
  {
    id: '3',
    transactionType: 'send',
    type: 'send',
    amount: 15000,
    recipient: 'Mike Johnson',
    date: '2024-03-18T09:15:00',
  },
];

export const Transactions = () => {
  const navigation = useNavigation<TransactionsScreenNavigationProp>();
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.light.background }]}>
      <View style={styles.header}>
        <Text style={{ 
          color: colors.light.text, 
          marginBottom: 16, 
          fontSize: 24, 
          lineHeight: 32, 
          fontFamily: 'System', 
          fontWeight: '700' 
        }}>Transactions</Text>
        <Button
          title="Nouvelle transaction"
          onPress={() => navigation.navigate('SendMoney')}
          style={styles.newTransactionButton}
        />
      </View>

      <FlatList
        data={mockTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionItem
            transactionType={item.transactionType}
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
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  newTransactionButton: {
    marginTop: 16,
  },
  listContainer: {
    padding: 16,
  },
});
