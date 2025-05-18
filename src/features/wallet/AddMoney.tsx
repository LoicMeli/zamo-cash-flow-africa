
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '../../components/common/Icon';
import { Button } from '../../components/common/Button';
import { RootStackParamList } from '../../types/navigation';
import { useTheme } from '../../theme/ThemeContext';
import { COLORS } from '../../theme/colors';
import { navigateWithArray } from '../../utils/navigation';

type AddMoneyScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const AddMoney = () => {
  const navigation = useNavigation<AddMoneyScreenNavigationProp>();
  const { colors } = useTheme();

  const paymentOptions = [
    {
      id: 'card',
      title: 'Carte de crédit/débit',
      icon: 'card-outline',
      description: 'Visa, Mastercard, etc.',
      action: () => navigateWithArray(navigation, 'CardTopUp'),
    },
    {
      id: 'mobile',
      title: 'Mobile Money',
      icon: 'phone-portrait-outline',
      description: 'MTN, Orange, etc.',
      action: () => navigateWithArray(navigation, 'MobileMoneyTopUp'),
    },
    {
      id: 'bank',
      title: 'Transfert bancaire',
      icon: 'business-outline',
      description: 'Virements bancaires',
      action: () => console.log('Bank transfer selected'),
    },
    {
      id: 'agent',
      title: 'Agent ZAMO',
      icon: 'person-outline',
      description: 'Dépôt chez un agent',
      action: () => navigateWithArray(navigation, 'FindAgent'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ajouter de l'argent</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionTitle}>
            Choisissez un mode de dépôt
          </Text>
          <Text style={styles.instructionText}>
            Sélectionnez une des options ci-dessous pour ajouter de l'argent à votre compte ZAMO.
          </Text>
        </View>

        <View style={styles.optionsContainer}>
          {paymentOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionCard}
              onPress={option.action}
            >
              <View style={styles.optionIconContainer}>
                <Icon name={option.icon} size={24} color={COLORS.primary} />
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionDescription}>{option.description}</Text>
              </View>
              <Icon name="chevron-forward" size={20} color="#8E8E93" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.helpContainer}>
          <View style={styles.helpIconContainer}>
            <Icon name="information-circle-outline" size={24} color={COLORS.primary} />
          </View>
          <Text style={styles.helpText}>
            Besoin d'aide pour ajouter de l'argent? Contactez-nous au 
            <Text style={styles.helpBold}> +237 655 123 456</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    marginRight: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  instructionContainer: {
    marginBottom: 24,
  },
  instructionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 22,
  },
  optionsContainer: {
    marginBottom: 24,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  optionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(59, 91, 254, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#666666',
  },
  helpContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(59, 91, 254, 0.05)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  helpIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(59, 91, 254, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  helpText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: '#666666',
  },
  helpBold: {
    fontWeight: '700',
    color: '#1A1A1A',
  },
});
