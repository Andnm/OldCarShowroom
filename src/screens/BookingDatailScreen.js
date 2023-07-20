import React, { useState, useEffect, useCallback, useContext } from "react";
import { View, SafeAreaView, StyleSheet, Text, Image, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import COLORS from "../constants/colors";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const BookingDetail = ({ navigation, booking }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={style.container}>
                <View style={style.header}>
                    <Icon
                        name="arrow-left"
                        color={"white"}
                        size={28}
                        onPress={() => navigation.goBack()}
                    />
                    <Text style={style.headerTitle}>Booking Detail</Text>
                    <Icon
                        name="dots-vertical"
                        color={"white"}
                        size={30}
                    // onPress={() => setBottomSheetVisible(true)}
                    />
                </View>
                <Text>booking detail</Text>
            </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        width: WIDTH,
        height: 70,
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
});

export default BookingDetail