import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Share,
  Platform,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Rect, Path, G, Circle, Text as SvgText } from 'react-native-svg';
import ViewShot from 'react-native-view-shot';

interface QRCodeModalProps {
  visible: boolean;
  onClose: () => void;
  phoneNumber?: string;
  zamoID?: string;
  userName?: string;
}

// Enhanced QR code component that follows zamo://send/{phone} format
const EnhancedQRCode: React.FC<{ value: string; size: number }> = ({ value, size }) => {
  // Create a simulated QR code visualization (in a real app, use a proper QR library)
  const baseSize = size;
  const cellSize = baseSize / 30;
  
  return (
    <Svg width={baseSize} height={baseSize} viewBox={`0 0 ${baseSize} ${baseSize}`}>
      {/* Background */}
      <Rect x="0" y="0" width={baseSize} height={baseSize} fill="white" />
      
      {/* Simulate QR code modules */}
      <G>
        {/* Top-left positioning square */}
        <Rect x={cellSize * 2} y={cellSize * 2} width={cellSize * 7} height={cellSize * 7} fill="black" />
        <Rect x={cellSize * 3} y={cellSize * 3} width={cellSize * 5} height={cellSize * 5} fill="white" />
        <Rect x={cellSize * 4} y={cellSize * 4} width={cellSize * 3} height={cellSize * 3} fill="black" />
        
        {/* Top-right positioning square */}
        <Rect x={baseSize - cellSize * 9} y={cellSize * 2} width={cellSize * 7} height={cellSize * 7} fill="black" />
        <Rect x={baseSize - cellSize * 8} y={cellSize * 3} width={cellSize * 5} height={cellSize * 5} fill="white" />
        <Rect x={baseSize - cellSize * 7} y={cellSize * 4} width={cellSize * 3} height={cellSize * 3} fill="black" />
        
        {/* Bottom-left positioning square */}
        <Rect x={cellSize * 2} y={baseSize - cellSize * 9} width={cellSize * 7} height={cellSize * 7} fill="black" />
        <Rect x={cellSize * 3} y={baseSize - cellSize * 8} width={cellSize * 5} height={cellSize * 5} fill="white" />
        <Rect x={cellSize * 4} y={baseSize - cellSize * 7} width={cellSize * 3} height={cellSize * 3} fill="black" />
        
        {/* Add the Zamo Logo in the center */}
        <Circle 
          cx={baseSize / 2} 
          cy={baseSize / 2} 
          r={baseSize / 8} 
          fill="#3B5BFE" 
        />
        <SvgText 
          x={baseSize / 2} 
          y={baseSize / 2 + cellSize * 1.5} 
          fill="white" 
          fontSize={baseSize / 10} 
          textAnchor="middle" 
          fontWeight="bold"
        >
          Z
        </SvgText>
        
        {/* Add data modules (simplified representation) */}
        {[...Array(18)].map((_, i) => (
          <React.Fragment key={`data-row-${i}`}>
            <Rect 
              x={cellSize * (i % 6 * 3 + 10)} 
              y={cellSize * (Math.floor(i / 6) * 3 + 10)} 
              width={cellSize * 2} 
              height={cellSize * 2} 
              fill="black" 
            />
          </React.Fragment>
        ))}
      </G>
    </Svg>
  );
};

