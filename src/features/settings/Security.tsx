
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '../../components/common/Icon';
import { ThemedView, ThemedText } from '../../components/common/ThemedView';
import { ThemedButton, ThemedDivider } from '../../components/common/ThemedComponents';
import { RootStackParamList } from '../../types/navigation';

type SecurityScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const SecurityScreen: React.FC = () => {
  const navigation = useNavigation<SecurityScreenNavigationProp>();
  const [pinEnabled, setPinEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  
  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <ThemedText style={styles.title}>Sécurité</ThemedText>
          <ThemedText secondary style={styles.subtitle}>
            Gérez vos paramètres de sécurité et protégez votre compte
          </ThemedText>
        </View>
        
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Authentication</ThemedText>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <ThemedText style={styles.settingTitle}>Utiliser le code PIN pour les transactions</ThemedText>
              <ThemedText secondary style={styles.settingDescription}>
                Demander le code PIN pour chaque transaction
              </ThemedText>
            </View>
            <Switch
              value={pinEnabled}
              onValueChange={setPinEnabled}
              trackColor={{ false: '#767577', true: '#3B5BFE' }}
              thumbColor={'#f4f3f4'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <ThemedText style={styles.settingTitle}>Authentication biométrique</ThemedText>
              <ThemedText secondary style={styles.settingDescription}>
                Utiliser votre empreinte digitale ou Face ID
              </ThemedText>
            </View>
            <Switch
              value={biometricEnabled}
              onValueChange={setBiometricEnabled}
              trackColor={{ false: '#767577', true: '#3B5BFE' }}
              thumbColor={'#f4f3f4'}
            />
          </View>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <ThemedText style={styles.settingTitle}>Changer le code PIN</ThemedText>
              <ThemedText secondary style={styles.settingDescription}>
                Modifier votre code PIN actuel
              </ThemedText>
            </View>
            <Icon name="chevron-forward-outline" size={24} color={'#888888'} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Appareil et Connexion</ThemedText>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <ThemedText style={styles.settingTitle}>Appareils connectés</ThemedText>
              <ThemedText secondary style={styles.settingDescription}>
                Gérer les appareils connectés à votre compte
              </ThemedText>
            </View>
            <Icon name="chevron-forward-outline" size={24} color={'#888888'} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <ThemedText style={styles.settingTitle}>Historique de connexion</ThemedText>
              <ThemedText secondary style={styles.settingDescription}>
                Voir toutes les connexions récentes
              </ThemedText>
            </View>
            <Icon name="chevron-forward-outline" size={24} color={'#888888'} />
          </TouchableOpacity>
        </View>
        
        <ThemedButton
          title="Sauvegarder"
          containerStyle={styles.button}
          onPress={() => navigation.goBack()}
        />
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
  },
  button: {
    marginVertical: 24,
  }
});

export default SecurityScreen;
