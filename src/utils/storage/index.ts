import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Stocke une valeur dans AsyncStorage
 */
export const storeData = async (key: string, value: any): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error('Error storing data:', error);
  }
};

/**
 * Récupère une valeur depuis AsyncStorage
 */
export const getData = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error retrieving data:', error);
    return null;
  }
};

/**
 * Supprime une valeur de AsyncStorage
 */
export const removeData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing data:', error);
  }
};

/**
 * Efface toutes les données de AsyncStorage
 */
export const clearAll = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};

/**
 * Récupère toutes les clés stockées dans AsyncStorage
 */
export const getAllKeys = async (): Promise<readonly string[]> => {
  try {
    return await AsyncStorage.getAllKeys();
  } catch (error) {
    console.error('Error getting all keys:', error);
    return [];
  }
};

/**
 * Récupère plusieurs valeurs depuis AsyncStorage
 */
export const multiGet = async <T>(keys: readonly string[]): Promise<[string, T | null][]> => {
  try {
    const pairs = await AsyncStorage.multiGet(keys);
    return pairs.map(([key, value]) => [key, value ? JSON.parse(value) : null]);
  } catch (error) {
    console.error('Error retrieving multiple data:', error);
    return [];
  }
};

/**
 * Stocke plusieurs valeurs dans AsyncStorage
 */
export const multiSet = async (pairs: readonly [string, any][]): Promise<void> => {
  try {
    const jsonPairs = pairs.map(([key, value]) => [key, JSON.stringify(value)] as [string, string]);
    await AsyncStorage.multiSet(jsonPairs);
  } catch (error) {
    console.error('Error storing multiple data:', error);
  }
};

/**
 * Supprime plusieurs valeurs de AsyncStorage
 */
export const multiRemove = async (keys: readonly string[]): Promise<void> => {
  try {
    await AsyncStorage.multiRemove(keys);
  } catch (error) {
    console.error('Error removing multiple data:', error);
  }
}; 