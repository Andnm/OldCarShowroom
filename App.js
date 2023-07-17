import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { ToastProvider } from 'react-native-toast-notifications'
import AuthContextProvider from "./src/context/authContext";

import COLORS from "./src/constants/colors";
import StackNavigator from "./src/navigation/StackNavigator";

export default function App() {
  return (
    <ToastProvider
      offset={50}
      renderType={{
        custom_type: (toast) => (
          <View style={{ padding: 15, backgroundColor: 'grey' }}>
            <Text>{toast.message}</Text>
          </View>
        )
      }}
    >
      <NavigationContainer>
        <AuthContextProvider>
          <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
          <StackNavigator />
        </AuthContextProvider>
      </NavigationContainer>
    </ToastProvider>
  );
}
