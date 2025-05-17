
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { QuickActionButton } from '../common/QuickActionButton';
import { COLORS } from '../../config/constants';

export const QuickActions: React.FC = () => {
  const actions = [
    {
      icon: '💸',
      label: 'Send',
      onPress: () => console.log('Send pressed'),
      color: COLORS.primary,
    },
    {
      icon: '📷',
      label: 'Scan',
      onPress: () => console.log('Scan pressed'),
      color: COLORS.success,
    },
    {
      icon: '💰',
      label: 'Withdraw',
      onPress: () => console.log('Withdraw pressed'),
      color: COLORS.warning,
    },
    {
      icon: '🏪',
      label: 'Agents',
      onPress: () => console.log('Agents pressed'),
      color: COLORS.info,
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {actions.map((action, index) => (
          <QuickActionButton
            key={index}
            icon={action.icon}
            label={action.label}
            onPress={action.onPress}
            color={action.color}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  scrollContent: {
    paddingHorizontal: 4,
  },
});
