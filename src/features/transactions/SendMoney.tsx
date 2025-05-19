
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '../../components/common/Icon';
import { RootStackParamList } from '../../types/navigation';
import { useTheme } from '../../theme/ThemeContext';

// Mock data for recent recipients
const recentRecipients = [
  { id: '1', name: 'John Doe', phone: '+237 690123456', avatar: null },
  { id: '2', name: 'Jane Smith', phone: '+237 691234567', avatar: null },
  { id: '3', name: 'Robert Johnson', phone: '+237 692345678', avatar: null },
  { id: '4', name: 'Emily Davis', phone: '+237 693456789', avatar: null },
];

// Mock data for contacts
const contacts = [
  { id: '1', name: 'Alice Brown', phone: '+237 694567890', avatar: null },
  { id: '2', name: 'Bob Wilson', phone: '+237 695678901', avatar: null },
  { id: '3', name: 'Carol Martinez', phone: '+237 696789012', avatar: null },
  { id: '4', name: 'David Garcia', phone: '+237 697890123', avatar: null },
  { id: '5', name: 'Emma Rodriguez', phone: '+237 698901234', avatar: null },
  { id: '6', name: 'Frank Hernandez', phone: '+237 699012345', avatar: null },
];

export const SendMoney = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors } = useTheme();
  
  const [searchQuery, setSearchQuery] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);
  
  // Filter contacts based on search query
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery)
  );
  
  const handleGoBack = () => {
    navigation.goBack();
  };
  
  const handleRecipientSelect = (recipient: typeof recentRecipients[0]) => {
    navigation.navigate('SendMoneyAmount', { recipient });
  };
  
  const handleAddContact = () => {
    navigation.navigate('AddContact');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Send Money</Text>
      </View>
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidView}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Search Bar */}
          <View style={[styles.searchContainer, { backgroundColor: colors.input }]}>
            <Icon name="search" size={20} color={colors.textSecondary} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Search by name or phone number"
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Icon name="close" size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            )}
          </View>
          
          {/* Recent Recipients Section */}
          <View style={styles.sectionContainer}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Recipients</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.recentRecipientsContainer}
            >
              {recentRecipients.map((recipient) => (
                <TouchableOpacity
                  key={recipient.id}
                  style={[styles.recipientCard, { backgroundColor: colors.card }]}
                  onPress={() => handleRecipientSelect(recipient)}
                >
                  <View style={styles.avatarContainer}>
                    <Icon name="person" size={24} color="#3B5BFE" />
                  </View>
                  <Text 
                    style={[styles.recipientName, { color: colors.text }]}
                    numberOfLines={1}
                  >
                    {recipient.name}
                  </Text>
                  <Text 
                    style={[styles.recipientPhone, { color: colors.textSecondary }]}
                    numberOfLines={1}
                  >
                    {recipient.phone}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          
          {/* Contacts Section */}
          <View style={styles.sectionContainer}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Contacts</Text>
            
            {/* Add New Contact Button */}
            <TouchableOpacity
              style={[styles.addContactButton, { backgroundColor: colors.card }]}
              onPress={handleAddContact}
            >
              <View style={[styles.addIconContainer, { backgroundColor: 'rgba(59, 91, 254, 0.1)' }]}>
                <Icon name="add" size={24} color="#3B5BFE" />
              </View>
              <View style={styles.addContactInfo}>
                <Text style={[styles.addContactText, { color: colors.text }]}>Add new contact</Text>
              </View>
            </TouchableOpacity>
            
            {/* Contact List */}
            {filteredContacts.map((contact) => (
              <TouchableOpacity
                key={contact.id}
                style={[styles.contactCard, { backgroundColor: colors.card }]}
                onPress={() => handleRecipientSelect(contact)}
              >
                <View style={styles.avatarContainer}>
                  <Icon name="person" size={24} color="#3B5BFE" />
                </View>
                <View style={styles.contactInfo}>
                  <Text style={[styles.contactName, { color: colors.text }]}>{contact.name}</Text>
                  <Text style={[styles.contactPhone, { color: colors.textSecondary }]}>{contact.phone}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    marginRight: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  keyboardAvoidView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
    height: 50,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 10,
    height: '100%',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#FFFFFF',
  },
  recentRecipientsContainer: {
    paddingBottom: 8,
  },
  recipientCard: {
    width: 100,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginRight: 12,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(59, 91, 254, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  recipientName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  recipientPhone: {
    fontSize: 12,
    color: '#AAAAAA',
    textAlign: 'center',
  },
  addContactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  addIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addContactInfo: {
    marginLeft: 12,
  },
  addContactText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  contactInfo: {
    flex: 1,
    marginLeft: 12,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  contactPhone: {
    fontSize: 14,
    color: '#AAAAAA',
  },
});
