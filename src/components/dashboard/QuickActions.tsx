
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { QuickActionButton } from '../common/QuickActionButton';
import { COLORS } from '../../config/constants';

export const QuickActions: React.FC = () => {
  const actions = [
    {
      icon: '💸',
      label: 'Envoyer',
      onPress: () => {},
      color: COLORS.primary,
    },
    {
      icon: '📷',
      label: 'Scanner',
      onPress: () => {},
      color: COLORS.success,
    },
    {
      icon: '💰',
      label: 'Retirer',
      onPress: () => {},
      color: COLORS.warning,
    },
    {
      icon: '🏪',
      label: 'Agents',
      onPress: () => {},
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
