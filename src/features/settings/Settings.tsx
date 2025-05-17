import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/common/Button';
import { theme } from '../../config/theme';
import { ROUTES } from '../../config/constants';
import { RootStackParamList } from '../../types/navigation';

type SettingsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

const settingsSections = [
  {
    id: 'account',
    title: 'Compte',
    items: [
      {
        id: 'personal',
        title: 'Informations personnelles',
        icon: 'person-outline',
        route: ROUTES.PROFILE.PERSONAL,
      },
      {
        id: 'security',
        title: 'Sécurité',
        icon: 'shield-checkmark-outline',
        route: ROUTES.PROFILE.SECURITY,
      },
      {
        id: 'notifications',
        title: 'Notifications',
        icon: 'notifications-outline',
        route: ROUTES.PROFILE.NOTIFICATIONS,
      },
    ],
  },
  {
    id: 'preferences',
    title: 'Préférences',
    items: [
      {
        id: 'language',
        title: 'Langue',
        icon: 'language-outline',
        route: ROUTES.PROFILE.LANGUAGE,
      },
      {
        id: 'currency',
        title: 'Devise',
        icon: 'cash-outline',
        route: ROUTES.PROFILE.CURRENCY,
      },
      {
        id: 'theme',
        title: 'Thème',
        icon: 'color-palette-outline',
        route: ROUTES.PROFILE.THEME,
      },
    ],
  },
  {
    id: 'support',
    title: 'Support',
    items: [
      {
        id: 'help',
        title: 'Aide et support',
        icon: 'help-circle-outline',
        route: ROUTES.PROFILE.HELP,
      },
      {
        id: 'about',
        title: 'À propos',
        icon: 'information-circle-outline',
        route: ROUTES.PROFILE.ABOUT,
      },
    ],
  },
];

export const Settings = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const [biometricEnabled, setBiometricEnabled] = React.useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Paramètres</Text>
        </View>

        {settingsSections.map((section) => (
          <View key={section.id} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.settingItem}
                onPress={() => navigation.navigate(item.route)}
              >
                <View style={styles.settingItemLeft}>
                  <Ionicons name={item.icon} size={24} color={theme.colors.text} />
                  <Text style={styles.settingItemText}>{item.title}</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color={theme.colors.secondary} />
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sécurité</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <Ionicons name="finger-print" size={24} color={theme.colors.text} />
              <Text style={styles.settingItemText}>Authentification biométrique</Text>
            </View>
            <Switch
              value={biometricEnabled}
              onValueChange={setBiometricEnabled}
              trackColor={{ false: theme.colors.light, true: theme.colors.primary }}
              thumbColor={theme.colors.white}
            />
          </View>
        </View>

        <View style={styles.logoutContainer}>
          <Button
            title="Déconnexion"
            onPress={() => navigation.navigate(ROUTES.AUTH.LOGIN)}
            variant="danger"
          />
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
  scrollView: {
    flex: 1,
  },
  header: {
    padding: theme.spacing.lg,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.text,
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.h2,
    color: theme.colors.text,
    padding: theme.spacing.lg,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.light,
    padding: theme.spacing.md,
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingItemText: {
    ...theme.typography.body,
    color: theme.colors.text,
    marginLeft: theme.spacing.md,
  },
  logoutContainer: {
    padding: theme.spacing.lg,
    marginTop: theme.spacing.lg,
  },
}); 