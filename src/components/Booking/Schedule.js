import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { slotList } from "../../constants/slot";
import COLORS from "../../constants/colors";
import moment from "moment-timezone";
import { getSlotByDateAndLicensePlate } from "../../api/slot";
import {
  getMonthName,
  getDayNumber,
  formatCurrentDate,
  getMonthNameAnotherDate,
  getDayNumberAnotherDate,
  convertDateFormat,
} from "../../utils/utils";
import DatePicker, {
  getToday,
  getFormatedDate,
} from "react-native-modern-datepicker";

const Schedule = (props) => {
  const {
    licensePlate,
    handleDateSelection,
    handleSlotSelection,
    selectedDate,
    selectedSlot,
    setDateToData,
    handleLoading,
  } = props;

  const [renderSlot, setRenderSlot] = useState(slotList);

  const [anotherDate, setAnotherDate] = useState("");

  const [selectedAnotherDate, setSelectedAnotherDate] = useState("");
  const [openModalDate, setOpenModalDate] = useState(false);

  const today = new Date();
  const current = getToday();
  const startDate = getFormatedDate(
    today.setDate(today.getDate()),
    "YYYY-MM-DD"
  );

  const handleOpenModalDate = () => {
    if (anotherDate === "") {
      setAnotherDate(formatCurrentDate(2));
    }
    setOpenModalDate(true);
  };

  const handleCloseModalDate = () => {
    setOpenModalDate(false);
    setAnotherDate("");
  };

  const handleConfirmModalDate = () => {
    setSelectedAnotherDate(convertDateFormat(anotherDate));
    handleDateSelection(2)
    setOpenModalDate(false);

  };

  const handleDateOnChange = (propDate) => {
    setAnotherDate(propDate);
  };

  const handleChooseAnotherDateFromPlus = (date) => {
    handleOpenModalDate();
    handleDateSelection(date)
  }

  const renderDateItem = (date, label) => {
    const isSelected = selectedDate === date;
    const textColor = isSelected ? COLORS.white : COLORS.black;
    const backgroundColor = isSelected ? COLORS.green : "#e5e5e5";
    let disableButton = false;
    
    if (date === 2) {
      return (
        <>
          {selectedAnotherDate && selectedDate === 2 ? (
            <TouchableOpacity
              style={[styles.dateItem, {backgroundColor:COLORS.green}]}
              onPress={() => setOpenModalDate(true)}
              activeOpacity={0.8}
            >
              <Text style={[styles.monthText, { color: COLORS.white }]}>
                {getMonthNameAnotherDate(selectedAnotherDate)}
              </Text>
              <Text style={[styles.dayText, { color: COLORS.white }]}>
                {getDayNumberAnotherDate(selectedAnotherDate)}
              </Text>
              <Text style={[styles.dateSubtitle, { color: COLORS.white }]}>
                {label}
              </Text>
            </TouchableOpacity>

          ) : (
            <TouchableOpacity
              style={[styles.dateItem, { backgroundColor }]}
              activeOpacity={0.8}
              disabled={disableButton}
              onPress={() => handleChooseAnotherDateFromPlus(date)}
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
          )}
        </>
      );
    } else if (date === 0) {
      const currentTime = moment().tz("Asia/Ho_Chi_Minh");
      const currentHour = currentTime.hours();
      const currentMinute = currentTime.minutes();

      if (currentHour > 15 || (currentHour === 15 && currentMinute > 0)) {
        disableButton = true;
      }
    }

    return (
      <TouchableOpacity
        style={[
          styles.dateItem,
          { backgroundColor },
          {
            opacity: disableButton ? 0.3 : 1,
          },
        ]}
        onPress={() => handleDateSelection(date)}
        activeOpacity={0.8}
        disabled={disableButton}
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
    const currentDay = currentTime.date();
    const newTime = currentTime.add(2, "hours");
    const newHour = newTime.hours();
    const newMinute = newTime.minutes();

    const [hour, minute] = slot.time.split(":");
    const slotHour = parseInt(hour, 10);
    const slotMinute = parseInt(minute, 10);
    const chooseDate = getDayNumber(selectedDate);

    if (selectedDate !== "") {
      if (
        chooseDate === currentDay &&
        (slotHour < newHour || (slotHour === newHour && slotMinute < newMinute))
      ) {
        return null;
      }
    }

    return (
      <TouchableOpacity
        key={slot.id}
        style={[
          styles.slotButton,
          isSelected && styles.selectedSlotButton,
          { width: 100 },
        ]}
        onPress={() => handleSlotSelection(slot)}
      >
        <Text
          style={[
            styles.slotButtonText,
            isSelected && styles.selectedSlotButtonText,
          ]}
        >
          {slot.time}
        </Text>
      </TouchableOpacity>
    );
  };

  const getFullDate = (dateOption) => {
    if (dateOption !== 2) {
      const targetDate = moment()
        .tz("Asia/Ho_Chi_Minh")
        .add(dateOption, "days");
      const date = targetDate.date();
      const month = targetDate.month() + 1;
      const year = targetDate.year();

      const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${date
        .toString()
        .padStart(2, "0")}`;

      setDateToData(formattedDate);
      return formattedDate;
    } else {
      setDateToData(selectedAnotherDate);
      return selectedAnotherDate;
    }
  };

  React.useEffect(() => {
    if (selectedDate !== "") {
      const callAPI = async () => {
        handleLoading(true);

        const response = await getSlotByDateAndLicensePlate(
          licensePlate,
          getFullDate(selectedDate)
        );
        // console.log("response.slotStored", response.slotStored)

        if (response?.slotStored?.length > 0) {
          const filteredSlotList = slotList.filter(
            (slot) => !response.slotStored.includes(slot.name)
          );
          // console.log('filteredSlotList', filteredSlotList)

          setRenderSlot(filteredSlotList);
        } else {
          setRenderSlot(slotList);
        }
        handleLoading(false);
      };
      callAPI();
    }
  }, [selectedDate, selectedAnotherDate]);

  return (
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

      {openModalDate && (
        <Modal animationType="slide" transparent={true} visible={openModalDate}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <DatePicker
                  mode="calendar"
                  minimumDate={startDate}
                  selected={anotherDate}
                  onDateChange={handleDateOnChange}
                />
                <View style={styles.buttonContainer}>
                  <Button
                    title="Cancel"
                    onPress={handleCloseModalDate}
                    color={COLORS.lightGray}
                  />
                  <View style={{ width: 20 }} />
                  <Button
                    title="Confirm"
                    onPress={handleConfirmModalDate}
                    color={COLORS.green}
                  />
                </View>
              </View>
            </View>
        </Modal>
      )}

      {selectedDate !== "" && (
        <View style={styles.dateContainer}>
          <View style={styles.pickupDateDetail}>
            <Text style={styles.chooseDateText}>Choose time</Text>
            <Text style={styles.requiredField}>*</Text>
          </View>

          <View style={styles.slotContainer}>
            {renderSlot.map((slot) => renderSlotButton(slot))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  dateContainer: {
    marginTop: 10,
  },
  pickupDateDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  chooseDateText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: COLORS.black,
  },
  requiredField: {
    color: COLORS.red,
    fontSize: 15,
    marginRight: 12,
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
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
  iconPlus: {
    marginHorizontal: 12,
    marginVertical: 12,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
});

export default Schedule;
