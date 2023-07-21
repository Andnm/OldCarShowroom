import React from "react";
import {
  View,
  SafeAreaView,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
  FlatList,
} from "react-native";
import COLORS from "../../constants/colors";
import { slotList } from "../../constants/slot";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getBooking } from "../../api/booking";
import BookingDetailAdmin from "./BookingDetailAdmin";
import { useFocusEffect } from "@react-navigation/native";
import { checkTokenInStorage } from "../../hooks/user";
import SpinnerLoading from "../../screens/SpinnerLoading";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const ManagerBooking = ({ navigation }) => {
  const [listBooking, setListBooking] = React.useState([]);
  const [selectedStatus, setSelectedStatus] = React.useState("All");
  const [filteredBooking, setFilteredBooking] = React.useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [])
  );

  const getData = async () => {
    const accessToken = await checkTokenInStorage();
    const response = await getBooking(accessToken);
    const currentDate = new Date().toISOString().split("T")[0];

    let filteredList = [];
    const todayBookings = response.data.filter(
      (item) => item.date === currentDate
    );
    const otherBookings = response.data.filter(
      (item) => item.date !== currentDate
    );

    filteredList = [...todayBookings, ...otherBookings];

    setFilteredBooking(filteredList);
  };

  const filterBooking = (status) => {
    const currentDate = new Date().toISOString().split("T")[0];

    if (status === "All") {
      const todayBookings = listBooking.filter(
        (item) => item.date === currentDate
      );
      const otherBookings = listBooking.filter(
        (item) => item.date !== currentDate
      );

      setFilteredBooking([...todayBookings, ...otherBookings]);
    } else {
      const filteredList = listBooking.filter((item) => item.status === status);
      const remainingBookings = filteredList.filter(
        (item) => item.date !== currentDate
      );
      const todayBookings = filteredList.filter(
        (item) => item.date === currentDate
      );

      setFilteredBooking([...todayBookings, ...remainingBookings]);
    }

    setSelectedStatus(status);
  };

  function shortenPrice(price) {
    if (price >= 1000000000) {
      return (
        (price / 1000000000).toFixed(price % 1000000000 !== 0 ? 3 : 0) + "B"
      );
    } else if (price >= 1000000) {
      return (price / 1000000).toFixed(price % 1000000 !== 0 ? 3 : 0) + "M";
    } else if (price >= 1000) {
      return (price / 1000).toFixed(price % 1000 !== 0 ? 1 : 0) + "K";
    } else {
      return price.toString();
    }
  }

  const getSlotTime = (slot) => {
    let time = slot;
    slotList.map((item, key) => {
      if (item.name === slot) {
        time = item.time;
      }
    });
    return time;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Cancelled":
        return COLORS.red;
      case "Success":
        return "#0f8652";
      default:
        return "black";
    }
  };

  const bookingCard = (item, key) => {
    return (
      <TouchableOpacity
        style={styles.bookingCard}
        onPress={() =>
          navigation.navigate("BookingDetailAdmin", { booking: item })
        }
        key={key}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardName}>{item.car.name}</Text>
          <Text style={styles.cardTransmission}>{item.car.transmission}</Text>
        </View>

        <View style={styles.cardBody}>
          <Image
            style={styles.cardImage}
            source={{
              uri: item.car.images ? item.car.images[0] : "",
            }}
          />
          <View style={styles.cardBodyDetail}>
            <Text style={styles.cardTime}>
              Time : {getSlotTime(item.slot)}, {item.date}
            </Text>
            <Text style={styles.cardPrice}>
              Price : {shortenPrice(item.car.minPrice)} -{" "}
              {shortenPrice(item.car.maxPrice)} VND{" "}
            </Text>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <View
            style={{
              alignItems: "center",
              // justifyContent: "center",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <View
              style={{
                ...styles.dots,
                backgroundColor: getStatusColor(item.status),
              }}
            />
            <Text
              style={{
                ...styles.transmission,
                color: getStatusColor(item.status),
              }}
            >
              {item.status}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.header}>
        <Icon
          name="arrow-left"
          color={"white"}
          size={28}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Manage Booking</Text>
        <Text style={styles.headerTitle}></Text>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterOption,
            selectedStatus === "All" && styles.filterOptionSelected,
          ]}
          onPress={() => filterBooking("All")}
        >
          <Text
            style={{ color: selectedStatus === "All" ? COLORS.white : "black" }}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterOption,
            selectedStatus === "Success" && styles.filterOptionSelected,
          ]}
          onPress={() => filterBooking("Success")}
        >
          <Text
            style={{
              color: selectedStatus === "Success" ? COLORS.white : "black",
            }}
          >
            Success
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterOption,
            selectedStatus === "Cancelled" && styles.filterOptionSelected,
          ]}
          onPress={() => filterBooking("Cancelled")}
        >
          <Text
            style={{
              color: selectedStatus === "Cancelled" ? COLORS.white : "black",
            }}
          >
            Cancelled
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollViewBottom}
        >
          {filteredBooking.length > 0
            ? filteredBooking.map((item, key) => {
                return bookingCard(item, key);
              })
            : ""}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 18,
  },
  scrollViewBottom: {
    // marginBottom: 50
  },
  header: {
    paddingHorizontal: 20,
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "black",
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 23,
    fontWeight: "400",
    color: "white",
  },
  bookingCard: {
    width: WIDTH,
    backgroundColor: COLORS.white,
    // marginTop: 15,
    borderBottomWidth: 7,
    borderBottomColor: COLORS.lightGray,
  },
  cardHeader: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  cardName: {
    fontSize: 20,
    textTransform: "uppercase",
    fontWeight: 500,
  },
  cardTransmission: {
    alignSelf: "flex-start",
    backgroundColor: "#a2d2ff",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
  },
  cardBody: {
    flexWrap: "wrap",
    flexDirection: "row",
    paddingHorizontal: 15,
  },
  cardImage: {
    width: 130,
    height: 100,
    resizeMode: "contain",
    marginRight: 10,
    borderRadius: 15,
  },
  cardBodyDetail: {
    justifyContent: "center",
  },
  cardTime: {
    fontSize: 18,
  },
  cardPrice: {
    fontSize: 18,
    fontWeight: 500,
  },
  cardFooter: {
    marginTop: 10,
    backgroundColor: "#f2f3f5",
  },
  dots: {
    width: 11,
    height: 11,
    borderRadius: 15,
    marginLeft: 15,
    transform: [{ translateY: 3 }],
  },
  transmission: {
    alignSelf: "flex-start",
    // backgroundColor: COLORS.lightBlue,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    marginTop: 5,
  },

  //filter
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: COLORS.lightGray,
  },
  filterOption: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  filterOptionSelected: {
    backgroundColor: COLORS.green,
  },
});

export default ManagerBooking;
