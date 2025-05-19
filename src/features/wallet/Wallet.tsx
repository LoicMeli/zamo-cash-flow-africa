import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView, 
  TouchableOpacity,
  Animated,
  Dimensions,
  Pressable,
  useWindowDimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { Icon } from '../../components/common/Icon';
import { RootStackParamList } from '../../types/navigation';
import { useLanguage } from '../../providers/LanguageProvider';
import { ThemedText } from '../../components/common/ThemedView';
import { useTheme } from '../../theme/ThemeContext';
import { COLORS } from '../../theme/colors';

type WalletScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Mock data for the wallet page
const WALLET_DATA = {
  walletBalance: 1000000,
  weeklyChange: 5000,
  userName: "Fatou Sow",
  tier: "Classic",
  isPinEnabled: true,
  members: [
    { id: '1', name: 'Fatou Sow', avatar: null, contribution: 5000, status: 'paid' },
    { id: '2', name: 'Ibrahim Touré', avatar: null, contribution: 0, status: 'pending' },
    { id: '3', name: 'Aisha', avatar: null, contribution: 3000, status: 'paid' },
    { id: '4', name: 'Kofi', avatar: null, contribution: 2500, status: 'paid' }
  ],
  activity: [
    { id: '1', label: 'Contribution - Fatou', amount: 5000, type: 'in', date: '2025-05-10' },
    { id: '2', label: 'Withdrawal', amount: -8000, type: 'out', date: '2025-05-08' },
    { id: '3', label: 'Contribution - Aisha', amount: 3000, type: 'in', date: '2025-05-05' },
    { id: '4', label: 'Contribution - Kofi', amount: 2500, type: 'in', date: '2025-05-03' }
  ]
};

// Define type for icon names we'll be using
type IconName = string;

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

