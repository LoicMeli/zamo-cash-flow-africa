import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '../../components/common/Icon';
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
        route: 'PersonalScreen',
      },
      {
        id: 'security',
        title: 'Sécurité',
        icon: 'shield-checkmark-outline',
        route: 'SecurityScreen',
      },
      {
        id: 'notifications',
        title: 'Notifications',
        icon: 'notifications-outline',
        route: 'Notifications',
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
        route: 'Settings',
      },
      {
        id: 'currency',
        title: 'Devise',
        icon: 'cash-outline',
        route: 'Settings',
      },
      {
        id: 'theme',
        title: 'Thème',
        icon: 'color-palette-outline',
        route: 'ThemeSettings',
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
        route: 'Settings',
      },
      {
        id: 'about',
        title: 'À propos',
        icon: 'information-circle-outline',
        route: 'Settings',
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
                  <Icon name={item.icon} size={24} color={theme.colors.primary} />
                  <Text style={styles.settingItemText}>{item.title}</Text>
                </View>
                <Icon name="chevron-forward" size={24} color={theme.colors.secondary} />
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sécurité</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <Icon name="finger-print" size={24} color={theme.colors.primary} />
              <Text style={styles.settingItemText}>Authentification biométrique</Text>
            </View>
            <Switch
              value={biometricEnabled}
              onValueChange={setBiometricEnabled}
              trackColor={{ false: "#767577", true: theme.colors.primary }}
              thumbColor={"#fff"}
            />
          </View>
        </View>

        <View style={styles.logoutContainer}>
          <Button
            title="Déconnexion"
            onPress={() => navigation.navigate('Auth', { screen: 'Login' })}
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
