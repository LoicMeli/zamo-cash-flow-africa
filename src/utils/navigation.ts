
import { RootStackParamList } from '../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Type-safe navigation for use in wallet and other features
export const navigateTo = <K extends keyof RootStackParamList>(
  navigation: NativeStackNavigationProp<RootStackParamList>,
  screenName: K,
  params?: RootStackParamList[K]
) => {
  if (params) {
    // Directly call navigate with the correct parameters
    navigation.navigate({
      name: screenName,
      params: params,
    });
  } else {
    // Call navigate with just the screen name
    navigation.navigate({
      name: screenName,
    });
  }
};

// Convert an array type to proper navigation params
export const navigateWithArray = (
  navigation: NativeStackNavigationProp<RootStackParamList>,
  screenName: keyof RootStackParamList,
  params?: object
) => {
  // Use properly typed navigation
  navigation.navigate({
    name: screenName,
    params: params as any,
  });
};
