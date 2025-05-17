
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  Dimensions 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '../../components/common/Icon';
import { RootStackParamList } from '../../types/navigation';
import { useTheme } from '../../theme/ThemeContext';

type ScanQRScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width } = Dimensions.get('window');
const qrSize = width * 0.7;

export const ScanQR = () => {
  const navigation = useNavigation<ScanQRScreenNavigationProp>();
  const { colors } = useTheme();
  const [flashEnabled, setFlashEnabled] = useState(false);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const toggleFlash = () => {
    setFlashEnabled(!flashEnabled);
  };

  // Mock QR code scan result handler
  const handleQRCodeScanned = ({ data }: { data: string }) => {
    // Process QR data
    console.log('QR code scanned:', data);
    
    // Typically you would parse the QR data and navigate accordingly
    if (data.startsWith('PAYMENT:')) {
      const recipient = {
        name: 'QR Payment',
        phone: '+237612345678'
      };
      
      navigation.navigate('SendMoneyAmount', { recipient });
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.light.background }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Icon name="arrow-back" size={24} color={colors.light.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.light.text }]}>Scanner le code QR</Text>
      </View>
      
      <View style={styles.cameraContainer}>
        {/* Camera placeholder - in a real app this would be a camera component */}
        <View style={styles.qrFrame}>
          <View style={styles.topLeft} />
          <View style={styles.topRight} />
          <View style={styles.bottomLeft} />
          <View style={styles.bottomRight} />
        </View>
        
        <Text style={styles.scanInstructions}>
          Positionnez le code QR à l'intérieur du cadre
        </Text>
      </View>
      
      <View style={styles.controls}>
        <TouchableOpacity 
          style={[styles.controlButton, flashEnabled && styles.activeButton]}
          onPress={toggleFlash}
        >
          <Icon 
            name={flashEnabled ? "flash" : "flash-off"} 
            size={24} 
            color={flashEnabled ? "#FFFFFF" : "#888888"} 
          />
          <Text style={[
            styles.buttonText, 
            { color: flashEnabled ? "#FFFFFF" : "#888888" }
          ]}>
            Flash
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  qrFrame: {
    width: qrSize,
    height: qrSize,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
    position: 'relative',
  },
  topLeft: {
    position: 'absolute',
    top: -2,
    left: -2,
    width: 30,
    height: 30,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#3B5BFE',
  },
  topRight: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 30,
    height: 30,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: '#3B5BFE',
  },
  bottomLeft: {
    position: 'absolute',
    bottom: -2,
    left: -2,
    width: 30,
    height: 30,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#3B5BFE',
  },
  bottomRight: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 30,
    height: 30,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: '#3B5BFE',
  },
  scanInstructions: {
    color: '#FFFFFF',
    marginTop: 30,
    fontSize: 16,
    textAlign: 'center',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#0D0D0D',
  },
  controlButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#222222',
    width: 100,
  },
  activeButton: {
    backgroundColor: '#3B5BFE',
  },
  buttonText: {
    marginTop: 8,
    fontSize: 14,
  }
});

export default ScanQR;
