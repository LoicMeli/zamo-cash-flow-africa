import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Image,
  Pressable,
  Animated,
  Easing,
  TextStyle,
  useWindowDimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootStackParamList, MainTabParamList } from '../../types/navigation';
import { Ionicons } from '@expo/vector-icons';
import { WalletBalanceCard } from '../../components/dashboard/WalletBalanceCard';
import { InteractivePieChart } from '../../components/charts/InteractivePieChart';
import { ThemedView, ThemedText } from '../../components/common/ThemedView';
import { ThemedButton, ThemedCard } from '../../components/common/ThemedComponents';
import { useTheme, getCssVar } from '../../theme/ThemeContext';
import { useLanguage } from '../../providers/LanguageProvider';
import { COLORS } from '../../theme/colors';

type DashboardScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Dashboard'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const MOCK_USER = {
  name: 'Fatou Sow',
  balance: 28500,
  weeklyChange: 5000,
  isPinEnabled: true,
  accountNumber: '**** **** IXSZ',
  avatar: null, // This would be a URL in a real app
};

// Mock transaction data
const TRANSACTIONS = [
  {
    id: '1',
    name: 'Amadou Diallo',
    date: 'May 1st, 2025',
    amount: 15000,
    isPositive: true,
    avatar: null
  },
  {
    id: '2',
    name: 'Fatou Sow',
    date: 'May 1st, 2025',
    amount: 5000,
    isPositive: false,
    avatar: null
  },
  {
    id: '3',
    name: 'Orange Télécom',
    date: 'April 30th, 2025',
    amount: 7500,
    isPositive: false,
    isService: true,
    avatar: null
  },
  {
    id: '4',
    name: 'Ibrahim Touré',
    date: 'April 28th, 2025',
    amount: 35000,
    isPositive: true,
    avatar: null
  },
  {
    id: '5',
    name: 'Aicha Koné',
    date: 'April 27th, 2025',
    amount: 12000,
    isPositive: false,
    avatar: null
  }
];

// Helper function to generate consistent avatar colors
const getAvatarColor = (name: string) => {
  const colors = ['#2C3244', '#3D4663', '#4D64FA', '#293366', '#1E2235'];
  // Simple hash function to get a consistent color for a name
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
};

// Monthly statistics mock data
const MONTHLY_STATS = [
  { "label": "Entrées", "value": 75000, "color": "#3B5BFE" },
  { "label": "Sorties", "value": 45000, "color": "#EF4444" }
];

