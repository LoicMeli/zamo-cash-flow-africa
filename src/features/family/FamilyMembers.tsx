import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { theme } from '../../config/theme';
import { RootStackParamList } from '../../types/navigation';

type FamilyMembersScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

const mockFamilyMembers = [
  {
    id: '1',
    name: 'Marie Doe',
    role: 'Mère',
    phone: '+237 6XX XXX XXX',
  },
  {
    id: '2',
    name: 'Jean Doe',
    role: 'Père',
    phone: '+237 6XX XXX XXX',
  },
  {
    id: '3',
    name: 'Sophie Doe',
    role: 'Sœur',
    phone: '+237 6XX XXX XXX',
  },
];

export const FamilyMembers = () => {
  const navigation = useNavigation<FamilyMembersScreenNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Membres de la famille</Text>
        </View>

        <View style={styles.searchContainer}>
          <Input
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Rechercher un membre..."
            leftIcon={<Ionicons name="search" size={24} color={theme.colors.secondary} />}
          />
        </View>

        <View style={styles.membersContainer}>
          {mockFamilyMembers.map((member) => (
            <TouchableOpacity key={member.id} style={styles.memberCard}>
              <View style={styles.memberInfo}>
                <View style={styles.avatarContainer}>
                  <Ionicons name="person" size={24} color={theme.colors.primary} />
                </View>
                <View style={styles.memberDetails}>
                  <Text style={styles.memberName}>{member.name}</Text>
                  <Text style={styles.memberRole}>{member.role}</Text>
                  <Text style={styles.memberPhone}>{member.phone}</Text>
                </View>
              </View>
              <View style={styles.memberActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="pencil" size={20} color={theme.colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="trash" size={20} color={theme.colors.danger} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.addMemberContainer}>
          <Button
            title="Ajouter un nouveau membre"
            onPress={() => {}}
            variant="secondary"
          />
        </View>

        <View style={styles.infoContainer}>
          <Ionicons name="information-circle" size={24} color={theme.colors.info} />
          <Text style={styles.infoText}>
            Vous pouvez ajouter jusqu'à 5 membres dans votre portefeuille familial.
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
  },
  searchContainer: {
    padding: theme.spacing.lg,
  },
  membersContainer: {
    padding: theme.spacing.lg,
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
    flex: 1,
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
    marginBottom: theme.spacing.xs,
  },
  memberPhone: {
    ...theme.typography.caption,
    color: theme.colors.secondary,
  },
  memberActions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addMemberContainer: {
    padding: theme.spacing.lg,
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