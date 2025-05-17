
import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

type AuthIndexScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const AuthIndex: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'login' | 'register'>('login');
  const navigation = useNavigation<AuthIndexScreenNavigationProp>();

  const handleContinuePress = () => {
    // Navigate to the main app dashboard after successful authentication
    navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'login' && styles.activeTab]} 
          onPress={() => setSelectedTab('login')}
        >
          <Text style={[styles.tabText, selectedTab === 'login' && styles.activeTabText]}>
            Connexion
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'register' && styles.activeTab]} 
          onPress={() => setSelectedTab('register')}
        >
          <Text style={[styles.tabText, selectedTab === 'register' && styles.activeTabText]}>
            Inscription
          </Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={handleContinuePress}
      >
        <Text style={styles.buttonText}>Continuer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
  },
  activeTab: {
    borderBottomColor: '#3B5BFE',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#3B5BFE',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#3B5BFE',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
