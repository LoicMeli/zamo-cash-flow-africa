
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../config/constants';
import { useLanguage } from '../../providers/LanguageProvider';

interface DashboardHeaderProps {
  userName: string;
  onProfilePress?: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userName,
  onProfilePress,
}) => {
  const { t } = useLanguage();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('common.morningGreeting');
    if (hour < 18) return t('common.afternoonGreeting');
    return t('common.eveningGreeting');
  };

  return (
    <View style={styles.container}>
      <View style={styles.greetingContainer}>
        <Text style={styles.greeting}>{getGreeting()}</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.notificationButton}
          onPress={() => {}}
        >
          <Text style={{ fontSize: 24 }}>🔔</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={onProfilePress}
        >
          <Text style={{ fontSize: 28 }}>👤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    color: COLORS.secondary,
    marginBottom: 4,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    padding: 8,
    marginRight: 8,
  },
  profileButton: {
    padding: 4,
  },
});
