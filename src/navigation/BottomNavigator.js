import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

import COLORS from "../constants/colors";

import HomeScreen from "../screens/HomeScreen";
import NotificationScreen from "../screens/NotificationScreen";
import BookingScreen from "../screens/BookingScreen";
import ProfileScreen from "../screens/ProfileScreen";

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 55,
          borderTopWidth: 0,
          elevation: 0,
          backgroundColor: "#edf6f9",
        },
        tabBarShowLabel: true,
        tabBarActiveTintColor: COLORS.green,
        tabBarIcon: ({ color }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = "home-filled";
              break;
            case "Notification":
              iconName = "notifications";
              break;
            case "Booking":
              iconName = "luggage";
              break;
            case "Profile":
              iconName = "person";
              break;
            default:
              iconName = "default-icon";
              break;
          }

          return <Icon name={iconName} color={color} size={28} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Notification" component={NotificationScreen} />
      <Tab.Screen name="Booking" component={BookingScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
