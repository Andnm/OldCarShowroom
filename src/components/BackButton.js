import { TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";
import React from 'react';
import { useNavigation } from "@react-navigation/native";

// import BackArrow from "../assets/BackArrow.png"

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height;

const BackButton = () => {

    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {navigation.goBack()}}
        >
            <Image
                style={styles.icon}
                source={require('../assets/BackArrow.png')}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        width: WIDTH,
        height: 80,
        backgroundColer: "white",
        top: 0,
    },
    icon: {
        position: "absolute",
        width: 50,
        height: 40,
        bottom: 0,
        left: 15,
    }
});

export default BackButton