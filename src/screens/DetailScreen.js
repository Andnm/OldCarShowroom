import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions, SafeAreaView } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import COLORS from "../constants/colors";

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height;

const Detail = ({ navigation, route }) => {

    const car = route.params.car

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: COLORS.white }}
        >
            <View style={style.backButton}>
                <TouchableOpacity
                    style={style.headButton}
                    onPress={() => {
                        navigation.goBack()
                    }}
                >
                    <Icon name={"chevron-left"} color={"darkgray"} size={40} />
                </TouchableOpacity>
                <Text style={style.headName}>{car.name}</Text>
                <TouchableOpacity
                    style={style.headButton}
                >
                    <Icon name={"dots-vertical"} color={"darkgray"} size={40} />
                </TouchableOpacity>
            </View>
            <ScrollView
                style={style.slide}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={WIDTH}
                decelerationRate="fast"
            >
                {car.images.map((item, key) => {
                    return (
                        <Image
                            source={{
                                uri: item
                            }}
                            style={style.imageSlide}
                            resizeMode="contain"
                        />
                    )
                })}
            </ScrollView>

        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    backButton: {
        position: "absolute",
        width: WIDTH,
        height: HEIGHT * 0.06,
        borderWidth: 1,
        top: HEIGHT * 0.03,
        backgroundColor: "#000000",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    headButton: {
        marginHorizontal: 10
    },
    headName:{
        color: "white",
        textTransform: "uppercase",
        fontSize: 20,
    },
    slide: {
        width: WIDTH,
        height: WIDTH * 0.6,
        marginTop: HEIGHT * 0.095
    },
    imageSlide: {
        width: WIDTH,
        height: WIDTH * 0.6
    }
});

export default Detail