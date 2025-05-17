
export const COLORS = {
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
