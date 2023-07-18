import React, { useContext, useState } from "react";
import {
  View,
  SafeAreaView,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
} from "react-native";
import COLORS from "../../constants/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext } from "../../context/authContext";
import { slotList } from "../../constants/slot";
import moment from "moment-timezone";
import { getSlotByDateAndLicensePlate } from "../../api/slot";
import SpinnerLoading from "../../screens/SpinnerLoading";

const CreateBooking = ({ navigation, route }) => {
  const car = route.params;
  const carImages = car.images;
  const isFewImages = carImages.length <= 2;

  const { accessToken, userDecode } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [storedSlot, setStoredSlot] = useState("");

  const [fullname, setFullname] = useState(userDecode?.fullName || "");
  const [phone, setPhone] = useState(userDecode?.phone || "");

  const [date, setDate] = useState(new Date());

  const handleCloseIconHeader = () => {
    navigation.goBack();
  };

  const handleDateSelection = (index) => {
    setSelectedDate(index);
  };

  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot.name);
  };

  const renderDateItem = (date, label) => {
    const isSelected = selectedDate === date;
    const textColor = isSelected ? COLORS.white : COLORS.black;
    const backgroundColor = isSelected ? COLORS.green : "#e5e5e5";

    if (date === 2) {
      return (
        <TouchableOpacity
          style={[styles.dateItem, { backgroundColor }]}
          onPress={() => handleDateSelection(date)}
          activeOpacity={0.8}
        >
          <Icon
            name="plus"
            size={24}
            color={textColor}
            style={styles.iconPlus}
          />
          <Text style={[styles.dateSubtitle, { color: textColor }]}>
            {label}
          </Text>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={[styles.dateItem, { backgroundColor }]}
        onPress={() => handleDateSelection(date)}
        activeOpacity={0.8}
      >
        <Text style={[styles.monthText, { color: textColor }]}>
          {getMonthName(date)}
        </Text>
        <Text style={[styles.dayText, { color: textColor }]}>
          {getDayNumber(date)}
        </Text>
        <Text style={[styles.dateSubtitle, { color: textColor }]}>{label}</Text>
      </TouchableOpacity>
    );
  };

  const renderSlotButton = (slot) => {
    const isSelected = selectedSlot === slot.name;

    const currentTime = moment().tz("Asia/Ho_Chi_Minh");
    const newTime = currentTime.add(2, "hours");
    const newHour = newTime.hours();
    const newMinute = newTime.minutes();

    const [hour, minute] = slot.time.split(":");
    const slotHour = parseInt(hour, 10);
    const slotMinute = parseInt(minute, 10);

    if (
      slotHour < newHour ||
      (slotHour === newHour && slotMinute < newMinute)
    ) {
      return null;
    }


    const isStored = storedSlot && storedSlot.includes(slot.id);

    return (
      <TouchableOpacity
        key={slot.id}
        style={[
          styles.slotButton,
          isSelected && styles.selectedSlotButton,
          isStored && styles.disabledSlotButton,
          { width: 100 },
        ]}
        onPress={() => handleSlotSelection(slot)}
        disabled={isStored}
      >
        <Text
          style={[
            styles.slotButtonText,
            isSelected && styles.selectedSlotButtonText,
            isStored && styles.disabledSlotButtonText,
          ]}
        >
          {slot.time}
        </Text>
      </TouchableOpacity>
    );
  };

  const getMonthName = (date) => {
    const currentDate = moment().tz("Asia/Ho_Chi_Minh");
    const targetDate = moment().tz("Asia/Ho_Chi_Minh").add(date, "days");

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return monthNames[targetDate.month()];
  };

  const getDayNumber = (date) => {
    const currentDate = moment().tz("Asia/Ho_Chi_Minh");
    const targetDate = moment().tz("Asia/Ho_Chi_Minh").add(date, "days");

    return targetDate.date();
  };

  const getFullDate = (dateOption) => {
    const targetDate = moment().tz("Asia/Ho_Chi_Minh").add(dateOption, "days");
    const date = targetDate.date();
    const month = targetDate.month() + 1;
    const year = targetDate.year();

    const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${date
      .toString()
      .padStart(2, "0")}`;
    return formattedDate;
  };

  React.useEffect(() => {
    const callAPI = async () => {
      setIsLoading(true);
      const response = await getSlotByDateAndLicensePlate(
        car.licensePlate,
        getFullDate(selectedDate)
      );

      setStoredSlot(response?.slotStored);
      setIsLoading(false);
    };
    callAPI();
  }, [selectedDate]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icon
          name="close"
          color={COLORS.white}
          size={28}
          onPress={handleCloseIconHeader}
        />
        <Text style={styles.headerTitle}>Create Booking</Text>
        <View style={{ width: 28 }}></View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Text style={styles.sectionTitleBorder}>
              Appointment Requester Information
            </Text>
          </Text>

          <View style={styles.infoUserContainer}>
            <Icon
              name="pencil-minus-outline"
              size={23}
              color={COLORS.black}
              style={styles.infoIcon}
            />
            <Text style={styles.requiredField}>*</Text>
            <TextInput
              style={styles.infoInput}
              placeholder="Enter your fullname"
              placeholderTextColor={COLORS.gray}
              value={fullname}
              onChangeText={setFullname}
            />
          </View>

          <View style={styles.infoUserContainer}>
            <Icon
              name="phone"
              size={23}
              color={COLORS.black}
              style={styles.infoIcon}
            />
            <Text style={styles.requiredField}>*</Text>
            <TextInput
              style={styles.infoInput}
              placeholder="Enter your phone number"
              placeholderTextColor={COLORS.gray}
              value={phone}
              onChangeText={setPhone}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Text style={styles.sectionTitleBorder}>Car Information</Text>
          </Text>

          <View style={styles.carImagesContainer}>
            <Text style={styles.carImagesTitle}>Car Images</Text>
            <View
              style={[
                styles.carImagesWrapper,
                isFewImages && styles.centerImages,
              ]}
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
              name="car"
              size={23}
              color={COLORS.black}
              style={styles.infoIcon}
            />
            <Text style={styles.requiredField}></Text>
            <TextInput
              style={styles.infoInput}
              placeholder={car.name}
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
              placeholder={car.transmission + " Transmission"}
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
              placeholder={car.minPrice + " - " + car.maxPrice}
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
              placeholder={car.fuel}
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
              placeholder="6.0l/100km"
              placeholderTextColor={COLORS.black}
              editable={false}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Text style={styles.sectionTitleBorder}>Schedule</Text>
          </Text>

          <View style={styles.dateContainer}>
            <View style={styles.pickupDateDetail}>
              <Text style={styles.chooseDateText}>Choose date</Text>
              <Text style={styles.requiredField}>*</Text>
            </View>

            <View style={styles.dateRow}>
              {renderDateItem(0, "Today")}
              {renderDateItem(1, "Tomorrow")}
              {renderDateItem(2, "Another date")}
            </View>
          </View>

          <View style={styles.dateContainer}>
            <View style={styles.pickupDateDetail}>
              <Text style={styles.chooseDateText}>Choose time</Text>
              <Text style={styles.requiredField}>*</Text>
            </View>

            <View style={styles.slotContainer}>
              {slotList.map((slot) => renderSlotButton(slot))}
            </View>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.createBookingButton}>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 30,
    backgroundColor: COLORS.black,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 23,
    fontWeight: "bold",
    color: COLORS.white,
  },
  scrollView: {
    flex: 1,
    paddingVertical: 10,
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
  infoIcon: {
    // marginRight: 5,
  },
  infoUserContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  pickupDateDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  infoInput: {
    flex: 1,
    color: COLORS.black,
    paddingTop: 10,
  },
  requiredField: {
    color: COLORS.red,
    fontSize: 15,
    marginRight: 12,
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
  dateContainer: {
    marginTop: 10,
  },
  chooseDateText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: COLORS.black,
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  monthText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dayText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  dateSubtitle: {
    fontSize: 12,
  },
  iconPlus: {
    marginHorizontal: 12,
    marginVertical: 12,
  },

  //slot
  slotContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  slotButton: {
    backgroundColor: "#e5e5e5",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
    width: 100,
    alignItems: "center",
  },
  selectedSlotButton: {
    backgroundColor: COLORS.green,
  },
  slotButtonText: {
    color: COLORS.black,
    fontSize: 16,
  },
  selectedSlotButtonText: {
    color: COLORS.white,
  },
  disabledSlotButton: {
    backgroundColor: COLORS.orange,
  },
  disabledSlotButtonText: {
    color: COLORS.white,
  },
});

export default CreateBooking;
