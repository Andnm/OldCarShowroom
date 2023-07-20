import React, { createContext, useState, useEffect } from "react";
import {
  checkTokenInStorage,
  saveTokenToStorage,
  clearAccessTokenInStorage,
  clearProfileUserInStorage,
  saveProfileUserToStorage,
  getProfileUserInStorage,
} from "../hooks/user";
import { signIn } from "../api/auth";
import { getUserByEmail } from "../api/user";
import { useNavigation } from "@react-navigation/native";

export const AuthContext = createContext([{}]);

export default function AuthContextProvider({ children }) {
  const [accessToken, setAccessToken] = useState("");
  const [userDecode, setUserDecode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  React.useEffect(() => {
    const fetchData = async () => {
      const currentToken = await checkTokenInStorage();
      setAccessToken(currentToken);
      const profile = await getProfileUserInStorage();
      setUserDecode(profile);
    };

    fetchData();
  });

  const loginFunction = async (inputs) => {
    try {
      setIsLoading(true);
      const resSignIn = await signIn(inputs);

      if (resSignIn.status === 201) {
        const token = resSignIn.data.accessToken;
        setAccessToken(token);
        const reqUser = await getUserByEmail(token, inputs.email);

        if (reqUser.status === 201 || reqUser.status === 200) {
          setUserDecode(reqUser.data);
          saveProfileUserToStorage(reqUser.data);
          saveTokenToStorage(resSignIn.data.accessToken);
          setIsLoading(false);

          if (reqUser.data.role === "Admin") {
            navigation.navigate("ManagerCar")
          } else {
            navigation.navigate("Home");
          }
          return reqUser.status;
        }
      }
      setIsLoading(false);
      return resSignIn.status;
    } catch (error) {
      return error;
    }
  };

  const logoutFunction = async () => {
    setAccessToken("");
    setUserDecode("");
    clearProfileUserInStorage();
    clearAccessTokenInStorage();
    const currentToken = await checkTokenInStorage();
    console.log("currentToken logout", currentToken);
    navigation.navigate('HomeScreen')
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        userDecode,
        loginFunction,
        logoutFunction,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
