import React, { useContext, useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../context/authContext";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import COLORS from "../constants/colors";
import Login from "./LoginScreen";
import MAIN_PROFILE_LIST from "../constants/mainProfileList";
import ModalBox from "../components/ModalBox";
import SpinnerLoading from "./SpinnerLoading";

const ProfileScreen = ({ navigation }) => {
  const { accessToken, userDecode, logoutFunction, isLoading} = useContext(AuthContext);
  const [isOpenModalConfirm, setIsOpenModalConfirm] = React.useState(false);

  const handleLogoutFunction = () => {

    setIsOpenModalConfirm(false)
    logoutFunction();

    navigation.navigate('Home')
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      {userDecode ? (
        <View style={styles.profileContainer}>
          <LinearGradient
            colors={["#fff", "#17B3A6"]}
            start={{
              x: 0,
              y: 1,
            }}
            end={{
              x: 0,
              y: 0,
            }}
            style={styles.headerProfile}
          >
            <Image
              source={{
                uri: userDecode.imgUrl
                  ? userDecode.imgUrl
                  : "https://i.pinimg.com/originals/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg",
              }}
              style={styles.profileImage}
            />
            <Text style={styles.fullNameText}>{userDecode.fullName}</Text>
          </LinearGradient>
          <View style={styles.mainProfile}>
            {MAIN_PROFILE_LIST.map((profile, index) => (
              <TouchableOpacity
                key={index}
                style={styles.profileItem}
                onPress={() => navigation.navigate(profile.link)}
              >
                <View style={styles.profileItemContent}>
                  <Icon name={profile.icon} color={"darkgray"} size={25} />
                  <View style={styles.profileItemTextContainer}>
                    <Text style={styles.profileItemTitle}>{profile.title}</Text>
                    <Text style={styles.profileItemSubtitle}>
                      {profile.subTitle}
                    </Text>
                  </View>
                </View>
                <Text style={styles.profileItemArrow}>{">"}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => {setIsOpenModalConfirm(true)}}
          >
            <Icon name="exit-to-app" color={"darkgray"} size={25} />
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
      ) : (
        <Login />
      )}

      {isLoading && <SpinnerLoading/>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
  },
  headerProfile: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 4,
    borderColor: "#e5e5e5",
    paddingHorizontal: 10,
    paddingTop: 50,
    backgroundImage: "linear-gradient(to top, #fff 10%, #17B3A6)",
    paddingBottom: 30,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: COLORS.white,
    marginRight: 10,
  },
  fullNameText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  mainProfile: {
    width: "100%",
  },
  profileItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: COLORS.lightGray,
    paddingVertical: 14,
  },
  profileItemContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  profileItemIcon: {
    fontSize: 24,
    marginRight: 10,
    color: "darkgray",
  },
  profileItemTextContainer: {
    marginLeft: 20,
    flexDirection: "column",
  },
  profileItemTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  profileItemSubtitle: {
    fontSize: 14,
    color: COLORS.lightGray,
  },
  profileItemArrow: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
    color: "darkgray",
  },
  logoutButton: {
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderColor: "#e5e5e5",
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  logoutButtonText: {
    marginLeft: 20,
    fontWeight: "500",
    fontSize: 18,
  },
});

export default ProfileScreen;
