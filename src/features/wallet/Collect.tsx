
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '../../components/common/Icon';
import { Button } from '../../components/common/Button';
import { RootStackParamList } from '../../types/navigation';
import { useTheme } from '../../theme/ThemeContext';
import { COLORS } from '../../theme/colors';
import { navigateWithArray } from '../../utils/navigation';

type CollectScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Timeout = ReturnType<typeof setTimeout>;

export const Collect = () => {
  const navigation = useNavigation<CollectScreenNavigationProp>();
  const { colors } = useTheme();
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAmountChange = (value: string) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, '');
    setAmount(numericValue);
  };

  const handleSubmit = () => {
    if (!amount || parseInt(amount, 10) <= 0) {
      setError('Veuillez entrer un montant valide.');
      return;
    }

    setIsLoading(true);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigateWithArray(navigation, 'RequestMoney');
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Demander de l'argent</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Montant</Text>
        <View style={styles.amountContainer}>
          <Text style={styles.currencySymbol}>FCFA</Text>
          <TextInput
            style={styles.amountInput}
            value={amount}
            onChangeText={handleAmountChange}
            keyboardType="number-pad"
            placeholder="0"
            placeholderTextColor="#8E8E93"
          />
        </View>

        <Text style={styles.sectionTitle}>Motif (Facultatif)</Text>
        <TextInput
          style={styles.reasonInput}
          value={reason}
          onChangeText={setReason}
          placeholder="Ex: Remboursement déjeuner"
          placeholderTextColor="#8E8E93"
          multiline
        />

        {error && (
          <View style={styles.errorContainer}>
            <Icon name="alert-circle" size={20} color="#FF3B30" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <Button
          title="Continuer"
          onPress={handleSubmit}
          style={styles.submitButton}
          loading={isLoading}
          disabled={!amount || parseInt(amount, 10) <= 0 || isLoading}
        />

        <View style={styles.infoContainer}>
          <Icon name="information-circle" size={20} color={COLORS.primary} />
          <Text style={styles.infoText}>
            La personne recevra une notification et pourra accepter ou refuser votre demande.
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginLeft: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
    marginTop: 16,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8E8E93',
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    paddingVertical: 16,
  },
  reasonInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1A1A1A',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
  },
  errorText: {
    marginLeft: 8,
    color: '#FF3B30',
    fontSize: 14,
  },
  submitButton: {
    marginTop: 24,
    backgroundColor: COLORS.primary,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(59, 91, 254, 0.05)',
    borderRadius: 8,
    padding: 12,
    marginTop: 24,
  },
  infoText: {
    marginLeft: 8,
    color: '#666666',
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  },
});

export default Collect;
