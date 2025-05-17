
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '../../components/common/Icon';
import { Button } from '../../components/common/Button';
import { useTheme } from '../../theme/ThemeContext';
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
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.light.background }]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.light.text }]}>Paramètres</Text>
        </View>

        {settingsSections.map((section) => (
          <View key={section.id} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.light.text }]}>{section.title}</Text>
            {section.items.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.settingItem}
                onPress={() => navigation.navigate(item.route as keyof RootStackParamList)}
              >
                <View style={styles.settingItemLeft}>
                  <Icon name={item.icon} size={24} color="#3B5BFE" />
                  <Text style={[styles.settingItemText, { color: colors.light.text }]}>{item.title}</Text>
                </View>
                <Icon name="chevron-forward" size={24} color="#888" />
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.light.text }]}>Sécurité</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <Icon name="finger-print" size={24} color="#3B5BFE" />
              <Text style={[styles.settingItemText, { color: colors.light.text }]}>Authentification biométrique</Text>
            </View>
            <Switch
              value={biometricEnabled}
              onValueChange={setBiometricEnabled}
              trackColor={{ false: "#767577", true: "#3B5BFE" }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        <View style={styles.logoutContainer}>
          <Button
            title="Déconnexion"
            onPress={() => navigation.navigate('Auth', { screen: 'Login' })}
            variant="primary"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    padding: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingItemText: {
    fontSize: 16,
    marginLeft: 16,
  },
  logoutContainer: {
    padding: 16,
    marginTop: 16,
  },
});
