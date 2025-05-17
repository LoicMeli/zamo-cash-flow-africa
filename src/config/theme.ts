
export const colors = {
  // Base colors (consistent across themes)
  primary: '#3B5BFE',  // Zamo Blue
  secondary: '#666666',
  success: '#22C55E',
  warning: '#FF9500',
  danger: '#FF3B30',
  info: '#007AFF',

  // Light theme
  light: {
    background: '#FFFFFF',
    surface: '#F9FAFB',
    card: '#F9FAFB',
    text: '#1A1A1A',
    textSecondary: '#666666',
    border: '#E5E7EB',
    input: '#F3F4F6',
    icon: '#757575',
    divider: '#EAEAEA',
    disabled: '#CCCCCC',
    overlay: 'rgba(0, 0, 0, 0.5)',
    cardGradient: 'linear-gradient(135deg, #F5F7FA 0%, #E4E9F2 100%)',
    buttonGradient: {
      blue: 'linear-gradient(135deg, #4776E6 0%, #3B5BFE 100%)',
      green: 'linear-gradient(135deg, #11998e 0%, #22C55E 100%)',
      red: 'linear-gradient(135deg, #FF416C 0%, #FF3B30 100%)',
      orange: 'linear-gradient(135deg, #FF8008 0%, #FF9500 100%)',
    }
  },

  // Dark theme
  dark: {
    background: '#121212',
    surface: '#1A1A1A',
    card: '#1A1A1A',
    text: '#FFFFFF',
    textSecondary: '#AAAAAA',
    border: '#2A2A2A',
    input: '#222222',
    icon: '#BBBBBB',
    divider: '#333333',
    disabled: '#444444',
    overlay: 'rgba(0, 0, 0, 0.7)',
    cardGradient: 'linear-gradient(135deg, #2A2D3E 0%, #1A1D2C 100%)',
    buttonGradient: {
      blue: 'linear-gradient(135deg, #324376 0%, #3B5BFE 100%)',
      green: 'linear-gradient(135deg, #0F766E 0%, #22C55E 100%)',
      red: 'linear-gradient(135deg, #A91B42 0%, #FF3B30 100%)',
      orange: 'linear-gradient(135deg, #B63D00 0%, #FF9500 100%)',
    }
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  lineHeight: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
    xxl: 36,
    xxxl: 40,
  },
  h1: {
    fontSize: 32,
    lineHeight: 40,
    fontFamily: 'System',
    fontWeight: '700',
  },
  h2: {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: 'System',
    fontWeight: '600',
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'System',
    fontWeight: '400',
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'System',
    fontWeight: '400',
  },
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  }
};

// Create color-mode compatible theme objects
export const navigationThemes = {
  light: {
    colors: {
      primary: colors.primary,
      background: colors.light.background,
      card: colors.light.surface,
      text: colors.light.text,
      border: colors.light.border,
      notification: colors.danger,
    },
  },
  dark: {
    colors: {
      primary: colors.primary,
      background: colors.dark.background,
      card: colors.dark.surface,
      text: colors.dark.text,
      border: colors.dark.border,
      notification: colors.danger,
    },
  },
};

export const theme = {
  colors,
  spacing,
  typography,
  shadows,
  navigationThemes,
  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    round: 9999,
  },
};

export type Theme = typeof theme;
export type Colors = typeof colors;
export type Spacing = typeof spacing;
export type Typography = typeof typography;
export type Shadows = typeof shadows;
