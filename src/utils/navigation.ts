
import { RootStackParamList } from '../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Type-safe navigation for use in wallet and other features
export const navigateTo = <K extends keyof RootStackParamList>(
  navigation: NativeStackNavigationProp<RootStackParamList>,
  screenName: K,
  params?: RootStackParamList[K]
) => {
  // Fixed: Use type-safe navigation
  if (params) {
    navigation.navigate(screenName, params);
  } else {
    navigation.navigate(screenName);
  }
};

// Convert an array type to proper navigation params
export const navigateWithArray = (
  navigation: NativeStackNavigationProp<RootStackParamList>,
  screenName: keyof RootStackParamList,
  params?: any
) => {
  // Fixed: Use type-safe navigation
  navigation.navigate(screenName, params);
};
