
import { RootStackParamList } from '../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Type-safe navigation for use in wallet and other features
export const navigateTo = <K extends keyof RootStackParamList>(
  navigation: NativeStackNavigationProp<RootStackParamList>,
  screenName: K,
  params?: RootStackParamList[K]
) => {
  if (params) {
    // Call navigate with screenName and params directly
    navigation.navigate(screenName, params);
  } else {
    // Call navigate with just screenName when no params
    navigation.navigate(screenName);
  }
};

// Convert an array type to proper navigation params
export const navigateWithArray = (
  navigation: NativeStackNavigationProp<RootStackParamList>,
  screenName: keyof RootStackParamList,
  params?: object
) => {
  // Use direct navigation with params
  navigation.navigate(screenName, params as any);
};
