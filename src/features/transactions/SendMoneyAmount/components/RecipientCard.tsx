
import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Icon } from '../../../../components/common/Icon';

interface RecipientCardProps {
  recipient: {
    name: string;
    phone: string;
  };
  animatedStyle: any;
}

export const RecipientCard: React.FC<RecipientCardProps> = ({ 
  recipient,
  animatedStyle
}) => {
  return (
    <Animated.View style={[styles.recipientContainer, animatedStyle]}>
      <View style={styles.recipientAvatar}>
        <Icon name="person" size={32} color="#3B5BFE" />
      </View>
      <View style={styles.recipientInfo}>
        <Text style={styles.recipientName}>{recipient.name}</Text>
        <Text style={styles.recipientPhone}>{recipient.phone}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  recipientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  recipientAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(59, 91, 254, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  recipientInfo: {
    flex: 1,
  },
  recipientName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  recipientPhone: {
    color: '#C2C2C2',
    fontSize: 14,
  },
});
