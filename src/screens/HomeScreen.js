import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { View, SafeAreaView, StyleSheet, Text } from "react-native";
import COLORS from "../constants/colors";

const Home = () => {
  const { accessToken, userDecode } = useContext(AuthContext);
  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 20, backgroundColor: COLORS.white }}
    >
      <View style={style.home_container}>
        {!userDecode ? (
          <View style={style.header}>
             <Text>Chưa login</Text>
          </View>
        ) : (
          <View style={style.header}>
            <Text>{userDecode.fullName}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  home_container: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Home;
