import React, { useContext } from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import COLORS from "../constants/colors";

const WarningToLogin = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate("Profile");
  };
  return (
    <View>
      <View style={style.header}></View>

      <View style={style.text_container}>
        <Text style={style.text}>You need to login to use this feature</Text>
      </View>

      <View>
        <Image
          source={{
            uri: "https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg?size=626&ext=jpg&ga=GA1.2.682524529.1675925339&semt=ais",
          }}
          style={{width: 300, height: 500}}
        ></Image>
      </View>

      <View style={style.button_container}>
        <TouchableOpacity style={style.loginButton} onPress={handleLogin}>
          <Text style={style.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  header: {
    marginTop: 30,
  },
  text_container: {
    marginTop: 20,
  },
  text: {
    textAlign: "center",
  },
  button_container: {
    justifyContent: "center",
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: COLORS.green,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  loginButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 16,
  },
});
export default WarningToLogin;
