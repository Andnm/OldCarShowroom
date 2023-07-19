import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import COLORS from "../../constants/colors";
import { AuthContext } from "../../context/authContext";

const UserInformation = (props) => {
  const { fullname, setFullname, phone, setPhone } = props;
  const { accessToken, userDecode } = useContext(AuthContext);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>
        <Text style={styles.sectionTitleBorder}>
          Appointment Requester Information
        </Text>
      </Text>

      <View style={styles.infoUserContainer}>
        <Icon
          name="pencil-minus-outline"
          size={23}
          color={COLORS.black}
          style={styles.infoIcon}
        />
        <Text style={styles.requiredField}>*</Text>
        <TextInput
          style={styles.infoInput}
          placeholder="Enter your fullname"
          placeholderTextColor={COLORS.gray}
          value={fullname}
          onChangeText={setFullname}
        />
      </View>

      <View style={styles.infoUserContainer}>
        <Icon
          name="phone"
          size={23}
          color={COLORS.black}
          style={styles.infoIcon}
        />
        <Text style={styles.requiredField}>*</Text>
        <TextInput
          style={styles.infoInput}
          placeholder="Enter your phone number"
          placeholderTextColor={COLORS.gray}
          value={phone}
          onChangeText={setPhone}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 20,
    marginTop: 20,
    borderBottomWidth: 7,
    borderBottomColor: "#e5e5e5",
    paddingBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: COLORS.black,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.orange,
    paddingLeft: 10,
  },
  sectionTitleBorder: {
    marginLeft: -10,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  infoIcon: {
    // marginRight: 5,
  },
  infoUserContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  pickupDateDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  infoInput: {
    flex: 1,
    color: COLORS.black,
    paddingTop: 10,
  },
  requiredField: {
    color: COLORS.red,
    fontSize: 15,
    marginRight: 12,
  },
});

export default UserInformation;
