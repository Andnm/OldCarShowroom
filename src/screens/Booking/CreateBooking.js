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
} from "react-native";
import COLORS from "../constants/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext } from "../../context/authContext";

const CreateBooking = ({ navigation }) => {
  const { accessToken, userDecode } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState("");

  const handleCloseIconHeader = () => {
    navigation.goBack();
  };

  const handleDateSelection = (index) => {
    setSelectedDate(index);
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
          <Icon name="plus" size={24} color={textColor} style={styles.iconPlus}/>
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
  

  const getMonthName = (date) => {
    const currentDate = new Date();
    const targetDate = new Date();
    targetDate.setDate(currentDate.getDate() + date);

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
    return monthNames[targetDate.getMonth()];
  };

  const getDayNumber = (date) => {
    const currentDate = new Date();
    const targetDate = new Date();
    targetDate.setDate(currentDate.getDate() + date);

    return targetDate.getDate();
  };

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
              placeholder="Fullname"
              placeholderTextColor={COLORS.gray}
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
              placeholder="Phone"
              placeholderTextColor={COLORS.gray}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Text style={styles.sectionTitleBorder}>Car Information</Text>
          </Text>
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
              placeholder="Name"
              placeholderTextColor={COLORS.gray}
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
              placeholder="Transmission"
              placeholderTextColor={COLORS.gray}
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
              placeholder="Price"
              placeholderTextColor={COLORS.gray}
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
              placeholder="Fuel"
              placeholderTextColor={COLORS.gray}
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
              placeholder="Fuel Consumption"
              placeholderTextColor={COLORS.gray}
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
          </View>
          
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.createBookingButton}>
        <Text style={styles.createBookingButtonText}>Create Booking</Text>
      </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  section: {
    marginTop: 20,
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
    alignItems: "center"
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
    marginVertical: 12
  }
});

export default CreateBooking;