import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import COLORS from "../../constants/colors";
import { AuthContext } from "../../context/authContext";
import SpinnerLoading from "../../screens/SpinnerLoading";
import { createBooking } from "../../api/booking";
import CustomToast from "../../components/CustomToast";
import ModalBox from "../../components/ModalBox";
import Header from "../../components/Header";
import UserInformation from "../../components/Booking/UserInformation";
import CarInformation from "../../components/Booking/CarInformation";
import Schedule from "../../components/Booking/Schedule";
import Note from "../../components/Booking/Note";

const CreateBooking = ({ navigation, route }) => {
  const car = route.params;
  const showToast = CustomToast();
  const { accessToken, userDecode } = useContext(AuthContext);

  const [fullname, setFullname] = useState(userDecode?.fullName || "");
  const [phone, setPhone] = useState(userDecode?.phone || "");
  const [note, setNote] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  const [dateToData, setDateToData] = useState("");

  const [isOpenModalBox, setIsOpenModalBox] = useState(false);

  const handleLoading = (status) => {
    setIsLoading(status);
  };

  const handleDateSelection = (index) => {
    setSelectedDate(index);
  };

  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot.name);
  };

  const handleCreateBooking = async () => {
    setIsOpenModalBox(false);
    setIsLoading(true);
    const data = {
      date: dateToData,
      slot: selectedSlot,
      licensePlate: car.licensePlate,
    };
    const response = await createBooking(accessToken, data);

    if (response.status === 200 || response.status === 201) {
      showToast("Success", "Create Booking Successfully!", "success");
    } else {
      showToast("Error", "Create Booking failed!", "error");
    }
    setIsLoading(false);
  };

  const checkInfo = () => {
    if (fullname === "" || phone === "") {
      showToast("Warning", "Please full fill information!", "warning");
      return;
    } else {
      setIsOpenModalBox(true);
    }
  };

  const disable = false;
  // fullname === "" ||
  // phone === "" ||
  // selectedDate === "" ||
  // selectedSlot === "";

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} title={"Create Booking"} />

      <ScrollView style={styles.scrollView}>
        <UserInformation
          fullname={fullname}
          setFullname={setFullname}
          phone={phone}
          setPhone={setPhone}
        />

        <CarInformation car={car} />

        <Schedule
          licensePlate={car.licensePlate}
          handleDateSelection={handleDateSelection}
          handleSlotSelection={handleSlotSelection}
          selectedDate={selectedDate}
          selectedSlot={selectedSlot}
          setDateToData={setDateToData}
          handleLoading={handleLoading}
        />

        <Note noteText={note} setNoteText={setNote} />
      </ScrollView>

      {isOpenModalBox && (
        <ModalBox
          open={isOpenModalBox}
          bodyText={"Are you sure to create this booking?"}
          actionClose={() => setIsOpenModalBox(false)}
          actionYes={handleCreateBooking}
          nameNo={"Cancel"}
          nameYes={"Confirm"}
        />
      )}

      <TouchableOpacity
        style={[
          styles.createBookingButton,
          {
            opacity: disable ? 0.5 : 1,
          },
        ]}
        onPress={checkInfo}
        disabled={disable}
      >
        <Text style={styles.createBookingButtonText}>Create Booking</Text>
      </TouchableOpacity>

      {isLoading && <SpinnerLoading />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollView: {
    flex: 1,
    paddingVertical: 10,
  },
  createBookingButton: {
    backgroundColor: COLORS.green,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  createBookingButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CreateBooking;
