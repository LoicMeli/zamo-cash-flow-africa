
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '../../components/common/Icon';
import { ThemedView, ThemedText } from '../../components/common/ThemedView';
import { ThemedButton, ThemedDivider } from '../../components/common/ThemedComponents';
import { RootStackParamList } from '../../types/navigation';
import { useTheme } from '../../theme/ThemeContext';
import { COLORS } from '../../theme/colors';

type NotificationsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface NotificationSetting {
  id: string;
  title: string;
  description?: string;
  enabled: boolean;
}

export const NotificationSettings: React.FC = () => {
  const [notificationSettings, setNotificationSettings] = useState<NotificationSetting[]>([
    { id: 'transactions', title: 'Transactions', description: 'Alertes de transactions et transferts', enabled: true },
    { id: 'security', title: 'Sécurité', description: 'Alertes de sécurité importantes', enabled: true },
    { id: 'promotions', title: 'Promotions', description: 'Offres spéciales et réductions', enabled: false },
    { id: 'account', title: 'Compte', description: 'Mises à jour du compte', enabled: true },
  ]);
  
  const navigation = useNavigation<NotificationsScreenNavigationProp>();
  const { colors } = useTheme();

  const toggleSetting = (id: string) => {
    setNotificationSettings(
      notificationSettings.map((setting) =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  const saveSettings = () => {
    // Save notification settings
    navigation.goBack();
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <ThemedText style={styles.title}>Paramètres de notification</ThemedText>
          <ThemedText secondary style={styles.subtitle}>
            Gérez comment et quand vous recevez des notifications
          </ThemedText>
        </View>

        <TouchableOpacity 
          style={[styles.toggleAllContainer, { borderBottomColor: colors.border }]}
        >
          <ThemedText style={styles.toggleAllText}>
            Activer toutes les notifications
          </ThemedText>
          <Switch 
            value={notificationSettings.every((s) => s.enabled)}
            onValueChange={() => {
              const allEnabled = notificationSettings.every((s) => s.enabled);
              setNotificationSettings(
                notificationSettings.map((s) => ({ ...s, enabled: !allEnabled }))
              );
            }}
            trackColor={{ false: '#767577', true: COLORS.primary }}
            thumbColor={'#f4f3f4'}
          />
        </TouchableOpacity>

        <ThemedDivider />

        {notificationSettings.map((setting) => (
          <View 
            key={setting.id} 
            style={[styles.settingItem, { borderBottomColor: colors.border }]}
          >
            <View style={styles.settingInfo}>
              <ThemedText style={styles.settingTitle}>{setting.title}</ThemedText>
              {setting.description && (
                <ThemedText secondary style={styles.settingDescription}>
                  {setting.description}
                </ThemedText>
              )}
            </View>
            <Switch
              value={setting.enabled}
              onValueChange={() => toggleSetting(setting.id)}
              trackColor={{ false: '#767577', true: COLORS.primary }}
              thumbColor={'#f4f3f4'}
            />
          </View>
        ))}

        <ThemedButton
          title="Sauvegarder"
          onPress={saveSettings}
          containerStyle={styles.saveButton}
        />
      </ScrollView>
    </ThemedView>
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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  toggleAllContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  toggleAllText: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
  },
  saveButton: {
    marginTop: 32,
    marginBottom: 16,
  },
});

export default NotificationSettings;
