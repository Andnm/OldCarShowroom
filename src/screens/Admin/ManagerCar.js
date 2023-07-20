import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../../constants/colors";
import { AuthContext } from "../../context/authContext";
import { useFocusEffect } from "@react-navigation/native";
import { getCarListByAdmin } from "../../api/car";
import { checkTokenInStorage } from "../../hooks/user";
import CardItem from "../../components/Admin/CarItem";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const ManagerCar = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const { userDecode } = React.useContext(AuthContext);
  const [myCar, setMyCar] = useState([]);
  const [filterStatus, setFilterStatus] = useState(null);
  const [defaultFilterStatus, setDefaultFilterStatus] = useState("All");

  useFocusEffect(
    React.useCallback(() => {
      getTime();
      getData();
    }, [])
  );

  const getData = async () => {
    const accessToken = await checkTokenInStorage();
    const response = await getCarListByAdmin(accessToken);
    response.status === 200 ? setMyCar(response.data) : "";
  };

  const getTime = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 11) {
      setTitle("Good morning");
    } else if (currentHour >= 11 && currentHour < 13) {
      setTitle("Good afternoon");
    } else if (currentHour >= 13 && currentHour < 18) {
      setTitle("Good afternoon");
    } else if (currentHour >= 18 || currentHour < 5) {
      setTitle("Good evening");
    } else {
      setTitle("Good morning");
    }
  };

  const filterCarByStatus = (status) => {
    if (status === filterStatus || status === defaultFilterStatus) {
      setFilterStatus(null);
    } else {
      setFilterStatus(status);
    }
  };

  const sortCarsByStatus = (cars) => {
    if (filterStatus === defaultFilterStatus) {
      return cars;
    } else {
      const statusOrder = ["Pending", "Confirm", "Sold", "Cancelled"];
      return cars.sort(
        (a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
      );
    }
  };
  
  const filteredCars = filterStatus
    ? myCar.filter((item) => item.status === filterStatus)
    : myCar;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <LinearGradient
        colors={["#19779B", "#17B3A6"]}
        start={{
          x: 0.5,
          y: 0,
        }}
        end={{
          x: 1,
          y: 1,
        }}
        style={styles.header}
      >
        <View style={styles.userDetail}>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Text style={styles.userName}>
              {title} {userDecode.fullName} {"!"}
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterItem,
            (filterStatus === defaultFilterStatus || filterStatus === null) &&
              styles.activeFilter,
          ]}
          onPress={() => filterCarByStatus(defaultFilterStatus)}
        >
          <Text
            style={[
              styles.filterText,
              (filterStatus === defaultFilterStatus || filterStatus === null) &&
                styles.activeFilterText,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterItem,
            filterStatus === "Pending" && styles.activeFilter,
          ]}
          onPress={() => filterCarByStatus("Pending")}
        >
          <Text
            style={[
              styles.filterText,
              filterStatus === "Pending" && styles.activeFilterText,
            ]}
          >
            Pending
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterItem,
            filterStatus === "Confirm" && styles.activeFilter,
          ]}
          onPress={() => filterCarByStatus("Confirm")}
        >
          <Text
            style={[
              styles.filterText,
              filterStatus === "Confirm" && styles.activeFilterText,
            ]}
          >
            Confirm
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterItem,
            filterStatus === "Sold" && styles.activeFilter,
          ]}
          onPress={() => filterCarByStatus("Sold")}
        >
          <Text
            style={[
              styles.filterText,
              filterStatus === "Sold" && styles.activeFilterText,
            ]}
          >
            Sold
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterItem,
            filterStatus === "Cancelled" && styles.activeFilter,
          ]}
          onPress={() => filterCarByStatus("Cancelled")}
        >
          <Text
            style={[
              styles.filterText,
              filterStatus === "Cancelled" && styles.activeFilterText,
            ]}
          >
            Cancelled
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.home_container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.carList}>
          {sortCarsByStatus(filteredCars).map((item, key) => {
            return <CardItem navigation={navigation} car={item} key={key} />;
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  home_container: {
    flex: 1,
  },
  header: {
    width: WIDTH,
    height: HEIGHT * 0.2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  userName: {
    color: "white",
    fontWeight: "700",
    fontSize: 25,
    marginHorizontal: 15,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: COLORS.green,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  filterItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  activeFilter: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    fontWeight: "bold",
  },
  activeFilterText: {
    color: COLORS.white,
  },
  carList: {
    width: WIDTH * 0.9,
    marginHorizontal: WIDTH * 0.05,
    marginTop: 30,
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default ManagerCar;
