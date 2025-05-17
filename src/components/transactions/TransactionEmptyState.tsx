
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLanguage } from "../../providers/LanguageProvider";

const TransactionEmptyState = () => {
  const { t } = useLanguage();
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {t('dashboard.noTransactions')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    color: '#8E9196',
    textAlign: 'center',
  }
});

export default TransactionEmptyState;
