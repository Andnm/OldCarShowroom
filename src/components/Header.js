import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import COLORS from "../constants/colors";

const Header = ({ navigation, title }) => {
  const handleCloseIconHeader = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.header}>
      <Icon
        name="close"
        color={COLORS.white}
        size={28}
        onPress={handleCloseIconHeader}
      />
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={{ width: 28 }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 30,
    backgroundColor: COLORS.black,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 23,
    fontWeight: "bold",
    color: COLORS.white,
  },
});

export default Header;