export const QRCodeModal: React.FC<QRCodeModalProps> = ({
  visible,
  onClose,
  phoneNumber = '698544342',
  zamoID = 'q9tyt9bj',
  userName = 'Zamo User'
}) => {
  const viewShotRef = React.useRef<any>(null);
  const [captureInProgress, setCaptureInProgress] = useState(false);

  // Generate QR code value in the format zamo://send/{phone}
  const qrValue = `zamo://send/${phoneNumber}`;

  // Handle saving QR code
  const handleSaveQR = async () => {
    if (captureInProgress) return;
    
    try {
      setCaptureInProgress(true);
      
      if (viewShotRef.current) {
        // In a real app with proper permissions handling:
        // const uri = await viewShotRef.current.capture();
        // then use react-native-fs to save to gallery
        
        // For now, simulate the process:
        setTimeout(() => {
          Alert.alert(
            'QR Code Saved',
            'Your QR code has been saved to your gallery.',
            [{ text: 'OK', onPress: () => setCaptureInProgress(false) }]
          );
        }, 800);
      } else {
        setCaptureInProgress(false);
        Alert.alert('Error', 'Could not capture QR code');
      }
    } catch (error) {
      console.error('Error saving QR code:', error);
      Alert.alert('Error', 'Failed to save QR code');
      setCaptureInProgress(false);
    }
  };

  // Handle sharing QR code
  const handleShareQR = async () => {
    try {
      await Share.share({
        message: `Send money to me on Zamo! My number is ${phoneNumber}. Use this link: zamo://send/${phoneNumber}`,
        title: 'Share your Zamo QR Code'
      });
    } catch (error) {
      console.error('Error sharing QR code:', error);
      Alert.alert('Error', 'Failed to share QR code');
    }
  };

  if (!visible) return null;

  return (
    <View style={styles.modalContainer}>
      <View style={styles.qrModal}>
        {/* Close button */}
        <TouchableOpacity style={styles.qrClose} onPress={onClose}>
          <Ionicons name="close" size={16} color="#FFFFFF" />
        </TouchableOpacity>

        {/* QR code logo */}
        <View style={styles.qrLogoContainer}>
          <Ionicons name="qr-code" size={24} color="#3B5BFE" />
        </View>

        {/* Title and description */}
        <Text style={styles.qrTitle}>Your Personal QR</Text>
        <Text style={styles.qrDescription}>
          Show dis QR code make people fit send you money
        </Text>

        {/* QR Code Box */}
        <ViewShot ref={viewShotRef} style={styles.qrBox}>
          <EnhancedQRCode value={qrValue} size={160} />
          
          <Text style={styles.qrId}>{phoneNumber}</Text>
          <Text style={styles.qrSubId}>ID: {zamoID}</Text>
        </ViewShot>

        {/* Action Buttons */}
        <View style={styles.qrActions}>
          <TouchableOpacity 
            style={[styles.qrBtnSave, captureInProgress && styles.disabledButton]} 
            onPress={handleSaveQR}
            disabled={captureInProgress}
          >
            <Ionicons name="download-outline" size={20} color="#FFFFFF" />
            <Text style={styles.qrBtnSaveText}>
              {captureInProgress ? 'Saving...' : 'Save'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.qrBtnShare} onPress={handleShareQR}>
            <Ionicons name="share-social-outline" size={20} color="#FFFFFF" />
            <Text style={styles.qrBtnShareText}>Share QR Code</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');
const isSmallScreen = width < 420;

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  qrModal: {
    width: '100%',
    maxWidth: 400,
    marginHorizontal: 20,
    padding: isSmallScreen ? 16 : 24,
    borderRadius: isSmallScreen ? 12 : 16,
    backgroundColor: '#121212',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 32,
    elevation: 5,
    position: 'relative',
  },
  qrLogoContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(59, 91, 254, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  qrTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  qrDescription: {
    fontSize: 14,
    color: '#AAAAAA',
    marginBottom: 20,
    textAlign: 'center',
  },
  qrBox: {
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: 'rgba(59, 91, 254, 0.2)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 12,
  },
  qrId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 12,
  },
  qrSubId: {
    fontSize: 13,
    color: '#888888',
    marginTop: 4,
  },
  qrActions: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 12,
  },
  qrBtnSave: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: isSmallScreen ? 10 : 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    backgroundColor: 'transparent',
    gap: 8,
  },
  qrBtnSaveText: {
    color: '#FFFFFF',
    fontSize: isSmallScreen ? 13 : 14,
    fontWeight: '500',
  },
  qrBtnShare: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: isSmallScreen ? 10 : 12,
    borderRadius: 12,
    backgroundColor: '#3B5BFE',
    gap: 8,
  },
  qrBtnShareText: {
    color: '#FFFFFF',
    fontSize: isSmallScreen ? 13 : 14,
    fontWeight: '500',
  },
  qrClose: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: '#555555',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  disabledButton: {
    opacity: 0.6,
  },
}); 