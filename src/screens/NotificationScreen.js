import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, SafeAreaView, StyleSheet, Text, Image, Dimensions, TouchableOpacity, ScrollView, Modal, TouchableWithoutFeedback } from "react-native";
import { AuthContext } from "../context/authContext";
import COLORS from "../constants/colors";
import WarningToLogin from "../components/WarningToLogin";
import { checkTokenInStorage, getProfileUserInStorage } from "../hooks/user";
import { useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getNofiticationList, setNofitication, setNofiticationAll } from "../api/notification"
import logo from "../assets/loginImage/loginCar.png"
import SpinnerLoading from "./SpinnerLoading";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const Notification = ({ navigation }) => {
  const { userDecode } = useContext(AuthContext);
  const [profile, setProfile] = React.useState([]);

  const [accessToken, setAccessToken] = useState([])
  const [nofitiList, setNofitiList] = useState([])
  const [oldNofitiList, setOldNofitiList] = useState([])
  const [newNofitiList, setNewNofitiList] = useState([])
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  useEffect(() => {
    let oldList = []
    let newList = []

    nofitiList.map((item) => {
      if (item.newNotification) {
        newList.push(item)
      } else {
        oldList.push(item)
      }
    })

    setOldNofitiList(oldList)
    setNewNofitiList(newList)

  }, [nofitiList]);

  const handleCloseBottomSheet = () => {
    setBottomSheetVisible(false);
  };

  const getData = async () => {
    const accessToken = await checkTokenInStorage()
    const response = await getNofiticationList(accessToken)
    setAccessToken(accessToken)
    setNofitiList(response.data)
    setIsLoading(false)
  }

  const getNagigate = (type) => {
    switch (type) {
      case "Register Car Successfully":
        return "MyCar";
      case "The car is selling":
        return "MyCar";
      case "The car is cancelled":
        return "MyCar";
      case "The car is sold":
        return "MyCar";
      case "Create Booking Successfully":
        return "Booking";
      case "Cancel Booking Successfully":
        return "Booking";
      default:
        return 'HomeScreen';
    }
  }

  const handleClick = async (item) => {
    if (item.newNotification) {
      const response = await setNofitication(accessToken, item._id)
      if (response.status === 200) {
        navigation.navigate(getNagigate(item.type))
      }
    } else {
      navigation.navigate(getNagigate(item.type))
    }
  }

  const handleSeenAll = async () => {
    const response = await setNofiticationAll(accessToken)
    console.log(response.status);
    if (response.status === 200) {
      let list = nofitiList
      list.map((item, key) => {
        list[key] = { ...item, newNotification: false }
      })
      setNofitiList(list)
      handleCloseBottomSheet()
    }
  }

  const nofitiCard = (item, key) => {
    return (
      <TouchableOpacity
        style={[style.card, item.newNotification ? style.cardNew : style.cardOld]}
        onPress={() => handleClick(item)}
        key={key}
      >
        <View style={style.logoView}>
          <Image
            style={style.logo}
            source={logo}
          />
        </View>

        <View style={style.cardContent}>
          <Text style={style.cardType}>{item.type}</Text>
          <Text style={style.cardDescrip}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    )

  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.white }}
    >
      {isLoading && <SpinnerLoading />}
      <View style={style.notification_container}>
        {!userDecode ? (
          <WarningToLogin />
        ) : (
          <>
            <View style={style.header}>
              <Text style={style.headerTitle}>Notification</Text>
              <Icon
                name="dots-vertical"
                color={"white"}
                size={30}
                onPress={() => setBottomSheetVisible(true)}
                style={style.dots}
              />
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
            >
              {nofitiList[0] ? "" : <Text>don't have any notification</Text>}
              {newNofitiList[0] ? <Text style={style.title}>New notification</Text> : ""}
              {
                newNofitiList[0] ?
                  newNofitiList.map((item, key) => {
                    return (
                      nofitiCard(item, key)
                    )
                  })
                  :
                  ""
              }
              {oldNofitiList[0] ? <Text style={style.title}>Old notification</Text> : ""}
              {
                oldNofitiList[0] ?
                  oldNofitiList.map((item, key) => {
                    return (
                      nofitiCard(item, key)
                    )
                  })
                  :
                  ""
              }
            </ScrollView>
          </>
        )}
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

              <TouchableOpacity style={style.modalOption} onPress={() => handleSeenAll()}>
                <Icon
                  name="read"
                  size={20}
                  color={COLORS.black}
                  style={style.icon}
                />
                <Text>Mark all as read.</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  notification_container: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  header: {
    position: "relative",
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
  title: {
    paddingHorizontal: 15,
    fontSize: 18,
    fontWeight: 500,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.lightGray,
  },
  card: {
    width: WIDTH,
    height: 120,
    flexDirection: "row",
    borderBottomWidth: 2,
    alignItems: "center",
    borderBottomColor: COLORS.lightGray,
  },
  logoView: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginHorizontal: 10,
    backgroundColor: "white",
    overflow: "hidden",
  },
  logo: {
    width: 80,
    height: 100,
    resizeMode: "cover",

  },
  cardNew: {
    backgroundColor: "#daeef1"
  },
  cardOld: {
    backgroundColor: "white"
  },
  cardContent: {
    width: WIDTH * 0.75,
    alignSelf: "flex-start",
  },
  cardType: {
    fontSize: 18,
    fontWeight: 500,
    paddingTop: 18,
    paddingBottom: 5,
  },
  cardDescrip: {

  },
  dots: {
    position: "absolute",
    right: 15,
    top: 20,
  },

  // modal
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

export default Notification;
