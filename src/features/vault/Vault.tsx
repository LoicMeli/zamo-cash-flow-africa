import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PieChart } from 'react-native-chart-kit';
import { Icon } from '../../components/common/Icon';
import { useTheme } from '../../theme/ThemeContext';
import { ThemedView, ThemedText } from '../../components/common/ThemedView';
import { ThemedButton, ThemedCard } from '../../components/common/ThemedComponents';
import { Button } from '../../components/common/Button';
import { RootStackParamList } from '../../types/navigation';
import { COLORS } from '../../theme/colors';
import { navigateTo } from '../../utils/navigation';

type VaultScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Mock data for the insights chart
const insightsData = [
  {
    name: 'Nourriture',
    population: 35,
    color: '#3B5BFE',
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  },
  {
    name: 'Transport',
    population: 25,
    color: '#FF9500',
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  },
  {
    name: 'Shopping',
    population: 20,
    color: '#22C55E',
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  },
  {
    name: 'Divertissement',
    population: 15,
    color: '#FF3B30',
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  },
  {
    name: 'Autres',
    population: 5,
    color: '#8E8E93',
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  },
];

// Mock savings goals data
const savingsGoals = [
  { id: '1', name: 'Téléphone', target: 800000, current: 450000, icon: 'phone-portrait' },
  { id: '2', name: 'Voyage', target: 1500000, current: 750000, icon: 'airplane' },
  { id: '3', name: 'Éducation', target: 2000000, current: 500000, icon: 'school' }
];

