import React, { useState, useContext, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import COLORS from "../../constants/colors";
import CardItem from "../CardItem";
import { AuthContext } from "../../context/authContext";
import { getFavorCarList, deleteFavorCar, deleteAllFavorCar } from "../../api/favorite";
import SpinnerLoading from "../SpinnerLoading";
import ModalBox from "../../components/ModalBox";
import CustomToast from "../../components/CustomToast";

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height;

const FavoriteCar = ({ navigation }) => {
  const { accessToken, userDecode } = useContext(AuthContext);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [favorCar, setFavorCar] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [openModalFormRegisterCar, setOpenModalFormRegisterCar] =
    useState(false);
  const showToast = CustomToast();

  const handleCloseBottomSheet = () => {
    setBottomSheetVisible(false);
  };

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const response = await getFavorCarList(accessToken)
    response.status === 500 ? "" : setFavorCar(response.data)
    setIsLoading(false)
  }

  const handleRemovePress = async () => {
    await deleteAllFavorCar(accessToken)
    showToast("Success", "Remove all car from favorite", "success");
    setIsOpenModal(false)
    setFavorCar([])
    handleCloseBottomSheet()
  }

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
        <Text style={style.headerTitle}>Favorite car</Text>
        <Icon
          name="dots-horizontal"
          color={"white"}
          size={30}
          onPress={() => setBottomSheetVisible(true)}
        />
      </View>
      {isLoading ?
        <SpinnerLoading />
        :
        favorCar[0] ?
          <View style={style.carList} >
            {favorCar.map((item, key) => {
              return <CardItem navigation={navigation} car={item} key={key} />;
            })
            }
          </View>
          :
          <View>
            <View style={style.textContainer}>
              <Text style={style.titleText}>You have not favorite any car yet!</Text>
            </View>

            <View style={style.body}>
              <Image
                source={require("../../assets/favorite-car.png")}
                style={style.image}
                resizeMode="cover"
              />
            </View>
          </View>
      }

      {/* <View style={style.buttonContainer}>
        <TouchableOpacity style={style.registerButton}>
          <Text style={style.registerButtonText}>Register car</Text>
        </TouchableOpacity>
      </View> */}

      {isOpenModal && (
        <ModalBox
          open={isOpenModal}
          bodyText={"Are you sure to remove all cars from favorite list?"}
          actionClose={() => setIsOpenModal(false)}
          actionYes={handleRemovePress}
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
              <Text style={style.modalTitle}>Tùy chỉnh</Text>

              <TouchableOpacity style={style.modalOption} onPress={() => setIsOpenModal(true)}>
                <Icon
                  name="car"
                  size={20}
                  color={COLORS.black}
                  style={style.icon}
                />
                <Text>Remove all Favortie cars</Text>
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
  body: {
    marginTop: 20,
  },
  image: {
    height: 300,
    width: 400,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
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
  carList: {
    width: WIDTH * 0.9,
    marginHorizontal: WIDTH * 0.05,
    marginTop: 30,
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
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
});

export default FavoriteCar;
