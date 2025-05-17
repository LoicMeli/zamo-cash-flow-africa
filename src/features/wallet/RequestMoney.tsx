import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Share,
  Clipboard,
  Platform,
  Alert,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types/navigation';

// Mock contacts data
const MOCK_CONTACTS = [
  { id: '1', name: 'Amadou Diallo', phoneNumber: '677123456', recent: true },
  { id: '2', name: 'Ibrahim Touré', phoneNumber: '698765432', recent: true },
  { id: '3', name: 'Aicha Koné', phoneNumber: '655987654', recent: true },
  { id: '4', name: 'Mamadou Sow', phoneNumber: '691234567', recent: false },
  { id: '5', name: 'Fatou Camara', phoneNumber: '650456789', recent: false },
  { id: '6', name: 'Oumar Bah', phoneNumber: '670123456', recent: false },
  { id: '7', name: 'Kadiatou Diallo', phoneNumber: '695678901', recent: false },
  { id: '8', name: 'Sekou Toure', phoneNumber: '620123456', recent: false },
];

// Define types
type RequestMoneyScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
  recent: boolean;
}

// Helper to generate a random token for the request link
const generateRequestToken = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < 12; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
};

export const RequestMoney = () => {
  const navigation = useNavigation<RequestMoneyScreenNavigationProp>();
  const [step, setStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [requestLink, setRequestLink] = useState('');
  const [filteredContacts, setFilteredContacts] = useState(MOCK_CONTACTS);
  const slideAnim = useRef(new Animated.Value(0)).current;
  
  // Filter contacts based on search query
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredContacts(MOCK_CONTACTS);
    } else {
      const filtered = MOCK_CONTACTS.filter(
        contact => 
          contact.name.toLowerCase().includes(text.toLowerCase()) || 
          contact.phoneNumber.includes(text)
      );
      setFilteredContacts(filtered);
    }
  };
  
  // Handle contact selection
  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);
  };
  
  // Go to next step with animation
  const goToNextStep = () => {
    if (step === 1 && !selectedContact) {
      Alert.alert('Please select a contact', 'You need to select a contact to proceed.');
      return;
    }
    
    if (step === 2 && !amount) {
      Alert.alert('Amount required', 'Please enter the amount you want to request.');
      return;
    }
    
    // Animate transition
    Animated.timing(slideAnim, {
      toValue: -1,
      duration: 300,
      useNativeDriver: true
    }).start(() => {
      setStep(step + 1);
      slideAnim.setValue(1);
      
      // Animate slide in
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }).start();
      
      // Generate request link when moving to step 3
      if (step === 2) {
        const token = generateRequestToken();
        setRequestLink(`https://zamo.app/request?q=${token}`);
      }
    });
  };
  
  // Go back to previous step
  const goBack = () => {
    if (step === 1) {
      navigation.goBack();
      return;
    }
    
    // Animate transition
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start(() => {
      setStep(step - 1);
      slideAnim.setValue(-1);
      
      // Animate slide in
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }).start();
    });
  };
  
  // Handle copy link
  const handleCopyLink = () => {
    Clipboard.setString(requestLink);
    
    // Show copy confirmation
    if (Platform.OS === 'android') {
      // For Android
      Alert.alert('Copied', 'Link copied to clipboard');
    } else {
      // For iOS
      Alert.alert('Copied', 'Link copied to clipboard');
    }
  };
  
  // Handle share link
  const handleShareLink = async () => {
    try {
      const result = await Share.share({
        message: `I've requested ${amount} FCFA from you. Use this link to pay: ${requestLink}`,
        title: 'Money Request via Zamo'
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };
  
  // Handle request completion
  const handleComplete = () => {
    navigation.goBack();
  };
  
  // Render contact item
  const renderContactItem = ({ item }: { item: Contact }) => (
    <TouchableOpacity 
      style={[
        styles.contactItem,
        selectedContact?.id === item.id && styles.selectedContactItem
      ]}
      onPress={() => handleContactSelect(item)}
    >
      <View style={styles.contactAvatar}>
        <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactPhone}>{item.phoneNumber}</Text>
      </View>
      {selectedContact?.id === item.id && (
        <Ionicons name="checkmark-circle" size={24} color="#3B5BFE" />
      )}
    </TouchableOpacity>
  );
  
  // Render separator for contact list
  const renderSeparator = () => <View style={styles.separator} />;
  
  // Render steps content
  const renderStepContent = () => {
    const { width } = Dimensions.get('window');
    const translateX = slideAnim.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [width, 0, -width]
    });
    
    switch (step) {
      case 1:
        return (
          <Animated.View style={[styles.stepContainer, { transform: [{ translateX }] }]}>
            <Text style={styles.stepTitle}>Who do you want to request from?</Text>
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search name or phone number..."
                placeholderTextColor="#666"
                value={searchQuery}
                onChangeText={handleSearch}
              />
            </View>
            
            {filteredContacts.length > 0 ? (
              <FlatList
                data={filteredContacts}
                renderItem={renderContactItem}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={renderSeparator}
                style={styles.contactsList}
                ListHeaderComponent={() => (
                  <Text style={styles.listHeader}>
                    {searchQuery ? 'Search Results' : 'Recent Contacts'}
                  </Text>
                )}
              />
            ) : (
              <View style={styles.emptyResultContainer}>
                <Ionicons name="search" size={40} color="#666" />
                <Text style={styles.emptyResultText}>No contacts found</Text>
              </View>
            )}
            
            <TouchableOpacity 
              style={[styles.nextButton, !selectedContact && styles.disabledButton]}
              onPress={goToNextStep}
              disabled={!selectedContact}
            >
              <Text style={styles.nextButtonText}>Next</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFF" />
            </TouchableOpacity>
          </Animated.View>
        );
        
      case 2:
        return (
          <Animated.View style={[styles.stepContainer, { transform: [{ translateX }] }]}>
            <Text style={styles.stepTitle}>Request Money</Text>
            
            <View style={styles.selectedContactCard}>
              <View style={styles.contactAvatar}>
                <Text style={styles.avatarText}>{selectedContact?.name.charAt(0)}</Text>
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{selectedContact?.name}</Text>
                <Text style={styles.contactPhone}>{selectedContact?.phoneNumber}</Text>
              </View>
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                <Ionicons name="cash-outline" size={18} color="#3B5BFE" /> Amount
              </Text>
              <View style={styles.amountInputContainer}>
                <TextInput
                  style={styles.amountInput}
                  placeholder="0"
                  placeholderTextColor="#666"
                  keyboardType="number-pad"
                  value={amount}
                  onChangeText={setAmount}
                />
                <Text style={styles.currencyText}>FCFA</Text>
              </View>
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                <Ionicons name="chatbubble-outline" size={18} color="#3B5BFE" /> Message (Optional)
              </Text>
              <TextInput
                style={styles.messageInput}
                placeholder="Add message..."
                placeholderTextColor="#666"
                multiline
                numberOfLines={3}
                value={message}
                onChangeText={setMessage}
              />
            </View>
            
            <TouchableOpacity 
              style={[styles.nextButton, !amount && styles.disabledButton]}
              onPress={goToNextStep}
              disabled={!amount}
            >
              <Text style={styles.nextButtonText}>Request Now</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFF" />
            </TouchableOpacity>
          </Animated.View>
        );
        
      case 3:
        return (
          <Animated.View style={[styles.stepContainer, { transform: [{ translateX }] }]}>
            <View style={styles.successContainer}>
              <View style={styles.successIconContainer}>
                <Ionicons name="checkmark-circle" size={80} color="#3B5BFE" />
              </View>
              <Text style={styles.successTitle}>Request Sent!</Text>
              <Text style={styles.successDescription}>
                You've requested <Text style={styles.successHighlight}>{amount} FCFA</Text> from{' '}
                <Text style={styles.successHighlight}>{selectedContact?.name}</Text>
              </Text>
              
              <View style={styles.linkContainer}>
                <Text style={styles.linkLabel}>Request Link:</Text>
                <View style={styles.linkTextContainer}>
                  <Text style={styles.linkText} numberOfLines={1} ellipsizeMode="middle">
                    {requestLink}
                  </Text>
                </View>
              </View>
              
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.actionButton} onPress={handleCopyLink}>
                  <Ionicons name="copy-outline" size={24} color="#FFF" />
                  <Text style={styles.actionButtonText}>Copy Link</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={[styles.actionButton, styles.shareButton]} onPress={handleShareLink}>
                  <Ionicons name="share-social-outline" size={24} color="#FFF" />
                  <Text style={styles.actionButtonText}>Share</Text>
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity style={styles.doneButton} onPress={handleComplete}>
                <Text style={styles.doneButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <View style={styles.stepIndicator}>
            <View style={[styles.stepDot, step >= 1 && styles.activeStepDot]} />
            <View style={styles.stepLine} />
            <View style={[styles.stepDot, step >= 2 && styles.activeStepDot]} />
            <View style={styles.stepLine} />
            <View style={[styles.stepDot, step >= 3 && styles.activeStepDot]} />
          </View>
        </View>
        
        {renderStepContent()}
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
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepIndicator: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 40,
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#333',
  },
  activeStepDot: {
    backgroundColor: '#3B5BFE',
    width: 12,
    height: 12,
  },
  stepLine: {
    width: 30,
    height: 2,
    backgroundColor: '#333',
    marginHorizontal: 5,
  },
  stepContainer: {
    flex: 1,
    padding: 16,
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 50,
    color: '#FFF',
    fontSize: 16,
  },
  contactsList: {
    flex: 1,
    marginBottom: 16,
  },
  listHeader: {
    fontSize: 14,
    color: '#888',
    marginBottom: 12,
    marginTop: 8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  selectedContactItem: {
    backgroundColor: 'rgba(59, 91, 254, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  contactAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#3B5BFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 4,
  },
  contactPhone: {
    fontSize: 14,
    color: '#AAA',
  },
  separator: {
    height: 1,
    backgroundColor: '#222',
    marginVertical: 8,
  },
  nextButton: {
    backgroundColor: '#3B5BFE',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  disabledButton: {
    opacity: 0.5,
  },
  emptyResultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyResultText: {
    color: '#888',
    fontSize: 16,
    marginTop: 16,
  },
  selectedContactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 12,
    fontWeight: '500',
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  amountInput: {
    flex: 1,
    height: 60,
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  currencyText: {
    color: '#888',
    fontSize: 18,
  },
  messageInput: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    color: '#FFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
    height: 100,
    textAlignVertical: 'top',
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  successIconContainer: {
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 16,
  },
  successDescription: {
    fontSize: 16,
    color: '#AAA',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  successHighlight: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  linkContainer: {
    width: '100%',
    marginBottom: 32,
  },
  linkLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  linkTextContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  linkText: {
    color: '#007BFF',
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  actionButtons: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 32,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  shareButton: {
    backgroundColor: '#007BFF',
  },
  actionButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  doneButton: {
    width: '100%',
    backgroundColor: '#262626',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 