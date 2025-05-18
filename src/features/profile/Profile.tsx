import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '../../components/common/Icon';
import { ThemedView, ThemedText } from '../../components/common/ThemedView';
import { ThemedButton, ThemedCard, ThemedDivider } from '../../components/common/ThemedComponents';
import { ROUTES } from '../../config/constants';
import { RootStackParamList } from '../../types/navigation';
import { useTheme } from '../../theme/ThemeContext';
import { COLORS } from '../../theme/colors';

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Define type for icon names to avoid type errors
type IconName = string;

interface MenuItem {
  id: string;
  title: string;
  icon: IconName;
  route: keyof RootStackParamList;
}

const menuItems: MenuItem[] = [
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
    id: 'theme',
    title: 'Mode d\'affichage',
    icon: 'contrast-outline',
    route: 'ThemeSettings',
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: 'notifications-outline',
    route: 'Notifications',
  },
  {
    id: 'language',
    title: 'Langue',
    icon: 'language-outline',
    route: 'Settings',
  },
  {
    id: 'help',
    title: 'Aide et support',
    icon: 'help-circle-outline',
    route: 'Settings',
  },
];

export const Profile = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { colors } = useTheme();

  // Correctly typed navigation handler
  const navigateToScreen = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
  };

  return (
    <ThemedView>
      <ScrollView style={styles.scrollView}>
        <ThemedCard style={styles.header}>
          <View style={styles.profileInfo}>
            <View style={[styles.avatarContainer, { backgroundColor: colors.card }]}>
              <Icon name="person" size={40} color={COLORS.primary} />
            </View>
            <View style={styles.userInfo}>
              <ThemedText style={styles.userName}>John Doe</ThemedText>
              <ThemedText secondary style={styles.userPhone}>+237 6XX XXX XXX</ThemedText>
            </View>
          </View>
        </ThemedCard>

        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.menuItem, { borderBottomColor: colors.border }]}
              onPress={() => navigateToScreen(item.route)}
            >
              <View style={styles.menuItemLeft}>
                <Icon name={item.icon} size={24} color={colors.text} />
                <ThemedText style={styles.menuItemText}>{item.title}</ThemedText>
              </View>
              <Icon name="chevron-forward" size={24} color={colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        <ThemedDivider />

        <View style={styles.logoutContainer}>
          <ThemedButton
            title="Déconnexion"
            variant="primary"
            onPress={() => navigation.navigate('Auth', { screen: 'Login' })}
          />
        </View>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 16,
    marginBottom: 16,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userPhone: {
    fontSize: 16,
  },
  menuContainer: {
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 16,
  },
  logoutContainer: {
    padding: 16,
    marginTop: 16,
  },
});
