import React from 'react';
import { 
  View, 
  StyleSheet, 
  Animated, 
  TouchableOpacity,
  useWindowDimensions,
  TextStyle 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, getCssVar } from '../../theme/ThemeContext';
import { COLORS } from '../../theme/colors';
import { ThemedText } from '../../components/common/ThemedView';

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
  const { cssVar } = useTheme();
  
  // Determine responsive breakpoints
  const isSmallScreen = windowWidth < 420;
  
  // Get dynamic tier information
  const walletTier = getWalletTier(balance);
  const tierIcon = getTierIcon(walletTier);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} FCFA`;
  };
  
  // Create style objects that combine conditional styles properly
  const balanceLabelStyle: TextStyle = {
    ...styles.balanceLabel,
    ...(isSmallScreen ? styles.textSmall : {}),
    color: '#FFFFFF'
  };
  
  const walletTierTextStyle: TextStyle = {
    ...styles.walletTierText,
    ...(isSmallScreen ? styles.textSmall : {}),
    color: '#FFFFFF'
  };
  
  const balanceAmountStyle: TextStyle = {
    ...styles.balanceAmount,
    ...(isSmallScreen ? styles.balanceAmountSmall : {}),
    color: '#FFFFFF'
  };
  
  const currencyTextStyle: TextStyle = {
    ...styles.currencyText,
    ...(isSmallScreen ? styles.currencyTextSmall : {}),
    color: '#FFFFFF'
  };
  
  const accountNumberStyle: TextStyle = {
    ...styles.accountNumberText,
    color: 'rgba(255, 255, 255, 0.7)'
  };
  
  const equivalentTextStyle: TextStyle = {
    ...styles.equivalentText,
    ...(isSmallScreen ? styles.textSmall : {}),
    color: '#E0E0E0'
  };
  
  const balanceStatsTextStyle: TextStyle = {
    ...styles.balanceStatsText,
    ...(isSmallScreen ? styles.textSmall : {}),
    color: cssVar['--success']
  };
  
  return (
    <View 
      style={[
        styles.balanceCard,
        isSmallScreen ? styles.balanceCardSmall : {},
        { backgroundColor: cssVar['--primary'] }
      ]}
    >
      {/* Title Row with Dynamic Tier Badge */}
      <View style={styles.balanceTitleRow}>
        <ThemedText style={balanceLabelStyle}>
          Montant disponible
        </ThemedText>
        <View style={styles.walletTierBadge}>
          <ThemedText style={styles.walletTierIcon}>{tierIcon}</ThemedText>
          <ThemedText style={walletTierTextStyle}>
            {walletTier}
          </ThemedText>
        </View>
      </View>
      
      {/* Amount with hide/show toggle */}
      <View style={styles.balanceRow}>
        <ThemedText style={balanceAmountStyle}>
          {isBalanceHidden 
            ? '••••••' 
            : formatCurrency(balance).split(' ')[0]}
          <ThemedText style={currencyTextStyle}> FCFA</ThemedText>
        </ThemedText>
        <TouchableOpacity onPress={onToggleBalanceVisibility} style={styles.eyeButton}>
          <Ionicons 
            name={isBalanceHidden ? "eye-outline" : "eye-off-outline"} 
            size={20} 
            color="#FFFFFF" 
          />
        </TouchableOpacity>
      </View>
      
      {/* Account Number */}
      <ThemedText style={accountNumberStyle}>
        Compte {accountNumber}
      </ThemedText>
      
      {/* Local Equivalent */}
      <ThemedText style={equivalentTextStyle}>
        {localEquivalent}
      </ThemedText>
      
      {/* Weekly Stats */}
      <View style={styles.balanceStats}>
        <Ionicons name="trending-up" size={isSmallScreen ? 14 : 16} color={cssVar['--success']} />
        <ThemedText style={balanceStatsTextStyle}>
          +{weeklyChange.toLocaleString()} FCFA cette semaine
        </ThemedText>
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
  },
  walletTierText: {
    fontSize: 12,
    fontWeight: '500',
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
  },
  balanceAmountSmall: {
    fontSize: 24,
  },
  currencyText: {
    fontSize: 22,
    fontWeight: '500',
  },
  currencyTextSmall: {
    fontSize: 20,
  },
  eyeButton: {
    padding: 8,
  },
  accountNumberText: {
    fontSize: 13,
    marginBottom: 8,
  },
  equivalentText: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  balanceStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  balanceStatsText: {
    fontSize: 13,
  },
  textSmall: {
    fontSize: 12,
  },
}); 