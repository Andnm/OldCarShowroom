import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AuthContext } from "../../context/authContext";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ModalBox from "../../components/ModalBox";
import COLORS from "../../constants/colors";

const Setting = ({ navigation }) => {
  const { logoutFunction } = React.useContext(AuthContext);
  const [isOpenModalConfirm, setIsOpenModalConfirm] = React.useState(false);

  const handleLogoutFunction = () => {
    setIsOpenModalConfirm(false)
    logoutFunction();
    navigation.navigate("Home")
  };

  return (
    <View style={styles.profileContainer}>
      <TouchableOpacity
        onPress={() => setIsOpenModalConfirm(true)}
        style={styles.logoutButton}
      >
        <Icon name="exit-to-app" color={"white"} size={25} />
        <Text style={styles.logoutButtonText}>LOG OUT</Text>
      </TouchableOpacity>

      {isOpenModalConfirm && (
            <ModalBox
              open={isOpenModalConfirm}
              bodyText={"Are you sure want to logout?"}
              actionClose={() => setIsOpenModalConfirm(false)}
              actionYes={handleLogoutFunction}
              nameNo={"Cancel"}
              nameYes={"Confirm"}
            />
          )}
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white, // Add background color
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: COLORS.green,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 15
  },
  logoutButtonText: {
    marginLeft: 10,
    fontWeight: "500",
    fontSize: 18,
    color: COLORS.white, // Add text color
  },
});

export default Setting;
