
import React from 'react';
import { 
  View, 
  StyleSheet, 
  Animated, 
  TouchableOpacity,
  useWindowDimensions,
  TextStyle,
  Text 
} from 'react-native';
import { Icon } from '../../utils/IconComponent';
import { useTheme, getCssVar } from '../../theme/ThemeContext';
import { COLORS } from '../../config/constants';

// Utility functions to determine wallet tier and icon
const getWalletTier = (balance: number): string => {
  if (balance >= 200000) return "Diamond";
  if (balance >= 100000) return "Gold";
  if (balance >= 50000) return "Silver";
  if (balance >= 10000) return "Classic";
  return "Basic";
};

const getTierIcon = (tier: string): string => {
  switch (tier) {
    case "Diamond": return "💎";
    case "Gold": return "🪙";
    case "Silver": return "🥈";
    case "Classic": return "🛡️";
    default: return "❇️";
  }
};

interface WalletBalanceCardProps {
  balance: number;
  weeklyChange: number;
  accountNumber: string;
  isBalanceHidden: boolean;
  onToggleBalanceVisibility: () => void;
  localEquivalent?: string;
}

export const WalletBalanceCard: React.FC<WalletBalanceCardProps> = ({ 
  balance, 
  weeklyChange,
  accountNumber,
  isBalanceHidden,
  onToggleBalanceVisibility,
  localEquivalent = "≈ 24 litres de mbongo djama"
}) => {
  const { width: windowWidth } = useWindowDimensions();
  const { colors } = useTheme();
  
  // Determine responsive breakpoints
  const isSmallScreen = windowWidth < 420;
  
  // Get dynamic tier information
  const walletTier = getWalletTier(balance);
  const tierIcon = getTierIcon(walletTier);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} FCFA`;
  };
  
  return (
    <View 
      style={[
        styles.balanceCard,
        isSmallScreen ? styles.balanceCardSmall : {},
        { backgroundColor: COLORS.primary }
      ]}
    >
      {/* Title Row with Dynamic Tier Badge */}
      <View style={styles.balanceTitleRow}>
        <Text style={styles.balanceLabel}>
          Montant disponible
        </Text>
        <View style={styles.walletTierBadge}>
          <Text style={styles.walletTierIcon}>{tierIcon}</Text>
          <Text style={styles.walletTierText}>
            {walletTier}
          </Text>
        </View>
      </View>
      
      {/* Amount with hide/show toggle */}
      <View style={styles.balanceRow}>
        <Text style={styles.balanceAmount}>
          {isBalanceHidden 
            ? '••••••' 
            : formatCurrency(balance).split(' ')[0]}
          <Text style={styles.currencyText}> FCFA</Text>
        </Text>
        <TouchableOpacity onPress={onToggleBalanceVisibility} style={styles.eyeButton}>
          <Icon 
            name={isBalanceHidden ? "eye-outline" : "eye-off-outline"} 
            size={20} 
            color="#FFFFFF" 
          />
        </TouchableOpacity>
      </View>
      
      {/* Account Number */}
      <Text style={styles.accountNumberText}>
        Compte {accountNumber}
      </Text>
      
      {/* Local Equivalent */}
      <Text style={styles.equivalentText}>
        {localEquivalent}
      </Text>
      
      {/* Weekly Stats */}
      <View style={styles.balanceStats}>
        <Icon name="trending-up" size={isSmallScreen ? 14 : 16} color="#22C55E" />
        <Text style={styles.balanceStatsText}>
          +{weeklyChange.toLocaleString()} FCFA cette semaine
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  balanceCard: {
    width: '100%',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: 'rgba(59, 91, 254, 0.4)',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    gap: 6,
  },
  balanceCardSmall: {
    padding: 16,
  },
  balanceTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  balanceLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  walletTierBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  walletTierIcon: {
    fontSize: 12,
    color: '#FFFFFF'
  },
  walletTierText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF'
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#FFFFFF'
  },
  currencyText: {
    fontSize: 22,
    fontWeight: '500',
    color: '#FFFFFF'
  },
  eyeButton: {
    padding: 8,
  },
  accountNumberText: {
    fontSize: 13,
    marginBottom: 8,
    color: 'rgba(255, 255, 255, 0.7)'
  },
  equivalentText: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 8,
    color: '#E0E0E0'
  },
  balanceStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  balanceStatsText: {
    fontSize: 13,
    color: '#22C55E'
  }
});