export const Vault = () => {
  const navigation = useNavigation<VaultScreenNavigationProp>();
  const { colors, isDarkMode } = useTheme();
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);
  const [balanceAnimation] = useState(new Animated.Value(0));
  const screenWidth = Dimensions.get('window').width;
  
  // Animate the balance when component mounts
  useEffect(() => {
    Animated.timing(balanceAnimation, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  }, []);

  // Interpolate the balance animation
  const animatedBalance = balanceAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 750000],
  });

  const toggleBalanceVisibility = () => {
    setIsBalanceHidden(!isBalanceHidden);
  };

  // Handler functions for navigation
  const handleSendMoney = () => {
    navigateTo(navigation, 'SendMoney');
  };

  const handleReceiveMoney = () => {
    navigateTo(navigation, 'ReceiveMoney');
  };

  const handleWithdrawMoney = () => {
    navigateTo(navigation, 'Withdraw');
  };

  const handleAddMoney = () => {
    navigateTo(navigation, 'Deposit');
  };

  const handleViewTransactions = () => {
    navigateTo(navigation, 'TransactionsList');
  };

  const handleCreateSavingsGoal = () => {
    // Navigate to a savings goal creation screen (you would need to implement this)
    console.log('Create savings goal');
  };

  const handleViewRecommendations = () => {
    // Navigate to AI recommendations screen (you would need to implement this)
    console.log('View AI recommendations');
  };

  const handleManageBusiness = () => {
    // Navigate to business management screen (you would need to implement this)
    console.log('Manage business account');
  };

  // Format money amount with currency symbol
  const formatMoney = (amount: number) => {
    return `${amount.toLocaleString()} FCFA`;
  };

  // Calculate percentage for progress bars
  const calculateProgress = (current: number, target: number) => {
    return (current / target) * 100;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Vault Balance Section */}
        <ThemedCard style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <ThemedText secondary style={styles.balanceLabel}>Vault Balance</ThemedText>
            <View style={styles.accountLevelContainer}>
              <Icon name="star" size={16} color={COLORS.warning} />
              <ThemedText style={styles.accountLevel}>Golden</ThemedText>
            </View>
          </View>
          
          <View style={styles.balanceRow}>
            {isBalanceHidden ? (
              <ThemedText style={styles.hiddenBalance}>••••••••</ThemedText>
            ) : (
              <Animated.Text 
                style={[
                  styles.balanceAmount, 
                  { color: colors.text }
                ]}
              >
                {animatedBalance.interpolate({
                  inputRange: [0, 750000],
                  outputRange: ['0', '750,000']
                }).toString()} FCFA
              </Animated.Text>
            )}
            <TouchableOpacity onPress={toggleBalanceVisibility} style={styles.visibilityButton}>
              <Icon 
                name={isBalanceHidden ? "eye" : "eye-off"} 
                size={24} 
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.viewTransactionsButton}
            onPress={handleViewTransactions}
          >
            <ThemedText style={styles.viewTransactionsText}>View Transactions</ThemedText>
            <Icon name="chevron-forward" size={16} color={COLORS.primary} />
          </TouchableOpacity>
        </ThemedCard>

        {/* 2. Quick Actions Section */}
        <View style={styles.sectionContainer}>
          <ThemedText style={styles.sectionTitle}>Quick Actions</ThemedText>
          <View style={styles.quickActionsContainer}>
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: isDarkMode ? 'rgba(59, 91, 254, 0.15)' : 'rgba(59, 91, 254, 0.08)' }]}
              onPress={handleSendMoney}
            >
              <View style={styles.actionIconContainer}>
                <Icon name="arrow-forward" size={24} color={COLORS.primary} />
              </View>
              <ThemedText style={styles.actionText}>Send</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: isDarkMode ? 'rgba(34, 197, 94, 0.15)' : 'rgba(34, 197, 94, 0.08)' }]}
              onPress={handleReceiveMoney}
            >
              <View style={[styles.actionIconContainer, { backgroundColor: 'rgba(34, 197, 94, 0.2)' }]}>
                <Icon name="arrow-down" size={24} color={COLORS.success} />
              </View>
              <ThemedText style={styles.actionText}>Receive</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: isDarkMode ? 'rgba(255, 149, 0, 0.15)' : 'rgba(255, 149, 0, 0.08)' }]}
              onPress={handleWithdrawMoney}
            >
              <View style={[styles.actionIconContainer, { backgroundColor: 'rgba(255, 149, 0, 0.2)' }]}>
                <Icon name="wallet" size={24} color={COLORS.warning} />
              </View>
              <ThemedText style={styles.actionText}>Withdraw</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: isDarkMode ? 'rgba(0, 122, 255, 0.15)' : 'rgba(0, 122, 255, 0.08)' }]}
              onPress={handleAddMoney}
            >
              <View style={[styles.actionIconContainer, { backgroundColor: 'rgba(0, 122, 255, 0.2)' }]}>
                <Icon name="add-circle" size={24} color={COLORS.info} />
              </View>
              <ThemedText style={styles.actionText}>Add Money</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* 3. Vault Boost (Savings Goals) Section */}
        <View style={styles.sectionContainer}>
          <ThemedText style={styles.sectionTitle}>Vault Boost</ThemedText>
          <ThemedText style={styles.sectionSubtitle}>Smart Saving Goals</ThemedText>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.savingsGoalsContainer}
          >
            {savingsGoals.map((goal) => (
              <ThemedCard key={goal.id} style={styles.savingsGoalCard}>
                <View style={styles.savingsGoalIconContainer}>
                  <Icon name={goal.icon} size={24} color={COLORS.primary} />
                </View>
                <ThemedText style={styles.savingsGoalName}>{goal.name}</ThemedText>
                <View style={styles.progressContainer}>
                  <View 
                    style={[
                      styles.progressBar, 
                      { 
                        width: `${calculateProgress(goal.current, goal.target)}%`,
                        backgroundColor: COLORS.primary 
                      }
                    ]} 
                  />
                </View>
                <View style={styles.savingsGoalAmounts}>
                  <ThemedText secondary style={styles.currentAmount}>
                    {formatMoney(goal.current)}
                  </ThemedText>
                  <ThemedText secondary style={styles.targetAmount}>
                    {formatMoney(goal.target)}
                  </ThemedText>
                </View>
              </ThemedCard>
            ))}
            
            <TouchableOpacity 
              style={[
                styles.createSavingsGoalCard,
                { 
                  borderColor: colors.border,
                  borderWidth: 1,
                  backgroundColor: colors.card
                }
              ]}
              onPress={handleCreateSavingsGoal}
            >
              <View style={styles.createSavingsGoalContent}>
                <View style={[styles.addIconContainer, { backgroundColor: isDarkMode ? 'rgba(59, 91, 254, 0.2)' : 'rgba(59, 91, 254, 0.1)' }]}>
                  <Icon name="add" size={32} color={COLORS.primary} />
                </View>
                <ThemedText style={styles.createSavingsGoalText}>Create New Goal</ThemedText>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* 4. Vault Insights Section */}
        <View style={styles.sectionContainer}>
          <ThemedText style={styles.sectionTitle}>Vault Insights</ThemedText>
          <ThemedText style={styles.sectionSubtitle}>Monthly Expense Breakdown</ThemedText>
          
          <ThemedCard style={styles.insightsCard}>
            <PieChart
              data={insightsData}
              width={screenWidth - 64}
              height={180}
              chartConfig={{
                backgroundColor: colors.card,
                backgroundGradientFrom: colors.card,
                backgroundGradientTo: colors.card,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
            
            <View style={styles.monthlySummary}>
              <View style={styles.monthlyVariation}>
                <ThemedText style={styles.variationLabel}>Food</ThemedText>
                <Text style={[styles.variationPositive, { color: COLORS.success }]}>+12%</Text>
              </View>
              
              <View style={styles.monthlyVariation}>
                <ThemedText style={styles.variationLabel}>Transport</ThemedText>
                <Text style={[styles.variationNegative, { color: COLORS.danger }]}>-8%</Text>
              </View>
              
              <View style={styles.monthlyVariation}>
                <ThemedText style={styles.variationLabel}>Shopping</ThemedText>
                <Text style={[styles.variationPositive, { color: COLORS.success }]}>+5%</Text>
              </View>
            </View>
          </ThemedCard>
        </View>

        {/* 5. Smart Vault AI Section */}
        <View style={styles.sectionContainer}>
          <ThemedText style={styles.sectionTitle}>Smart Vault AI</ThemedText>
          <ThemedCard style={styles.aiCard}>
            <View style={styles.aiCardContent}>
              <View style={styles.aiIconContainer}>
                <Icon name="bulb" size={24} color="#FFD700" />
              </View>
              <View style={styles.aiMessageContainer}>
                <ThemedText style={styles.aiMessage}>
                  This month you're spending too much on transportation compared to your usual budget.
                </ThemedText>
                <TouchableOpacity 
                  style={[styles.recommendationsButton, { backgroundColor: COLORS.primary }]}
                  onPress={handleViewRecommendations}
                >
                  <Text style={styles.recommendationsButtonText}>View Recommendations</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ThemedCard>
        </View>

        {/* 6. Vault Pro Section */}
        <View style={styles.sectionContainer}>
          <ThemedText style={styles.sectionTitle}>Vault Pro</ThemedText>
          <ThemedText style={styles.sectionSubtitle}>Business Dashboard</ThemedText>
          
          <View style={styles.businessCardsContainer}>
            <ThemedCard style={styles.businessCard}>
              <ThemedText secondary style={styles.businessCardLabel}>Sales</ThemedText>
              <ThemedText style={styles.businessCardAmount}>1,250,000</ThemedText>
              <Text style={[styles.businessCardVariation, { color: COLORS.success }]}>↑ 8.5%</Text>
            </ThemedCard>
            
            <ThemedCard style={styles.businessCard}>
              <ThemedText secondary style={styles.businessCardLabel}>Expenses</ThemedText>
              <ThemedText style={styles.businessCardAmount}>450,000</ThemedText>
              <Text style={[styles.businessCardVariation, { color: COLORS.danger }]}>↑ 12%</Text>
            </ThemedCard>
            
            <ThemedCard style={styles.businessCard}>
              <ThemedText secondary style={styles.businessCardLabel}>Balance</ThemedText>
              <ThemedText style={styles.businessCardAmount}>800,000</ThemedText>
              <Text style={[styles.businessCardVariation, { color: COLORS.success }]}>↑ 5.2%</Text>
            </ThemedCard>
          </View>
          
          <Button
            title="Manage Business Account"
            onPress={handleManageBusiness}
            style={styles.manageBusinessButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  balanceCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  balanceLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: '600',
  },
  hiddenBalance: {
    fontSize: 28,
    fontWeight: '600',
    letterSpacing: 1.5,
  },
  accountLevelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 149, 0, 0.15)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  accountLevel: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
    color: COLORS.warning,
  },
  visibilityButton: {
    padding: 8,
    marginLeft: 8,
  },
  viewTransactionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    padding: 8,
  },
  viewTransactionsText: {
    color: COLORS.primary,
    fontWeight: '500',
    marginRight: 4,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 16,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  actionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(59, 91, 254, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  savingsGoalsContainer: {
    paddingVertical: 8,
    paddingRight: 16,
    marginLeft: -8,
  },
  savingsGoalCard: {
    width: 180,
    padding: 16,
    marginLeft: 8,
    borderRadius: 16,
  },
  savingsGoalIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(59, 91, 254, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  savingsGoalName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
  progressContainer: {
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    marginBottom: 8,
    width: '100%',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  savingsGoalAmounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  currentAmount: {
    fontSize: 12,
  },
  targetAmount: {
    fontSize: 12,
  },
  createSavingsGoalCard: {
    width: 180,
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginLeft: 8,
  },
  createSavingsGoalContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  createSavingsGoalText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  insightsCard: {
    borderRadius: 16,
    padding: 16,
  },
  monthlySummary: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  monthlyVariation: {
    alignItems: 'center',
  },
  variationLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  variationPositive: {
    fontSize: 16,
    fontWeight: '600',
  },
  variationNegative: {
    fontSize: 16,
    fontWeight: '600',
  },
  aiCard: {
    borderRadius: 16,
    padding: 16,
  },
  aiCardContent: {
    flexDirection: 'row',
  },
  aiIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  aiMessageContainer: {
    flex: 1,
  },
  aiMessage: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  recommendationsButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  recommendationsButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  businessCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  businessCard: {
    width: '31%',
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
  },
  businessCardLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  businessCardAmount: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  businessCardVariation: {
    fontSize: 12,
    fontWeight: '500',
  },
  manageBusinessButton: {
    marginTop: 8,
  },
});
