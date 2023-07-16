import { TouchableOpacity, Image, StyleSheet } from "react-native";
import React from 'react';

import BackArrow from "../assets/BackArrow.png"

const BackButton = ({ navigation }) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {
                navigation.goBack();
            }}
        >
            <Image
                style={styles.icon}
                source={BackArrow}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        display: "fixed",
        width: "100%",
        height: 80,
        backgroundColer: "white",
        top: 0,
    },
    icon: {
        position: "absolute",
        width: 50,
        height: "50%",
        bottom: 0,
        left: 15,
    }
});

export default BackButton