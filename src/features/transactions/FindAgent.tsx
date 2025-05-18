
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { COLORS } from '../../theme/colors';

export const FindAgent = () => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.light.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.light.text }]}>Trouver un Agent</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: 'System',
    fontWeight: '700',
  },
});
