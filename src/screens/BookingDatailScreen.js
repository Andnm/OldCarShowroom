import React, { useState, useEffect, useCallback, useContext } from "react";
import { View, SafeAreaView, StyleSheet, Text, TextInput, Image, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";

import COLORS from "../constants/colors";
import { slotList } from "../constants/slot";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const BookingDetail = ({ navigation, route }) => {

    const bookingDetail = route.params.booking
    const [disableButton, setDisableButton] = useState(true)

    const getSlotTime = (slot) => {
        let time = slot
        slotList.map((item, key) => {
            if (item.name === slot) {
                time = item.time
            }
        })
        return time
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "Cancelled":
                return COLORS.red;
            case "Success":
                return "#0f8652";
            default:
                return 'black';
        }
    };

    function shortenPrice(price) {
        if (price >= 1000000000) {
            return (
                (price / 1000000000).toFixed(price % 1000000000 !== 0 ? 3 : 0) + "B"
            );
        } else if (price >= 1000000) {
            return (price / 1000000).toFixed(price % 1000000 !== 0 ? 3 : 0) + "M";
        } else if (price >= 1000) {
            return (price / 1000).toFixed(price % 1000 !== 0 ? 1 : 0) + "K";
        } else {
            return price.toString();
        }
    }

    const checkConfirm = (status) => {
        switch (status) {
            case "Cancelled":
                return false;
            default:
                return true;
        }
    }

    const line = () => {
        return <View style={style.line}></View>;
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white}}>
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
            <ScrollView
                style={[style.container, !disableButton && {marginBottom: 55}]}
                showsVerticalScrollIndicator={false}
            >
                <View style={style.bookingHeader}>
                    <ScrollView
                        style={style.imageList}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        {
                            bookingDetail.car.images.map((image, key) => {
                                return (
                                    <Image
                                        style={style.headerImage}
                                        source={{
                                            uri: image
                                        }}
                                        key={key}
                                    />
                                )
                            })
                        }
                    </ScrollView>

                    <LinearGradient
                        colors={["rgba(0, 0, 0, 0.7)", "rgba(0, 0, 0, 0)"]}
                        start={{
                            x: 0,
                            y: 1,
                        }}
                        end={{
                            x: 0,
                            y: 0,
                        }} style={style.headerDetail}>
                        <Text style={style.headerName}>{bookingDetail.car.name}</Text>
                        <Text style={style.headerLicense}>License Plate : {bookingDetail.car.licensePlate}</Text>
                    </LinearGradient>
                </View>
                <View style={style.bookingBody}>
                    <View style={style.bodyStatus}>
                        <View style={{ ...style.dots, backgroundColor: getStatusColor(bookingDetail.status) }} />
                        {checkConfirm(bookingDetail.status) ?
                            <View style={style.bodyStatusText}>
                                <Text style={style.status}>
                                    {bookingDetail.status}
                                </Text>
                            </View>
                            :
                            <View style={style.bodyStatusText}>
                                <Text style={style.status}>
                                    {bookingDetail.status}
                                </Text>
                                <Text style={style.reason}>
                                    Reason :
                                </Text>
                            </View>
                        }
                    </View>
                    {line()}
                    <Text style={style.title}>Time</Text>
                    <View style={style.bodyTime}>
                        <Icon
                            name="calendar-clock-outline"
                            size={20}
                            color={COLORS.black}
                            style={style.timeIcon}
                        />
                        <View style={style.bodyTimeText}>
                            <Text style={style.Time}>
                                Time : {getSlotTime(bookingDetail.slot)}
                            </Text>
                            <Text style={style.price}>
                                Price : {shortenPrice(bookingDetail.car.minPrice)} - {shortenPrice(bookingDetail.car.maxPrice)} VND{" "}
                            </Text>
                        </View>
                    </View>
                    {line()}
                </View>
                <View style={style.section}>
                    <Text style={style.sectionTitle}>
                        <Text style={style.sectionTitleBorder}>Car Information</Text>
                    </Text>

                    <View style={style.infoUserContainer}>
                        <Icon
                            name="image-text"
                            size={23}
                            color={COLORS.black}
                            style={style.infoIcon}
                        />
                        <Text style={style.requiredField}></Text>
                        <TextInput
                            style={style.infoInput}
                            placeholder={'License Plate: ' + bookingDetail.car.licensePlate}
                            placeholderTextColor={COLORS.black}
                            editable={false}
                        />
                    </View>

                    <View style={style.infoUserContainer}>
                        <Icon
                            name="car"
                            size={23}
                            color={COLORS.black}
                            style={style.infoIcon}
                        />
                        <Text style={style.requiredField}></Text>
                        <TextInput
                            style={style.infoInput}
                            placeholder={'Name: ' + bookingDetail.car.name}
                            placeholderTextColor={COLORS.black}
                            editable={false}
                        />
                    </View>

                    <View style={style.infoUserContainer}>
                        <Icon
                            name="cog"
                            size={23}
                            color={COLORS.black}
                            style={style.infoIcon}
                        />
                        <Text style={style.requiredField}></Text>
                        <TextInput
                            style={style.infoInput}
                            placeholder={"Transmission: " + bookingDetail.car.transmission}
                            placeholderTextColor={COLORS.black}
                            editable={false}
                        />
                    </View>
                    <View style={style.infoUserContainer}>
                        <Icon
                            name="currency-usd"
                            size={23}
                            color={COLORS.black}
                            style={style.infoIcon}
                        />
                        <Text style={style.requiredField}></Text>
                        <TextInput
                            style={style.infoInput}
                            placeholder={"Price: " + shortenPrice(bookingDetail.car.minPrice) + " - " + shortenPrice(bookingDetail.car.maxPrice)}
                            placeholderTextColor={COLORS.black}
                            editable={false}
                        />
                    </View>
                    <View style={style.infoUserContainer}>
                        <Icon
                            name="fuel"
                            size={23}
                            color={COLORS.black}
                            style={style.infoIcon}
                        />
                        <Text style={style.requiredField}></Text>
                        <TextInput
                            style={style.infoInput}
                            placeholder={"Fuel: " + bookingDetail.car.fuel}
                            placeholderTextColor={COLORS.black}
                            editable={false}
                        />
                    </View>
                    <View style={style.infoUserContainer}>
                        <Icon
                            name="speedometer"
                            size={23}
                            color={COLORS.black}
                            style={style.infoIcon}
                        />
                        <Text style={style.requiredField}></Text>
                        <TextInput
                            style={style.infoInput}
                            placeholder="Fuel consumption: 6.0l/100km"
                            placeholderTextColor={COLORS.black}
                            editable={false}
                        />
                    </View>
                </View>
            </ScrollView>

            {!disableButton &&
                <TouchableOpacity
                    style={style.orderFeild}
                // onPress={handleNavigationToBooking}
                >
                    <View
                        style={
                            style.orderButton
                        }
                    >
                        <Text
                            style={{
                                color: "white",
                                fontSize: 25,
                                fontWeight: 500,
                            }}
                        >
                            Cancle
                        </Text>
                    </View>
                </TouchableOpacity>
            }
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
    },
    line: {
        width: WIDTH,
        height: 7,
        backgroundColor: "#e5e5e5",
        marginVertical: 10,
    },
    title: {
        textTransform: "capitalize",
        fontSize: 18,
        fontWeight: 500,
        paddingHorizontal: 18
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
    bookingHeader: {
        position: "relative",
    },
    imageList: {
        // alignSelf: "flex-start",
        height: WIDTH * 0.75,
    },
    headerImage: {
        width: WIDTH,
        // height: WIDTH * 0.8,
        resizeMode: "cover",
    },
    headerDetail: {
        position: "absolute",
        width: WIDTH,
        height: WIDTH * 0.2,
        paddingHorizontal: 15,
        justifyContent: "flex-end",
        bottom: 0,
        left: 0,
        zIndex: 999,
    },
    headerName: {
        color: COLORS.white,
        textTransform: "uppercase",
        fontSize: 25,
    },
    headerLicense: {
        color: COLORS.white,
        paddingBottom: 15,
    },
    bookingBody: {
        position: "relative",
        width: WIDTH,
    },
    bodyStatus: {
        flexDirection: "row",
        paddingTop: 15,
    },
    dots: {
        width: 15,
        height: 15,
        borderRadius: 15,
        marginHorizontal: 15,
        transform: [{ translateY: 5 }],
    },
    bodyStatusText: {
        width: WIDTH
    },
    status: {
        fontSize: 18,
        fontWeight: 500,
    },
    timeIcon: {
        borderWidth: 1,
        borderRadius: 50,
        padding: 10,
        marginHorizontal: 10,
        // transform: [{ translateY: 2 }],
    },
    bodyTime: {
        flexDirection: "row",
        paddingHorizontal: 15,
        marginVertical: 15,
    },
    orderFeild: {
        position: "absolute",
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: "rgba(0, 0, 0, 0.3)",
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },
    orderButton: {
        width: WIDTH * 0.9,
        height: 50,
        marginHorizontal: WIDTH * 0.05,
        backgroundColor: COLORS.orange,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },

    // car informaion
    requiredField: {
        color: COLORS.red,
        fontSize: 15,
        marginRight: 12,
    },
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
    infoContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },
    infoUserContainer: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
    },
    infoIcon: {
        // marginRight: 5,
    },
});

export default BookingDetail