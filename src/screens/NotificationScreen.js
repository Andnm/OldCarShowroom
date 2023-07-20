import React, { useContext } from "react";
import { View, SafeAreaView, StyleSheet, Text } from "react-native";
import { AuthContext } from "../context/authContext";
import COLORS from "../constants/colors";
import WarningToLogin from "../components/WarningToLogin";
import { getProfileUserInStorage } from "../hooks/user";

const Notification = ({ navigation }) => {
  const { accessToken, userDecode } = useContext(AuthContext);
  const [profile, setProfile] = React.useState([]);

  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 20, backgroundColor: COLORS.white }}
    >
      <View style={style.notification_container}>
        {!userDecode ? (
          <WarningToLogin />
        ) : (
          <View style={style.header}>
            <Text>Notification</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  notification_container: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Notification;
