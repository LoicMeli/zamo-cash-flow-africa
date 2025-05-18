
import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '../../components/common/Icon';
import { ThemedText } from '../../components/common/ThemedView';
import { ThemedButton } from '../../components/common/ThemedComponents';
import { RootStackParamList } from '../../types/navigation';
import { useTheme } from '../../theme/ThemeContext';
import { COLORS } from '../../theme/colors';

type SettingsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

type SettingItem = {
  id: string;
  title: string;
  icon: string;
  screen: keyof RootStackParamList;
};

const settingsItems: SettingItem[] = [
  {
    id: 'personal',
    title: 'Personal Information',
    icon: 'person-outline',
    screen: 'PersonalScreen',
  },
  {
    id: 'security',
    title: 'Security',
    icon: 'shield-checkmark-outline',
    screen: 'SecurityScreen',
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: 'notifications-outline',
    screen: 'NotificationSettings',
  },
  {
    id: 'language',
    title: 'Language',
    icon: 'globe-outline',
    screen: 'Settings',
  },
  {
    id: 'theme',
    title: 'Theme',
    icon: 'contrast-outline',
    screen: 'ThemeSettings',
  },
  {
    id: 'help',
    title: 'Help & Support',
    icon: 'help-circle-outline',
    screen: 'Settings',
  },
];

export const Settings = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const { colors } = useTheme();

  const navigateToScreen = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: COLORS.light.background }]}>
      <ScrollView>
        <View style={styles.header}>
          <ThemedText style={styles.headerTitle}>Settings</ThemedText>
        </View>

        <View style={styles.settingsContainer}>
          {settingsItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.settingItem, { borderBottomColor: COLORS.light.border }]}
              onPress={() => navigateToScreen(item.screen)}
            >
              <View style={styles.settingItemLeft}>
                <View style={[styles.iconContainer, { backgroundColor: COLORS.light.card }]}>
                  <Icon name={item.icon} size={20} color={COLORS.primary} />
                </View>
                <ThemedText style={styles.settingItemText}>{item.title}</ThemedText>
              </View>
              <Icon name="chevron-forward" size={20} color={COLORS.light.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.dangerZone}>
          <ThemedText style={styles.dangerZoneTitle}>Danger Zone</ThemedText>
          <ThemedButton
            title="Delete Account"
            variant="secondary"
            onPress={() => {
              // Show confirmation dialog
            }}
            style={styles.deleteButton}
          />

          <ThemedText style={styles.versionText}>Version 1.0.0</ThemedText>
        </View>
      </ScrollView>
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
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  settingsContainer: {
    paddingHorizontal: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingItemText: {
    fontSize: 16,
  },
  dangerZone: {
    padding: 16,
    marginTop: 16,
  },
  dangerZoneTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: COLORS.danger,
  },
  deleteButton: {
    backgroundColor: COLORS.danger,
    marginBottom: 24,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 14,
    color: COLORS.light.textSecondary,
  },
});
