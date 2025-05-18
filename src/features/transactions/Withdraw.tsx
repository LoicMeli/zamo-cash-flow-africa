
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '../../components/common/Icon';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { theme } from '../../config/theme';
import { COLORS } from '../../theme/colors';
import { RootStackParamList } from '../../types/navigation';

type WithdrawScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

const quickAmounts = [5000, 10000, 20000, 50000];

export const Withdraw = () => {
  const navigation = useNavigation<WithdrawScreenNavigationProp>();
  const [amount, setAmount] = useState('');
  const [agentCode, setAgentCode] = useState('');

  const handleWithdraw = () => {
    // TODO: Implement withdraw logic
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={[styles.title, { fontWeight: "700" }]}>Retirer de l'argent</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Montant (FCFA)</Text>
          <View style={styles.quickAmounts}>
            {quickAmounts.map((quickAmount) => (
              <Button
                key={quickAmount}
                title={`${quickAmount.toLocaleString()} FCFA`}
                onPress={() => setAmount(quickAmount.toString())}
                variant="secondary"
                style={styles.quickAmountButton}
              />
            ))}
          </View>

          <Input
            value={amount}
            onChangeText={setAmount}
            keyboardType="number-pad"
            placeholder="Entrez le montant"
            leftIcon={<Icon name="cash-outline" size={24} color={theme.colors.secondary} />}
          />

          <Input
            label="Code de l'agent"
            value={agentCode}
            onChangeText={setAgentCode}
            placeholder="Entrez le code de l'agent"
            leftIcon={<Icon name="person-outline" size={24} color={theme.colors.secondary} />}
          />

          <View style={styles.actions}>
            <Button
              title="Trouver un agent"
              onPress={() => navigation.navigate('FindAgent')}
              variant="secondary"
              style={styles.actionButton}
            />
            <Button
              title="Retirer"
              onPress={handleWithdraw}
              style={styles.actionButton}
            />
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Icon name="information-circle" size={24} color={theme.colors.info} />
          <Text style={styles.infoText}>
            Présentez votre code de retrait à l'agent pour recevoir votre argent.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: theme.spacing.lg,
  },
  title: {
    fontSize: theme.typography.h1.fontSize,
    color: theme.colors.text,
  },
  form: {
    padding: theme.spacing.lg,
  },
  label: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  quickAmounts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  quickAmountButton: {
    flex: 1,
    minWidth: '45%',
  },
  actions: {
    marginTop: theme.spacing.lg,
  },
  actionButton: {
    marginBottom: theme.spacing.md,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${theme.colors.info}10`,
    margin: theme.spacing.lg,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  infoText: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.info,
    marginLeft: theme.spacing.sm,
    flex: 1,
  },
});
