import React,{useContext} from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import COLORS from "../../constants/colors";
import { AuthContext } from "../../context/authContext";

const CarInformation = ({ car }) => {
  const { accessToken, userDecode } = useContext(AuthContext);

  const carImages = car.images;
  const isFewImages = carImages.length <= 2;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>
        <Text style={styles.sectionTitleBorder}>Car Information</Text>
      </Text>

      <View style={styles.carImagesContainer}>
        <View
          style={[styles.carImagesWrapper, isFewImages && styles.centerImages]}
        >
          {isFewImages ? (
            <Image source={{ uri: carImages[0] }} style={styles.carImage} />
          ) : (
            <FlatList
              data={carImages}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <Image source={{ uri: item }} style={styles.carImage} />
              )}
            />
          )}
        </View>
      </View>

      <View style={styles.infoUserContainer}>
        <Icon
          name="image-text"
          size={23}
          color={COLORS.black}
          style={styles.infoIcon}
        />
        <Text style={styles.requiredField}></Text>
        <TextInput
          style={styles.infoInput}
          placeholder={'License Plate: ' + car.licensePlate}
          placeholderTextColor={COLORS.black}
          editable={false}
        />
      </View>

      <View style={styles.infoUserContainer}>
        <Icon
          name="car"
          size={23}
          color={COLORS.black}
          style={styles.infoIcon}
        />
        <Text style={styles.requiredField}></Text>
        <TextInput
          style={styles.infoInput}
          placeholder={'Name: ' + car.name}
          placeholderTextColor={COLORS.black}
          editable={false}
        />
      </View>

      <View style={styles.infoUserContainer}>
        <Icon
          name="cog"
          size={23}
          color={COLORS.black}
          style={styles.infoIcon}
        />
        <Text style={styles.requiredField}></Text>
        <TextInput
          style={styles.infoInput}
          placeholder={"Transmission: " + car.transmission}
          placeholderTextColor={COLORS.black}
          editable={false}
        />
      </View>
      <View style={styles.infoUserContainer}>
        <Icon
          name="currency-usd"
          size={23}
          color={COLORS.black}
          style={styles.infoIcon}
        />
        <Text style={styles.requiredField}></Text>
        <TextInput
          style={styles.infoInput}
          placeholder={"Price: " + car.minPrice + " - " + car.maxPrice}
          placeholderTextColor={COLORS.black}
          editable={false}
        />
      </View>
      <View style={styles.infoUserContainer}>
        <Icon
          name="fuel"
          size={23}
          color={COLORS.black}
          style={styles.infoIcon}
        />
        <Text style={styles.requiredField}></Text>
        <TextInput
          style={styles.infoInput}
          placeholder={"Fuel: " + car.fuel}
          placeholderTextColor={COLORS.black}
          editable={false}
        />
      </View>
      <View style={styles.infoUserContainer}>
        <Icon
          name="speedometer"
          size={23}
          color={COLORS.black}
          style={styles.infoIcon}
        />
        <Text style={styles.requiredField}></Text>
        <TextInput
          style={styles.infoInput}
          placeholder="Fuel consumption: 6.0l/100km"
          placeholderTextColor={COLORS.black}
          editable={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  requiredField: {
    color: COLORS.red,
    fontSize: 15,
    marginRight: 12,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 20,
    borderBottomWidth: 7,
    borderBottomColor: "#e5e5e5",
    paddingBottom: 30,
  },
  carImagesContainer: {
    marginTop: 20,
  },
  carImagesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: COLORS.black,
  },
  carImagesWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  centerImages: {
    justifyContent: "center",
  },
  carImage: {
    width: 200,
    height: 120,
    marginRight: 10,
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: COLORS.black,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.orange,
    paddingLeft: 10,
  },
  sectionTitleBorder: {
    marginLeft: -10,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  infoUserContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  infoIcon: {
    // marginRight: 5,
  },
});

export default CarInformation;
