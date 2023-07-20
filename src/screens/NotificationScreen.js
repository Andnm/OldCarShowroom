import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, SafeAreaView, StyleSheet, Text, Image, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import { AuthContext } from "../context/authContext";
import COLORS from "../constants/colors";
import WarningToLogin from "../components/WarningToLogin";
import { checkTokenInStorage, getProfileUserInStorage } from "../hooks/user";
import { useFocusEffect } from "@react-navigation/native";
import { getNofiticationList, setNofitication, setNofiticationAll } from "../api/notification"
import logo from "../assets/loginImage/loginCar.png"

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const Notification = ({ navigation }) => {
  const { accessToken, userDecode } = useContext(AuthContext);
  const [profile, setProfile] = React.useState([]);

  const [nofitiList, setNofitiList] = useState([])
  const [oldNofitiList, setOldNofitiList] = useState([])
  const [newNofitiList, setNewNofitiList] = useState([])

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

  const getData = async () => {
    const accessToken = await checkTokenInStorage()
    const response = await getNofiticationList(accessToken)
    setNofitiList(response.data)
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
        return "MyCar";
      case "Cancel Booking Successfully":
        return "MyCar";
      default:
        return 'HomeScreen';
    }
  }

  const handleClick = async (type) => {
    const response = await setNofitication()
    if (response.status === 200) {
      navigation.navigate(getNagigate(type))
    }
  }

  const handleSeenAll = async () => {
    const response = await setNofiticationAll()
    if (response.status === 200) {
      let list = nofitiList 
      list.map((item, key) => {
        list[key] = {...item, newNotification: false}
      })
    }
  }

  const nofitiCard = (item, key) => {
    return (
      <TouchableOpacity
        style={[style.card, item.newNotification ? style.cardNew : style.cardOld]}
        onPress={() => handleClick(item.newNotification)}
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
      <View style={style.notification_container}>
        {!userDecode ? (
          <WarningToLogin />
        ) : (
          <>
            <View style={style.header}>
              <Text style={style.headerTitle}>Notification</Text>
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
    borderBottomWidth: 1,
  },
  card: {
    width: WIDTH,
    height: 120,
    flexDirection: "row",
    borderBottomWidth: 1,
    alignItems: "center"
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
});

export default Notification;
