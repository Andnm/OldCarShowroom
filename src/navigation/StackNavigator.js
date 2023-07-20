import React, { useCallback } from "react";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import BottomNavigator from "../navigation/BottomNavigator";
import IntroScreen from "../screens/IntroScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import SpinnerLoading from "../screens/SpinnerLoading";
import FavoriteCar from "../screens/Profile/FavoriteCar";
import InfoAccount from "../screens/Profile/InfoAccount";
import MyCar from "../screens/Profile/MyCar";
import Gift from "../screens/Profile/Gift";
import Detail from "../screens/DetailScreen";
import RegisterCar from "../screens/Car/RegisterCar";
import CreateBooking from "../screens/Booking/CreateBooking";
import BookingDetail from "../screens/BookingDatailScreen";
import AdminBottomNavigator from "./AdminBottomNavigator";
import { useFocusEffect } from "@react-navigation/native";
import { getProfileUserInStorage } from "../hooks/user";
import CarDetails from "../screens/Admin/CarDetails";

const StackNavigator = () => {
  const [profile, setProfile] = React.useState("");

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  const getData = async () => {
    const userProfile = await getProfileUserInStorage();
    setProfile(userProfile);
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="Intro" component={IntroScreen} /> */}
      {profile.role === "User" && (
        <>
          <Stack.Screen name="HomeScreen" component={BottomNavigator} />
          <Stack.Screen name="Loading" component={SpinnerLoading} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
          <Stack.Screen name="FavoriteCar" component={FavoriteCar} />
          <Stack.Screen name="InfoAccount" component={InfoAccount} />
          <Stack.Screen name="MyCar" component={MyCar} />
          <Stack.Screen name="Gift" component={Gift} />
          <Stack.Screen name="Detail" component={Detail} />
          <Stack.Screen name="RegisterCar" component={RegisterCar} />
          <Stack.Screen name="CreateBooking" component={CreateBooking} />
          <Stack.Screen name="BookingDetail" component={BookingDetail} />
        </>
      )}

      {/* admin */}
      <Stack.Screen name="ManagerCar" component={AdminBottomNavigator} />
      <Stack.Screen name="CarDetails" component={CarDetails} />

    </Stack.Navigator>
  );
};

export default StackNavigator;
