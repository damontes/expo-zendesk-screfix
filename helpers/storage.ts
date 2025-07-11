import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveValue = async (key: string, value: any) => {
  console.log('saving value', key, value);
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const getValue = async (key: string) => {
  const jsonValue = await AsyncStorage.getItem(key);
  return jsonValue != null ? JSON.parse(jsonValue) : null;
};

export const removeValue = async (key: string) => {
  await AsyncStorage.removeItem(key);
};
