
import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Icon } from '../../utils/IconComponent';
import { COLORS } from '../../config/constants';

interface QRCodeModalProps {
  visible: boolean;
  onClose: () => void;
  accountNumber?: string;
  phoneNumber?: string;
  zamoID?: string;
  userName: string;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({
  visible,
  onClose,
  accountNumber,
  phoneNumber,
  zamoID,
  userName,
}) => {
  const displayIdentifier = accountNumber || phoneNumber || zamoID || 'N/A';

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Your QR Code</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="close" size={24} color={COLORS.text} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.qrContainer}>
            <View style={styles.qrPlaceholder}>
              <Text style={styles.qrText}>QR Code</Text>
            </View>
          </View>
          
          <Text style={styles.name}>{userName}</Text>
          <Text style={styles.accountNumber}>
            {phoneNumber ? `Phone: ${phoneNumber}` : 
             accountNumber ? `Account: ${accountNumber}` : 
             zamoID ? `Zamo ID: ${zamoID}` : 'ID: N/A'}
          </Text>
          
          <TouchableOpacity style={styles.shareButton}>
            <Icon name="share" size={20} color="#FFFFFF" />
            <Text style={styles.shareText}>Share QR Code</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 24,
    width: '80%',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  closeButton: {
    padding: 4,
  },
  qrContainer: {
    marginBottom: 16,
  },
  qrPlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  qrText: {
    color: COLORS.secondary,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  accountNumber: {
    fontSize: 14,
    color: COLORS.secondary,
    marginBottom: 24,
  },
  shareButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  shareText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
  },
});
