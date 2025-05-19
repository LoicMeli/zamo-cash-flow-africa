
import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Switch, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../../theme/ThemeContext';
import { Icon } from '../../components/common/Icon';
import { ThemedView, ThemedText } from '../../components/common/ThemedView';
import { ThemedButton, ThemedDivider } from '../../components/common/ThemedComponents';
import { RootStackParamList } from '../../types/navigation';
import { COLORS } from '../../theme/colors';
import { Button } from '../../components/common/Button';
import { navigateTo } from '../../utils/navigation';

type SettingsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, children }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.light.textSecondary }]}>{title}</Text>
      <View style={[styles.sectionContent, { backgroundColor: colors.light.card }]}>
        {children}
      </View>
    </View>
  );
};

export interface SettingsItemProps {
  icon: string;
  title: string;
  onPress: () => void;
  hasToggle?: boolean;
  isToggled?: boolean;
  onToggle?: (value: boolean) => void;
  rightComponent?: React.ReactNode;
}

const SettingsItem: React.FC<SettingsItemProps> = ({
  icon,
  title,
  onPress,
  hasToggle = false,
  isToggled,
  onToggle,
  rightComponent,
}) => {
  const { colors } = useTheme();

  const handleToggle = (value: boolean) => {
    if (onToggle) {
      onToggle(value);
    }
  };

  return (
    <TouchableOpacity
      style={styles.settingsItem}
      onPress={onPress}
      disabled={hasToggle}
    >
      <View style={styles.settingsItemLeft}>
        <View style={[styles.iconContainer, { backgroundColor: 'rgba(59, 91, 254, 0.1)' }]}>
          <Icon name={icon} size={20} color={COLORS.primary} />
        </View>
        <Text style={[styles.settingsItemText, { color: colors.light.text }]}>{title}</Text>
      </View>
      {hasToggle ? (
        <Switch
          value={isToggled}
          onValueChange={handleToggle}
          trackColor={{ false: '#ccc', true: 'rgba(59, 91, 254, 0.4)' }}
          thumbColor={isToggled ? COLORS.primary : '#f4f3f4'}
        />
      ) : rightComponent ? (
        rightComponent
      ) : (
        <Icon name="chevron-forward" size={24} color={colors.light.textSecondary} />
      )}
    </TouchableOpacity>
  );
};

export const Settings = () => {
  const { isDarkMode, colors } = useTheme();
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  const navigateToScreen = (screen: keyof RootStackParamList) => {
    navigateTo(navigation, screen);
  };

  const handleLogout = () => {
    // Handle logout functionality here
    navigation.navigate('Auth', { screen: 'Login' });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.light.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.light.text }]}>Paramètres</Text>
      </View>

      <SettingsSection title="Compte">
        <SettingsItem
          icon="person-outline"
          title="Informations personnelles"
          onPress={() => navigateToScreen('PersonalScreen')}
        />
        <SettingsItem
          icon="lock-closed-outline"
          title="Sécurité"
          onPress={() => navigateToScreen('SecurityScreen')}
        />
        <SettingsItem
          icon="language-outline"
          title="Langue"
          onPress={() => navigateToScreen('Settings')}
          rightComponent={<Text style={{ color: colors.light.textSecondary }}>Français</Text>}
        />
      </SettingsSection>

      <SettingsSection title="Préférences">
        <SettingsItem
          icon="notifications-outline"
          title="Notifications"
          onPress={() => navigateToScreen('NotificationSettings')}
        />
        <SettingsItem
          icon="contrast-outline"
          title="Thème"
          onPress={() => navigateToScreen('ThemeSettings')}
          rightComponent={
            <Text style={{ color: colors.light.textSecondary }}>
              {isDarkMode ? 'Sombre' : 'Clair'}
            </Text>
          }
        />
        <SettingsItem
          icon="finger-print-outline"
          title="Utiliser le PIN pour les transactions"
          onPress={() => {}}
          hasToggle
          isToggled={true}
          onToggle={(value) => console.log('PIN toggle:', value)}
        />
        <SettingsItem
          icon="scan-outline"
          title="Activer l'authentification biométrique"
          onPress={() => {}}
          hasToggle
          isToggled={false}
          onToggle={(value) => console.log('Biometrics toggle:', value)}
        />
      </SettingsSection>

      <SettingsSection title="Support">
        <SettingsItem
          icon="help-circle-outline"
          title="Support WhatsApp"
          onPress={() => console.log('WhatsApp support')}
        />
        <SettingsItem
          icon="call-outline"
          title="Contactez-nous"
          onPress={() => console.log('Contact us')}
        />
      </SettingsSection>

      <View style={styles.buttonContainer}>
        <Button
          title="Déconnexion"
          onPress={handleLogout}
          style={{ backgroundColor: '#FF3B30' }}
        />
      </View>

      <View style={styles.versionContainer}>
        <Text style={{ color: colors.light.textSecondary, textAlign: 'center' }}>
          Version 1.0.0
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 8,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  sectionContent: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingsItemText: {
    fontSize: 16,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  versionContainer: {
    paddingVertical: 24,
  },
});

export default Settings;
