import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveTokenToStorage = async (token) => {
  try {
    await AsyncStorage.setItem("accessToken", token);
  } catch (error) {
    console.log("Error saving token:", error);
  }
};

export const checkTokenInStorage = async () => {
  try {
    const token = await AsyncStorage.getItem("accessToken");
    return token;
  } catch (error) {
    console.log("Error retrieving token:", error);
    return false;
  }
};

export const clearAccessTokenInStorage = async () => {
  try {
    await AsyncStorage.removeItem("accessToken");
  } catch (error) {
    console.log("Error clearing AccessToken:", error);
  }
};

export const saveProfileUserToStorage = async (info) => {
  try {
    const jsonValue = JSON.stringify(info);
    await AsyncStorage.setItem("userInfo", jsonValue);
  } catch (error) {
    console.log("Error saving user info:", error);
  }
};

export const getProfileUserInStorage = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("userInfo");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log("Error retrieving user info:", error);
    return null;
  }
};

export const clearProfileUserInStorage = async () => {
  try {
    await AsyncStorage.removeItem("userInfo");
  } catch (error) {
    console.log("Error clearing UserInfo:", error);
  }
};
