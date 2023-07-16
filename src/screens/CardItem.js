import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";
import COLORS from "../constants/colors";

const width = Dimensions.get("window").width / 2 - 30;

const CardItem = ({ navigation, car }) => {

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
          <Text style={{ fontSize: 19, fontWeight: "bold" }}>${car.minPrice}</Text>
          <View style={{ height: 25, width: 25, backgroundColor: COLORS.green, borderRadius: 5, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 15, color: COLORS.white, fontWeight: "bold" }}>+</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  card: {
    height: 225,
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