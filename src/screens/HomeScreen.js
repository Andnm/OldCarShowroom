import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import COLORS from "../constants/colors";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../config/firebaseConfig";

const Home = () => {
  const { accessToken, userDecode } = useContext(AuthContext);

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const source = { uri: result.uri };
    console.log(source);
    setImage(source);
  };

  const uploadImage = async () => {
    setUploading(true);
    const response = await fetch(image.uri);
    const blob = await response.blob();
    const filename = image.uri.substring(image.uri.lastIndexOf("/") + 1);
    var ref = firebase.storage().ref().child(filename).put(blob);

    try {
      await ref;
    } catch (e) {
      console.log(e);
    }

    setUploading(false);
    Alert.alert("Photo Uploaded..!!");
    setImage(null);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 20, backgroundColor: COLORS.white }}
    >
      <View style={style.home_container}>
        {!userDecode ? (
          <View style={style.header}>
            <Text>Chưa login</Text>
          </View>
        ) : (
          <View style={style.header}>
            <TouchableOpacity style={style.selectButton} onPress={pickImage}>
              <Text>Pick an image</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  home_container: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Home;
