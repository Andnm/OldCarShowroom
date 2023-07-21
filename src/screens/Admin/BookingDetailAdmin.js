import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Image,
  Modal,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";

import { AuthContext } from "../../context/authContext";
import COLORS from "../../constants/colors";
import { slotList } from "../../constants/slot";
import { formatCurrentDate, getCurrentTime } from "../../utils/utils";
import CustomToast from "../../components/CustomToast";
import { cancelBooking } from "../../api/booking";
import { checkTokenInStorage } from "../../hooks/user";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const BookingDetailAdmin = ({ navigation, route }) => {
  const { userDecode } = useContext(AuthContext);
  const [accessToken, setAccessToken] = useState("");
  const [bookingDetail, setBookingDetail] = useState(route.params.booking);
  const [disableButton, setDisableButton] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [noteText, setNoteText] = useState("");

  const maxNoteLength = 120;
  const showToast = CustomToast();

  useFocusEffect(
    useCallback(() => {
      getData();
      checkCancle();
    }, [])
  );
  const getData = async () => {
    const token = await checkTokenInStorage();
    setAccessToken(token);
  };

  const handleCancleBooking = async () => {
    const data = {
      booking_id: bookingDetail._id,
      cancelNote: noteText,
    };
    const response = await cancelBooking(accessToken, data);
    console.log(response.status);
    if (response.status === 200) {
      showToast("Success", "Cancel successfully", "success");
      setBookingDetail({
        ...bookingDetail,
        status: "Cancelled",
        cancelNote: noteText,
      });
      setDisableButton(true);
    } else if (response === 403) {
      showToast(
        "Warning",
        "You do not have permission to cancel this booking",
        "warning"
      );
    } else if (response === 404) {
      showToast("Error", "Booking not found", "error");
    } else if (response === 500) {
      showToast("Error", "Internal server error", "error");
    }
    setIsOpenModal(false);
  };

  const checkNote = () => {
    if (noteText === "") {
      showToast("Warning", "Please input your reason", "warning");
    } else {
      handleCancleBooking();
    }
  };

  function getHourFromTime(time) {
    const [hour] = time.split(":");
    return Number(hour);
  }

  const checkCancle = () => {
    // console.log("booking : ",bookingDetail.date);
    // console.log("now : ",formatCurrentDate(0));
    if (bookingDetail.date >= formatCurrentDate(0)) {
      if (bookingDetail.date > formatCurrentDate(0)) {
        setDisableButton(false);
      } else {
        if (
          getCurrentTime() - getHourFromTime(getSlotTime(bookingDetail.slot)) >
          2
        ) {
          setDisableButton(false);
        }
      }
    }
    if (bookingDetail.status === "Cancelled") {
      setDisableButton(true);
    }
  };

  const getSlotTime = (slot) => {
    let time = slot;
    slotList.map((item, key) => {
      if (item.name === slot) {
        time = item.time;
      }
    });
    return time;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Cancelled":
        return COLORS.red;
      case "Success":
        return "#0f8652";
      default:
        return "black";
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

  const checkConfirm = (status) => {
    switch (status) {
      case "Cancelled":
        return false;
      default:
        return true;
    }
  };

  const handleNoteChange = (text) => {
    if (text.length <= maxNoteLength) {
      setNoteText(text);
    }
  };

  const line = () => {
    return <View style={style.line}></View>;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={style.header}>
        <Icon
          name="arrow-left"
          color={"white"}
          size={28}
          onPress={() => navigation.goBack()}
        />
        <Text style={style.headerTitle}>Booking Detail</Text>
        <Text style={style.headerTitle}></Text>
      </View>
      <ScrollView
        style={[style.container, !disableButton && { marginBottom: 55 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={style.bookingHeader}>
          <ScrollView
            style={style.imageList}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {bookingDetail.car.images.map((image, key) => {
              return (
                <Image
                  style={style.headerImage}
                  source={{
                    uri: image,
                  }}
                  key={key}
                />
              );
            })}
          </ScrollView>

          <LinearGradient
            colors={["rgba(0, 0, 0, 0.7)", "rgba(0, 0, 0, 0)"]}
            start={{
              x: 0,
              y: 1,
            }}
            end={{
              x: 0,
              y: 0,
            }}
            style={style.headerDetail}
          >
            <Text style={style.headerName}>{bookingDetail.car.name}</Text>
            <Text style={style.headerLicense}>
              License Plate : {bookingDetail.car.licensePlate}
            </Text>
          </LinearGradient>
        </View>
        <View style={style.bookingBody}>
          <View style={style.bodyStatus}>
            <View
              style={{
                ...style.dots,
                backgroundColor: getStatusColor(bookingDetail.status),
              }}
            />
            {checkConfirm(bookingDetail.status) ? (
              <View style={style.bodyStatusText}>
                <Text
                  style={{
                    ...style.status,
                    color: getStatusColor(bookingDetail.status),
                  }}
                >
                  {bookingDetail.status}
                </Text>
              </View>
            ) : (
              <View style={style.bodyStatusText}>
                <Text
                  style={{
                    ...style.status,
                    color: getStatusColor(bookingDetail.status),
                  }}
                >
                  {bookingDetail.status}
                </Text>
                <Text style={style.reason}>
                  Reason : {bookingDetail.cancelNote}
                </Text>
              </View>
            )}
          </View>
          {line()}
          <Text style={style.title}>Time</Text>
          <View style={style.bodyTime}>
            <Icon
              name="calendar-clock-outline"
              size={20}
              color={COLORS.black}
              style={style.timeIcon}
            />
            <View style={style.bodyTimeText}>
              <Text style={style.Time}>
                Time : {getSlotTime(bookingDetail.slot)}
              </Text>
              <Text style={style.price}>
                Date : {bookingDetail.date}
                {/* Price : {shortenPrice(bookingDetail.car.minPrice)} - {shortenPrice(bookingDetail.car.maxPrice)} VND{" "} */}
              </Text>
            </View>
          </View>
          {line()}
        </View>
        <View style={style.section}>
          <Text style={style.sectionTitle}>
            <Text style={style.sectionTitleBorder}>Car Information</Text>
          </Text>

          <View style={style.infoUserContainer}>
            <Icon
              name="image-text"
              size={23}
              color={COLORS.black}
              style={style.infoIcon}
            />
            <Text style={style.requiredField}></Text>
            <TextInput
              style={style.infoInput}
              placeholder={"License Plate: " + bookingDetail.car.licensePlate}
              placeholderTextColor={COLORS.black}
              editable={false}
            />
          </View>

          <View style={style.infoUserContainer}>
            <Icon
              name="car"
              size={23}
              color={COLORS.black}
              style={style.infoIcon}
            />
            <Text style={style.requiredField}></Text>
            <TextInput
              style={style.infoInput}
              placeholder={"Name: " + bookingDetail.car.name}
              placeholderTextColor={COLORS.black}
              editable={false}
            />
          </View>

          <View style={style.infoUserContainer}>
            <Icon
              name="cog"
              size={23}
              color={COLORS.black}
              style={style.infoIcon}
            />
            <Text style={style.requiredField}></Text>
            <TextInput
              style={style.infoInput}
              placeholder={"Transmission: " + bookingDetail.car.transmission}
              placeholderTextColor={COLORS.black}
              editable={false}
            />
          </View>
          <View style={style.infoUserContainer}>
            <Icon
              name="currency-usd"
              size={23}
              color={COLORS.black}
              style={style.infoIcon}
            />
            <Text style={style.requiredField}></Text>
            <TextInput
              style={style.infoInput}
              placeholder={
                "Price: " +
                shortenPrice(bookingDetail.car.minPrice) +
                " - " +
                shortenPrice(bookingDetail.car.maxPrice)
              }
              placeholderTextColor={COLORS.black}
              editable={false}
            />
          </View>
          <View style={style.infoUserContainer}>
            <Icon
              name="fuel"
              size={23}
              color={COLORS.black}
              style={style.infoIcon}
            />
            <Text style={style.requiredField}></Text>
            <TextInput
              style={style.infoInput}
              placeholder={"Fuel: " + bookingDetail.car.fuel}
              placeholderTextColor={COLORS.black}
              editable={false}
            />
          </View>
          <View style={style.infoUserContainer}>
            <Icon
              name="speedometer"
              size={23}
              color={COLORS.black}
              style={style.infoIcon}
            />
            <Text style={style.requiredField}></Text>
            <TextInput
              style={style.infoInput}
              placeholder="Fuel consumption: 6.0l/100km"
              placeholderTextColor={COLORS.black}
              editable={false}
            />
          </View>
        </View>
        <View style={style.section}>
          <Text style={style.sectionTitle}>
            <Text style={style.sectionTitleBorder}>User infomation</Text>
          </Text>

          <View style={style.infoUserContainer}>
            <Icon
              name="car"
              size={23}
              color={COLORS.black}
              style={style.infoIcon}
            />
            <Text style={style.requiredField}></Text>
            <TextInput
              style={style.infoInput}
              placeholder={"Name: " + userDecode.fullName}
              placeholderTextColor={COLORS.black}
              editable={false}
            />
          </View>
          <View style={style.infoUserContainer}>
            <Icon
              name="image-text"
              size={23}
              color={COLORS.black}
              style={style.infoIcon}
            />
            <Text style={style.requiredField}></Text>
            <TextInput
              style={style.infoInput}
              placeholder={
                "Phone: " + (userDecode.phone ? userDecode.phone : "None")
              }
              placeholderTextColor={COLORS.black}
              editable={false}
            />
          </View>
        </View>
      </ScrollView>

      {!disableButton && (
        <TouchableOpacity
          style={style.orderFeild}
          onPress={() => {
            setIsOpenModal(true);
          }}
        >
          <View style={style.orderButton}>
            <Text
              style={{
                color: "white",
                fontSize: 25,
                fontWeight: 500,
              }}
            >
              Cancle
            </Text>
          </View>
        </TouchableOpacity>
      )}

      {isOpenModal && (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={isOpenModal}
            onRequestClose={() => {
              setModalVisible(!isOpenModal);
            }}
          >
            <View style={style.centeredView}>
              <View style={style.modalView}>
                <Text style={style.modalText}>Are you sure to cancle ?</Text>
                <View style={style.noteContainer}>
                  <Text style={style.noteTitle}>Reason</Text>
                  <Text style={style.characterCount}>
                    {noteText.length}/{maxNoteLength}
                  </Text>
                  <TextInput
                    style={style.noteInput}
                    placeholder="Enter your note"
                    placeholderTextColor={COLORS.gray}
                    value={noteText}
                    onChangeText={handleNoteChange}
                    multiline
                  />
                </View>
                <View style={style.buttonActionContainer}>
                  <Pressable
                    style={[style.button, style.buttonClose]}
                    onPress={() => setIsOpenModal(false)}
                  >
                    <Text style={style.textStyleNo}>Cancel</Text>
                  </Pressable>

                  <Pressable
                    style={[style.button, style.buttonConfirm]}
                    onPress={() => {
                      checkNote();
                    }}
                  >
                    <Text style={style.textStyleYes}>Confirm</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  line: {
    width: WIDTH,
    height: 7,
    backgroundColor: "#e5e5e5",
    marginVertical: 10,
  },
  title: {
    textTransform: "capitalize",
    fontSize: 18,
    fontWeight: 500,
    paddingHorizontal: 18,
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
  bookingHeader: {
    position: "relative",
  },
  imageList: {
    // alignSelf: "flex-start",
    height: WIDTH * 0.75,
  },
  headerImage: {
    width: WIDTH,
    // height: WIDTH * 0.8,
    resizeMode: "cover",
  },
  headerDetail: {
    position: "absolute",
    width: WIDTH,
    height: WIDTH * 0.2,
    paddingHorizontal: 15,
    justifyContent: "flex-end",
    bottom: 0,
    left: 0,
    zIndex: 999,
  },
  headerName: {
    color: COLORS.white,
    textTransform: "uppercase",
    fontSize: 25,
  },
  headerLicense: {
    color: COLORS.white,
    paddingBottom: 15,
  },
  bookingBody: {
    position: "relative",
    width: WIDTH,
  },
  bodyStatus: {
    flexDirection: "row",
    paddingTop: 15,
  },
  dots: {
    width: 15,
    height: 15,
    borderRadius: 15,
    marginHorizontal: 15,
    transform: [{ translateY: 5 }],
  },
  bodyStatusText: {
    width: WIDTH,
  },
  status: {
    fontSize: 18,
    fontWeight: 500,
  },
  timeIcon: {
    borderWidth: 1,
    borderRadius: 50,
    padding: 10,
    marginHorizontal: 10,
    // transform: [{ translateY: 2 }],
  },
  bodyTime: {
    flexDirection: "row",
    paddingHorizontal: 15,
    marginVertical: 15,
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
    backgroundColor: COLORS.orange,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  // car informaion
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

  // modal box
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: COLORS.light,
  },
  textStyleNo: {
    color: COLORS.black,
    fontWeight: "bold",
    textAlign: "center",
  },
  textStyleYes: {
    color: COLORS.white,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  buttonConfirm: {
    backgroundColor: COLORS.green,
  },
  buttonActionContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },

  // note
  noteContainer: {
    width: 300,
    paddingHorizontal: 20,
    marginTop: 20,
    paddingBottom: 30,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: COLORS.black,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.orange,
    paddingLeft: 10,
  },
  noteInput: {
    color: COLORS.black,
    paddingTop: 10,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    textAlignVertical: "top",
    minHeight: 100,
  },
  characterCount: {
    fontSize: 14,
    color: COLORS.lightGray,
    textAlign: "right",
  },
});

export default BookingDetailAdmin;
