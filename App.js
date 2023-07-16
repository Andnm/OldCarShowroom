import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import AuthContextProvider from "./src/context/authContext";

import COLORS from "./src/constants/colors";
import StackNavigator from "./src/navigation/StackNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
        <StackNavigator />
      </AuthContextProvider>
    </NavigationContainer>
  );
}
