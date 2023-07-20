import React, { useState, useEffect, useCallback, useContext } from "react";
import { View, SafeAreaView, StyleSheet, Text, Image, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext } from "../context/authContext";
import COLORS from "../constants/colors";
import { slotList } from "../constants/slot"; 
import WarningToLogin from "../components/WarningToLogin";
import { getProfileUserInStorage } from "../hooks/user";
import { getBooking } from "../api/booking";
import { useFocusEffect } from '@react-navigation/native';


const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const Booking = ({ navigation }) => {
  const { accessToken, userDecode } = useContext(AuthContext);

  const [profile, setProfile] = useState([]);
  const [bookingData, setBookingData] = useState([]);

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  const getData = async () => {
    const response = await getBooking(accessToken)
    const data = response.data
    setBookingData(data)
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
    let time = slot
    slotList.map((item, key) => {
      if(item.name === slot){
        time = item.time
      }
    })
    return time
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Cancelled":
        return COLORS.red;
      case "Success":
        return "#0f8652";
      default:
        return 'black';
    }
  };

  const bookingCard = (item, key) => {
    return (
      <TouchableOpacity
        style={style.bookingCard}
        onPress={() => navigation.navigate("BookingDetail", {booking : item})}
        key={key}
      >
        <View style={style.cardHeader}>
          <Text style={style.cardName}>
            {item.car.name}
          </Text>
          <Text style={style.cardTransmission}>
            {item.car.transmission}
          </Text>
        </View>

        <View style={style.cardBody}>
          <Image
            style={style.cardImage}
            source={{
              uri: item.car.images ? item.car.images[0] : ""
            }}
          />
          <View style={style.cardBodyDetail}>
            <Text style={style.cardTime}>Time : {getSlotTime(item.slot)}</Text>
            <Text style={style.cardPrice}>Price : {shortenPrice(item.car.minPrice)} - {shortenPrice(item.car.maxPrice)} VND{" "}</Text>
          </View>
        </View>

        <View style={style.cardFooter}>
          <View style={{
            alignItems: "center",
            // justifyContent: "center",
            flexDirection: "row",
            flexWrap: "wrap",
          }}>
            <View style={{ ...style.dots, backgroundColor: getStatusColor(item.status) }} />
            <Text style={{ ...style.transmission, color: getStatusColor(item.status) }} >
              {item.status}
            </Text>
          </View>
        </View>

      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#e8e9ee" }}
    >
      <View style={style.booking_container}>
        {!profile ? (
          <WarningToLogin />
        ) : (
          <>
            <View style={style.header}>
              <Text style={style.headerTitle}>Booking</Text>
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
            >
              {
                bookingData ?
                  bookingData.map((item, key) => {
                    return (
                      bookingCard(item, key)
                    )
                  })
                  :
                  <Text>don't have any booking</Text>
              }
            </ScrollView>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  booking_container: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  header: {
    width: WIDTH,
    height: 70,
    paddingHorizontal: 20,
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-around",
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
    marginTop: 15,
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
    alignSelf: 'flex-start',
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
    justifyContent: "flex-end",
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
    alignSelf: 'flex-start',
    // backgroundColor: COLORS.lightBlue,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    marginTop: 5,
  }
});

export default Booking;
