import React, { useContext } from "react";
import { View, SafeAreaView, StyleSheet, Text } from "react-native";
import { AuthContext } from "../context/authContext";
import COLORS from "../constants/colors";
import WarningToLogin from "../components/WarningToLogin";
import { getProfileUserInStorage } from "../hooks/user";

const Booking = ({ navigation }) => {
  const { accessToken } = useContext(AuthContext);

  const [profile, setProfile] = React.useState([]);

  React.useEffect(() => {
    const focus = navigation.addListener("focus", async () => {
      const fetchData = async () => {
        const profile = await getProfileUserInStorage();
        setProfile(profile);
      };

      fetchData();
    });
    return focus;
  }, [navigation]);

  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 20, backgroundColor: COLORS.white }}
    >
      <View style={style.booking_container}>
        {!profile ? (
          <WarningToLogin />
        ) : (
          <View style={style.header}>
            <Text>Booking</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  booking_container: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Booking;
