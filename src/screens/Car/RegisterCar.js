import React, { useState, useContext } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import COLORS from "../../constants/colors";
import { AuthContext } from "../../context/authContext";

import { autoMakerList } from "../../constants/autoMaker";
import { categoryList } from "../../constants/category";
import { facilitiesServices } from "../../constants/facilities";
import { fuelList } from "../../constants/fuel";
import { modelList } from "../../constants/model";
import { transmissionList } from "../../constants/transmission";

const RegisterCar = ({ navigation }) => {
  const { userDecode } = useContext(AuthContext);
  const [licensePlate, setLicensePlate] = useState("");
  const [description, setDescription] = useState("");
  const [autoMaker, setAutoMaker] = useState("");
  const [model, setModel] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [fuel, setFuel] = useState("");
  const [transmission, setTransmission] = useState("");
  const [yearOfManufacture, setYearOfManufacture] = useState("");
  const [otherFacilities, setOtherFacilities] = useState([]);
  const [images, setImages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalField, setModalField] = useState("");

  const [otherFacilitiesValue, setOtherFacilitiesValue] = useState([]);

  const handleOpenModal = (field) => {
    setModalVisible(true);
    setModalField(field);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalField("");
  };

  const handleSelectOption = (option) => {
    let updatedFacilities = [...otherFacilities];
    let updatedFacilitiesValue = [...otherFacilitiesValue];

    switch (modalField) {
      case "autoMaker":
        setAutoMaker(option);
        break;
      case "model":
        setModel(option);
        break;
      case "category":
        setCategory(option);
        break;
      case "fuel":
        setFuel(option);
        break;
      case "transmission":
        setTransmission(option);
        break;
      case "otherFacilities":
        if (updatedFacilities.includes(option.id)) {
          updatedFacilities = updatedFacilities.filter(
            (id) => id !== option.id
          );
        } else {
          updatedFacilities.push(option.id);
          updatedFacilitiesValue.push(option.name);
        }
        setOtherFacilities(updatedFacilities);
        setOtherFacilitiesValue(updatedFacilitiesValue);
        break;
      default:
        break;
    }
    handleCloseModal();
  };

  const handleSubmit = () => {
    const data = {
      name: model + " " + yearOfManufacture,
      licensePlate: licensePlate,
      description: description,
      autoMaker: autoMaker,
      model: model,
      category: category,
      minPrice: minPrice,
      maxPrice: maxPrice,
      fuel: fuel,
      transmission: transmission,
      yearOfManufacture: yearOfManufacture,
      otherFacilities: otherFacilities,
      images: images,
    };
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.header}>
        <Icon
          name="arrow-left"
          color={"white"}
          size={28}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Register Car</Text>
        <Text style={styles.headerTitle}></Text>
      </View>

      <ScrollView style={styles.container}>
        {/* license plate */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>License Plate</Text>
          <TextInput
            style={styles.input}
            placeholder="License Plate"
            value={licensePlate}
            onChangeText={setLicensePlate}
          />
        </View>
        {/* Description */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />
        </View>
        {/* Automaker Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Automaker</Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => handleOpenModal("autoMaker")}
          >
            <Text style={styles.modalButtonText}>
              {autoMaker ? autoMaker : "Choose Automaker"}
            </Text>
          </TouchableOpacity>
        </View>
        {/* Model Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Model</Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => handleOpenModal("model")}
          >
            <Text style={styles.modalButtonText}>
              {model ? model : "Choose Model"}
            </Text>
          </TouchableOpacity>
        </View>
        {/* Category Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Category</Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => handleOpenModal("category")}
          >
            <Text style={styles.modalButtonText}>
              {category ? category : "Choose Category"}
            </Text>
          </TouchableOpacity>
        </View>
        {/* Range price */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Price</Text>
          <View style={styles.priceRangeContainer}>
            <TextInput
              style={styles.priceInput}
              placeholder="Min Price"
              value={minPrice}
              onChangeText={setMinPrice}
            />
            <Text style={styles.priceRangeSeparator}>-</Text>
            <TextInput
              style={styles.priceInput}
              placeholder="Max Price"
              value={maxPrice}
              onChangeText={setMaxPrice}
            />
          </View>
        </View>
        {/* Fuel Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Fuel</Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => handleOpenModal("fuel")}
          >
            <Text style={styles.modalButtonText}>
              {fuel ? fuel : "Choose Fuel"}
            </Text>
          </TouchableOpacity>
        </View>
        {/* Transmission Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Transmission</Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => handleOpenModal("transmission")}
          >
            <Text style={styles.modalButtonText}>
              {transmission ? transmission : "Choose Transmission"}
            </Text>
          </TouchableOpacity>
        </View>
        {/* Year of Manufacture */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Year of Manufacture</Text>
          <TextInput
            style={styles.input}
            placeholder="Year of Manufacture"
            value={yearOfManufacture}
            onChangeText={setYearOfManufacture}
          />
        </View>
        {/* Other Facilities Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Facilities</Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => handleOpenModal("otherFacilities")}
          >
            <Text style={styles.modalButtonText}>
              {otherFacilities.length > 0
                ? otherFacilitiesValue.join(", ")
                : "Choose Other Facilities"}
            </Text>
          </TouchableOpacity>
        </View>
        {/* Upload images */}
        {/* submit */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>

        {/* Modal */}
        <Modal
          visible={modalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={handleCloseModal}
        >
          <TouchableWithoutFeedback onPress={handleCloseModal}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Choose {modalField}</Text>
                {modalField === "autoMaker" &&
                  autoMakerList.map((option) => (
                    <TouchableOpacity
                      key={option.id}
                      style={styles.modalOption}
                      onPress={() => handleSelectOption(option.name)}
                    >
                      <Text>{option.name}</Text>
                    </TouchableOpacity>
                  ))}

                {modalField === "model" &&
                  modelList
                    .find((item) => item.autoMaker === autoMaker)
                    ?.model.map((option) => (
                      <TouchableOpacity
                        key={option.id}
                        style={styles.modalOption}
                        onPress={() => handleSelectOption(option.name)}
                      >
                        <Text>{option.name}</Text>
                      </TouchableOpacity>
                    ))}

                {modalField === "category" &&
                  categoryList.map((option) => (
                    <TouchableOpacity
                      key={option.id}
                      style={styles.modalOption}
                      onPress={() => handleSelectOption(option.name)}
                    >
                      <Text>{option.name}</Text>
                    </TouchableOpacity>
                  ))}

                {modalField === "fuel" &&
                  fuelList.map((option) => (
                    <TouchableOpacity
                      key={option.id}
                      style={styles.modalOption}
                      onPress={() => handleSelectOption(option.name)}
                    >
                      <Text>{option.name}</Text>
                    </TouchableOpacity>
                  ))}

                {modalField === "transmission" &&
                  transmissionList.map((option) => (
                    <TouchableOpacity
                      key={option.id}
                      style={styles.modalOption}
                      onPress={() => handleSelectOption(option.name)}
                    >
                      <Text>{option.name}</Text>
                    </TouchableOpacity>
                  ))}

                {modalField === "otherFacilities" &&
                  facilitiesServices.map((option) => (
                    <TouchableOpacity
                      key={option.id}
                      style={[
                        styles.modalOption,
                        otherFacilities.includes(option.id) &&
                          styles.modalOptionSelected,
                      ]}
                      onPress={() => handleSelectOption(option)}
                    >
                      <Text>{option.name}</Text>
                    </TouchableOpacity>
                  ))}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    // paddingHorizontal: 20,
    paddingVertical: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  priceRangeContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  priceInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 8,
    paddingHorizontal: 10,
    width: 30,
  },
  priceRangeSeparator: {
    alignSelf: "center",
    marginHorizontal: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
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
    marginBottom: 16,
    textAlign: "center",
  },
  modalOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  modalButton: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    justifyContent: "center",
    marginBottom: 10,
  },
  modalButtonText: {
    fontSize: 14,
  },
  fieldContainer: {
    marginBottom: 10,
    borderBottomWidth: 2,
    borderColor: "#e5e5e5",
    paddingHorizontal: 20,
  },
  label: {
    marginBottom: 5,
    fontWeight: "bold",
  },
  modalOptionSelected: {
    backgroundColor: "#e5e5e5",
  },
});

export default RegisterCar;
