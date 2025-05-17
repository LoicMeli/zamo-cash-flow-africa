import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  Share,
  Clipboard,
  ToastAndroid,
  Platform,
  Alert,
  Animated,
  Easing
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types/navigation';
import { QRCodeModal } from '../../components/wallet/QRCodeModal';

// Mock user data
const USER_DATA = {
  phoneNumber: '698544342',
  zamoID: 'q9tyt9bj',
  name: 'Fatou Sow',
  avatar: null
};

type CollectScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

// Helper to generate random string
const generateRandomString = (length: number) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Define interface for PaymentLinkModal props
interface PaymentLinkModalProps {
  visible: boolean;
  onClose: () => void;
}

// Payment Link Modal Component with proper type annotations
const PaymentLinkModal: React.FC<PaymentLinkModalProps> = ({ visible, onClose }) => {
  const [countdown, setCountdown] = useState(15);
  const [paymentLink, setPaymentLink] = useState('');
  const [isLinkExpired, setIsLinkExpired] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  // Animation for countdown
  const countdownAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  
  // Generate a new payment link when modal opens
  useEffect(() => {
    if (visible) {
      const uniqueCode = generateRandomString(8);
      setPaymentLink(`https://zamo.app/pay?q=${uniqueCode}`);
      setCountdown(15);
      setIsLinkExpired(false);
      setIsCopied(false);
      
      // Reset and start animations
      countdownAnim.setValue(1);
      progressAnim.setValue(0);
      
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 15000,
        easing: Easing.linear,
        useNativeDriver: false
      }).start();
    }
  }, [visible]);
  
  // Countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (visible && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
        
        // Animate the countdown number
        Animated.sequence([
          Animated.timing(countdownAnim, {
            toValue: 1.2,
            duration: 150,
            useNativeDriver: true
          }),
          Animated.timing(countdownAnim, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true
          })
        ]).start();
        
      }, 1000);
    } else if (countdown === 0) {
      setIsLinkExpired(true);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [visible, countdown]);
  
  // Handle share link
  const handleShare = async () => {
    if (isLinkExpired) return;
    
    try {
      await Share.share({
        message: `Send money to me using this payment link: ${paymentLink}`,
        title: 'Zamo Payment Link'
      });
    } catch (error) {
      console.error('Error sharing payment link:', error);
    }
  };
  
  // Handle copy link
  const handleCopy = () => {
    if (isLinkExpired) return;
    
    // This is the best way to handle clipboard in React Native
    // though there's a newer API in more recent versions
    Clipboard.setString(paymentLink);
    setIsCopied(true);
    
    // Show toast on Android or alert on iOS
    if (Platform.OS === 'android') {
      ToastAndroid.show('Link copied to clipboard', ToastAndroid.SHORT);
    } else {
      Alert.alert('Copied', 'Link copied to clipboard');
    }
    
    // Reset copied state after 2 seconds
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  // Calculate progress width
  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%']
  });
  
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.paymentLinkModal}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#FFF" />
          </TouchableOpacity>
          
          <View style={styles.modalHeader}>
            <Ionicons name="link" size={30} color="#3B5BFE" />
            <Text style={styles.modalTitle}>Payment Link</Text>
          </View>
          
          <Text style={styles.modalDescription}>
            This link go expire after 
            <Animated.Text 
              style={[
                styles.countdownText, 
                { transform: [{ scale: countdownAnim }] }
              ]}
            >
              {" " + countdown + " "}
            </Animated.Text>
            seconds
          </Text>
          
          {/* Progress bar */}
          <View style={styles.progressContainer}>
            <Animated.View 
              style={[
                styles.progressBar,
                { width: progressWidth },
                countdown <= 5 && styles.urgentProgress
              ]} 
            />
          </View>
          
          {/* Payment link */}
          <View style={[
            styles.linkContainer,
            isLinkExpired && styles.expiredLinkContainer
          ]}>
            <Text style={[
              styles.linkText,
              isLinkExpired && styles.expiredLinkText
            ]}>
              {isLinkExpired ? 'LINK EXPIRED' : paymentLink}
            </Text>
            
            {isLinkExpired && (
              <Ionicons name="time-outline" size={20} color="#EF4444" style={styles.expiredIcon} />
            )}
          </View>
          
          {/* Action buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[
                styles.actionButton,
                (isLinkExpired || isCopied) && styles.disabledButton
              ]}
              onPress={handleCopy}
              disabled={isLinkExpired}
            >
              <Ionicons 
                name={isCopied ? "checkmark" : "copy-outline"} 
                size={20} 
                color="#FFF" 
              />
              <Text style={styles.actionButtonText}>
                {isCopied ? "Copied" : "Copy Link"}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.actionButton,
                styles.shareButton,
                isLinkExpired && styles.disabledButton
              ]}
              onPress={handleShare}
              disabled={isLinkExpired}
            >
              <Ionicons name="share-social-outline" size={20} color="#FFF" />
              <Text style={styles.actionButtonText}>Share Link</Text>
            </TouchableOpacity>
          </View>
          
          {/* Refresh button (only when expired) */}
          {isLinkExpired && (
            <TouchableOpacity 
              style={styles.refreshButton}
              onPress={() => {
                const uniqueCode = generateRandomString(8);
                setPaymentLink(`https://zamo.app/pay?q=${uniqueCode}`);
                setCountdown(15);
                setIsLinkExpired(false);
                
                // Reset animations
                countdownAnim.setValue(1);
                progressAnim.setValue(0);
                
                Animated.timing(progressAnim, {
                  toValue: 1,
                  duration: 15000,
                  easing: Easing.linear,
                  useNativeDriver: false
                }).start();
              }}
            >
              <Ionicons name="refresh" size={20} color="#FFF" />
              <Text style={styles.refreshButtonText}>Generate New Link</Text>
            </TouchableOpacity>
          )}
          
          <Text style={styles.securityNote}>
            This link can only be used once and will expire automatically.
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export const Collect = () => {
  const navigation = useNavigation<CollectScreenNavigationProp>();
  const [qrModalVisible, setQrModalVisible] = useState(false);
  const [paymentLinkModalVisible, setPaymentLinkModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Collect Money</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Collection Methods */}
        <View style={styles.collectMethodsContainer}>
          <Text style={styles.sectionTitle}>How you wan collect?</Text>
          
          <TouchableOpacity 
            style={styles.methodCard}
            onPress={() => setQrModalVisible(true)}
          >
            <View style={styles.methodIconContainer}>
              <Ionicons name="qr-code" size={28} color="#3B5BFE" />
            </View>
            <View style={styles.methodInfo}>
              <Text style={styles.methodTitle}>Show QR Code</Text>
              <Text style={styles.methodDescription}>
                Make person scan your QR code for collect money quick-quick
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.methodCard}
            onPress={() => setPaymentLinkModalVisible(true)}
          >
            <View style={styles.methodIconContainer}>
              <Ionicons name="link" size={28} color="#3B5BFE" />
            </View>
            <View style={styles.methodInfo}>
              <Text style={styles.methodTitle}>Payment Link</Text>
              <Text style={styles.methodDescription}>
                Create link wey you fit share give people make dem pay you
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.methodCard}
            onPress={() => navigation.navigate('RequestMoney')}
          >
            <View style={styles.methodIconContainer}>
              <Ionicons name="people" size={28} color="#3B5BFE" />
            </View>
            <View style={styles.methodInfo}>
              <Text style={styles.methodTitle}>Request Money</Text>
              <Text style={styles.methodDescription}>
                Send request to person wey go pay you directly
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#666" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* QR Code Modal */}
      <QRCodeModal
        visible={qrModalVisible}
        onClose={() => setQrModalVisible(false)}
        phoneNumber={USER_DATA.phoneNumber}
        zamoID={USER_DATA.zamoID}
        userName={USER_DATA.name}
      />
      
      {/* Payment Link Modal */}
      <PaymentLinkModal 
        visible={paymentLinkModalVisible}
        onClose={() => setPaymentLinkModalVisible(false)}
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
    padding: 16,
  },
  collectMethodsContainer: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  methodIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(59, 91, 254, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  methodInfo: {
    flex: 1,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  methodDescription: {
    fontSize: 12,
    color: '#AAAAAA',
    lineHeight: 18,
  },
  
  // Payment Link Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  paymentLinkModal: {
    backgroundColor: '#121212',
    borderRadius: 16,
    width: '100%',
    maxWidth: 420,
    padding: 24,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 12,
  },
  modalDescription: {
    textAlign: 'center',
    color: '#AAAAAA',
    fontSize: 14,
    marginBottom: 16,
  },
  countdownText: {
    color: '#007BFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  progressContainer: {
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    marginBottom: 24,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#007BFF',
    borderRadius: 2,
  },
  urgentProgress: {
    backgroundColor: '#EF4444',
  },
  linkContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  expiredLinkContainer: {
    borderColor: '#EF4444',
    opacity: 0.7,
  },
  linkText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  expiredLinkText: {
    color: '#EF4444',
    textDecorationLine: 'line-through',
  },
  expiredIcon: {
    position: 'absolute',
    right: 12,
    top: 14,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#1E2235',
    borderRadius: 8,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  shareButton: {
    backgroundColor: '#007BFF',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  disabledButton: {
    opacity: 0.5,
  },
  refreshButton: {
    flexDirection: 'row',
    backgroundColor: '#2D3142',
    borderRadius: 8,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  refreshButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  securityNote: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
  },
}); 