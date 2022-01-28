import * as asyncStorage from "./asyncStorage.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

describe("async storage methods are called from every custom method", () => {
  it("checks if setItem is called", async () => {
    await asyncStorage.setItem("key", "item");
    expect(AsyncStorage.setItem).toBeCalledWith("key", "item");
  });
  it("checks if getItem is called", async () => {
    await asyncStorage.getItem("key");
    expect(AsyncStorage.getItem).toBeCalledWith("key");
  });
  it("checks if removeItem is called", async () => {
    await asyncStorage.removeItem("key");
    expect(AsyncStorage.removeItem).toBeCalledWith("key");
  });
  it("checks if clear is called", async () => {
    await asyncStorage.clearAllData();
    expect(AsyncStorage.clear).toBeCalled();
  });
  it("checks if updateItem method calls getItem and setItem methods", async () => {
    await asyncStorage.updateItem("key", "item");
    expect(AsyncStorage.getItem).toBeCalledWith("key");
    expect(AsyncStorage.setItem).toBeCalledWith("key", "item");
  });
  it("checks if getAllItems method calls getAllKeys and multiGet methods", async () => {
    await asyncStorage.getAllItems();
    expect(AsyncStorage.getAllKeys).toBeCalled();
    expect(AsyncStorage.multiGet).toBeCalled();
  });
});
