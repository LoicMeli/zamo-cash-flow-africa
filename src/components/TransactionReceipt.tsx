import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { PDFReceipt } from '../utils/PDFGenerator';

interface TransactionReceiptProps {
  receipt: PDFReceipt;
}

/**
 * Component that displays a transaction receipt that can be captured for PDF generation
 */
export const TransactionReceipt: React.FC<TransactionReceiptProps> = ({ receipt }) => {
  // Format currency with commas
  const formatCurrency = (value: number) => {
    return value.toLocaleString();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Logo would go here - using placeholder text for now */}
        <Text style={styles.logoText}>ZAMO</Text>
        <Text style={styles.headerTitle}>Transaction Receipt</Text>
      </View>

      <View style={styles.receiptContent}>
        <Text style={styles.receiptTitle}>Payment Confirmation</Text>
        <View style={styles.referenceContainer}>
          <Text style={styles.referenceLabel}>Transaction ID:</Text>
          <Text style={styles.referenceValue}>{receipt.reference}</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Date</Text>
          <Text style={styles.detailValue}>{receipt.date}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Recipient</Text>
          <View style={styles.detailValueContainer}>
            <Text style={styles.detailValue}>{receipt.recipient.name}</Text>
            <Text style={styles.detailSubValue}>{receipt.recipient.phone}</Text>
          </View>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Amount</Text>
          <Text style={styles.detailValue}>{formatCurrency(receipt.amount)} FCFA</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Fee</Text>
          <Text style={styles.freeValue}>{receipt.fee}</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total amount</Text>
          <Text style={styles.totalValue}>{formatCurrency(receipt.amount)} FCFA</Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Thank you for using Zamo</Text>
        <Text style={styles.footerSubText}>Transaction complete • Secure and instant</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#0D0D0D',
    padding: 20,
    alignItems: 'center',
  },
  logoText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#3B5BFE',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  receiptContent: {
    padding: 20,
  },
  receiptTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0D0D0D',
    marginBottom: 15,
  },
  referenceContainer: {
    backgroundColor: '#F0F0F0',
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  referenceLabel: {
    fontSize: 14,
    color: '#666666',
  },
  referenceValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0D0D0D',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666666',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0D0D0D',
    textAlign: 'right',
  },
  detailValueContainer: {
    alignItems: 'flex-end',
  },
  detailSubValue: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  freeValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#34D399', // Green color
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0D0D0D',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0D0D0D',
  },
  footer: {
    backgroundColor: '#F0F0F0',
    padding: 15,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0D0D0D',
    marginBottom: 5,
  },
  footerSubText: {
    fontSize: 12,
    color: '#666666',
  },
}); 