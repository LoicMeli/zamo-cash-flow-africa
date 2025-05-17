import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Pressable,
  Animated,
  Dimensions,
  Easing
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types/navigation';
import { useTheme } from '../../theme/ThemeContext';
import { ThemedText } from '../../components/common/ThemedView';
import { useLanguage } from '../../providers/LanguageProvider';

type SendMoneyScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Mock data for recent contacts
const RECENT_CONTACTS = [
  { name: "Sarah", phone: "3456" },
  { name: "Michael", phone: "9900" },
  { name: "Olivia", phone: "6677" }
];

// Mock data for full contacts
const FULL_CONTACTS = [
  { name: "Sarah Johnson", phone: "+237655123456" },
  { name: "Michael Chen", phone: "+237677889900" },
  { name: "Olivia Smith", phone: "+237644556677" },
  { name: "David Wilson", phone: "+237688991122" },
  { name: "Emma Brown", phone: "+237611223344" }
];

// Tab screens enum
enum TabScreen {
  PHONE = 'Phone',
  SCAN = 'Scan',
  CONTACTS = 'Contacts'
}

// Screen width
const { width } = Dimensions.get('window');

export const SendMoney = () => {
  const navigation = useNavigation<SendMoneyScreenNavigationProp>();
  const [activeTab, setActiveTab] = useState<TabScreen>(TabScreen.PHONE);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState<number | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const { colors, isDarkMode } = useTheme();
  const { t } = useLanguage();
  
  // Animation values
  const tabIndicatorPosition = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const inputScaleAnim = useRef(new Animated.Value(1)).current;
  const inputBorderAnim = useRef(new Animated.Value(0)).current;
  const phoneTabOpacity = useRef(new Animated.Value(1)).current;
  const scanTabOpacity = useRef(new Animated.Value(0)).current;
  const contactsTabOpacity = useRef(new Animated.Value(0)).current;
  const buttonScaleAnim = useRef(new Animated.Value(1)).current;
  const contactItemsAnim = useRef(
    FULL_CONTACTS.map(() => new Animated.Value(0))
  ).current;

  // Input ref
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    // Animate tab indicator
    let toValue = 0;
    switch (activeTab) {
      case TabScreen.PHONE:
        toValue = 0;
        animateTabContent(phoneTabOpacity, scanTabOpacity, contactsTabOpacity);
        break;
      case TabScreen.SCAN:
        toValue = width / 3;
        animateTabContent(scanTabOpacity, phoneTabOpacity, contactsTabOpacity);
        break;
      case TabScreen.CONTACTS:
        toValue = (width / 3) * 2;
        animateTabContent(contactsTabOpacity, phoneTabOpacity, scanTabOpacity);
        // Animate contact items when contacts tab is shown
        if (activeTab === TabScreen.CONTACTS) {
          animateContactItems();
        }
        break;
    }

    Animated.spring(tabIndicatorPosition, {
      toValue,
      useNativeDriver: true,
      tension: 70,
      friction: 10
    }).start();
  }, [activeTab]);

  const animateTabContent = (
    showAnim: Animated.Value,
    hideAnim1: Animated.Value,
    hideAnim2: Animated.Value
  ) => {
    // Fade out current content
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true
    }).start(() => {
      // Reset opacity values
      hideAnim1.setValue(0);
      hideAnim2.setValue(0);
      showAnim.setValue(1);
      
      // Fade in new content
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true
      }).start();
    });
  };

  const animateContactItems = () => {
    // Staggered animation for contact items
    const animations = contactItemsAnim.map((anim, index) => {
      return Animated.timing(anim, {
        toValue: 1,
        duration: 300,
        delay: index * 50, // Stagger effect
        useNativeDriver: true,
        easing: Easing.out(Easing.ease)
      });
    });
    
    Animated.stagger(50, animations).start();
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    // Séparer les animations pour éviter les conflits
    Animated.timing(inputScaleAnim, {
      toValue: 1.02,
      duration: 300,
      useNativeDriver: true
    }).start();
    
    Animated.timing(inputBorderAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false
    }).start();
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    // Séparer les animations pour éviter les conflits
    Animated.timing(inputScaleAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start();
    
    Animated.timing(inputBorderAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false
    }).start();
  };

  const handleButtonPressIn = () => {
    Animated.spring(buttonScaleAnim, {
      toValue: 0.95,
      friction: 5,
      tension: 100,
      useNativeDriver: true
    }).start();
  };

  const handleButtonPressOut = () => {
    Animated.spring(buttonScaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true
    }).start();
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleTabChange = (tab: TabScreen) => {
    setActiveTab(tab);
  };

  const handleContinue = () => {
    if (phoneNumber.trim()) {
      // Find if there's a matching contact
      const matchingContact = FULL_CONTACTS.find(contact => 
        contact.phone.includes(phoneNumber) || phoneNumber.includes(contact.phone)
      );
      
      const recipient = matchingContact || { 
        name: `User (${phoneNumber})`, 
        phone: phoneNumber.includes('+') ? phoneNumber : `+237${phoneNumber}` 
      };
      
      navigation.navigate('SendMoneyAmount', { recipient });
    } else if (selectedContact !== null) {
      navigation.navigate('SendMoneyAmount', { recipient: FULL_CONTACTS[selectedContact] });
    }
  };

  const handleContactPress = (contact: typeof FULL_CONTACTS[0], index: number) => {
    // Animate the contact selection
    setSelectedContact(index);
    
    // Add tactile feedback animation
    Animated.sequence([
      Animated.timing(contactItemsAnim[index], {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(contactItemsAnim[index], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true
      })
    ]).start(() => {
      navigation.navigate('SendMoneyAmount', { recipient: contact });
    });
  };

  const handleSelectRecentContact = (contact: typeof RECENT_CONTACTS[0], index: number) => {
    const fullContact = FULL_CONTACTS.find(c => c.phone.includes(contact.phone));
    
    if (fullContact) {
      navigation.navigate('SendMoneyAmount', { recipient: fullContact });
    } else {
      // Create a temporary full contact
      const tempContact = {
        name: contact.name,
        phone: `+237${contact.phone}`
      };
      navigation.navigate('SendMoneyAmount', { recipient: tempContact });
    }
  };

  const filteredContacts = FULL_CONTACTS.filter(contact => {
    const query = searchQuery.toLowerCase();
    return (
      contact.name.toLowerCase().includes(query) || 
      contact.phone.includes(query)
    );
  });

  // Determine if the Next button should be enabled
  const isNextEnabled = phoneNumber.trim().length > 0 || selectedContact !== null;

  // Interpolate input border color based on focus state
  const inputBorderColor = inputBorderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', '#3B5BFE']
  });
  
  // Interpolate input shadow for glow effect
  const inputShadowOpacity = inputBorderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5]
  });

  const renderPhoneTab = () => (
    <Animated.View 
      style={[
        styles.tabContent, 
        { opacity: phoneTabOpacity }
      ]}
    >
      {/* Séparons les animations natives et JS en composants différents */}
      <Animated.View 
        style={[
          {
            transform: [{ scale: inputScaleAnim }],
          }
        ]}
      >
        <Animated.View 
          style={[
            styles.inputContainer,
            { 
              borderColor: inputBorderColor,
              borderWidth: 1,
              shadowOpacity: inputShadowOpacity,
            }
          ]}
        >
          <Text style={[
            styles.placeholderText, 
            phoneNumber.length > 0 && styles.placeholderHidden
          ]}>
            Recipient
          </Text>
          <TextInput
            ref={inputRef}
            style={styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            placeholderTextColor="#C2C2C2"
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        </Animated.View>
      </Animated.View>
      
      <Text style={styles.sectionTitle}>Recent contacts</Text>
      
      <View style={styles.recentContactsContainer}>
        {RECENT_CONTACTS.map((contact, index) => (
          <TouchableOpacity 
            key={index}
            style={styles.recentContactItem}
            onPress={() => handleSelectRecentContact(contact, index)}
          >
            <Animated.View 
              style={[
                styles.contactAvatar,
                {
                  transform: [{
                    scale: new Animated.Value(1)
                  }]
                }
              ]}
            >
              <Ionicons name="person" size={24} color="#3B5BFE" />
            </Animated.View>
            <Text style={styles.contactName}>{contact.name}</Text>
            <Text style={styles.contactPhone}>{contact.phone}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <Animated.View 
        style={{ 
          opacity: fadeAnim,
          transform: [{ scale: buttonScaleAnim }]
        }}
      >
        <TouchableOpacity 
          style={[styles.nextButton, !isNextEnabled && styles.nextButtonDisabled]}
          onPress={handleContinue}
          disabled={!isNextEnabled}
          onPressIn={handleButtonPressIn}
          onPressOut={handleButtonPressOut}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );

  const renderScanTab = () => (
    <Animated.View 
      style={[
        styles.tabContent, 
        { opacity: scanTabOpacity }
      ]}
    >
      <View style={styles.scanContainer}>
        <Animated.View 
          style={[
            styles.qrCodeContainer,
            { 
              transform: [{ scale: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1]
              }) }]
            }
          ]}
        >
          <Ionicons name="qr-code" size={80} color="#3B5BFE" />
        </Animated.View>
        <Text style={styles.scanText}>Scan QR to Send Money</Text>
        <Text style={styles.scanSubText}>Position the QR code in the frame to scan</Text>
      </View>
    </Animated.View>
  );

  const renderContactsTab = () => (
    <Animated.View 
      style={[
        styles.tabContent, 
        { opacity: contactsTabOpacity }
      ]}
    >
      {/* Séparons les animations natives et JS en composants différents */}
      <Animated.View 
        style={[
          {
            transform: [{ scale: inputScaleAnim }],
          }
        ]}
      >
        <Animated.View 
          style={[
            styles.searchContainer,
            { 
              borderColor: inputBorderColor,
              borderWidth: 1,
              shadowOpacity: inputShadowOpacity,
            }
          ]}
        >
          <Ionicons name="search" size={20} color="#C2C2C2" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search contacts"
            placeholderTextColor="#C2C2C2"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        </Animated.View>
      </Animated.View>
      
      <ScrollView style={styles.contactsList}>
        {filteredContacts.map((contact, index) => (
          <Animated.View 
            key={index}
            style={{
              opacity: contactItemsAnim[index],
              transform: [{ 
                translateY: contactItemsAnim[index].interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0]
                })
              }]
            }}
          >
            <TouchableOpacity 
              style={[
                styles.contactItem,
                selectedContact === index && styles.contactItemSelected
              ]}
              onPress={() => handleContactPress(contact, index)}
            >
              <View style={styles.fullContactAvatar}>
                <Ionicons name="person" size={24} color="#3B5BFE" />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.fullContactName}>{contact.name}</Text>
                <Text style={styles.fullContactPhone}>{contact.phone}</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>
      
      <Animated.View style={{ opacity: fadeAnim }}>
        <TouchableOpacity 
          style={styles.addContactButton}
          onPressIn={handleButtonPressIn}
          onPressOut={handleButtonPressOut}
        >
          <Ionicons name="person-add" size={20} color="#FFF" />
          <Text style={styles.addContactText}>Add Contact</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case TabScreen.PHONE:
        return renderPhoneTab();
      case TabScreen.SCAN:
        return renderScanTab();
      case TabScreen.CONTACTS:
        return renderContactsTab();
      default:
        return renderPhoneTab();
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleGoBack}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Send Money</ThemedText>
        <View style={styles.placeholder} />
      </View>
      
      <View style={styles.tabContainer}>
        {Object.values(TabScreen).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab
            ]}
            onPress={() => handleTabChange(tab)}
          >
            <ThemedText
              style={[
                styles.tabText,
                activeTab === tab && [styles.activeTabText, { color: colors.primary }]
              ]}
            >
              {tab}
            </ThemedText>
          </TouchableOpacity>
        ))}
        <Animated.View
          style={[
            styles.tabIndicator,
            { backgroundColor: colors.primary, transform: [{ translateX: tabIndicatorPosition }] }
          ]}
        />
      </View>
      
      <Animated.View style={[styles.tabContent, { opacity: fadeAnim }]}>
        {renderActiveTab()}
      </Animated.View>
      
      {activeTab === TabScreen.PHONE && phoneNumber.trim().length > 0 && (
        <Animated.View 
          style={[
            styles.continueButtonContainer,
            { transform: [{ scale: buttonScaleAnim }] }
          ]}
        >
          <TouchableOpacity
            style={[styles.continueButton, { backgroundColor: colors.primary }]}
            onPress={handleContinue}
            onPressIn={handleButtonPressIn}
            onPressOut={handleButtonPressOut}
          >
            <ThemedText style={[styles.continueButtonText, { color: '#FFFFFF' }]}>
              Continue
            </ThemedText>
          </TouchableOpacity>
        </Animated.View>
      )}
      
      {activeTab === TabScreen.CONTACTS && selectedContact !== null && (
        <Animated.View 
          style={[
            styles.continueButtonContainer,
            { transform: [{ scale: buttonScaleAnim }] }
          ]}
        >
          <TouchableOpacity
            style={[styles.continueButton, { backgroundColor: colors.primary }]}
            onPress={handleContinue}
            onPressIn={handleButtonPressIn}
            onPressOut={handleButtonPressOut}
          >
            <ThemedText style={[styles.continueButtonText, { color: '#FFFFFF' }]}>
              Continue with {FULL_CONTACTS[selectedContact].name}
            </ThemedText>
          </TouchableOpacity>
        </Animated.View>
      )}
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  placeholder: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#1B1B1B',
    marginTop: 16,
    height: 48,
    position: 'relative',
    padding: 4,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    zIndex: 1,
  },
  activeTab: {
    backgroundColor: '#3B5BFE',
  },
  tabText: {
    color: '#C2C2C2',
    fontSize: 16,
    fontWeight: '500',
    zIndex: 2,
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  tabIndicator: {
    position: 'absolute',
    top: 4,
    bottom: 4,
    left: 4,
    width: (width - 32 - 8) / 3, // Screen width - horizontal margins - padding
    backgroundColor: '#3B5BFE',
    borderRadius: 8,
    zIndex: 0,
  },
  tabContent: {
    flex: 1,
  },
  inputContainer: {
    backgroundColor: '#1B1B1B',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55,
    justifyContent: 'center',
    marginBottom: 24,
    position: 'relative',
    shadowColor: '#3B5BFE',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    elevation: 2,
  },
  placeholderText: {
    position: 'absolute',
    left: 15,
    color: '#C2C2C2',
    fontSize: 16,
  },
  placeholderHidden: {
    opacity: 0,
  },
  input: {
    color: '#FFFFFF',
    fontSize: 16,
    height: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  recentContactsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 32,
  },
  recentContactItem: {
    alignItems: 'center',
  },
  contactAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1B1B1B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#3B5BFE',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
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
  nextButton: {
    backgroundColor: '#3B5BFE',
    borderRadius: 12,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
  },
  nextButtonDisabled: {
    backgroundColor: 'rgba(59, 91, 254, 0.5)', // 50% opacity
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scanContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrCodeContainer: {
    width: 180,
    height: 180,
    backgroundColor: '#1B1B1B',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: 'rgba(59, 91, 254, 0.3)',
    shadowColor: '#3B5BFE',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  scanText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  scanSubText: {
    color: '#C2C2C2',
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 40,
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
  contactItemSelected: {
    backgroundColor: '#1B1B1B',
    borderLeftWidth: 3,
    borderLeftColor: '#3B5BFE',
  },
  fullContactAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1B1B1B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    shadowColor: '#3B5BFE',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  contactInfo: {
    flex: 1,
  },
  fullContactName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  fullContactPhone: {
    color: '#C2C2C2',
    fontSize: 14,
    marginTop: 2,
  },
  addContactButton: {
    backgroundColor: '#1B1B1B',
    borderRadius: 12,
    height: 55,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'rgba(59, 91, 254, 0.3)',
  },
  addContactText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
  },
  continueButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  continueButton: {
    backgroundColor: '#3B5BFE',
    borderRadius: 12,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 