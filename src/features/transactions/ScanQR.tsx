import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  Animated, 
  Easing,
  Dimensions 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/common/Button';
import { RootStackParamList } from '../../types/navigation';

type ScanQRScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

const { width } = Dimensions.get('window');
const QR_BOX_SIZE = Math.min(width * 0.6, 200);

export const ScanQR = () => {
  const navigation = useNavigation<ScanQRScreenNavigationProp>();
  
  // Animation values
  const scanLineAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const qrBoxScale = useRef(new Animated.Value(1)).current;
  const textFadeAnim = useRef(new Animated.Value(0)).current;
  
  // Start animations on component mount
  useEffect(() => {
    // Scan line animation - moves top to bottom
    Animated.loop(
      Animated.timing(scanLineAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
    
    // Glow pulsing animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        })
      ])
    ).start();
    
    // Text fade-in animation
    Animated.timing(textFadeAnim, {
      toValue: 1,
      duration: 800,
      delay: 500,
      useNativeDriver: true,
    }).start();
  }, []);
  
  // Calculate scan line position
  const scanLinePosition = scanLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, QR_BOX_SIZE]
  });
  
  // Calculate glow intensity
  const glowIntensity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(59, 91, 254, 0.25)', 'rgba(59, 91, 254, 0.6)']
  });
  
  // Handle QR box press
  const handleQRBoxPress = () => {
    // Scale animation on press
    Animated.sequence([
      Animated.timing(qrBoxScale, {
        toValue: 1.05,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(qrBoxScale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      })
    ]).start();
    
    // After a brief delay, pretend we've scanned a code and navigate
    setTimeout(() => {
      // TODO: Navigate to appropriate screen after "scanning"
      // For now, just navigate to SendMoney
      navigation.navigate('SendMoney');
    }, 800);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Scan QR Code</Text>
      </View>

      <View style={styles.content}>
        {/* Animated QR Scan Box */}
        <Animated.View 
          style={[
            styles.qrScanBox,
            { 
              transform: [{ scale: qrBoxScale }],
              shadowColor: '#3B5BFE',
              shadowOpacity: 0.5,
              shadowRadius: glowAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [8, 16]
              }),
              shadowOffset: { width: 0, height: 0 },
              elevation: glowAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [4, 8]
              }),
            }
          ]}
        >
          {/* Animated Scan Line */}
          <Animated.View 
            style={[
              styles.scanLine,
              { transform: [{ translateY: scanLinePosition }] }
            ]}
          />
          
          {/* QR Icon */}
          <TouchableOpacity 
            onPress={handleQRBoxPress}
            activeOpacity={0.8}
            style={styles.qrIconContainer}
          >
            <Ionicons name="qr-code" size={QR_BOX_SIZE * 0.4} color="#3B5BFE" />
          </TouchableOpacity>
        </Animated.View>
        
        {/* Animated Text */}
        <Animated.Text 
          style={[
            styles.scanNote,
            { opacity: textFadeAnim }
          ]}
        >
          Secure QR transfer
        </Animated.Text>
        
        <Animated.Text 
          style={[
            styles.scanInstructions,
            { opacity: textFadeAnim }
          ]}
        >
          Tap on the QR code to simulate scanning
        </Animated.Text>
      </View>
      
      <View style={styles.infoContainer}>
        <Ionicons name="information-circle" size={24} color="#3B5BFE" />
        <Text style={styles.infoText}>
          Scan any Zamo user's QR code to send money instantly and securely.
        </Text>
      </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  qrScanBox: {
    width: QR_BOX_SIZE,
    height: QR_BOX_SIZE,
    borderRadius: 16,
    backgroundColor: '#111',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#3B5BFE',
    position: 'relative',
    overflow: 'hidden',
  },
  qrIconContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(59, 91, 254, 0.5)',
    borderRadius: 2,
  },
  scanNote: {
    fontSize: 16,
    color: '#3B5BFE',
    marginTop: 24,
    fontWeight: '600',
  },
  scanInstructions: {
    fontSize: 14,
    color: '#888',
    marginTop: 8,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(59, 91, 254, 0.1)',
    margin: 20,
    padding: 16,
    borderRadius: 12,
  },
  infoText: {
    color: '#FFFFFF',
    marginLeft: 12,
    flex: 1,
    fontSize: 14,
  },
}); 