import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types/navigation';
import { useTheme } from '../../theme/ThemeContext';
import { ThemedText } from '../../components/common/ThemedView';
import { useLanguage } from '../../providers/LanguageProvider';

// Define navigation type
type RemoveMoneyScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

// Withdrawal methods data
const WITHDRAWAL_METHODS = [
  {
    id: 'mobile',
    title: 'Mobile Money',
    description: 'MTN, Orange Money, Moov, etc.',
    icon: 'phone-portrait-outline' as const,
    color: '#FF9500'
  },
  {
    id: 'bank',
    title: 'Bank Transfer',
    description: 'Direct transfer to your bank account',
    icon: 'business-outline' as const,
    color: '#22C55E'
  },
  {
    id: 'agent',
    title: 'Zamo Agent',
    description: 'Withdraw via a nearby agent',
    icon: 'person-outline' as const,
    color: '#3B5BFE'
  }
];

export const RemoveMoney = () => {
  const navigation = useNavigation<RemoveMoneyScreenNavigationProp>();
  const { colors, isDarkMode } = useTheme();
  const { t } = useLanguage();
  
  // Get screen dimensions for responsive design
  const windowWidth = Dimensions.get('window').width;
  const isSmallScreen = windowWidth < 375;
  
  // Handle method selection
  const handleMethodSelect = (methodId: string) => {
    switch(methodId) {
      case 'mobile':
        navigation.navigate('MobileMoneyWithdraw');
        break;
      case 'bank':
        navigation.navigate('BankWithdraw');
        break;
      case 'agent':
        navigation.navigate('AgentWithdraw');
        break;
      default:
        break;
    }
  };
  
  // Go back to previous screen
  const handleBack = () => {
    navigation.goBack();
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={colors.background} />
      
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Withdraw Money</ThemedText>
        <View style={{ width: 40 }} />
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Instructions Section */}
        <View style={[styles.instructionsContainer, { backgroundColor: colors.card }]}>
          <ThemedText style={styles.instructionsTitle}>How to Withdraw</ThemedText>
          <ThemedText style={styles.instructionsText} secondary>
            Choose a method below to withdraw money from your Zamo account.
          </ThemedText>
        </View>
        
        {/* Withdrawal Methods List */}
        <View style={styles.methodsContainer}>
          {WITHDRAWAL_METHODS.map(method => (
            <TouchableOpacity
              key={method.id}
              style={[styles.methodCard, { backgroundColor: colors.card }]}
              onPress={() => handleMethodSelect(method.id)}
              activeOpacity={0.7}
            >
              <View style={styles.methodLeft}>
                <View style={[styles.methodIcon, { backgroundColor: method.color }]}>
                  <Ionicons name={method.icon} size={isSmallScreen ? 18 : 20} color="#FFF" />
                </View>
                <View style={styles.methodInfo}>
                  <ThemedText style={styles.methodTitle}>{method.title}</ThemedText>
                  <ThemedText style={styles.methodDescription} secondary>{method.description}</ThemedText>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Additional Information */}
        <View style={styles.infoSection}>
          <View style={styles.infoItem}>
            <Ionicons name="shield-checkmark" size={20} color="#3B5BFE" />
            <ThemedText style={styles.infoText} secondary>
              Your withdrawals are secured by Zamo's security protocols.
            </ThemedText>
          </View>
          
          <View style={styles.infoItem}>
            <Ionicons name="timer-outline" size={20} color="#3B5BFE" />
            <ThemedText style={styles.infoText} secondary>
              Withdrawals are usually processed within 5-15 minutes.
            </ThemedText>
          </View>
        </View>
        
        {/* Support Section */}
        <TouchableOpacity style={[styles.supportButton, { backgroundColor: colors.card }]}>
          <Ionicons name="help-circle-outline" size={20} color={colors.text} />
          <ThemedText style={styles.supportButtonText}>
            Need help with your withdrawal?
          </ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
    maxWidth: 480,
    alignSelf: 'center',
    width: '100%',
  },
  instructionsContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 14,
    color: '#AAAAAA',
    lineHeight: 20,
  },
  methodsContainer: {
    marginBottom: 24,
  },
  methodCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  methodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  methodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  methodInfo: {
    flex: 1,
  },
  methodTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  methodDescription: {
    fontSize: 13,
    color: '#888888',
  },
  infoSection: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  infoText: {
    fontSize: 14,
    color: '#AAAAAA',
    marginLeft: 10,
    flex: 1,
    lineHeight: 20,
  },
  supportButton: {
    backgroundColor: '#3B5BFE',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  supportButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8,
  },
}); 