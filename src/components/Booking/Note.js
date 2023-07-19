import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

const Note = (props) => {
  const { noteText, setNoteText } = props;
  const maxNoteLength = 120;

  const handleNoteChange = (text) => {
    if (text.length <= maxNoteLength) {
      setNoteText(text);
    }
  };

  return (
    <View style={styles.noteContainer}>
      <Text style={styles.noteTitle}>Note</Text>
      <Text style={styles.characterCount}>
        {noteText.length}/{maxNoteLength}
      </Text>
      <TextInput
        style={styles.noteInput}
        placeholder="Enter your note"
        placeholderTextColor={COLORS.gray}
        value={noteText}
        onChangeText={handleNoteChange}
        multiline
      />
    </View>
  );
};

const styles = StyleSheet.create({
  noteContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    borderBottomWidth: 7,
    borderBottomColor: "#e5e5e5",
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

export default Note;
