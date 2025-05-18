import React, { useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '../../components/common/Icon';
import { RootStackParamList } from '../../types/navigation';

type SendMoneyConfirmScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type SendMoneyConfirmScreenRouteProp = RouteProp<RootStackParamList, 'SendMoneyConfirm'>;

export const SendMoneyConfirm = () => {
  const navigation = useNavigation<SendMoneyConfirmScreenNavigationProp>();
  const route = useRoute<SendMoneyConfirmScreenRouteProp>();
  const { recipient, amount } = route.params;

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const cardScaleAnim = useRef(new Animated.Value(0.95)).current;
  const detailsAnim = useRef([
    new Animated.Value(20),
    new Animated.Value(20),
    new Animated.Value(20),
  ]).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true
      }),
      Animated.spring(cardScaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true
      })
    ]).start();

    // Animate details sequentially
    Animated.stagger(100, [
      Animated.spring(detailsAnim[0], {
        toValue: 0,
        tension: 70,
        friction: 7,
        useNativeDriver: true
      }),
      Animated.spring(detailsAnim[1], {
        toValue: 0,
        tension: 70,
        friction: 7,
        useNativeDriver: true
      }),
      Animated.spring(detailsAnim[2], {
        toValue: 0,
        tension: 70,
        friction: 7,
        useNativeDriver: true
      })
    ]).start();
  }, []);

  const handleGoBack = () => {
    // Exit animation
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start(() => {
      navigation.goBack();
    });
  };

  const handleButtonPressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      tension: 80,
      friction: 5,
      useNativeDriver: true
    }).start();
  };

  const handleButtonPressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      tension: 80,
      friction: 5,
      useNativeDriver: true
    }).start();
  };

  const handleConfirm = () => {
    // Generate a reference number
    const referenceNumber = `TX${Math.floor(100000 + Math.random() * 900000)}`;
    
    // Exit animation before navigation
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start(() => {
      // Navigate to success screen
      navigation.navigate('SendMoneySuccess', {
        recipient,
        amount,
        reference: referenceNumber
      });
    });
  };

  // Format currency with commas
  const formatCurrency = (value: number) => {
    return value.toLocaleString();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Send Money</Text>
      </View>
      
      <Animated.View 
        style={[
          styles.contentContainer,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0]
            })}]
          }
        ]}
      >
        <Animated.View 
          style={[
            styles.confirmationCard,
            { transform: [{ scale: cardScaleAnim }] }
          ]}
        >
          <Text style={styles.cardTitle}>Review payment</Text>
          
          <Animated.View 
            style={[
              styles.detailRow,
              { transform: [{ translateX: detailsAnim[0] }], opacity: fadeAnim }
            ]}
          >
            <Text style={styles.detailLabel}>You're sending to</Text>
            <View style={styles.recipientInfo}>
              <Text style={styles.recipientName}>{recipient.name}</Text>
              <Text style={styles.recipientPhone}>{recipient.phone}</Text>
            </View>
          </Animated.View>
          
          <Animated.View 
            style={[
              styles.detailRow,
              { transform: [{ translateX: detailsAnim[1] }], opacity: fadeAnim }
            ]}
          >
            <Text style={styles.detailLabel}>Amount</Text>
            <Text style={styles.detailValue}>{formatCurrency(amount)} FCFA</Text>
          </Animated.View>
          
          <Animated.View 
            style={[
              styles.detailRow,
              { transform: [{ translateX: detailsAnim[2] }], opacity: fadeAnim }
            ]}
          >
            <Text style={styles.detailLabel}>Fee</Text>
            <Text style={styles.freeText}>Free</Text>
          </Animated.View>
          
          <View style={styles.separator} />
          
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total amount</Text>
            <Text style={styles.totalValue}>{formatCurrency(amount)} FCFA</Text>
          </View>
        </Animated.View>
        
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity 
            style={styles.confirmButton}
            onPress={handleConfirm}
            onPressIn={handleButtonPressIn}
            onPressOut={handleButtonPressOut}
          >
            <Icon name="paper-plane" size={20} color="#FFF" style={styles.buttonIcon} />
            <Text style={styles.confirmButtonText}>Confirm & Send</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    marginTop: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  confirmationCard: {
    backgroundColor: '#1B1B1B',
    borderRadius: 12,
    padding: 20,
    marginBottom: 32,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 25,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  detailLabel: {
    color: '#C2C2C2',
    fontSize: 16,
  },
  recipientInfo: {
    alignItems: 'flex-end',
  },
  recipientName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  recipientPhone: {
    color: '#C2C2C2',
    fontSize: 14,
    marginTop: 2,
  },
  detailValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  freeText: {
    color: '#34D399', // Green color for "Free"
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#2A2E3D',
    marginVertical: 15,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#3B5BFE',
    borderRadius: 12,
    height: 55,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
  },
  buttonIcon: {
    marginRight: 10,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
