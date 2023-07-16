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

  const navigation = useNavigation()

  React.useEffect(() => {
    const fetchData = async () => {
      const currentToken = await checkTokenInStorage();
      setAccessToken(currentToken);
      const profile = await getProfileUserInStorage();
      setUserDecode(profile);
    };

    fetchData();
  }, [accessToken, userDecode]);

  const loginFunction = async (inputs) => {
    try {
      setIsLoading(true)
      const resSignIn = await signIn(inputs);

      if (resSignIn.status === 201) {
        const token = resSignIn.data.accessToken;
        setAccessToken(token);
        const reqUser = await getUserByEmail(token, inputs.email);

        if (reqUser.status === 201 || reqUser.status === 200) {
          setUserDecode(reqUser.data);
          saveProfileUserToStorage(reqUser.data);
          saveTokenToStorage(resSignIn.data.accessToken);
          setIsLoading(false)
          navigation.navigate("Home")
        }

      }
    } catch (error) {
      console.log(error);
    }
  };

  const logoutFunction = () => {
    setAccessToken("");
    setUserDecode("");
    clearProfileUserInStorage();
    clearAccessTokenInStorage();
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
