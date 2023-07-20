import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AuthContext } from "../../context/authContext";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Setting = ({ navigation }) => {
  const { logoutFunction } = React.useContext(AuthContext);

  const handleLogoutFunction = () => {
    logoutFunction();
  };

  return (
    <View style={styles.profileContainer}>
      <TouchableOpacity onPress={handleLogoutFunction}>
        <Icon name="exit-to-app" color={"darkgray"} size={25} />
        <Text>LOG OUT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoutButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  logoutButtonText: {
    marginLeft: 20,
    fontWeight: "500",
    fontSize: 18,
  },
});

export default Setting;
