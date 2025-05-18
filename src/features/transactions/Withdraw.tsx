
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button } from '../../components/common/Button';
import { Ionicons } from '../../components/common/Ionicons';
import { RootStackParamList } from '../../types/navigation';
import { useTheme } from '../../theme/ThemeContext';
import { COLORS } from '../../theme/colors';
import { Icon } from '../../components/common/Icon';

type WithdrawScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const Withdraw = () => {
  const navigation = useNavigation<WithdrawScreenNavigationProp>();
  const { colors } = useTheme();
  const [amount, setAmount] = useState('');
  const [selectedValue, setSelectedValue] = useState('mobile');

  const handleWithdraw = () => {
    // Navigate to the next step with the amount
    if (parseInt(amount, 10) > 0) {
      navigation.navigate('WithdrawDetails');
    }
  };

  const handleFindAgent = () => {
    // Navigate to find agent screen
    navigation.navigate('FindAgent');
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
        <Text style={styles.headerTitle}>Retirer de l'argent</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Sélectionner le mode de retrait</Text>

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[
              styles.option,
              selectedValue === 'mobile' && styles.selectedOption,
            ]}
            onPress={() => setSelectedValue('mobile')}
          >
            <Icon name="phone-portrait-outline" size={24} color={COLORS.primary} />
            <Text style={styles.optionText}>Mobile Money</Text>
            {selectedValue === 'mobile' && (
              <View style={styles.checkmarkContainer}>
                <Icon name="checkmark" size={16} color="#FFFFFF" />
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.option,
              selectedValue === 'agent' && styles.selectedOption,
            ]}
            onPress={() => setSelectedValue('agent')}
          >
            <Icon name="person-outline" size={24} color={COLORS.primary} />
            <Text style={styles.optionText}>Agent</Text>
            {selectedValue === 'agent' && (
              <View style={styles.checkmarkContainer}>
                <Icon name="checkmark" size={16} color="#FFFFFF" />
              </View>
            )}
          </TouchableOpacity>
        </View>

        <Text style={styles.amountLabel}>Montant (FCFA)</Text>
        <TextInput
          style={styles.amountInput}
          value={amount}
          onChangeText={setAmount}
          keyboardType="number-pad"
          placeholder="0"
          placeholderTextColor="#8E8E93"
        />

        <Text style={styles.feeText}>
          Frais de retrait: <Text style={styles.feeAmount}>500 FCFA</Text>
        </Text>

        {selectedValue === 'agent' && (
          <TouchableOpacity
            style={styles.findAgentButton}
            onPress={handleFindAgent}
          >
            <Icon name="location-outline" size={24} color={COLORS.primary} />
            <Text style={styles.findAgentText}>Trouver un agent près de chez vous</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Continuer"
          onPress={handleWithdraw}
          disabled={amount === '' || parseInt(amount, 10) <= 0}
          style={amount === '' || parseInt(amount, 10) <= 0 ? styles.buttonDisabled : styles.button}
        />
      </View>
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
    marginBottom: 16,
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
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  optionsContainer: {
    marginBottom: 24,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectedOption: {
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(59, 91, 254, 0.05)',
  },
  optionText: {
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
    color: '#1A1A1A',
  },
  checkmarkContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#1A1A1A',
  },
  amountInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 16,
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#1A1A1A',
  },
  feeText: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 24,
  },
  feeAmount: {
    fontWeight: '500',
    color: '#1A1A1A',
  },
  findAgentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(59, 91, 254, 0.05)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(59, 91, 254, 0.2)',
  },
  findAgentText: {
    fontSize: 15,
    marginLeft: 12,
    color: COLORS.primary,
  },
  buttonContainer: {
    padding: 16,
  },
  button: {
    backgroundColor: COLORS.primary,
  },
  buttonDisabled: {
    backgroundColor: '#E5E7EB',
  },
});
