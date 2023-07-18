import React, { useState, useEffect, useContext } from "react";
import {
  View,
  SafeAreaView,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import COLORS from "../../constants/colors";
import { AuthContext } from "../../context/authContext";

const MyCar = ({ navigation }) => {
  const { accessToken, userDecode } = useContext(AuthContext);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [openModalFormRegisterCar, setOpenModalFormRegisterCar] =
    useState(false);

  const handleCloseBottomSheet = () => {
    setBottomSheetVisible(false);
  };

  const handleNavigateToRegisterCarForm = () => {
    navigation.navigate("RegisterCar");
  };

  const handleRegisterCarPress = () => {
    handleCloseBottomSheet();
    handleNavigateToRegisterCarForm();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <View style={style.header}>
        <Icon
          name="arrow-left"
          color={"white"}
          size={28}
          onPress={() => navigation.goBack()}
        />
        <Text style={style.headerTitle}>My car</Text>
        <Icon
          name="dots-horizontal"
          color={"white"}
          size={30}
          onPress={() => setBottomSheetVisible(true)}
        />
      </View>

      <View style={style.textContainer}>
        <Text style={style.titleText}>
          Do you have a car that want to sell?
        </Text>
        <Text style={style.infoText}>
          Become our partner to reach everyone more easily
        </Text>
      </View>

      <View style={style.body}>
        <Image
          source={require("../../assets/add-car.png")}
          style={style.image}
          resizeMode="cover"
        />
      </View>

      {/* <View style={style.buttonContainer}>
        <TouchableOpacity
          style={style.registerButton}
          onPress={handleNavigateToRegisterCarForm}
        >
          <Text style={style.registerButtonText}>Register car</Text>
        </TouchableOpacity>
      </View> */}

      <View style={style.button_container}>
        <TouchableOpacity style={style.loginButton} onPress={handleNavigateToRegisterCarForm}>
          <Text style={style.loginButtonText}>Register car</Text>
        </TouchableOpacity>
      </View>

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

              <TouchableOpacity
                style={style.modalOption}
                onPress={handleRegisterCarPress}
              >
                <Icon
                  name="car"
                  size={20}
                  color={COLORS.black}
                  style={style.icon}
                />
                <Text>Register to sell cars</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
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
  textContainer: {
    marginTop: 60,
    alignItems: "center",
  },
  titleText: {
    fontSize: 18,
    color: COLORS.gray,
    textAlign: "center",
    fontWeight: "bold",
  },
  infoText: {
    fontSize: 15,
    color: COLORS.gray,
    textAlign: "center",
  },
  image: {
    height: 300,
    width: 400
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 20
  },
  registerButton: {
    flex: 1,
    justifyContent: "center",
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "black",
    borderRadius: 8,
  },
  registerButtonText: {
    color: COLORS.white,
    fontSize: 16,
    textTransform: "uppercase",
    textAlign: "center",
  },

  //bottom sheet
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
  button_container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  loginButton: {
    backgroundColor: COLORS.green,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  loginButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default MyCar;
