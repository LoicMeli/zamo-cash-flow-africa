import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, ViewStyle, TextStyle, ScrollView, StatusBar } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { COLORS } from '../../theme/colors';

interface ThemedViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
  headerTitle?: string;
  headerRight?: React.ReactNode;
  headerLeft?: React.ReactNode;
  scroll?: boolean;
  contentContainerStyle?: ViewStyle;
  showsVerticalScrollIndicator?: boolean;
  useSafeArea?: boolean;
}

export const ThemedView: React.FC<ThemedViewProps> = ({
  children,
  style,
  headerTitle,
  headerRight,
  headerLeft,
  scroll = false,
  contentContainerStyle,
  showsVerticalScrollIndicator = false,
  useSafeArea = true,
}) => {
  const { colors, isDarkMode } = useTheme();

  const Container = useSafeArea ? SafeAreaView : View;
  const Content = scroll ? ScrollView : View;

  return (
    <Container style={[styles.container, { backgroundColor: colors.background }, style]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      
      {headerTitle && (
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          {headerLeft && <View style={styles.headerLeft}>{headerLeft}</View>}
          <Text style={[styles.headerTitle, { color: colors.text }]}>{headerTitle}</Text>
          {headerRight && <View style={styles.headerRight}>{headerRight}</View>}
        </View>
      )}
      
      <Content
        style={styles.content}
        contentContainerStyle={[
          scroll ? styles.scrollContent : styles.viewContent,
          contentContainerStyle
        ]}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      >
        {children}
      </Content>
    </Container>
  );
};

interface ThemedTextProps {
  children: React.ReactNode;
  style?: TextStyle;
  secondary?: boolean;
}

export const ThemedText: React.FC<ThemedTextProps> = ({ children, style, secondary = false }) => {
  const { colors } = useTheme();
  
  return (
    <Text style={[{ color: secondary ? colors.textSecondary : colors.text }, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerLeft: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  headerRight: {
    position: 'absolute',
    right: 16,
    zIndex: 1,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  viewContent: {
    flex: 1,
    padding: 16,
  },
}); 