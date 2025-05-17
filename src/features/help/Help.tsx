
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '../../utils/IconsWrapper';
import { COLORS } from '../../config/constants';
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
          <Icon name="arrow-back" size={24} color={COLORS.text} />
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
                <Icon
                  name={section.icon}
                  size={24}
                  color={COLORS.primary}
                  style={styles.sectionIcon}
                />
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>
              <Icon
                name={expandedSection === section.id ? 'chevron-up' : 'chevron-down'}
                size={24}
                color={COLORS.secondary}
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
            <Icon name="chatbubble-outline" size={24} color={COLORS.white} />
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
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  content: {
    padding: 24,
  },
  section: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionIcon: {
    marginRight: 16,
  },
  sectionTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
  },
  sectionContent: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.secondary,
    padding: 16,
    paddingTop: 0,
  },
  contactSection: {
    marginTop: 32,
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.text,
    marginBottom: 16,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
  },
  contactButtonText: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.white,
    marginLeft: 8,
    fontWeight: '600',
  },
});
