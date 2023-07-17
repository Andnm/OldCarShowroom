import React, { useState, useContext } from "react";
import {
  View,
  SafeAreaView,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import COLORS from "../../constants/colors";
import { AuthContext } from "../../context/authContext";

const Gift = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <View style={style.header}>
        <Icon
          name="arrow-left"
          color={"white"}
          size={28}
          onPress={() => navigation.goBack()}
        />
        <Text style={style.headerTitle}>Gift</Text>
        <Icon
          name="dots-horizontal"
          color={"white"}
          size={30}
          onPress={() => setBottomSheetVisible(true)}
        />
      </View>

      <View style={style.textContainer}>
        <Text style={style.titleText}>Gift for you!</Text>
      </View>

      <View style={style.body}>
        <Image
          source={require("../../assets/favorite-car.png")}
          style={style.image}
          resizeMode="cover"
        />
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "black",
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 23,
    fontWeight: "400",
    color: "white",
  },
  textContainer: {
    marginTop: 60,
    alignItems: "center",
  },
  titleText: {
    fontSize: 18,
    color: COLORS.gray,
    textAlign: "center",
    fontWeight: "bold",
  },
  infoText: {
    fontSize: 15,
    color: COLORS.gray,
    textAlign: "center",
  },
  image: {
    height: 300,
    width: 400,

  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  registerButton: {
    flex: 1,
    justifyContent: "center",
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "black",
    borderRadius: 8,
  },
  registerButtonText: {
    color: COLORS.white,
    fontSize: 16,
    textTransform: "uppercase",
    textAlign: "center",
  },
});

export default Gift;
