import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  FlatList, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '../../components/common/Icon'; 
import { RootStackParamList } from '../../types/navigation';

type SendMoneyScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Mock recent recipients data
const mockRecentRecipients = [
  { id: '1', name: 'Emma Johnson', phone: '+237 678 123 456', avatar: 'EJ' },
  { id: '2', name: 'Michael Brown', phone: '+237 677 234 567', avatar: 'MB' },
  { id: '3', name: 'Sophia Davis', phone: '+237 651 345 678', avatar: 'SD' },
  { id: '4', name: 'James Wilson', phone: '+237 699 456 789', avatar: 'JW' },
];

// Mock contacts data
const mockContacts = [
  { id: '5', name: 'Ava Martinez', phone: '+237 673 567 890', avatar: 'AM' },
  { id: '6', name: 'Oliver Taylor', phone: '+237 698 678 901', avatar: 'OT' },
  { id: '7', name: 'Isabella Clark', phone: '+237 676 789 012', avatar: 'IC' },
  { id: '8', name: 'William Walker', phone: '+237 670 890 123', avatar: 'WW' },
  { id: '9', name: 'Sophie Hernandez', phone: '+237 695 901 234', avatar: 'SH' },
  { id: '10', name: 'Alexander Young', phone: '+237 672 012 345', avatar: 'AY' },
];

export const SendMoney: React.FC = () => {
  const navigation = useNavigation<SendMoneyScreenNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContacts, setFilteredContacts] = useState(mockContacts);
  
  // Filter contacts based on search query
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredContacts(mockContacts);
      return;
    }
    
    const filtered = mockContacts.filter(contact => {
      return (
        contact.name.toLowerCase().includes(text.toLowerCase()) ||
        contact.phone.includes(text)
      );
    });
    
    setFilteredContacts(filtered);
  };

  // Navigate to send money amount screen
  const handleSelectRecipient = (recipient: { name: string; phone: string }) => {
    navigation.navigate('SendMoneyAmount', { recipient });
  };

  // Render recipient avatar
  const renderAvatar = (initials: string) => (
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>{initials}</Text>
    </View>
  );

  // Go back to previous screen
  const handleGoBack = () => {
    navigation.goBack();
  };

  // Navigate to scan QR code screen
  const handleScanQR = () => {
    navigation.navigate('ScanQR');
  };

  // Render recent recipient item
  const renderRecentItem = ({ item }: { item: typeof mockRecentRecipients[0] }) => (
    <TouchableOpacity 
      style={styles.recentItem}
      onPress={() => handleSelectRecipient({ name: item.name, phone: item.phone })}
    >
      {renderAvatar(item.avatar)}
      <Text style={styles.recentName}>{item.name}</Text>
    </TouchableOpacity>
  );

  // Render contact item
  const renderContactItem = ({ item }: { item: typeof mockContacts[0] }) => (
    <TouchableOpacity 
      style={styles.contactItem}
      onPress={() => handleSelectRecipient({ name: item.name, phone: item.phone })}
    >
      {renderAvatar(item.avatar)}
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactPhone}>{item.phone}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidView}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.title}>Envoyer de l'argent</Text>
          <TouchableOpacity onPress={handleScanQR} style={styles.scanButton}>
            <Icon name="qr-code" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Chercher un contact"
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
        
        {/* Recent Recipients */}
        {searchQuery.trim() === '' && (
          <View style={styles.recentsSection}>
            <Text style={styles.sectionTitle}>Récents</Text>
            <FlatList
              data={mockRecentRecipients}
              renderItem={renderRecentItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.recentsList}
            />
          </View>
        )}
        
        {/* Contacts List */}
        <View style={styles.contactsSection}>
          <Text style={styles.sectionTitle}>
            {searchQuery.trim() === '' ? 'Contacts' : 'Résultats'}
          </Text>
          {filteredContacts.length > 0 ? (
            <FlatList
              data={filteredContacts}
              renderItem={renderContactItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.contactsList}
            />
          ) : (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>
                Aucun contact trouvé pour "{searchQuery}"
              </Text>
            </View>
          )}
        </View>
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
    marginRight: 15,
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
  scanButton: {
    marginLeft: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B1B1B',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 20,
    shadowColor: '#3B5BFE',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
  },
  recentsSection: {
    marginTop: 16,
  },
  recentsList: {
    paddingHorizontal: 10,
  },
  recentItem: {
    alignItems: 'center',
    marginRight: 10,
  },
  recentName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  contactsSection: {
    marginTop: 16,
  },
  contactsList: {
    flex: 1,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1B1B1B',
    borderRadius: 12,
    marginBottom: 8,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  contactPhone: {
    color: '#C2C2C2',
    fontSize: 14,
    marginTop: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1B1B1B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    shadowColor: '#3B5BFE',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  keyboardAvoidView: {
    flex: 1,
  },
});
