import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
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

import SpinnerLoading from "./SpinnerLoading";

const Login = () => {
  const { loginFunction, isLoading } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();
  const handleLogin = async () => {
    const inputUser = {
      email: email,
      password: password,
    };
    loginFunction(inputUser);
  };

  return (
    <View style={loginStyle.container}>
      <Text style={loginStyle.title}>Showroom</Text>

      <Image style={loginStyle.carIcon} source={loginCar} />

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
                name={!showPassword ? "visibility" : "visibility_off"}
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

      {isLoading && <SpinnerLoading/>}
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
    color: "#17B3A6",
    fontWeight: "700",
    fontSize: 40,
    fontStyle: "italic",
    // fontFamily: "Nunito",
  },
  carIcon: {
    width: "45%",
    height: "15%",
    marginBottom: 25,
  },
  form: {
    width: "80%",
    height: "38%",
  },
  welcome: {
    color: "#3A3A3A",
    fontSize: 20,
    fontWeight: "500",
  },
  inputView: {
    position: "relative",
    width: "100%",
    height: 50,
    borderRadius: 15,
    backgroundColor: "#F8F8FF",
    shadowOpacity: 0.1,
    boxShadow: "0 0 3.5px #7C7C8A",
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "90%",
    height: "90%",
    // outlineWidth: 0
  },
  label: {
    position: "absolute",
    color: "#7C7C8A",
    padding: 5,
    fontWeight: "500",
    backgroundColor: "#F8F8FF",
    top: "-30%",
    left: 20,
  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: 15,
    marginTop: 40,
    backgroundColor: "#17B3A6",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
  },
  socialText: {
    color: "#7C7C8A",
    padding: 5,
    marginBottom: 15,
    fontWeight: "500",
    backgroundColor: "#F8F8FF",
  },
  socialPack: {
    width: "70%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  socialIcon: {
    width: "21.5%",
    height: "100%",
    borderRadius: 15,
    backgroundColor: "#F8F8FF",
    shadowOpacity: 0.1,
    boxShadow: "0 0 3.5px #7C7C8A",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: "60%",
    height: "60%",
  },
  noAcount: {
    color: "#17B3A6",
    fontWeight: "500",
    marginTop: 50,
  },
  signup: {
    color: "#7C7C8A",
    fontWeight: "500",
  },
  toggleButton: {
    position: "absolute",
    top: "25%",
    right: 10,
    zIndex: 1,
  },
});

export default Login;
