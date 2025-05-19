
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../config/constants';

interface QuickActionsProps {
  onSendMoney?: () => void;
  onReceiveMoney?: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ 
  onSendMoney, 
  onReceiveMoney 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick Actions</Text>
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={onSendMoney}>
          <View style={[styles.iconContainer, { backgroundColor: '#E8F0FF' }]}>
            {/* Icon placeholder */}
          </View>
          <Text style={styles.actionText}>Send</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={onReceiveMoney}>
          <View style={[styles.iconContainer, { backgroundColor: '#E8FFF0' }]}>
            {/* Icon placeholder */}
          </View>
          <Text style={styles.actionText}>Receive</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <View style={[styles.iconContainer, { backgroundColor: '#FFF0E8' }]}>
            {/* Icon placeholder */}
          </View>
          <Text style={styles.actionText}>Pay</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <View style={[styles.iconContainer, { backgroundColor: '#F0E8FF' }]}>
            {/* Icon placeholder */}
          </View>
          <Text style={styles.actionText}>More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 12,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  actionText: {
    fontSize: 12,
    color: COLORS.text,
    marginTop: 4,
  }
});
