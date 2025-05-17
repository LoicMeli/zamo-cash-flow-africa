import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Animated,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../../types/navigation';

type AgentWithdrawNavigationProp = NativeStackNavigationProp<RootStackParamList, 'RemoveMoney'>;

export const AgentWithdraw = () => {
  const navigation = useNavigation<AgentWithdrawNavigationProp>();
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  
  // Go back
  const goBack = () => {
    navigation.goBack();
  };
  
  // Find agent
  const findAgent = () => {
    Alert.alert(
      "Feature Coming Soon",
      "The Agent Finder feature is being developed and will be available in the next update.",
      [{ text: "OK" }]
    );
  };
  
  // Animate initial step
  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true
      })
    ]).start();
  }, []);
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Agent Withdrawal</Text>
        <View style={{ width: 40 }} />
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          style={[
            styles.stepContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={styles.developmentNote}>
            <Ionicons name="people" size={40} color="#3B5BFE" />
            <Text style={styles.developmentNoteTitle}>Zamo Agents Network</Text>
            <Text style={styles.developmentNoteText}>
              Use our Agent network to withdraw your money. Find a Zamo agent near you and withdraw cash immediately.
            </Text>
            
            <View style={styles.agentFeatures}>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={22} color="#22C55E" />
                <Text style={styles.featureText}>Instant cash withdrawal</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={22} color="#22C55E" />
                <Text style={styles.featureText}>No additional fees</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={22} color="#22C55E" />
                <Text style={styles.featureText}>Available in major cities</Text>
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.button}
              onPress={findAgent}
            >
              <Ionicons name="location" size={20} color="#FFF" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Find Nearest Agent</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.backButton2}
              onPress={goBack}
            >
              <Text style={styles.backButtonText}>Back to Withdrawal Methods</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  stepContainer: {
    maxWidth: 420,
    width: '100%',
    alignSelf: 'center',
  },
  developmentNote: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
  },
  developmentNoteTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 12,
  },
  developmentNoteText: {
    fontSize: 16,
    color: '#AAAAAA',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  agentFeatures: {
    width: '100%',
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#3B5BFE',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton2: {
    padding: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  backButtonText: {
    color: '#AAAAAA',
    fontSize: 14,
  },
}); 