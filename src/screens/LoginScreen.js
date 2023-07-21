import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../constants/colors";
import loginCar from "../assets/loginImage/loginCar.png";
import google from "../assets/loginImage/google.png";
import facebook from "../assets/loginImage/facebook.png";
import twitter from "../assets/loginImage/twitter.png";
import { AuthContext } from "../context/authContext";
import CustomToast from "../components/CustomToast";

import SpinnerLoading from "./SpinnerLoading";

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height;

const Login = () => {
  const { loginFunction, isLoading } = useContext(AuthContext);
  const showToast = CustomToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();
  const handleLogin = async () => {
    const inputUser = {
      email: email.toLowerCase().trim(),
      password: password,
    };
    const response = await loginFunction(inputUser);
    if(!response) {
      showToast("Error", "Email or password wrong", "error");
    }
  };

  return (
    <View style={loginStyle.container}>
      <Text style={loginStyle.title}>Showroom</Text>

      <Image style={loginStyle.carIcon} source={loginCar} resizeMode="cover" />

      <View style={loginStyle.form}>
        <Text style={loginStyle.welcome}>Welcome back</Text>
        <View style={loginStyle.inputView}>
          <Text style={loginStyle.label}>Email</Text>
          <TextInput
            style={loginStyle.input}
            value={email}
            onChangeText={setEmail}
          ></TextInput>
        </View>

        <View style={loginStyle.inputView}>
          <Text style={loginStyle.label}>Password</Text>
          <TextInput
            style={loginStyle.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          ></TextInput>
          {password && (
            <TouchableOpacity
              style={loginStyle.toggleButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Icon
                size={24}
                name={!showPassword ? "visibility" : "visibility-off"}
                color={COLORS.lightGray}
              />
            </TouchableOpacity>
          )}

        </View>
        <TouchableOpacity style={loginStyle.button} onPress={handleLogin}>
          <Text style={loginStyle.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

      <Text style={loginStyle.socialText}>With socials:</Text>
      <View style={loginStyle.socialPack}>
        <TouchableOpacity style={loginStyle.socialIcon}>
          <Image style={loginStyle.icon} source={google} />
        </TouchableOpacity>
        <TouchableOpacity style={loginStyle.socialIcon}>
          <Image style={loginStyle.icon} source={facebook} />
        </TouchableOpacity>
        <TouchableOpacity style={loginStyle.socialIcon}>
          <Image style={loginStyle.icon} source={twitter} />
        </TouchableOpacity>
      </View>

      <Text style={loginStyle.noAcount}>
        Don’t have an account?
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignupScreen");
          }}
        >
          <Text style={loginStyle.signup}> Sign up</Text>
        </TouchableOpacity>
      </Text>

      {isLoading && <SpinnerLoading />}
    </View>
  );
};

const loginStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8FF",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: COLORS.green,
    fontSize: 50,
    fontWeight: 500,
  },
  carIcon: {
    width: WIDTH * 0.5,
    marginVertical: HEIGHT * 0.02
  },
  form: {
    width: WIDTH,
    height: HEIGHT * 0.3,
  },
  welcome: {
    fontSize: 25,
    fontWeight: 500,
    marginLeft: WIDTH * 0.1
  },
  label: {
    alignSelf: 'flex-start',
    color: "rgba(0,0,0,0.5)",
    textAlign: "center",
    transform: [{ translateY: HEIGHT * 0.01 }, { translateX: WIDTH * 0.15 }],
    backgroundColor: "#F8F8FF",
    zIndex: 999
  },
  inputView: {
    position: "relative",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  input: {
    borderWidth: 1,
    width: WIDTH * 0.8,
    height: HEIGHT * 0.05,
    paddingHorizontal: WIDTH * 0.05,
    marginHorizontal: WIDTH * 0.1,
    borderRadius: 5,
    borderColor: "rgba(0,0,0,0.5)"
  },
  toggleButton: {
    position: "absolute",
    top: HEIGHT * 0.035,
    right: WIDTH * 0.13
  },
  button: {
    width: WIDTH * 0.8,
    height: HEIGHT * 0.05,
    borderRadius: 5,
    marginHorizontal: WIDTH * 0.1,
    marginVertical: HEIGHT * 0.02,
    backgroundColor: COLORS.green,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: 500,
  },
  socialText: {
    color: COLORS.green,
    fontSize: 15,
  },
  socialPack: {
    width: WIDTH * 0.8,
    marginHorizontal: WIDTH * 0.1,
    justifyContent: "center",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  socialIcon: {
    width: 55,
    height: 55,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 5,
    marginVertical: HEIGHT * 0.03,
    marginHorizontal: 20,
    backgroundColor: "#F8F8FF"
  },
  noAcount: {
    color: COLORS.lightGreen,
    fontSize: 18,
  },
  signup: {
    color: "black",
    fontSize: 18,
    fontWeight: 500,
    transform: [{translateY: WIDTH * 0.013}]
  }
});

export default Login;
