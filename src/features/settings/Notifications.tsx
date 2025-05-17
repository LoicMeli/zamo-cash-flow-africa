import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../config/theme';
import { RootStackParamList } from '../../types/navigation';

type NotificationsSettingsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

export const NotificationsSettings = () => {
  const navigation = useNavigation<NotificationsSettingsScreenNavigationProp>();
  const [settings, setSettings] = React.useState({
    transactions: true,
    security: true,
    promotions: false,
    updates: true,
    marketing: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const notificationTypes = [
    {
      id: 'transactions',
      title: 'Transactions',
      description: 'Notifications pour les transactions et les paiements',
      icon: 'cash-outline',
    },
    {
      id: 'security',
      title: 'Sécurité',
      description: 'Alertes de sécurité et connexions',
      icon: 'shield-checkmark-outline',
    },
    {
      id: 'promotions',
      title: 'Promotions',
      description: 'Offres spéciales et réductions',
      icon: 'gift-outline',
    },
    {
      id: 'updates',
      title: 'Mises à jour',
      description: 'Nouvelles fonctionnalités et améliorations',
      icon: 'refresh-outline',
    },
    {
      id: 'marketing',
      title: 'Marketing',
      description: 'Newsletter et communications marketing',
      icon: 'mail-outline',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Notifications</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionDescription}>
            Gérez vos préférences de notifications pour rester informé de vos activités et des mises à jour importantes.
          </Text>
        </View>

        <View style={styles.section}>
          {notificationTypes.map((type) => (
            <View key={type.id} style={styles.notificationItem}>
              <View style={styles.notificationInfo}>
                <Ionicons
                  name={type.icon as any}
                  size={24}
                  color={theme.colors.primary}
                  style={styles.notificationIcon}
                />
                <View>
                  <Text style={styles.notificationTitle}>{type.title}</Text>
                  <Text style={styles.notificationDescription}>
                    {type.description}
                  </Text>
                </View>
              </View>
              <Switch
                value={settings[type.id as keyof typeof settings]}
                onValueChange={() => toggleSetting(type.id as keyof typeof settings)}
                trackColor={{ false: theme.colors.light, true: theme.colors.primary }}
              />
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Préférences avancées</Text>
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceTitle}>Notifications silencieuses</Text>
            <Text style={styles.preferenceDescription}>
              Recevez les notifications sans son ni vibration
            </Text>
          </View>
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceTitle}>Heures calmes</Text>
            <Text style={styles.preferenceDescription}>
              Ne pas déranger entre 22h et 7h
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  backButton: {
    marginRight: theme.spacing.md,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.text,
  },
  content: {
    padding: theme.spacing.lg,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionDescription: {
    ...theme.typography.body,
    color: theme.colors.secondary,
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.light,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
  },
  notificationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  notificationIcon: {
    marginRight: theme.spacing.md,
  },
  notificationTitle: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: 'bold',
  },
  notificationDescription: {
    ...theme.typography.caption,
    color: theme.colors.secondary,
    marginTop: theme.spacing.xs,
  },
  preferenceItem: {
    backgroundColor: theme.colors.light,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
  },
  preferenceTitle: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: 'bold',
  },
  preferenceDescription: {
    ...theme.typography.caption,
    color: theme.colors.secondary,
    marginTop: theme.spacing.xs,
  },
}); 