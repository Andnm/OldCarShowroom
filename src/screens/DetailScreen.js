import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  SafeAreaView,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";

import COLORS from "../constants/colors";
import { facilitiesServices } from "../constants/facilities";
import { getCarList } from "../api/car";
import CustomToast from "../components/CustomToast";
import { AuthContext } from "../context/authContext";
import { getFavorCarList, addFavorCar, deleteFavorCar } from "../api/favorite";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const Detail = ({ navigation, route }) => {
  const { accessToken, userDecode } = useContext(AuthContext);
  const [car, setCar] = useState(route.params.car);
  const [carData, setCarData] = useState([]);
  const [favorCar, setFavorCar] = useState([]);
  const [favor, setFavor] = useState();
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [disableButton, setDisableButton] = useState(!accessToken);

  const showToast = CustomToast();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setFavor(checkFavor(car.licensePlate));
  }, [favorCar]);

  const getData = async () => {
    const data = await getCarList();
    const response = await getFavorCarList(accessToken);
    const filterData = data.filter((item) => item.status === "Confirm");
    let favorData = response.data;
    if (response.status !== 401) {
      favorData = favorData.map((obj) => obj.licensePlate);
      setFavorCar(favorData);
    }
    setCarData(filterData);
  };

  const handleCloseBottomSheet = () => {
    setBottomSheetVisible(false);
  };

  const handleOpenBottomSheet = () => {
    setBottomSheetVisible(true);
  };

  const handldeReloadData = (car) => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Detail", params: { car: car } }],
    });
  };

  const handleFavorite = async () => {
    if (!accessToken) {
      showToast("Warning", "Please Login First", "warning");
    } else {
      if (!favor) {
        await addFavorCar(accessToken, car.licensePlate);
        setFavorCar([...favorCar, car.licensePlate]);
        setFavor(true);
        showToast("Success", "Add to favorite", "success");
      } else {
        await deleteFavorCar(accessToken, car.licensePlate);
        let index = favorCar.indexOf(car.licensePlate);
        if (index !== -1) {
          favorCar.splice(index, 1);
          setFavorCar([...favorCar]);
          setFavor(false);
        }
        showToast("Success", "Remove from favorite", "success");
      }
      setCar({ ...car, favorite: !car.favorite });
    }
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

  const icon = (name, icon) => {
    return (
      <View style={style.characteristicIcon}>
        <Icon name={icon} color={"black"} size={40} />
        <Text style={{ fontSize: 13 }}>{name}</Text>
      </View>
    );
  };

  const utilitiesIcon = (name, icon, key) => {
    return (
      <View style={style.utilitiesIcon} key={key}>
        <Icon name={icon} color={"black"} size={30} />
        <Text style={{ marginHorizontal: 10 }}>{name}</Text>
      </View>
    );
  };

  const line = () => {
    return <View style={style.line}></View>;
  };

  const checkFavor = (licensePlate) => {
    return favorCar.includes(licensePlate);
  };

  const handleNavigationToBooking = () => {
    if (!accessToken) {
        showToast("Warning", "You need to login first", "warning")
    } else {
      navigation.navigate("CreateBooking", car);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={style.header}>
        <Icon
          name="arrow-left"
          color={"white"}
          size={28}
          onPress={() => navigation.navigate("HomeScreen")}
        />
        <Text style={style.headerTitle}>{car.name}</Text>
        <Icon
          name="dots-vertical"
          color={"white"}
          size={30}
          onPress={() => setBottomSheetVisible(true)}
        />
      </View>
      <ScrollView
        style={style.detailContainer}
        showsVerticalScrollIndicator={false}
      >
        <ScrollView
          style={style.slide}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={WIDTH}
          decelerationRate="fast"
        >
          {car.images.map((item, key) => {
            return (
              <Image
                source={{
                  uri: item,
                }}
                style={style.imageSlide}
                resizeMode="contain"
                key={key}
              />
            );
          })}
        </ScrollView>
        <Text style={style.name}>{car.name}</Text>
        <Text style={style.price}>
          {shortenPrice(car.minPrice)} - {shortenPrice(car.maxPrice)} VND{" "}
        </Text>
        {line()}
        <Text style={style.title}>characteristic</Text>
        <View style={style.characteristic}>
          {icon("7 seat", "car-seat")}
          {icon(car.transmission, "car-shift-pattern")}
          {icon(car.fuel, "engine-outline")}
          {icon("6.0l / 100km", "fuel")}
        </View>
        {line()}
        <Text style={style.title}>describe</Text>
        <Text style={style.descrip}>- {car.description}</Text>
        {line()}
        <Text style={style.title}>Facilities</Text>
        <View style={style.utilities}>
          {facilitiesServices.map((item, key) => {
            if (car.otherFacilities.includes(item.id)) {
              return utilitiesIcon(item.name, item.icon, (key = item.id));
            }
          })}
        </View>
        {line()}
        <Text style={style.title}>related vehicle</Text>
        <ScrollView
          style={style.relatedSlide}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {carData ? (
            carData.map((item, key) => {
              return item._id !== car._id ? (
                <TouchableOpacity
                  key={key}
                  style={style.related}
                  onPress={() => handldeReloadData(item)}
                >
                  <LinearGradient
                    colors={["rgba(0, 0, 0, 0.7)", "rgba(0, 0, 0, 0)"]}
                    start={{
                      x: 0,
                      y: 1,
                    }}
                    end={{
                      x: 0,
                      y: 0.5,
                    }}
                    style={style.relatedBackgound}
                  />
                  <Image
                    source={{
                      uri: item.images[0],
                    }}
                    style={style.vehicleSlide}
                    resizeMode="cover"
                  />
                  <View style={style.relatedInfor}>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 20,
                      }}
                    >
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                ""
              );
            })
          ) : (
            <Text>Don't have any car</Text>
          )}
        </ScrollView>
      </ScrollView>
      <TouchableOpacity
      style={style.orderFeild}
      onPress={handleNavigationToBooking}
    >
      <View
        style={[
          style.orderButton,
          disableButton && { opacity: 0.5 } // Set opacity to 0.5 when button is disabled
        ]}
      >
        <Text
          style={{
            color: "white",
            fontSize: 25,
            fontWeight: 500,
          }}
        >
          Booking
        </Text>
      </View>
    </TouchableOpacity>

      <Modal
        visible={bottomSheetVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={handleCloseBottomSheet}
      >
        <TouchableWithoutFeedback onPress={handleCloseBottomSheet}>
          <View style={style.modalContainer}>
            <View style={style.modalContent}>
              <Text style={style.modalTitle}>Tùy chỉnh</Text>

              {!favor ? (
                <TouchableOpacity
                  style={style.modalOption}
                  onPress={() => {
                    handleFavorite();
                  }}
                >
                  <Icon
                    name="cards-heart-outline"
                    size={20}
                    color={COLORS.black}
                    style={style.icon}
                  />
                  <Text>Add To Favorite</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={style.modalOption}
                  onPress={() => {
                    handleFavorite();
                  }}
                >
                  <Icon
                    name="cards-heart"
                    size={20}
                    color={COLORS.red}
                    style={style.icon}
                  />
                  <Text>Remove From Favorite</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={style.modalOption}
                onPress={() => {
                  showToast("Warning", "Not support this feture", "waring");
                }}
              >
                <Icon
                  name="share-variant-outline"
                  size={20}
                  color={COLORS.black}
                  style={style.icon}
                />
                <Text>Share With Friend</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={style.modalOption}
                onPress={() => {
                  showToast("Warning", "Not support this feture", "waring");
                }}
              >
                <Icon
                  name="alert-circle-outline"
                  size={20}
                  color={COLORS.black}
                  style={style.icon}
                />
                <Text>Report</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  detailContainer: {
    flex: 1,
    position: "relative",
  },
  header: {
    width: WIDTH,
    height: 70,
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
  backButton: {
    position: "absolute",
    width: WIDTH,
    height: HEIGHT * 0.06,
    borderWidth: 1,
    top: HEIGHT * 0.03,
    backgroundColor: "#000000",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  headButton: {
    marginHorizontal: 10,
  },
  headName: {
    color: "white",
    textTransform: "uppercase",
    fontSize: 20,
  },
  slide: {
    width: WIDTH,
    height: WIDTH * 0.6,
    marginTop: 10,
  },
  imageSlide: {
    width: WIDTH,
    height: WIDTH * 0.6,
  },
  name: {
    fontSize: 25,
    fontWeight: 700,
    marginHorizontal: 20,
    textTransform: "uppercase",
  },
  price: {
    fontSize: 20,
    marginHorizontal: 20,
    color: COLORS.red,
  },
  title: {
    fontSize: 20,
    fontWeight: 500,
    marginHorizontal: 20,
    marginVertical: 10,
    textTransform: "capitalize",
  },
  characteristic: {
    width: WIDTH,
    height: HEIGHT * 0.1,
    justifyContent: "space-around",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  characteristicIcon: {
    width: WIDTH * 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  utilitiesIcon: {
    width: 150,
    marginLeft: 15,
    marginVertical: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  descrip: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  utilities: {
    width: WIDTH * 0.9,
    marginHorizontal: WIDTH * 0.05,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  relatedSlide: {
    width: WIDTH,
    height: WIDTH * 0.6,
    marginBottom: 65,
  },
  related: {
    position: "relative",
    width: WIDTH * 0.9,
    marginHorizontal: WIDTH * 0.01,
    marginBottom: 15,
    borderRadius: 10,
    overflow: "hidden",
  },
  vehicleSlide: {
    position: "absolute",
    width: WIDTH * 0.9,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  relatedBackgound: {
    position: "absolute",
    width: WIDTH * 0.9,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  relatedInfor: {
    position: "absolute",
    bottom: WIDTH * 0.015,
    left: WIDTH * 0.015,
    zIndex: 100,
  },
  orderFeild: {
    position: "absolute",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.3)",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  orderButton: {
    width: WIDTH * 0.9,
    height: 50,
    marginHorizontal: WIDTH * 0.05,
    backgroundColor: COLORS.lightGreen,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    width: WIDTH,
    height: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    marginVertical: 2,
  },

  //bottom sheet modal
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: COLORS.lightGray,
  },
  icon: {
    marginRight: 10,
  },
});

export default Detail;
