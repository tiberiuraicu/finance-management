import AsyncStorage from "@react-native-async-storage/async-storage";

// @info : stores a value/object to memory
export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

// @info : gets a value/object from memory using the 'key'
export const getItem = async (key) => {
  try {
    return JSON.parse(await AsyncStorage.getItem(key));
  } catch (error) {
    console.log(error);
  }
};
// @info : removes a value/object from memory
export const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};

// @info : stores a value/object to memory
export const updateItem = async (key, value) => {
  try {
    const item = await AsyncStorage.getItem(key);
    const result = { ...JSON.parse(item), ...value };
    await AsyncStorage.setItem(key, result);
  } catch (error) {
    console.log(error);
  }
};

// @info : clears the memory of every item stored there
export const clearAllData = async () => {
  await AsyncStorage.clear();
};

// @info : gets all the values/objects stored in memory
export const getAllItems = async () => {
  var items = [];
  try {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);
    result.map((req) => items.push(req[1]));
    return items;
  } catch (error) {
    console.error(error);
  }
};
