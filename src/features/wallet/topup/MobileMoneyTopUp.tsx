
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS } from '../../../theme/colors';
import { Icon } from '../../../utils/IconComponent';
import { Button } from '../../../components/common/Button';
import { RootStackParamList } from '../../../types/navigation';

type MobileMoneyTopUpNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const MobileMoneyTopUp = () => {
  const navigation = useNavigation<MobileMoneyTopUpNavigationProp>();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTopUp = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Main');
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Rechargement Mobile Money</Text>
          <View style={styles.rightHeaderPlaceholder} />
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.infoBlock}>
            <Icon name="info-circle" size={24} color={COLORS.primary} />
            <Text style={styles.infoText}>
              Vous allez recevoir un SMS pour confirmer la transaction sur votre mobile.
            </Text>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Numéro de téléphone</Text>
            <TextInput
              style={styles.input}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Ex: 612345678"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Montant (FCFA)</Text>
            <TextInput
              style={styles.input}
              value={amount}
              onChangeText={setAmount}
              placeholder="Ex: 5000"
              keyboardType="numeric"
            />
            <Text style={styles.minAmountText}>Minimum: 500 FCFA</Text>
          </View>

          <View style={styles.feesContainer}>
            <Text style={styles.feesLabel}>Frais:</Text>
            <Text style={styles.feesAmount}>
              {amount ? `${Math.round(Number(amount) * 0.01)} FCFA` : '0 FCFA'}
            </Text>
          </View>

          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalAmount}>
              {amount
                ? `${
                    Number(amount) + Math.round(Number(amount) * 0.01)
                  } FCFA`
                : '0 FCFA'}
            </Text>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button
            title="Confirmer"
            onPress={handleTopUp}
            disabled={!phoneNumber || !amount}
            loading={loading}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  rightHeaderPlaceholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  infoBlock: {
    flexDirection: 'row',
    backgroundColor: '#F0F7FF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    alignItems: 'center',
  },
  infoText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#333',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  minAmountText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  feesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  feesLabel: {
    fontSize: 16,
    color: '#6B7280',
  },
  feesAmount: {
    fontSize: 16,
    color: '#4B5563',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.primary,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
});
