import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../config/theme';
import { RootStackParamList } from '../../types/navigation';

type SecurityScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

export const Security = () => {
  const navigation = useNavigation<SecurityScreenNavigationProp>();
  const [biometricEnabled, setBiometricEnabled] = React.useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  const securityOptions = [
    {
      id: '1',
      title: 'Changer le mot de passe',
      icon: 'lock-closed-outline',
      onPress: () => {
        // TODO: Implement password change
      },
    },
    {
      id: '2',
      title: 'Authentification à deux facteurs',
      icon: 'shield-checkmark-outline',
      onPress: () => {
        // TODO: Implement 2FA
      },
    },
    {
      id: '3',
      title: 'Historique des connexions',
      icon: 'time-outline',
      onPress: () => {
        // TODO: Show login history
      },
    },
    {
      id: '4',
      title: 'Appareils connectés',
      icon: 'phone-portrait-outline',
      onPress: () => {
        // TODO: Show connected devices
      },
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
        <Text style={styles.title}>Sécurité</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Authentification</Text>
          <View style={styles.option}>
            <View style={styles.optionInfo}>
              <Ionicons
                name="finger-print-outline"
                size={24}
                color={theme.colors.primary}
                style={styles.optionIcon}
              />
              <View>
                <Text style={styles.optionTitle}>Authentification biométrique</Text>
                <Text style={styles.optionDescription}>
                  Utilisez votre empreinte digitale ou Face ID pour vous connecter
                </Text>
              </View>
            </View>
            <Switch
              value={biometricEnabled}
              onValueChange={setBiometricEnabled}
              trackColor={{ false: theme.colors.light, true: theme.colors.primary }}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Options de sécurité</Text>
          {securityOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.option}
              onPress={option.onPress}
            >
              <View style={styles.optionInfo}>
                <Ionicons
                  name={option.icon as any}
                  size={24}
                  color={theme.colors.primary}
                  style={styles.optionIcon}
                />
                <Text style={styles.optionTitle}>{option.title}</Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={24}
                color={theme.colors.secondary}
              />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.option}>
            <View style={styles.optionInfo}>
              <Ionicons
                name="notifications-outline"
                size={24}
                color={theme.colors.primary}
                style={styles.optionIcon}
              />
              <View>
                <Text style={styles.optionTitle}>Alertes de sécurité</Text>
                <Text style={styles.optionDescription}>
                  Recevez des notifications pour les activités suspectes
                </Text>
              </View>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: theme.colors.light, true: theme.colors.primary }}
            />
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
  sectionTitle: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.light,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
  },
  optionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIcon: {
    marginRight: theme.spacing.md,
  },
  optionTitle: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: 'bold',
  },
  optionDescription: {
    ...theme.typography.caption,
    color: theme.colors.secondary,
    marginTop: theme.spacing.xs,
  },
}); 