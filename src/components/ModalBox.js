import React from "react";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";
import COLORS from "../constants/colors";

const ModalBox = (props) => {
  const { open, bodyText, actionClose, actionYes, nameNo, nameYes } = props;

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={open}
        onRequestClose={() => {
          setModalVisible(!open);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{bodyText}</Text>

            <View style={styles.buttonActionContainer}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={actionClose}
              >
                <Text style={styles.textStyleNo}>{nameNo}</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonConfirm]}
                onPress={actionYes}
              >
                <Text style={styles.textStyleYes}>{nameYes}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
    flexDirection: 'row',
    gap: 10
  },
});

export default ModalBox;
