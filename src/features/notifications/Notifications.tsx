import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../config/theme';
import { RootStackParamList } from '../../types/navigation';

type NotificationsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

const mockNotifications = [
  {
    id: '1',
    type: 'transaction',
    title: 'Transaction réussie',
    message: 'Vous avez envoyé 25,000 FCFA à John Doe',
    time: 'Il y a 5 minutes',
    read: false,
  },
  {
    id: '2',
    type: 'security',
    title: 'Nouvelle connexion',
    message: 'Une nouvelle connexion a été détectée sur votre compte',
    time: 'Il y a 1 heure',
    read: false,
  },
  {
    id: '3',
    type: 'promo',
    title: 'Offre spéciale',
    message: 'Profitez de 50% de réduction sur les frais de transaction ce weekend',
    time: 'Il y a 2 heures',
    read: true,
  },
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'transaction':
      return 'cash-outline';
    case 'security':
      return 'shield-checkmark-outline';
    case 'promo':
      return 'gift-outline';
    default:
      return 'notifications-outline';
  }
};

const getNotificationColor = (type: string) => {
  switch (type) {
    case 'transaction':
      return theme.colors.success;
    case 'security':
      return theme.colors.warning;
    case 'promo':
      return theme.colors.primary;
    default:
      return theme.colors.secondary;
  }
};

export const Notifications = () => {
  const navigation = useNavigation<NotificationsScreenNavigationProp>();

  const renderNotificationItem = ({ item }: { item: typeof mockNotifications[0] }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        !item.read && styles.unreadNotification,
      ]}
    >
      <View style={styles.notificationIcon}>
        <Ionicons
          name={getNotificationIcon(item.type)}
          size={24}
          color={getNotificationColor(item.type)}
        />
      </View>
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationTime}>{item.time}</Text>
        </View>
        <Text style={styles.notificationMessage}>{item.message}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
      </View>

      <FlatList
        data={mockNotifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id}
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
  },
  listContainer: {
    padding: theme.spacing.lg,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: theme.colors.light,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
  },
  unreadNotification: {
    backgroundColor: theme.colors.primary + '10',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  notificationTitle: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: 'bold',
  },
  notificationTime: {
    ...theme.typography.caption,
    color: theme.colors.secondary,
  },
  notificationMessage: {
    ...theme.typography.body,
    color: theme.colors.secondary,
  },
}); 