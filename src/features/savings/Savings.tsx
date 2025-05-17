import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { COLORS } from '../../theme/colors';

export const Savings = () => {
  const { colors } = useTheme();

  // Sample data
  const savingsGoals = [
    { id: '1', name: 'Vacances', currentAmount: 150000, targetAmount: 500000, deadline: '2023-12-31' },
    { id: '2', name: 'Nouveau téléphone', currentAmount: 75000, targetAmount: 200000, deadline: '2023-09-30' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Épargnes</Text>
          <Text style={[styles.subtitle, { color: colors.text }]}>
            Gérez vos objectifs d'épargne et suivez votre progrès
          </Text>
        </View>

        {/* Rest of the component goes here */}
        <Text style={[styles.emptyText, { color: colors.text }]}>
          Fonctionnalité d'épargne à implémenter
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 100,
    fontSize: 16,
  }
});

export default Savings;
