
import React, { useState } from 'react';
import {
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  TextInput,
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '../../components/common/Icon';
import { Ionicons } from '../../components/common/Ionicons';
import { Button } from '../../components/common/Button';
import { RootStackParamList } from '../../types/navigation';
import { COLORS } from '../../theme/colors';
import { navigateTo } from '../../utils/navigation';

type SendMoneyScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Mock recent contacts data
const recentContacts = [
  { id: '1', name: 'Jean Marc', phone: '678901234', avatar: 'JM' },
  { id: '2', name: 'Marie Claire', phone: '699123456', avatar: 'MC' },
  { id: '3', name: 'Patrick Démé', phone: '677654321', avatar: 'PD' },
  { id: '4', name: 'Solange Biya', phone: '650987654', avatar: 'SB' },
];

// Mock frequent contacts data
const frequentContacts = [
  { id: '1', name: 'Papa', phone: '699123456', avatar: 'P' },
  { id: '2', name: 'Maman', phone: '677654321', avatar: 'M' },
  { id: '3', name: 'Junior', phone: '690123456', avatar: 'J' },
];

export const SendMoney = () => {
  const navigation = useNavigation<SendMoneyScreenNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');

  const handleContactPress = (contact: { name: string; phone: string }) => {
    navigateTo(navigation, 'SendMoneyAmount', { recipient: contact });
  };

  const handleScanQR = () => {
    navigateTo(navigation, 'ScanQR');
  };

  const handleNewContact = () => {
    navigateTo(navigation, 'SendMoneyAmount', {});
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidView}
      >
        <ScrollView>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons.name("arrow-back", 24, { color: '#1A1A1A' }) />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Envoyer de l'argent</Text>
          </View>

          <View style={styles.searchContainer}>
            <Ionicons.name("search", 20, { color: '#8E8E93' }) />
            <TextInput
              style={styles.searchInput}
              placeholder="Chercher un contact"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleNewContact}
            >
              <View style={styles.iconContainer}>
                <Ionicons.name("person-add", 24, { color: COLORS.primary }) />
              </View>
              <Text style={styles.actionText}>Nouveau destinataire</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleScanQR}
            >
              <View style={styles.iconContainer}>
                <Ionicons.name("qr-code", 24, { color: COLORS.primary }) />
              </View>
              <Text style={styles.actionText}>Scanner le code QR</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Récemment</Text>
            <FlatList
              data={recentContacts}
              keyExtractor={(item) => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.contactCard}
                  onPress={() => handleContactPress(item)}
                >
                  <View style={styles.avatarContainer}>
                    <Text style={styles.avatarText}>{item.avatar}</Text>
                  </View>
                  <Text style={styles.contactName} numberOfLines={1}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.contactsList}
            />
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Contacts fréquents</Text>
            {frequentContacts.map((contact) => (
              <TouchableOpacity
                key={contact.id}
                style={styles.contactRow}
                onPress={() => handleContactPress(contact)}
              >
                <View style={styles.contactRowAvatar}>
                  <Text style={styles.contactRowAvatarText}>{contact.avatar}</Text>
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactRowName}>{contact.name}</Text>
                  <Text style={styles.contactPhone}>{contact.phone}</Text>
                </View>
                <Ionicons.name("chevron-forward", 20, { color: '#8E8E93' }) />
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Voir tous les contacts"
              onPress={() => navigateTo(navigation, 'AddContact')}
              style={styles.button}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    marginRight: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  actionButton: {
    alignItems: 'center',
    width: '40%',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(59, 91, 254, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    color: '#1A1A1A',
    textAlign: 'center',
  },
  sectionContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  contactsList: {
    paddingVertical: 8,
  },
  contactCard: {
    alignItems: 'center',
    marginRight: 16,
    width: 80,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(59, 91, 254, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.primary,
  },
  contactName: {
    fontSize: 14,
    color: '#1A1A1A',
    textAlign: 'center',
    width: '100%',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  contactRowAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(59, 91, 254, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  contactRowAvatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.primary,
  },
  contactInfo: {
    flex: 1,
  },
  contactRowName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  contactPhone: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 2,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  button: {
    marginBottom: 24,
  },
  keyboardAvoidView: {
    flex: 1,
  },
});
