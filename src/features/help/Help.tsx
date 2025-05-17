import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../config/theme';
import { RootStackParamList } from '../../types/navigation';

type HelpScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

const helpSections = [
  {
    id: '1',
    title: 'Comment envoyer de l\'argent',
    icon: 'cash-outline',
    content: 'Pour envoyer de l\'argent, suivez ces étapes :\n\n1. Accédez à l\'écran d\'envoi\n2. Entrez le montant\n3. Saisissez le numéro du destinataire\n4. Ajoutez une description (optionnel)\n5. Confirmez la transaction',
  },
  {
    id: '2',
    title: 'Comment retirer de l\'argent',
    icon: 'wallet-outline',
    content: 'Pour retirer de l\'argent :\n\n1. Trouvez un agent près de chez vous\n2. Présentez votre code de retrait\n3. Montrez votre pièce d\'identité\n4. Recevez votre argent',
  },
  {
    id: '3',
    title: 'Sécurité du compte',
    icon: 'shield-checkmark-outline',
    content: 'Pour sécuriser votre compte :\n\n1. Activez l\'authentification biométrique\n2. Changez régulièrement votre mot de passe\n3. Ne partagez jamais vos codes\n4. Vérifiez régulièrement vos transactions',
  },
  {
    id: '4',
    title: 'Frais et limites',
    icon: 'information-circle-outline',
    content: 'Frais de transaction :\n- Envoi : 1% du montant\n- Retrait : 2% du montant\n\nLimites :\n- Transaction max : 500,000 FCFA\n- Retrait max : 200,000 FCFA par jour',
  },
];

export const Help = () => {
  const navigation = useNavigation<HelpScreenNavigationProp>();
  const [expandedSection, setExpandedSection] = React.useState<string | null>(null);

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Aide</Text>
      </View>

      <ScrollView style={styles.content}>
        {helpSections.map((section) => (
          <TouchableOpacity
            key={section.id}
            style={styles.section}
            onPress={() => toggleSection(section.id)}
          >
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <Ionicons
                  name={section.icon as any}
                  size={24}
                  color={theme.colors.primary}
                  style={styles.sectionIcon}
                />
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>
              <Ionicons
                name={expandedSection === section.id ? 'chevron-up' : 'chevron-down'}
                size={24}
                color={theme.colors.secondary}
              />
            </View>
            {expandedSection === section.id && (
              <Text style={styles.sectionContent}>{section.content}</Text>
            )}
          </TouchableOpacity>
        ))}

        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Besoin d'aide supplémentaire ?</Text>
          <TouchableOpacity style={styles.contactButton}>
            <Ionicons name="chatbubble-outline" size={24} color={theme.colors.white} />
            <Text style={styles.contactButtonText}>Contacter le support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  backButton: {
    marginRight: theme.spacing.md,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.text,
  },
  content: {
    padding: theme.spacing.lg,
  },
  section: {
    backgroundColor: theme.colors.light,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionIcon: {
    marginRight: theme.spacing.md,
  },
  sectionTitle: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: 'bold',
    flex: 1,
  },
  sectionContent: {
    ...theme.typography.body,
    color: theme.colors.secondary,
    padding: theme.spacing.md,
    paddingTop: 0,
  },
  contactSection: {
    marginTop: theme.spacing.xl,
    alignItems: 'center',
  },
  contactTitle: {
    ...theme.typography.body,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  contactButtonText: {
    ...theme.typography.body,
    color: theme.colors.white,
    marginLeft: theme.spacing.sm,
  },
}); 