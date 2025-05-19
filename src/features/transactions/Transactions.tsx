
import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
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
    amount: 25000,
    recipient: 'John Doe',
    date: '2024-03-20T10:30:00',
  },
  {
    id: '2',
    transactionType: 'receive',
    amount: 50000,
    recipient: 'Jane Smith',
    date: '2024-03-19T15:45:00',
  },
  {
    id: '3',
    transactionType: 'send',
    amount: 15000,
    recipient: 'Mike Johnson',
    date: '2024-03-18T09:15:00',
  },
];

export const Transactions = () => {
  const navigation = useNavigation<TransactionsScreenNavigationProp>();
  const { colors } = useTheme();

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.transactionItem}>
        <View style={[styles.iconContainer, { backgroundColor: item.transactionType === 'receive' ? '#28a74520' : '#dc354520' }]}>
          <Text style={{ fontSize: 20, color: item.transactionType === 'receive' ? '#28a745' : '#dc3545' }}>
            {item.transactionType === 'receive' ? '+' : '-'}
          </Text>
        </View>
        <View style={styles.details}>
          <Text style={[styles.recipient, { color: colors.text }]}>{item.recipient}</Text>
          <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={[styles.amount, { color: item.transactionType === 'receive' ? '#28a745' : '#dc3545' }]}>
            {item.transactionType === 'receive' ? '+' : '-'} {item.amount} FCFA
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={{ 
          color: colors.text, 
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
        renderItem={renderItem}
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
  transactionItem: {
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
