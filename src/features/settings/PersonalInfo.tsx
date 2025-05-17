
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '../../components/common/Icon';
import { ThemedView, ThemedText } from '../../components/common/ThemedView';
import { ThemedButton, ThemedInput } from '../../components/common/ThemedComponents';
import { RootStackParamList } from '../../types/navigation';
import { useTheme } from '../../theme/ThemeContext';
import { COLORS } from '../../theme/colors';

type PersonalScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const PersonalScreen: React.FC = () => {
  const navigation = useNavigation<PersonalScreenNavigationProp>();
  const { colors } = useTheme();
  
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+237 6XX XXX XXX',
    address: 'Yaoundé, Cameroon'
  });

  const handleChange = (field: keyof typeof userInfo, value: string) => {
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleSave = () => {
    // Save user info logic would go here
    navigation.goBack();
  };
  
  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.content}>
        <ThemedText style={styles.title}>Informations personnelles</ThemedText>
        
        <View style={styles.avatar}>
          <View style={[styles.avatarPlaceholder, { backgroundColor: colors.card }]}>
            <Icon name="person" size={40} color={COLORS.primary} />
          </View>
          <ThemedButton 
            title="Changer la photo" 
            variant="outline"
            containerStyle={styles.avatarButton}
          />
        </View>
        
        <View style={styles.form}>
          <ThemedInput
            label="Nom complet"
            value={userInfo.name}
            onChangeText={(text) => handleChange('name', text)}
            containerStyle={styles.input}
          />
          
          <ThemedInput
            label="Email"
            value={userInfo.email}
            onChangeText={(text) => handleChange('email', text)}
            keyboardType="email-address"
            containerStyle={styles.input}
          />
          
          <ThemedInput
            label="Téléphone"
            value={userInfo.phone}
            onChangeText={(text) => handleChange('phone', text)}
            keyboardType="phone-pad"
            containerStyle={styles.input}
          />
          
          <ThemedInput
            label="Adresse"
            value={userInfo.address}
            onChangeText={(text) => handleChange('address', text)}
            containerStyle={styles.input}
          />
          
          <ThemedButton
            title="Sauvegarder"
            onPress={handleSave}
            containerStyle={styles.saveButton}
          />
        </View>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  avatar: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarButton: {
    width: 'auto',
  },
  form: {
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  saveButton: {
    marginTop: 16,
  },
});

export default PersonalScreen;
