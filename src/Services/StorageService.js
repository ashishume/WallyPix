import AsyncStorage from '@react-native-async-storage/async-storage';
import {ToastAndroid} from 'react-native';

export const storeData = async (key, value) => {
  //value is object here
  try {
    let temp = [];
    const data = await AsyncStorage.getItem(key);
    if (data === null) {
      temp.push(value);
      await AsyncStorage.setItem(key, JSON.stringify(temp));
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(value);
      await AsyncStorage.setItem(key, JSON.stringify(parsedData));
    }
  } catch (e) {
    ToastAndroid.show('Something went wrong', ToastAndroid.LONG);
  }
};

export const getData = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return JSON.parse(data);
  } catch (e) {
    ToastAndroid.show('Something went wrong', ToastAndroid.LONG);
  }
};
export const deleteData = async (obj, key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data) {
      const fetchedData = JSON.parse(data);
      const filteredData = fetchedData.filter(
        (value) => value.id !== obj.imageId,
      );
      await AsyncStorage.setItem(key, JSON.stringify(filteredData));
    }
  } catch (e) {
    ToastAndroid.show('Something went wrong', ToastAndroid.LONG);
  }
};
