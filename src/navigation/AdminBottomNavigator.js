import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

import COLORS from "../constants/colors";

import ManagerCar from "../screens/Admin/ManagerCar";
import ManagerBooking from "../screens/Admin/ManagerBooking";
import Setting from "../screens/Admin/Setting";

const AdminBottomNavigator = () => {
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
            case "Manager Car":
              iconName = "car";
              break;
            case "Manager Booking":
              iconName = "transition";
              break;
            case "Setting":
              iconName = "content-save-cog";
              break;
          }

          return <Icon name={iconName} color={color} size={28} />;
        },
      })}
    >
      <Tab.Screen name="Manager Car" component={ManagerCar} />
      <Tab.Screen name="Manager Booking" component={ManagerBooking} />
      <Tab.Screen name="Setting" component={Setting} />
    </Tab.Navigator>
  );
};

export default AdminBottomNavigator;
