import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";
import COLORS from "../constants/colors";

const width = Dimensions.get("window").width / 2 - 30;

const CardItem = ({ navigation, car }) => {

  function shortenPrice(price) {
    if (price >= 1000000000) {
      return (price / 1000000000).toFixed(price % 1000000000 !== 0 ? 3 : 0) + "B";
    } else if (price >= 1000000) {
      return (price / 1000000).toFixed(price % 1000000 !== 0 ? 3 : 0) + "M";
    } else if (price >= 1000) {
      return (price / 1000).toFixed(price % 1000 !== 0 ? 1 : 0) + "K";
    } else {
      return price.toString();
    }
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate("Detail", {car : car})}
    >
      <View style={style.card}>
        <View style={{ height: 100, alignItems: "center" }}>
          <Image
            source={{
              uri: car.images[0]
            }}
            style={{ flex: 1, resizeMode: "contain", width: 130, height: 100 }}
          />
        </View>
        <Text style={{ fontWeight: "bold", fontSize: 17, marginTop: 10 }}>{car.name}</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 5 }}>
          <Text style={{ fontSize: 13, color: COLORS.red }}>{shortenPrice(car.minPrice) + " - " + shortenPrice(car.maxPrice)} VND</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  card: {
    height: 220,
    width,
    backgroundColor: COLORS.light,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
  },
});

export default CardItem;