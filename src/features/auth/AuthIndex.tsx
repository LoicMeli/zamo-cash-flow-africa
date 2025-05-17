import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { COLORS } from '../../config/constants';
import { ROUTES } from '../../config/constants';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const AuthIndex: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>ZAMO</Text>
          </View>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>Bienvenue sur Zamo</Text>
          <Text style={styles.subtitle}>
            La solution de paiement mobile simple et sécurisée pour l'Afrique
          </Text>
        </View>

        <View style={styles.features}>
          <View style={styles.featureItem}>
            <View style={[styles.featureIcon, { backgroundColor: COLORS.primary + '20' }]}>
              <Text style={styles.featureIconText}>💸</Text>
            </View>
            <Text style={styles.featureTitle}>Transferts gratuits</Text>
            <Text style={styles.featureText}>
              Envoyez de l'argent gratuitement à vos proches
            </Text>
          </View>

          <View style={styles.featureItem}>
            <View style={[styles.featureIcon, { backgroundColor: COLORS.success + '20' }]}>
              <Text style={styles.featureIconText}>💰</Text>
            </View>
            <Text style={styles.featureTitle}>Épargne familiale</Text>
            <Text style={styles.featureText}>
              Gérez votre épargne en famille en toute simplicité
            </Text>
          </View>

          <View style={styles.featureItem}>
            <View style={[styles.featureIcon, { backgroundColor: COLORS.warning + '20' }]}>
              <Text style={styles.featureIconText}>🔒</Text>
            </View>
            <Text style={styles.featureTitle}>100% sécurisé</Text>
            <Text style={styles.featureText}>
              Vos transactions sont protégées et sécurisées
            </Text>
          </View>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Auth', { screen: 'Login' })}
          >
            <Text style={styles.buttonText}>Commencer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 48,
    marginBottom: 48,
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: COLORS.primary,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: COLORS.background,
    fontSize: 32,
    fontWeight: 'bold',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.secondary,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  features: {
    flex: 1,
    justifyContent: 'center',
  },
  featureItem: {
    marginBottom: 32,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  featureIconText: {
    fontSize: 24,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: COLORS.secondary,
  },
  buttons: {
    marginTop: 'auto',
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: '600',
  },
}); 