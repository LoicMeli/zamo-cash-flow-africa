import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/common/Button';
import { theme } from '../../config/theme';
import { ROUTES } from '../../config/constants';
import { RootStackParamList } from '../../types/navigation';

type FamilyWalletScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

const mockFamilyMembers = [
  {
    id: '1',
    name: 'Marie Doe',
    role: 'Mère',
    balance: 25000,
  },
  {
    id: '2',
    name: 'Jean Doe',
    role: 'Père',
    balance: 50000,
  },
  {
    id: '3',
    name: 'Sophie Doe',
    role: 'Sœur',
    balance: 15000,
  },
];

export const FamilyWallet = () => {
  const navigation = useNavigation<FamilyWalletScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Portefeuille Familial</Text>
          <Button
            title="Ajouter un membre"
            onPress={() => navigation.navigate(ROUTES.FAMILY.MEMBERS)}
            variant="secondary"
            style={styles.addButton}
          />
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Solde total</Text>
          <Text style={styles.balanceAmount}>90,000 FCFA</Text>
        </View>

        <View style={styles.membersContainer}>
          <Text style={styles.sectionTitle}>Membres de la famille</Text>
          {mockFamilyMembers.map((member) => (
            <TouchableOpacity key={member.id} style={styles.memberCard}>
              <View style={styles.memberInfo}>
                <View style={styles.avatarContainer}>
                  <Ionicons name="person" size={24} color={theme.colors.primary} />
                </View>
                <View style={styles.memberDetails}>
                  <Text style={styles.memberName}>{member.name}</Text>
                  <Text style={styles.memberRole}>{member.role}</Text>
                </View>
              </View>
              <View style={styles.memberBalance}>
                <Text style={styles.balanceText}>{member.balance.toLocaleString()} FCFA</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.infoContainer}>
          <Ionicons name="information-circle" size={24} color={theme.colors.info} />
          <Text style={styles.infoText}>
            Gérez les dépenses de votre famille en toute simplicité. Chaque membre peut avoir son propre solde.
          </Text>
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
    marginBottom: theme.spacing.md,
  },
  addButton: {
    marginTop: theme.spacing.md,
  },
  balanceCard: {
    backgroundColor: theme.colors.primary,
    margin: theme.spacing.lg,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
  },
  balanceLabel: {
    ...theme.typography.body,
    color: theme.colors.white,
    opacity: 0.8,
  },
  balanceAmount: {
    ...theme.typography.h1,
    color: theme.colors.white,
    marginTop: theme.spacing.xs,
  },
  membersContainer: {
    padding: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.light,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  memberDetails: {
    flex: 1,
  },
  memberName: {
    ...theme.typography.body,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  memberRole: {
    ...theme.typography.caption,
    color: theme.colors.secondary,
  },
  memberBalance: {
    alignItems: 'flex-end',
  },
  balanceText: {
    ...theme.typography.body,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.info + '10',
    margin: theme.spacing.lg,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  infoText: {
    ...theme.typography.body,
    color: theme.colors.info,
    marginLeft: theme.spacing.sm,
    flex: 1,
  },
}); 