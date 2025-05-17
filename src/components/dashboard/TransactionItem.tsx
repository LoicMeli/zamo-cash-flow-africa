
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '../common/ThemedView';
import { useTheme } from '../../theme/ThemeContext';

interface TransactionItemProps {
  name: string;
  date: string;
  amount: number;
  isPositive: boolean;
  isService?: boolean;
  avatar?: string | null;
  onPress?: () => void;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  name,
  date,
  amount,
  isPositive,
  isService = false,
  avatar = null,
  onPress,
}) => {
  const { cssVar } = useTheme();
  
  // Get avatar color based on name for consistency
  const getAvatarColor = (name: string) => {
    const colors = ['#2C3244', '#3D4663', '#4D64FA', '#293366', '#1E2235'];
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };
  
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.leftContent}>
        <View style={[
          styles.avatar,
          { backgroundColor: getAvatarColor(name) }
        ]}>
          <ThemedText style={styles.avatarText}>
            {name.charAt(0)}
          </ThemedText>
        </View>
        <View style={styles.details}>
          <ThemedText style={styles.name} numberOfLines={1}>
            {name}
          </ThemedText>
          <ThemedText secondary style={styles.date}>
            {date}
          </ThemedText>
        </View>
      </View>
      
      <ThemedText 
        style={[
          styles.amount, 
          { color: isPositive ? cssVar['--success'] : cssVar['--danger'] }
        ]}
      >
        {isPositive ? '+ ' : '- '}
        {amount.toLocaleString()} FCFA
      </ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: 'transparent',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  details: {
    justifyContent: 'center',
  },
  name: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 3,
  },
  date: {
    fontSize: 12,
  },
  amount: {
    fontSize: 15,
    fontWeight: '600',
  },
});
