import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { QuickActionButton } from '../common/QuickActionButton';
import { COLORS } from '../../config/constants';
import { ROUTES } from '../../config/constants';
import { useNavigation } from '@react-navigation/native';

export const QuickActions: React.FC = () => {
  const navigation = useNavigation();

  const actions = [
    {
      icon: 'send',
      label: 'Envoyer',
      onPress: () => navigation.navigate(ROUTES.TRANSACTIONS.SEND_MONEY),
      color: COLORS.primary,
    },
    {
      icon: 'qr-code',
      label: 'Scanner',
      onPress: () => navigation.navigate(ROUTES.TRANSACTIONS.SCAN_QR),
      color: COLORS.success,
    },
    {
      icon: 'cash-outline',
      label: 'Retirer',
      onPress: () => navigation.navigate(ROUTES.TRANSACTIONS.WITHDRAW),
      color: COLORS.warning,
    },
    {
      icon: 'location',
      label: 'Agents',
      onPress: () => navigation.navigate(ROUTES.TRANSACTIONS.FIND_AGENT),
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