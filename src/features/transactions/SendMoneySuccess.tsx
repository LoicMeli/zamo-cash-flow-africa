import React, { useRef, useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  Platform,
  Alert,
  Animated,
  Easing,
  Modal,
  ScrollView
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '../../components/common/Icon';
import { RootStackParamList } from '../../types/navigation';
import { TransactionReceipt } from '../../components/TransactionReceipt';
import { PDFReceipt, PDFGenerator } from '../../utils/PDFGenerator';

type SendMoneySuccessScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type SendMoneySuccessScreenRouteProp = RouteProp<RootStackParamList, 'SendMoneySuccess'>;

export const SendMoneySuccess = () => {
  const navigation = useNavigation<SendMoneySuccessScreenNavigationProp>();
  const route = useRoute<SendMoneySuccessScreenRouteProp>();
  const { recipient, amount, reference } = route.params;
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [pdfPath, setPdfPath] = useState<string | null>(null);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const checkmarkScale = useRef(new Animated.Value(0)).current;
  const titleTranslate = useRef(new Animated.Value(20)).current;
  const receiptTranslate = useRef(new Animated.Value(30)).current;
  const buttonsScale = useRef(new Animated.Value(0.9)).current;
  const checkmarkRotate = useRef(new Animated.Value(0)).current;
  const modalScaleAnim = useRef(new Animated.Value(0.9)).current;
  const modalOpacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Sequenced animations for a polished effect
    Animated.sequence([
      // Start with the checkmark animation
      Animated.spring(checkmarkScale, {
        toValue: 1,
        tension: 60,
        friction: 7,
        useNativeDriver: true
      }),

      // Then fade in and animate the title
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true
        }),
        Animated.spring(titleTranslate, {
          toValue: 0,
          tension: 50,
          friction: 7,
          useNativeDriver: true
        }),
        Animated.timing(checkmarkRotate, {
          toValue: 1,
          duration: 500,
          easing: Easing.elastic(1.5),
          useNativeDriver: true
        })
      ]),

      // Finally animate the receipt and buttons
      Animated.parallel([
        Animated.spring(receiptTranslate, {
          toValue: 0,
          tension: 50,
          friction: 8,
          useNativeDriver: true
        }),
        Animated.spring(buttonsScale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true
        })
      ])
    ]).start();
  }, []);

  const handleGoBack = () => {
    // Fade out animation before navigation
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start(() => {
      // Go back to the dashboard
      navigation.navigate('Main');
    });
  };

  const showPDFModal = () => {
    setShowReceiptModal(true);
    // Animate the modal entry
    Animated.parallel([
      Animated.timing(modalOpacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }),
      Animated.spring(modalScaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true
      })
    ]).start();
  };

  const closePDFModal = () => {
    // Animate the modal exit
    Animated.parallel([
      Animated.timing(modalOpacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.spring(modalScaleAnim, {
        toValue: 0.9,
        tension: 50,
        friction: 7,
        useNativeDriver: true
      })
    ]).start(() => {
      setShowReceiptModal(false);
    });
  };

  const handleDownloadReceipt = async () => {
    // Show receipt preview modal
    showPDFModal();
  };

  const handleSavePDF = async () => {
    const receiptData: PDFReceipt = {
      reference,
      date: formatDate(),
      recipient,
      amount,
      fee: 'Free'
    };
    
    try {
      // Using the simplified PDFGenerator for Expo Go
      const filePath = await PDFGenerator.captureAndSavePDF(null, receiptData);
      setPdfPath(filePath);
      closePDFModal();
    } catch (error) {
      console.error('Failed to generate PDF', error);
      Alert.alert('Error', 'Failed to generate receipt PDF');
    }
  };

  const handleSharePDF = async () => {
    if (pdfPath) {
      await PDFGenerator.sharePDF(pdfPath);
    } else {
      Alert.alert('Error', 'Please download the receipt first');
    }
  };

  // Format currency with commas
  const formatCurrency = (value: number) => {
    return value.toLocaleString();
  };

  // Format date
  const formatDate = () => {
    const now = new Date();
    return now.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Calculate rotation for checkmark
  const rotateInterpolation = checkmarkRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  const receipt: PDFReceipt = {
    reference,
    date: formatDate(),
    recipient,
    amount,
    fee: 'Free'
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View 
        style={[
          styles.successContent,
          { opacity: fadeAnim }
        ]}
      >
        <Animated.View 
          style={[
            styles.successIcon,
            { 
              transform: [
                { scale: checkmarkScale },
                { rotate: rotateInterpolation }
              ] 
            }
          ]}
        >
          <Icon name="checkmark" size={60} color="#0D0D0D" />
        </Animated.View>
        
        <Animated.Text 
          style={[
            styles.successTitle,
            { transform: [{ translateY: titleTranslate }] }
          ]}
        >
          Money Sent!
        </Animated.Text>
        
        <Animated.Text 
          style={[
            styles.successMessage,
            { transform: [{ translateY: titleTranslate }] }
          ]}
        >
          Your money has been sent successfully
        </Animated.Text>
        
        <Animated.View 
          style={[
            styles.receiptCard,
            { transform: [{ translateY: receiptTranslate }] }
          ]}
        >
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Recipient</Text>
            <View style={styles.receiptValueContainer}>
              <Text style={styles.receiptValue}>{recipient.name}</Text>
              <Text style={styles.receiptSubValue}>{recipient.phone}</Text>
            </View>
          </View>
          
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Amount</Text>
            <Text style={styles.receiptValue}>{formatCurrency(amount)} FCFA</Text>
          </View>
          
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Reference</Text>
            <Text style={styles.receiptValue}>{reference}</Text>
          </View>

          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Date</Text>
            <Text style={styles.receiptSubValue}>{formatDate()}</Text>
          </View>
        </Animated.View>

        <Animated.View 
          style={{ 
            width: '100%', 
            transform: [{ scale: buttonsScale }],
            opacity: fadeAnim 
          }}
        >
          <TouchableOpacity 
            style={styles.downloadButton}
            onPress={handleDownloadReceipt}
          >
            <Icon name="download-outline" size={20} color="#FFF" style={styles.buttonIcon} />
            <Text style={styles.downloadButtonText}>Download PDF Receipt</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.homeButton}
            onPress={handleGoBack}
          >
            <Text style={styles.homeButtonText}>Home</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>

      {/* PDF Receipt Modal */}
      <Modal
        visible={showReceiptModal}
        transparent={true}
        animationType="none"
        onRequestClose={closePDFModal}
      >
        <View style={styles.modalOverlay}>
          <Animated.View 
            style={[
              styles.modalContainer,
              {
                opacity: modalOpacityAnim,
                transform: [{ scale: modalScaleAnim }]
              }
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Transaction Receipt</Text>
              <TouchableOpacity onPress={closePDFModal}>
                <Icon name="close" size={24} color="#FFF" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.receiptContainer}>
              <TransactionReceipt receipt={receipt} />
            </ScrollView>
            
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.modalButton}
                onPress={handleSavePDF}
              >
                <Icon name="download-outline" size={20} color="#FFF" style={styles.buttonIcon} />
                <Text style={styles.modalButtonText}>Save PDF</Text>
              </TouchableOpacity>
              
              {pdfPath && (
                <TouchableOpacity 
                  style={[styles.modalButton, styles.shareButton]}
                  onPress={handleSharePDF}
                >
                  <Icon name="share-outline" size={20} color="#FFF" style={styles.buttonIcon} />
                  <Text style={styles.modalButtonText}>Share</Text>
                </TouchableOpacity>
              )}
            </View>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  successContent: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    paddingTop: 60,
  },
  successIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#34D399', // Bright green for success
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  successMessage: {
    fontSize: 16,
    color: '#C2C2C2',
    marginBottom: 40,
    textAlign: 'center',
  },
  receiptCard: {
    backgroundColor: '#1B1B1B',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    marginBottom: 32,
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  receiptLabel: {
    color: '#C2C2C2',
    fontSize: 16,
  },
  receiptValueContainer: {
    alignItems: 'flex-end',
  },
  receiptValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  receiptSubValue: {
    color: '#C2C2C2',
    fontSize: 14,
    marginTop: 2,
  },
  downloadButton: {
    backgroundColor: '#1B1B1B',
    borderRadius: 12,
    height: 55,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  buttonIcon: {
    marginRight: 10,
  },
  downloadButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  homeButton: {
    backgroundColor: '#3B5BFE',
    borderRadius: 12,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  homeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContainer: {
    width: '100%',
    maxHeight: '90%',
    backgroundColor: '#0D0D0D',
    borderRadius: 12,
    overflow: 'hidden',
  },
  modalHeader: {
    backgroundColor: '#1B1B1B',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  receiptContainer: {
    padding: 16,
    maxHeight: 500,
  },
  modalActions: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    backgroundColor: '#3B5BFE',
    borderRadius: 12,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  shareButton: {
    backgroundColor: '#1B1B1B',
    marginRight: 0,
    marginLeft: 8,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
