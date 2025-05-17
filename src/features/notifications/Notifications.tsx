
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '../../utils/IconsWrapper';
import { COLORS } from '../../config/constants';
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
      return COLORS.success;
    case 'security':
      return COLORS.warning;
    case 'promo':
      return COLORS.primary;
    default:
      return COLORS.secondary;
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
        <Icon
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
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  listContainer: {
    padding: 24,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  unreadNotification: {
    backgroundColor: COLORS.primary + '10',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  notificationTime: {
    fontSize: 12,
    lineHeight: 16,
    color: COLORS.secondary,
  },
  notificationMessage: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.secondary,
  },
});
