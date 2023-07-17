import React, { useState, useContext } from "react";
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

const InfoAccount = ({ navigation }) => {
  const { userDecode } = useContext(AuthContext);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const handleCloseBottomSheet = () => {
    setBottomSheetVisible(false);
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
        <Text style={style.headerTitle}>Profile</Text>
        <Icon
          name="dots-horizontal"
          color={"white"}
          size={30}
          onPress={() => setBottomSheetVisible(true)}
        />
      </View>

      <View>
        <Image
          source={{
            uri: "https://static.danhgiaxe.com/data/201544/mitsubishi-pajero-sport-46_4369_827.jpg",
          }}
          style={style.image}
          resizeMode="cover"
        />
        <View style={style.overlay} />
        <View style={style.circle}>
          <Image
            source={{
              uri: userDecode.imgUrl ? userDecode.imgUrl : "https://i.pinimg.com/originals/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg",
            }}
            style={style.imageProfile}
            resizeMode="cover"
          />
        </View>
      </View>

      <View style={style.userInfo}>
        <Text style={style.fullNameText}>{userDecode.fullName}</Text>
        <Text style={style.joinDateText}>Ngày tham gia: 2023-07-17</Text>
      </View>

      <View style={style.anotherInfo}>
        <View style={style.labelContainer}>
          <Text style={style.labelText}>Day of Birth</Text>
          <Text style={style.labelText}>Gender</Text>
          <Text style={style.labelText}>Address</Text>
        </View>

        <View style={style.infoContainer}>
          <Text style={style.valueText}>
            {userDecode.dob ? userDecode.dob : "Not updated"}
          </Text>
          <Text style={style.valueText}>
            {userDecode.gender ? userDecode.gender : "Not updated"}
          </Text>
          <Text style={style.valueText}>
            {userDecode.address ? userDecode.address : "Not updated"}
          </Text>
        </View>
      </View>

      <View style={style.contactInfo}>
        <View style={style.labelContainer}>
          <Text style={style.labelText}>Phone</Text>
          <Text style={style.labelText}>Email</Text>
        </View>

        <View style={style.infoContainer}>
          <Text style={style.valueTextContact}>
            {userDecode.phone ? userDecode.phone : "Not updated"}
          </Text>
          <Text style={style.valueTextContact}>
            {userDecode.email ? "Connected" : "Not updated"}
          </Text>
        </View>
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

              <TouchableOpacity style={style.modalOption}>
                <Icon
                  name="circle-edit-outline"
                  size={20}
                  color={COLORS.black}
                  style={style.icon}
                />
                <Text>Edit profile</Text>
              </TouchableOpacity>

              <TouchableOpacity style={style.modalOption}>
                <Icon
                  name="image-edit-outline"
                  size={20}
                  color={COLORS.black}
                  style={style.icon}
                />
                <Text>Change avatar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={style.modalOption}>
                <Icon
                  name="security"
                  size={20}
                  color={COLORS.black}
                  style={style.icon}
                />
                <Text>Change password</Text>
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
  image: {
    height: 150,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  circle: {
    position: "absolute",
    bottom: -62.5,
    alignSelf: "center",
    width: 125,
    height: 125,
    borderRadius: 62.5,
    borderWidth: 2,
    borderColor: COLORS.lightGray,
  },
  imageProfile: {
    flex: 1,
    borderRadius: 62.5,
  },
  userInfo: {
    marginTop: 65,
    paddingBottom: 20,
    alignItems: "center",
    borderBottomWidth: 4,
    borderColor: "#e5e5e5",
  },
  fullNameText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  joinDateText: {
    fontSize: 16,
    color: COLORS.gray,
  },
  anotherInfo: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    borderBottomWidth: 4,
    borderColor: "#e5e5e5",
    paddingBottom: 10,
  },
  infoContainer: {
    marginLeft: 30,
  },
  labelText: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  valueText: {
    fontSize: 16,
    marginVertical: 10,
    color: COLORS.gray,
  },
  contactInfo: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    borderBottomWidth: 4,
    borderColor: "#e5e5e5",
    paddingBottom: 10,
  },
  valueTextContact: {
    fontSize: 16,
    marginVertical: 10,
    color: COLORS.gray,
    marginLeft: 45,
  },
  //bottom sheet modal
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
    borderColor: COLORS.lightGray
  },
  icon: {
    marginRight: 10
  }
});

export default InfoAccount;
