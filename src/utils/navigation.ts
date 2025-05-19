
import { RootStackParamList } from '../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Type-safe navigation for use in wallet and other features
export const navigateTo = <K extends keyof RootStackParamList>(
  navigation: NativeStackNavigationProp<RootStackParamList>,
  screenName: K,
  params?: RootStackParamList[K]
) => {
  if (params) {
    // Use the object form that works with the type system
    navigation.navigate({
      name: screenName,
      params: params
    } as any);
  } else {
    // Call navigate with just the screen name
    navigation.navigate({
      name: screenName
    } as any);
  }
};

// Convert an array type to proper navigation params
export const navigateWithArray = (
  navigation: NativeStackNavigationProp<RootStackParamList>,
  screenName: keyof RootStackParamList,
  params?: object
) => {
  // Use the object form that works with the type system
  navigation.navigate({
    name: screenName,
    params: params
  } as any);
};
