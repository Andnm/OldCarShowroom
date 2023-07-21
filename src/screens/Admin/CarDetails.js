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
import { useFocusEffect } from "@react-navigation/native";
import COLORS from "../../constants/colors";
import { facilitiesServices } from "../../constants/facilities";
import CustomToast from "../../components/CustomToast";
import { AuthContext } from "../../context/authContext";
import ModalBox from "../../components/ModalBox";
import { changeCarStatusByAdmin } from "../../api/car";
import { checkTokenInStorage } from "../../hooks/user";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const CarDetails = ({ navigation, route }) => {
  const { accessToken, userDecode } = useContext(AuthContext);
  const [car, setCar] = useState(route.params.car);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const [isOpenModalConfirm, setIsOpenModalConfirm] = useState(false);
  const [isOpenModalSold, setIsOpenModalSold] = useState(false);
  const [isOpenModalCancel, setIsOpenModalCancel] = useState(false);

  const showToast = CustomToast();

  const handleCloseBottomSheet = () => {
    setBottomSheetVisible(false);
  };

  const handleOpenBottomSheet = () => {
    setBottomSheetVisible(true);
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

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return COLORS.orange;
      case "Cancelled":
        return COLORS.red;
      case "Confirm":
        return "#0f8652";
      case "Sold":
        return COLORS.blue;
      default:
        return "black";
    }
  };

  const checkConfirm = (status) => {
    switch (status) {
      case "Cancelled":
        return false;
      default:
        return true;
    }
  };

  const handleConfirmCarToSale = async () => {
    const accessToken = await checkTokenInStorage();
    const response = await changeCarStatusByAdmin(
      accessToken,
      car.licensePlate,
      "Confirm"
    );
    if (response.status === 200 || response.status === 201) {
      showToast(
        "Success",
        "Successfully posted the car to the Showroom!",
        "success"
      );
      setIsOpenModalConfirm(false);
      navigation.navigate("ManagerCar");
    } else {
      showToast("Error", "Posted the car to the Showroom failed!", "error");
    }
  };

  const handleSoldCar = async () => {
    const accessToken = await checkTokenInStorage();
    const response = await changeCarStatusByAdmin(
      accessToken,
      car.licensePlate,
      "Sold"
    );
    if (response.status === 200 || response.status === 201) {
      showToast(
        "Success",
        "Successfully change the status to sold!",
        "success"
      );
      setIsOpenModalSold(false);
      navigation.navigate("ManagerCar");
    } else {
      showToast("Error", "Change the status to sold failed!", "error");
    }
  };

  const handleCancelCarToSale = async () => {
    const accessToken = await checkTokenInStorage();
    const response = await changeCarStatusByAdmin(
      accessToken,
      car.licensePlate,
      "Cancelled"
    );
    if (response.status === 200 || response.status === 201) {
      showToast(
        "Success",
        "Successfully to cancel this car up to Showroom",
        "success"
      );
      setIsOpenModalCancel(false);
      navigation.navigate("ManagerCar");
    } else {
      showToast("Error", "Cancel this car up to Showroom failed!", "error");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={style.header}>
        <Icon
          name="arrow-left"
          color={"white"}
          size={28}
          onPress={() => navigation.navigate("Manage Car")}
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
        <View style={style.main}>
          <View>
            <Text style={style.name}>{car.name}</Text>
            <Text style={style.price}>
              {shortenPrice(car.minPrice)} - {shortenPrice(car.maxPrice)} VND{" "}
            </Text>
          </View>
        </View>
        {line()}
        <View>
          <Text style={style.title}>Status Car</Text>
        </View>

        <View style={style.bodyStatus}>
          <View
            style={{
              ...style.dots,
              backgroundColor: getStatusColor(car.status),
            }}
          />
          {checkConfirm(car.status) ? (
            <View style={style.bodyStatusText}>
              <Text
                style={{
                  ...style.status,
                  color: getStatusColor(car.status),
                }}
              >
                {car.status}
              </Text>
            </View>
          ) : (
            <View style={style.bodyStatusText}>
              <Text
                style={{
                  ...style.status,
                  color: getStatusColor(car.status),
                }}
              >
                {car.status}
              </Text>
              <Text style={style.reason}>Reason : None</Text>
            </View>
          )}
        </View>
        {line()}
        <Text style={style.title}>License Plate: {car.licensePlate}</Text>
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
      </ScrollView>

      {car?.status === "Pending" && (
        <View style={style.buttonsContainer}>
          <TouchableOpacity
            style={style.buttonClick}
            onPress={() => setIsOpenModalCancel(true)}
          >
            <View style={[style.cancelledButton]}>
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: 500,
                }}
              >
                Cancel
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={style.buttonClick}
            onPress={() => setIsOpenModalConfirm(true)}
          >
            <View style={[style.orderButton]}>
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: 500,
                }}
              >
                Confirm
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      {car?.status === "Confirm" && (
        <TouchableOpacity
          style={style.orderFeild}
          onPress={() => setIsOpenModalSold(true)}
        >
          <View style={[style.soldButton]}>
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: 500,
              }}
            >
              Confirm the car has been sold
            </Text>
          </View>
        </TouchableOpacity>
      )}

      {isOpenModalConfirm && (
        <ModalBox
          open={isOpenModalConfirm}
          bodyText={"Are you sure want to up this car into Showroom?"}
          actionClose={() => setIsOpenModalConfirm(false)}
          actionYes={handleConfirmCarToSale}
          nameNo={"Cancel"}
          nameYes={"Confirm"}
        />
      )}

      {isOpenModalSold && (
        <ModalBox
          open={isOpenModalSold}
          bodyText={"Are you sure this car has been sold??"}
          actionClose={() => setIsOpenModalSold(false)}
          actionYes={handleSoldCar}
          nameNo={"Cancel"}
          nameYes={"Confirm"}
        />
      )}

      {isOpenModalCancel && (
        <ModalBox
          open={isOpenModalCancel}
          bodyText={"Are you sure want to CANCEL this car up into Showroom??"}
          actionClose={() => setIsOpenModalCancel(false)}
          actionYes={handleCancelCarToSale}
          nameNo={"Cancel"}
          nameYes={"Confirm"}
        />
      )}

      <Modal
        visible={bottomSheetVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={handleCloseBottomSheet}
      >
        <TouchableWithoutFeedback onPress={handleCloseBottomSheet}>
          <View style={style.modalContainer}>
            <View style={style.modalContent}>
              <Text style={style.modalTitle}>Option</Text>

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
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 2,
    borderTopColor: COLORS.lightGray,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.3)",
  },
  buttonClick: {
    flex: 1,
    marginHorizontal: 5,
  },
  orderButton: {
    width: "100%",
    height: 50,
    backgroundColor: COLORS.lightGreen,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelledButton: {
    width: "100%",
    height: 50,
    backgroundColor: COLORS.red,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
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
  slide: {
    width: WIDTH,
    height: WIDTH * 0.6,
    marginTop: 10,
  },
  imageSlide: {
    width: WIDTH,
    height: WIDTH * 0.6,
  },
  bodyStatusText: {
    width: WIDTH,
  },
  main: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  name: {
    fontSize: 25,
    fontWeight: "700",
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
    fontWeight: "500",
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
    marginBottom: 30,
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
  soldButton: {
    width: WIDTH * 0.9,
    height: 50,
    marginHorizontal: WIDTH * 0.05,
    backgroundColor: COLORS.orange,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    width: WIDTH,
    height: 7,
    backgroundColor: "#e5e5e5",
    marginVertical: 10,
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
  bodyStatus: {
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: 60,
  },
  status: {
    fontSize: 18,
    fontWeight: 500,
  },
  dots: {
    width: 15,
    height: 15,
    borderRadius: 15,
    marginHorizontal: 15,
    transform: [{ translateY: 5 }],
  },
  titleContainer: {
    marginTop: 10,
    alignItems: "center",
  },
});

export default CarDetails;
