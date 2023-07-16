import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import React from 'react';

import BackButton from "../components/BackButton";
import signupCar from "../assets/signupImage/signupCar.png"

const Signup = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <BackButton navigation={navigation} />
            <View style={styles.content}>

                <Text style={styles.title}>
                    Showroom
                </Text>
                <Image
                    style={styles.carIcon}
                    source={signupCar}
                />

                <View style={styles.form}>
                    <Text style={styles.welcome}>
                       Create account
                    </Text>
                    <View style={styles.inputView}>
                        <Text style={styles.label}>
                            Email
                        </Text>
                        <TextInput style={styles.input}></TextInput>
                    </View>
                    <View style={styles.inputView}>
                        <Text style={styles.label}>
                            Password
                        </Text>
                        <TextInput style={styles.input}></TextInput>
                    </View>
                    <View style={styles.inputView}>
                        <Text style={styles.label}>
                            Confirm password
                        </Text>
                        <TextInput style={styles.input}></TextInput>
                    </View>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>
                            Sign up
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F8FF",
    },
    content: {
        flex: 1,
        alignItems: "center",
    },
    title: {
        color: "#17B3A6",
        fontWeight: "700",
        fontSize: 40,
        fontStyle: "italic",
        // fontFamily: "Nunito",
    },
    carIcon: {
        width: "45%",
        height: "15%",
        marginBottom: 25,
    },
    form: {
        width: "80%",
        height: "38%",
    },
    welcome: {
        color: "#3A3A3A",
        fontSize: 20,
        fontWeight: 500,
    },
    inputView: {
        position: "relative",
        width: "100%",
        height: 50,
        borderRadius: 15,
        backgroundColor: "#F8F8FF",
        shadowOpacity: 0.1,
        boxShadow: '0 0 3.5px #7C7C8A',
        marginTop: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        width: "90%",
        height: "90%",
        // outlineWidth: 0
    },
    label: {
        position: "absolute",
        color: "#7C7C8A",
        padding: 5,
        fontWeight: 500,
        backgroundColor: "#F8F8FF",
        top: "-30%",
        left: 20,
    },
    button: {
        width: "100%",
        height: 50,
        borderRadius: 15,
        marginTop: 40,
        backgroundColor: "#19779B",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 20,
        fontWeight: 500,
    },
});

export default Signup