
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '../../utils/IconComponent';
import { Button } from '../../components/common/Button';
import { theme, COLORS, ROUTES } from '../../config/constants';
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

  const handleAddMemberPress = () => {
    // Using proper navigation for type safety
    navigation.navigate(ROUTES.FAMILY.MEMBERS as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Portefeuille Familial</Text>
          <Button
            title="Ajouter un membre"
            onPress={handleAddMemberPress}
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
                  <Icon name="person" size={24} color={COLORS.primary} />
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
          <Icon name="information-circle" size={24} color={COLORS.info} />
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
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  addButton: {
    marginTop: 16,
  },
  balanceCard: {
    backgroundColor: COLORS.primary,
    margin: 20,
    padding: 20,
    borderRadius: 16,
  },
  balanceLabel: {
    fontSize: 16,
    color: COLORS.white,
    opacity: 0.8,
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.white,
    marginTop: 8,
  },
  membersContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${COLORS.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  memberDetails: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  memberRole: {
    fontSize: 14,
    color: COLORS.secondary,
  },
  memberBalance: {
    alignItems: 'flex-end',
  },
  balanceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${COLORS.info}10`,
    margin: 20,
    padding: 16,
    borderRadius: 12,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.info,
    marginLeft: 8,
    flex: 1,
  },
});