export const Wallet = () => {
  const navigation = useNavigation<WalletScreenNavigationProp>();
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);
  const { width: windowWidth } = useWindowDimensions();
  const { language, t } = useLanguage();
  const { colors, cssVar, isDarkMode } = useTheme();
  
  // Determine responsive breakpoints
  const isSmallScreen = windowWidth < 400;
  const isMediumOrLargeScreen = windowWidth >= 768;
  
  // Get dynamic tier information
  const walletTier = getWalletTier(WALLET_DATA.walletBalance);
  const tierIcon = getTierIcon(walletTier);
  
  // Animation References
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const balanceCardScale = useRef(new Animated.Value(0.95)).current;
  const actionButtonsAnim = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0)
  ]).current;
  const transactionsAnim = useRef(new Animated.Value(20)).current;
  const addButtonRotate = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Reset animations whenever the screen is focused (including when returning from another screen)
    const unsubscribe = navigation.addListener('focus', () => {
      // Always make sure the screen is visible first
      fadeAnim.setValue(1);
      
      // Reset initial values for all animations
      balanceCardScale.setValue(0.95);
      actionButtonsAnim.forEach(anim => anim.setValue(0));
      transactionsAnim.setValue(20);
      
      // Start staggered animations for components
      Animated.stagger(100, [
        // Animate balance card
        Animated.spring(balanceCardScale, {
          toValue: 1,
          tension: 70,
          friction: 8,
          useNativeDriver: true
        }),
        
        // Action buttons animations
        Animated.spring(actionButtonsAnim[0], {
          toValue: 1,
          tension: 70,
          friction: 8,
          useNativeDriver: true
        }),
        Animated.spring(actionButtonsAnim[1], {
          toValue: 1,
          tension: 70,
          friction: 8,
          useNativeDriver: true
        }),
        Animated.spring(actionButtonsAnim[2], {
          toValue: 1,
          tension: 70,
          friction: 8,
          useNativeDriver: true
        }),
        Animated.spring(actionButtonsAnim[3], {
          toValue: 1,
          tension: 70,
          friction: 8,
          useNativeDriver: true
        }),
        
        // Then fade in transactions
        Animated.timing(transactionsAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true
        })
      ]).start();
    });

    return unsubscribe;
  }, [navigation, fadeAnim, balanceCardScale, actionButtonsAnim, transactionsAnim]);

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} FCFA`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  const getAvatarColor = (name: string) => {
    const colors = ['#2C3244', '#3D4663', '#4D64FA', '#293366', '#1E2235'];
    // Simple hash function to get a consistent color for a name
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  const handleAddMemberPress = () => {
    // Animated rotation effect on button press
    Animated.sequence([
      Animated.timing(addButtonRotate, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true
      }),
      Animated.timing(addButtonRotate, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true
      })
    ]).start();
    
    // Navigate to add member screen
    console.log('Navigate to add member');
  };

  const animateButtonPress = (buttonIndex: number) => {
    // Scale animation
    Animated.sequence([
      Animated.timing(actionButtonsAnim[buttonIndex], {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.spring(actionButtonsAnim[buttonIndex], {
        toValue: 1,
        tension: 40,
        friction: 3,
        useNativeDriver: true
      })
    ]).start();
  };

  const navigateToSendMoney = () => {
    animateButtonPress(0);
    
    // Fade out animation before navigation - make it faster
    Animated.timing(fadeAnim, {
      toValue: 0.5, // Don't go all the way to 0 to avoid complete black screen
      duration: 150, // Shorter duration for better UX
      useNativeDriver: true
    }).start(() => {
      navigation.navigate('SendMoney');
    });
  };

  const navigateToCollect = () => {
    animateButtonPress(1);
    navigation.navigate('Collect');
  };

  const navigateToWithdraw = () => {
    animateButtonPress(2);
    navigation.navigate('RemoveMoney');
  };

  const navigateToAddMoney = () => {
    animateButtonPress(3);
    navigation.navigate('AddMoney');
  };

  const navigateToHistory = () => {
    console.log('Navigate to wallet history');
  };

  const toggleBalanceVisibility = () => {
    // Toggle balance visibility
    setIsBalanceHidden(!isBalanceHidden);
  };

  // Calculate rotation for add button animation
  const addButtonRotation = addButtonRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg']
  });

  // Define action card styles with icon background colors
  const actionCardConfig = [
    { 
      icon: "send" as IconName, 
      label: t('wallet.sendMoney'), 
      color: '#007BFF',
      bgColor: 'rgba(59, 91, 254, 0.1)',
      onPress: navigateToSendMoney
    },
    { 
      icon: "qr-code" as IconName, 
      label: t('wallet.collect'), 
      color: '#22C55E',
      bgColor: 'rgba(34, 197, 94, 0.1)',
      onPress: navigateToCollect
    },
    { 
      icon: "cash-outline" as IconName, 
      label: t('wallet.withdrawMoney'), 
      color: '#EF4444',
      bgColor: 'rgba(239, 68, 68, 0.1)',
      onPress: navigateToWithdraw
    },
    { 
      icon: "card-outline" as IconName, 
      label: t('wallet.addMoney'), 
      color: '#22C55E',
      bgColor: 'rgba(34, 197, 94, 0.1)',
      onPress: navigateToAddMoney
    }
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        {/* Header Section */}
        <View style={styles.header}>
          <ThemedText style={styles.headerTitle}>{t('wallet.moneyBag')}</ThemedText>
          <Animated.View style={{
            transform: [{ rotate: addButtonRotation }]
          }}>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={handleAddMemberPress}
              activeOpacity={0.8}
            >
              <Icon name="add" size={24} color="#FFF" />
            </TouchableOpacity>
          </Animated.View>
        </View>
        
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Balance Card - Centered with optimal width and responsive */}
          <Animated.View 
            style={[
              styles.balanceCard,
              { transform: [{ scale: balanceCardScale }] },
              // Apply responsive styles based on screen size
              isSmallScreen ? styles.balanceCardSmall : null,
              isMediumOrLargeScreen ? styles.balanceCardLarge : null
            ]}
          >
            {/* Title Row with Dynamic Tier Badge */}
            <View style={styles.balanceTitleRow}>
              <Text style={[styles.balanceLabel, isSmallScreen && styles.textSmall]}>
                Montant disponible
              </Text>
              <View style={styles.walletTierBadge}>
                <Text style={styles.walletTierIcon}>{tierIcon}</Text>
                <Text style={[styles.walletTierText, isSmallScreen && styles.textSmall]}>
                  {walletTier}
                </Text>
              </View>
            </View>
            
            {/* Amount */}
            <View style={styles.balanceAmountContainer}>
              <Text style={[styles.balanceAmount, isSmallScreen && styles.balanceAmountSmall]}>
                {formatCurrency(WALLET_DATA.walletBalance).split(' ')[0]}
              </Text>
              <Text style={[styles.currencyText, isSmallScreen && styles.currencyTextSmall]}> FCFA</Text>
              <TouchableOpacity 
                style={styles.hideBalanceButton}
                onPress={toggleBalanceVisibility}
              >
                <Icon name={isBalanceHidden ? "eye-outline" : "eye-off-outline"} size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            
            {/* Account Number */}
            <Text style={[styles.accountNumberText, isSmallScreen && styles.textSmall]}>
              Compte **** **** IXSZ
            </Text>
            
            {/* Local Equivalent */}
            <Text style={[styles.equivalentText, isSmallScreen && styles.textSmall]}>
              ≈ 24 litres de mbongo djama
            </Text>
            
            {/* Weekly Stats */}
            <View style={styles.balanceStats}>
              <Icon name="trending-up" size={isSmallScreen ? 14 : 16} color="#22C55E" />
              <Text style={[styles.balanceStatsText, isSmallScreen && styles.textSmall]}>
                +{WALLET_DATA.weeklyChange.toLocaleString()} FCFA cette semaine
              </Text>
            </View>
            
            {/* Account Name - Bottom Right */}
            <Text style={[styles.accountName, isSmallScreen && styles.textSmall]}>
              {WALLET_DATA.userName}
            </Text>
          </Animated.View>
          
          {/* Action Grid */}
          <View style={styles.actionGrid}>
            <View style={styles.walletButtonsRow}>
              {actionCardConfig.slice(0, 2).map((card, index) => (
                <Animated.View 
                  key={index}
                  style={{ 
                    transform: [{ scale: actionButtonsAnim[index] }],
                    opacity: actionButtonsAnim[index],
                    flex: 1,
                    margin: 8,
                  }}
                >
                  <TouchableOpacity 
                    style={[
                      styles.actionCard,
                      { backgroundColor: colors.card }
                    ]}
                    onPress={card.onPress}
                    activeOpacity={0.9}
                    onPressIn={() => animateButtonPress(index)}
                  >
                    <View style={[styles.iconContainer, { backgroundColor: card.bgColor }]}>
                      <Icon name={card.icon} size={24} color={card.color} />
                    </View>
                    <Text style={[styles.actionText, { color: colors.text }]}>{card.label}</Text>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
            
            <View style={styles.walletButtonsRow}>
              {actionCardConfig.slice(2, 4).map((card, index) => (
                <Animated.View 
                  key={index + 2}
                  style={{ 
                    transform: [{ scale: actionButtonsAnim[index + 2] }],
                    opacity: actionButtonsAnim[index + 2],
                    flex: 1,
                    margin: 8,
                  }}
                >
                  <TouchableOpacity 
                    style={[
                      styles.actionCard,
                      { backgroundColor: colors.card }
                    ]}
                    onPress={card.onPress}
                    activeOpacity={0.9}
                    onPressIn={() => animateButtonPress(index + 2)}
                  >
                    <View style={[styles.iconContainer, { backgroundColor: card.bgColor }]}>
                      <Icon name={card.icon} size={24} color={card.color} />
                    </View>
                    <Text style={[styles.actionText, { color: colors.text }]}>{card.label}</Text>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          </View>
          
          {/* Transaction History Button */}
          <Animated.View
            style={{
              alignItems: 'center',
              width: '100%',
              opacity: fadeAnim,
              marginVertical: 24
            }}
          >
            <TouchableOpacity
              style={styles.transactionHistoryBtn}
              onPress={navigateToHistory}
              activeOpacity={0.8}
            >
              <Text style={styles.transactionHistoryBtnText}>
                View Transaction History
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#007BFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 0,
  },
  balanceCard: {
    width: '92%',
    maxWidth: '92%',
    alignSelf: 'center',
    backgroundColor: '#007BFF',
    borderRadius: 24,
    padding: 24,
    paddingTop: 20,
    paddingBottom: 24,
    marginTop: 10,
    marginBottom: 24,
    marginHorizontal: 0,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    minHeight: 180,
  },
  balanceCardSmall: {
    width: '92%',
    padding: 20,
    marginHorizontal: 0,
  },
  balanceCardLarge: {
    width: '92%',
    padding: 24,
    marginHorizontal: 0,
  },
  balanceTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  balanceLabel: {
    fontSize: 16,
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
  },
  walletTierText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  balanceAmountContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 6,
    width: '100%',
  },
  balanceAmount: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#FFFFFF',
    lineHeight: 48,
  },
  balanceAmountSmall: {
    fontSize: 30,
  },
  currencyText: {
    fontSize: 28,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 6,
    marginLeft: 4,
  },
  currencyTextSmall: {
    fontSize: 20,
  },
  equivalentText: {
    fontSize: 14,
    color: '#E0E0E0',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  balanceStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 0,
  },
  balanceStatsText: {
    fontSize: 14,
    color: '#22C55E',
  },
  securityBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
  },
  securityBadgeIcon: {
    fontSize: 12,
  },
  securityBadgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  accountName: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
  textSmall: {
    fontSize: 12,
  },
  actionGrid: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 24,
  },
  actionCard: {
    flex: 1,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  transactionsContainer: {
    marginBottom: 16,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  transactionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '500',
  },
  transactionItem: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionDetails: {
    flex: 1,
  },
  transactionLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  amountIn: {
    color: '#22C55E',
  },
  amountOut: {
    color: '#EF4444',
  },
  walletButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  hideBalanceButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: 8,
  },
  accountNumberText: {
    fontSize: 14,
    color: '#E0E0E0',
    marginBottom: 8,
  },
  transactionHistoryBtn: {
    marginTop: 16,
    padding: 12,
    paddingHorizontal: 20,
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: 'rgba(59, 130, 246, 0.4)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  transactionHistoryBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});