export const Dashboard = () => {
  const navigation = useNavigation<DashboardScreenNavigationProp>();
  const [balanceHidden, setBalanceHidden] = useState(false);
  const { width: windowWidth } = useWindowDimensions();
  const { cssVar, isDarkMode } = useTheme();
  const { language, t } = useLanguage();
  
  // Animation values for UI elements - upgraded to use spring animations
  const screenFadeAnim = useRef(new Animated.Value(1)).current;
  const balanceCardAnim = useRef(new Animated.Value(0.95)).current;
  const actionItemAnims = useRef([0, 1].map(() => new Animated.Value(0))).current;
  const transactionAnims = useRef(TRANSACTIONS.map(() => new Animated.Value(20))).current;
  const chartAnimation = useRef(new Animated.Value(0)).current;
  const notificationBellAnim = useRef(new Animated.Value(1)).current;

  // Create dynamic styles that need cssVar
  const dynamicStyles = {
    greeting: {
      ...styles.greeting,
      color: cssVar['--text-secondary'],
    },
    username: {
      ...styles.username,
      color: cssVar['--text'],
    },
    avatarText: {
      ...styles.avatarText, 
      color: cssVar['--primary'],
    },
    seeAllLink: {
      color: cssVar['--primary'], 
      fontSize: 14,
    },
    chartSection: {
      backgroundColor: isDarkMode ? '#121212' : cssVar['--card'],
      borderRadius: 12,
      padding: 8,
      paddingTop: 10,
      paddingHorizontal: 12,
      paddingBottom: 12,
      marginVertical: 10,
      flexDirection: 'column' as const,
      alignItems: 'center' as const,
      gap: 0,
      maxWidth: 460,
      width: '100%' as any,
      alignSelf: 'center' as const,
      shadowColor: isDarkMode
        ? 'rgba(255, 255, 255, 0.05)' 
        : 'rgba(0, 0, 0, 0.04)',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 1,
      shadowRadius: 4,
      elevation: 2,
    },
    chartLegend: {
      flexDirection: windowWidth <= 360 ? 'column' as const : 'row' as const,
      justifyContent: 'center' as const,
      gap: windowWidth <= 360 ? 6 : 12,
      marginTop: 5,
      marginBottom: 5,
    },
    legendItem: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      gap: 4,
    },
    legendLabel: {
      fontSize: 13,
      color: cssVar['--text'],
    },
    statsSummary: {
      flexDirection: windowWidth <= 360 ? 'column' as const : 'row' as const,
      justifyContent: 'space-between' as const,
      width: '100%' as any,
      marginTop: 6,
      gap: 6,
    },
    summaryBox: {
      flex: 1,
      backgroundColor: isDarkMode
        ? 'rgba(255, 255, 255, 0.04)' 
        : cssVar['--input'],
      borderRadius: 10,
      padding: 8,
      paddingVertical: 6,
      alignItems: 'center' as const,
    }
  };

  useEffect(() => {
    // Reset and start animations when the screen is focused
    const unsubscribe = navigation.addListener('focus', () => {
      // Reset animations
      screenFadeAnim.setValue(1);
      balanceCardAnim.setValue(0.95);
      actionItemAnims.forEach(anim => anim.setValue(0));
      transactionAnims.forEach(anim => anim.setValue(20));
      chartAnimation.setValue(0);
      
      // Start staggered animations
      Animated.stagger(100, [
        // Balance card with spring animation
        Animated.spring(balanceCardAnim, {
          toValue: 1,
          tension: 70,
          friction: 8,
          useNativeDriver: true
        }),
        
        // Action buttons with spring animations
        ...actionItemAnims.map(anim => 
          Animated.spring(anim, {
            toValue: 1,
            tension: 70,
            friction: 8,
            useNativeDriver: true
          })
        ),
        
        // Chart animation
        Animated.timing(chartAnimation, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        
        // Transactions fade in with translateY
        ...transactionAnims.map(anim => 
          Animated.timing(anim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
          })
        )
      ]).start();
    });

    return unsubscribe;
  }, [navigation, balanceCardAnim, actionItemAnims, transactionAnims, chartAnimation, screenFadeAnim]);

  // Get statistics from mock data
  const moneyIn = MONTHLY_STATS[0].value;
  const moneyOut = MONTHLY_STATS[1].value;
  const total = moneyIn + moneyOut;
  
  // Prepare pie chart data
  const pieData = MONTHLY_STATS.map(item => ({
    value: item.value,
    svg: { 
      fill: item.color,
      strokeWidth: 0
    },
    key: item.label,
  }));

  // Localized labels based on current language system
  const getTranslatedLabels = () => {
    switch (language) {
      case 'en':
        return {
          moneyIn: 'Money In',
          moneyOut: 'Money Out',
          monthlyStats: 'Monthly Stats',
          recentTransactions: 'Recent Transactions',
          seeAll: 'See All',
          send: 'Send',
          receive: 'Receive'
        };
      case 'fr':
        return {
          moneyIn: 'Entrées',
          moneyOut: 'Sorties',
          monthlyStats: 'Statistiques mensuelles',
          recentTransactions: 'Transactions récentes',
          seeAll: 'Voir tout',
          send: 'Envoyer',
          receive: 'Recevoir'
        };
      case 'pidgin':
        return {
          moneyIn: 'Money wey enter',
          moneyOut: 'Money wey comot',
          monthlyStats: 'Monthly Stats',
          recentTransactions: 'Recent Transactions',
          seeAll: 'See everything',
          send: 'Send',
          receive: 'Collect'
        };
      default:
        return {
          moneyIn: 'Entrées',
          moneyOut: 'Sorties',
          monthlyStats: 'Statistiques mensuelles',
          recentTransactions: 'Transactions récentes',
          seeAll: 'Voir tout',
          send: 'Envoyer',
          receive: 'Recevoir'
        };
    }
  };

  const labels = getTranslatedLabels();

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} FCFA`;
  };

  const animateButtonPress = (buttonIndex: number) => {
    // Scale animation
    Animated.sequence([
      Animated.timing(actionItemAnims[buttonIndex], {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.spring(actionItemAnims[buttonIndex], {
        toValue: 1,
        tension: 40,
        friction: 3,
        useNativeDriver: true
      })
    ]).start();
  };

  const navigateToSend = () => {
    animateButtonPress(0);
    
    // Fade out animation before navigation
    Animated.timing(screenFadeAnim, {
      toValue: 0.5, 
      duration: 150,
      useNativeDriver: true
    }).start(() => {
      navigation.navigate('SendMoney');
    });
  };

  const navigateToReceive = () => {
    animateButtonPress(1);
    
    // Fade out animation before navigation
    Animated.timing(screenFadeAnim, {
      toValue: 0.5, 
      duration: 150,
      useNativeDriver: true
    }).start(() => {
      navigation.navigate('Receive');
    });
  };

  const navigateToTransactions = () => {
    // Navigate to a screen that exists in our navigation
    navigation.navigate('Main', { screen: 'Wallet' });
  };

  const navigateToNotifications = () => {
    // Bell animation
    Animated.sequence([
      Animated.timing(notificationBellAnim, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.spring(notificationBellAnim, {
        toValue: 1,
        tension: 40,
        friction: 3,
        useNativeDriver: true
      })
    ]).start(() => {
      navigation.navigate('Notifications');
    });
  };

  const navigateToProfile = () => {
    // Use the existing Profile tab
    navigation.navigate('Main', { screen: 'Profile' });
  };

  const toggleBalanceVisibility = () => {
    // Add animation for toggle
    Animated.sequence([
      Animated.timing(balanceCardAnim, {
        toValue: 0.98,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.spring(balanceCardAnim, {
        toValue: 1,
        tension: 40,
        friction: 3,
        useNativeDriver: true
      })
    ]).start();
    
    setBalanceHidden(!balanceHidden);
  };
  
  const transactionAmountStyle = (isPositive: boolean): TextStyle => ({
    ...styles.transactionAmount,
    color: isPositive ? cssVar['--success'] : cssVar['--danger']
  });

  // Define a function to optimize the donut chart size based on screen width
  const getChartSize = () => {
    if (windowWidth < 340) return 120;  // Extra small screens
    if (windowWidth < 380) return 125;  // Small screens
    return 130;  // Medium and larger screens
  };

  return (
    <ThemedView useSafeArea>
      <Animated.View style={{ opacity: screenFadeAnim, flex: 1 }}>
        <ScrollView style={styles.scrollView}>
          {/* Header - removed colored background */}
          <View style={styles.header}>
            <View>
              <ThemedText style={dynamicStyles.greeting}>Bon après-midi</ThemedText>
              <ThemedText style={dynamicStyles.username}>{MOCK_USER.name}</ThemedText>
            </View>
            <View style={styles.headerRight}>
              <Animated.View style={{
                transform: [{ scale: notificationBellAnim }]
              }}>
                <TouchableOpacity 
                  style={styles.notificationButton}
                  onPress={navigateToNotifications}
                >
                  <Ionicons name="notifications" size={24} color={cssVar['--text']} />
                  <View style={styles.notificationDot} />
                </TouchableOpacity>
              </Animated.View>
              <TouchableOpacity onPress={navigateToProfile}>
                <View style={styles.avatar}>
                  <ThemedText style={dynamicStyles.avatarText}>Z</ThemedText>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Dashboard Content Wrapper */}
          <View style={styles.dashboardWrapper}>
            {/* Wallet Balance Card - with spring animation */}
            <Animated.View 
              style={[
                styles.balanceCardContainer,
                {
                  transform: [{ scale: balanceCardAnim }]
                }
              ]}
            >
              <WalletBalanceCard 
                balance={MOCK_USER.balance} 
                weeklyChange={MOCK_USER.weeklyChange} 
                accountNumber={MOCK_USER.accountNumber}
                isBalanceHidden={balanceHidden}
                onToggleBalanceVisibility={toggleBalanceVisibility}
              />
            </Animated.View>
            
            {/* Quick Actions */}
            <View style={styles.actionsContainer}>
              {/* Send Money Button with Animation */}
              <Animated.View style={{ 
                transform: [{ scale: actionItemAnims[0] }],
                flex: 1,
                marginHorizontal: 6,
                opacity: actionItemAnims[0]
              }}>
                <ThemedButton
                  title={labels.send}
                  variant="primary"
                  onPress={navigateToSend}
                  containerStyle={styles.actionButton}
                />
              </Animated.View>
              
              {/* Receive Money Button with Animation */}
              <Animated.View style={{ 
                transform: [{ scale: actionItemAnims[1] }],
                flex: 1,
                marginHorizontal: 6,
                opacity: actionItemAnims[1]
              }}>
                <ThemedButton
                  title={labels.receive}
                  variant="outline"
                  onPress={navigateToReceive}
                  containerStyle={styles.actionButton}
                />
              </Animated.View>
            </View>

            {/* Monthly Statistics */}
            <ThemedCard style={dynamicStyles.chartSection}>
              <ThemedText style={styles.statisticsTitle}>{labels.monthlyStats}</ThemedText>
              
              {/* Chart Container */}
              <View style={styles.chartContainer}>
                <Animated.View style={{
                  opacity: chartAnimation,
                  transform: [{ 
                    scale: chartAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 1]
                    }) 
                  }],
                  margin: 0,
                }}>
                  <InteractivePieChart 
                    data={pieData} 
                    width={getChartSize()}
                    height={getChartSize()}
                  />
                </Animated.View>
              </View>
              
              {/* Legend with dots and labels */}
              <View style={dynamicStyles.chartLegend}>
                <View style={dynamicStyles.legendItem}>
                  <View style={[styles.dot, styles.dotIn]} />
                  <ThemedText style={dynamicStyles.legendLabel}>{labels.moneyIn}</ThemedText>
                </View>
                <View style={dynamicStyles.legendItem}>
                  <View style={[styles.dot, styles.dotOut]} />
                  <ThemedText style={dynamicStyles.legendLabel}>{labels.moneyOut}</ThemedText>
                </View>
              </View>
              
              {/* Financial summary boxes */}
              <View style={dynamicStyles.statsSummary}>
                <View style={dynamicStyles.summaryBox}>
                  <ThemedText style={{ ...styles.summaryValue, color: MONTHLY_STATS[0].color }}>
                    {formatCurrency(moneyIn)}
                  </ThemedText>
                </View>
                <View style={dynamicStyles.summaryBox}>
                  <ThemedText style={{ ...styles.summaryValue, color: MONTHLY_STATS[1].color }}>
                    {formatCurrency(moneyOut)}
                  </ThemedText>
                </View>
              </View>
            </ThemedCard>

            {/* Recent Transactions */}
            <View style={styles.transactionsSection}>
              <View style={styles.transactionsHeader}>
                <ThemedText style={styles.transactionsSectionTitle}>{labels.recentTransactions}</ThemedText>
                <TouchableOpacity onPress={navigateToTransactions}>
                  <ThemedText style={dynamicStyles.seeAllLink}>{labels.seeAll}</ThemedText>
                </TouchableOpacity>
              </View>
              
              {TRANSACTIONS.map((transaction, index) => (
                <Animated.View
                  key={transaction.id}
                  style={{
                    opacity: transactionAnims[index].interpolate({
                      inputRange: [0, 20],
                      outputRange: [1, 0]
                    }),
                    transform: [{ 
                      translateY: transactionAnims[index]
                    }]
                  }}
                >
                  <ThemedCard style={styles.transactionCard}>
                    <View style={styles.transactionLeftContent}>
                      <View style={[styles.transactionAvatar, {
                        backgroundColor: getAvatarColor(transaction.name)
                      }]}>
                        <ThemedText style={styles.transactionAvatarText}>
                          {transaction.name.charAt(0)}
                        </ThemedText>
                      </View>
                      <View style={styles.transactionDetails}>
                        <ThemedText style={styles.transactionName}>{transaction.name}</ThemedText>
                        <ThemedText secondary style={styles.transactionDate}>{transaction.date}</ThemedText>
                      </View>
                    </View>
                    <ThemedText style={transactionAmountStyle(transaction.isPositive)}>
                      {transaction.isPositive ? '+' : '-'} {formatCurrency(transaction.amount)}
                    </ThemedText>
                  </ThemedCard>
                </Animated.View>
              ))}
            </View>
          </View>
        </ScrollView>
      </Animated.View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  dashboardWrapper: {
    padding: 16,
    maxWidth: 480,
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    paddingTop: 24,
    paddingBottom: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 14,
  },
  username: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: 'rgba(230, 230, 235, 0.5)',
  },
  notificationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF5E5E',
    position: 'absolute',
    top: 10,
    right: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(59, 91, 254, 0.1)',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '600',
  },
  balanceCardContainer: {
    marginTop: 8,
    width: '100%',
    position: 'relative',
    zIndex: 1,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  actionButton: {
    paddingVertical: 15,
  },
  chartContainer: {
    width: '100%',
    maxWidth: 130,
    alignSelf: 'center',
    margin: 0,
    padding: 0,
  },
  statisticsTitle: {
    fontSize: 15,
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotIn: {
    backgroundColor: '#3B5BFE',
  },
  dotOut: {
    backgroundColor: '#EF4444',
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    padding: 0,
  },
  transactionsSection: {
    marginTop: 16,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  transactionsSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  transactionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
  },
  transactionLeftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionAvatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  transactionDetails: {
    justifyContent: 'center',
  },
  transactionName: {
    fontSize: 14,
    fontWeight: '500',
  },
  transactionDate: {
    fontSize: 12,
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: '600',
  },
}); 