
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '../../utils/IconComponent';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { COLORS } from '../../config/constants';
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
            leftIcon={<Icon name="search" size={24} color={COLORS.secondary} />}
          />
        </View>

        <View style={styles.membersContainer}>
          {mockFamilyMembers.map((member) => (
            <TouchableOpacity key={member.id} style={styles.memberCard}>
              <View style={styles.memberInfo}>
                <View style={styles.avatarContainer}>
                  <Icon name="person" size={24} color={COLORS.primary} />
                </View>
                <View style={styles.memberDetails}>
                  <Text style={styles.memberName}>{member.name}</Text>
                  <Text style={styles.memberRole}>{member.role}</Text>
                  <Text style={styles.memberPhone}>{member.phone}</Text>
                </View>
              </View>
              <View style={styles.memberActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Icon name="pencil" size={20} color={COLORS.primary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Icon name="trash" size={20} color={COLORS.danger} />
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
          <Icon name="information-circle" size={24} color={COLORS.info} />
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
  },
  searchContainer: {
    padding: 20,
  },
  membersContainer: {
    padding: 20,
  },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
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
    marginBottom: 4,
  },
  memberPhone: {
    fontSize: 14,
    color: COLORS.secondary,
  },
  memberActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addMemberContainer: {
    padding: 20,
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
