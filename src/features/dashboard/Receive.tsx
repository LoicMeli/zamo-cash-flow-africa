import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '../../utils/IconComponent';
import { RootStackParamList } from '../../types/navigation';
import { QRCodeModal } from '../../components/wallet/QRCodeModal';

// Mock user data
const USER_DATA = {
  phoneNumber: '698544342',
  zamoID: 'q9tyt9bj',
  name: 'Fatou Sow',
  avatar: null
};

// Mock recent payers
const RECENT_PAYERS = [
  { id: '1', name: 'Amadou Diallo', phoneNumber: '677123456', avatar: null },
  { id: '2', name: 'Ibrahim Touré', phoneNumber: '698765432', avatar: null },
  { id: '3', name: 'Aicha Koné', phoneNumber: '655987654', avatar: null },
  { id: '4', name: 'Mamadou Sow', phoneNumber: '691234567', avatar: null },
];

type ReceiveScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

export const Receive = () => {
  const navigation = useNavigation<ReceiveScreenNavigationProp>();
  const [qrModalVisible, setQrModalVisible] = useState(false);
  
  // Animation values
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const translateYAnim = React.useRef(new Animated.Value(30)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.9)).current;
  
  useEffect(() => {
    // Run animations on mount
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
        easing: Easing.elastic(1),
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      })
    ]).start();
  }, []);
  
  // Show QR modal when screen mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setQrModalVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Receive Money</Text>
      </View>

      <ScrollView style={styles.content}>
        <Animated.View 
          style={[
            styles.mainSection,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: translateYAnim },
                { scale: scaleAnim }
              ]
            }
          ]}
        >
          {/* Main QR Button */}
          <TouchableOpacity 
            style={styles.qrButton}
            onPress={() => setQrModalVisible(true)}
          >
            <View style={styles.qrIconCircle}>
              <Icon name="qr-code" size={36} color="#3B5BFE" />
            </View>
            <Text style={styles.qrButtonText}>Show QR Code</Text>
            <Text style={styles.qrButtonSubtext}>
              Let people scan your code to send you money
            </Text>
          </TouchableOpacity>
          
          {/* Quick Actions */}
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="copy-outline" size={24} color="#3B5BFE" />
              <Text style={styles.actionText}>Copy Number</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="share-social-outline" size={24} color="#3B5BFE" />
              <Text style={styles.actionText}>Share ID</Text>
            </TouchableOpacity>
          </View>
          
          {/* Recent Payers */}
          <View style={styles.recentSection}>
            <Text style={styles.sectionTitle}>Recent People</Text>
            
            {RECENT_PAYERS.map((person, index) => (
              <TouchableOpacity 
                key={person.id} 
                style={styles.personCard}
                onPress={() => {
                  // In a real app, this would prepare a request to this person
                  // For now, just show the QR
                  setQrModalVisible(true);
                }}
              >
                <View style={styles.personAvatar}>
                  <Text style={styles.avatarText}>
                    {person.name.charAt(0)}
                  </Text>
                </View>
                <View style={styles.personInfo}>
                  <Text style={styles.personName}>{person.name}</Text>
                  <Text style={styles.personNumber}>{person.phoneNumber}</Text>
                </View>
                <Icon name="chevron-forward" size={20} color="#666" />
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </ScrollView>

      {/* QR Code Modal */}
      <QRCodeModal 
        visible={qrModalVisible}
        onClose={() => setQrModalVisible(false)}
        phoneNumber={USER_DATA.phoneNumber}
        zamoID={USER_DATA.zamoID}
        userName={USER_DATA.name}
      />
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
    marginRight: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  mainSection: {
    padding: 20,
  },
  qrButton: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  qrIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(59, 91, 254, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  qrButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  qrButtonSubtext: {
    fontSize: 14,
    color: '#AAAAAA',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  actionButton: {
    alignItems: 'center',
    padding: 16,
  },
  actionText: {
    marginTop: 8,
    color: '#FFFFFF',
    fontSize: 14,
  },
  recentSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  personCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  personAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#3B5BFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  personInfo: {
    flex: 1,
  },
  personName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  personNumber: {
    fontSize: 13,
    color: '#AAAAAA',
  },
});
