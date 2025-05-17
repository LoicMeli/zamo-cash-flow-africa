# Zamo Cash Flow Africa - Theme Implementation Plan

## 1. Current State

The application already has a functional theme system that includes:

- **Theme Context**: A context provider that manages theme state and preferences
- **Color Schemes**: Defined in `colors.ts` for both light and dark themes
- **Theme Components**: Reusable themed components for views, text, buttons, inputs, cards, and dividers
- **Theme Settings**: A dedicated screen for users to switch between System, Light, and Dark modes
- **Preference Storage**: User theme preference saved to AsyncStorage

## 2. Implementation Strategy

### Phase 1: Foundation Components (Completed)
- ✅ Theme Context and Provider
- ✅ Color definitions 
- ✅ Basic themed components
- ✅ Theme selection UI
- ✅ Theme storage

### Phase 2: Core UI Components (Current Focus)
- 🔄 Update navigation theming
- 🔄 Themed tab navigation
- 🔄 Convert core screens to use themed components:
  - 🔄 Profile screen (in progress)
  - ⬜ Dashboard screen
  - ⬜ Wallet screen 
  - ⬜ Savings screen

### Phase 3: Feature Screens
- ⬜ Authentication screens
  - ⬜ Login screen
  - ⬜ OTP verification screen
  - ⬜ PIN setup screen
- ⬜ Transaction screens
  - ⬜ Send Money screens
  - ⬜ Add Money screens (including existing bank transfer alerts)
  - ⬜ Remove Money screens (all withdrawal method screens)
- ⬜ Settings screens
  - ⬜ Personal Info screen
  - ⬜ Security screen

### Phase 4: Special Components
- ⬜ Modal dialogs
- ⬜ Toast notifications
- ⬜ Loading spinners
- ⬜ QR code screens (ensure proper contrast)
- ⬜ Charts and graphs
- ⬜ Transaction history list items

### Phase 5: Testing and Refinement
- ⬜ Test both themes on various screen sizes
- ⬜ Validate color contrast for accessibility
- ⬜ Ensure consistent transitions between themes
- ⬜ Optimize theme switching performance

## 3. Implementation Guidelines

### Components to Apply Theming

For each screen, apply theming to:
1. **Container backgrounds** - Use `ThemedView` or set `{backgroundColor: colors.background}`
2. **Text elements** - Use `ThemedText` or set `{color: colors.text}`
3. **Cards and panels** - Use `ThemedCard` or apply `{backgroundColor: colors.card, borderColor: colors.border}`
4. **Input fields** - Use `ThemedInput` 
5. **Buttons** - Use `ThemedButton`
6. **Dividers** - Use `ThemedDivider`
7. **Icons** - Set `color={colors.icon}` or `color={colors.text}` as appropriate

### Conversion Process

For each screen:

1. **Import requirements**:
   ```tsx
   import { useTheme } from '../../theme/ThemeContext';
   import { ThemedView, ThemedText } from '../../components/common/ThemedView';
   import { ThemedButton, ThemedCard, ThemedDivider, ThemedInput } from '../../components/common/ThemedComponents';
   ```

2. **Access theme context**:
   ```tsx
   const { colors, isDarkMode } = useTheme();
   ```

3. **Replace basic components**:
   - `View` → `ThemedView` or `<View style={{backgroundColor: colors.background}} />`
   - `Text` → `ThemedText` or `<Text style={{color: colors.text}} />`
   - `TextInput` → `ThemedInput`
   - `TouchableOpacity` (for buttons) → `ThemedButton`

4. **Apply dynamic styling**:
   ```tsx
   <View style={[styles.container, { borderColor: colors.border }]}>
   ```

## 4. Conclusion

This implementation plan ensures a systematic approach to applying theming across the entire Zamo Cash Flow Africa app. By following these guidelines, we will create a consistent, accessible, and visually pleasing user experience in both light and dark modes.

The plan prioritizes core screens first, then moves to feature-specific screens, and finally addresses special components. This approach allows us to deliver immediate value while progressively enhancing the app's theming capabilities. 