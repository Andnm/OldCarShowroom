import React, { useState, useContext, useEffect } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from "../context/authContext";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Text, View, Image, SafeAreaView, TouchableOpacity, FlatList, ImageBackground, StyleSheet, ScrollView, Dimensions } from "react-native";
import CardItem from "./CardItem";

import { getCarList } from "../api/car";

import COLORS from "../constants/colors";

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height;

const endowData = [
  {
    img: "https://img.freepik.com/premium-photo/banner-car-wheel-business-3d-render-illustration-wheel-black-background_37416-533.jpg?w=1380"
  },
  {
    img: "https://img.freepik.com/premium-photo/banner-car-wheel-business-3d-render-illustration-wheel-black-background_37416-533.jpg?w=1380"
  },
  {
    img: "https://img.freepik.com/premium-photo/banner-car-wheel-business-3d-render-illustration-wheel-black-background_37416-533.jpg?w=1380"
  },
]

const insuranceData = [
  {
    img: "https://static.ybox.vn/2021/9/6/1631955668259-Untitled%20design%20(99).png",
  },
  {
    img: "https://tuyendung.mic.vn/sharefb?file=/rws/mic_03_1605682833_1605777456.png"
  },
  {
    img: "https://ibaohiem.vn/wp-content/uploads/2022/10/Gioi-thieu-bao-hiem-hang-khong-VNI.jpg"
  }
]

const featureData = [
  {
    img: "https://img.freepik.com/free-psd/car-rental-automotive-web-banner-template_106176-2541.jpg?w=2000",
  },
  {
    img: "https://img.freepik.com/free-psd/car-rental-automotive-web-banner-template_106176-2541.jpg?w=2000",
  },
  {
    img: "https://img.freepik.com/free-psd/car-rental-automotive-web-banner-template_106176-2541.jpg?w=2000",
  },
  {
    img: "https://img.freepik.com/free-psd/car-rental-automotive-web-banner-template_106176-2541.jpg?w=2000",
  },
]

const placeData = [
  {
    img: "https://vietnamdiscovery.com/wp-content/uploads/thumbnail/Things-to-do-in-Ho-Chi-Minh-pg6c38tekgneaywawyn2rivhfpq3klkh8xrnn20fjw.jpg",
    name: "Hồ Chí Minh",
    carAmount: 1200,
  },
  {
    img: "https://vietnamdiscovery.com/wp-content/uploads/thumbnail/Things-to-do-in-Ho-Chi-Minh-pg6c38tekgneaywawyn2rivhfpq3klkh8xrnn20fjw.jpg",
    name: "Hồ Chí Minh",
    carAmount: 1200,
  },
  {
    img: "https://vietnamdiscovery.com/wp-content/uploads/thumbnail/Things-to-do-in-Ho-Chi-Minh-pg6c38tekgneaywawyn2rivhfpq3klkh8xrnn20fjw.jpg",
    name: "Hồ Chí Minh",
    carAmount: 1200,
  },
  {
    img: "https://vietnamdiscovery.com/wp-content/uploads/thumbnail/Things-to-do-in-Ho-Chi-Minh-pg6c38tekgneaywawyn2rivhfpq3klkh8xrnn20fjw.jpg",
    name: "Hồ Chí Minh",
    carAmount: 1200,
  },
]

const Home = ({ navigation }) => {

  const [title, setTitle] = useState('');
  const [carData, setCarData] = useState([]);
  const { accessToken, userDecode } = useContext(AuthContext);

  useEffect(() => {
    getTime()
  }, [])

  const getTime = async () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 11) {
      setTitle('Good morning!');
    } else if (currentHour >= 11 && currentHour < 13) {
      setTitle('Good afternoon!');
    } else if (currentHour >= 13 && currentHour < 18) {
      setTitle('Good afternoon!');
    } else if (currentHour >= 18 || currentHour < 5) {
      setTitle('Good evening!');
    } else {
      setTitle('Good morning!')
    }
    const data = await getCarList()
    setCarData(data)
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.white }}
    >
      <ScrollView style={style.home_container} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#19779B', '#17B3A6']}
          start={{
            x: 0.5,
            y: 0
          }}
          end={{
            x: 1,
            y: 1
          }}
          style={style.header}
        >
          {!userDecode ? (
            <Text
              style={style.userName}
            >
              {title}
            </Text>
          ) : (
            <Text>{userDecode.fullName}</Text>
          )}
        </LinearGradient>
        <Image
          source={
            { uri: "https://img.freepik.com/premium-photo/banner-car-wheel-business-3d-render-illustration-wheel-black-background_37416-533.jpg?w=1380" }
          }
          style={style.banner}
        />
        <View>
          <View style={style.endowHeader}>
            <Text style={style.endowText}>
              Current Offer
            </Text>
            <Icon name={"chevron-right"} color={"darkgray"} size={40} />
          </View>
        </View>
        <ScrollView
          style={style.endowSlide}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={WIDTH}
          decelerationRate="fast"
        >
          {endowData.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={(() => {
                  console.log("click");
                })}
                key={index}
              >
                <Image
                  source={{
                    uri: item.img
                  }}
                  style={style.endowImage}
                />
              </TouchableOpacity>
            )
          })}
        </ScrollView>
        <View style={style.insurance}>
          <Text style={style.endowText}>
            insurance partner
          </Text>
        </View>
        <ScrollView
          style={style.endowSlide}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {insuranceData.map((item, index) => {
            return (
              <Image
                key={index}
                source={{
                  uri: item.img
                }}
                style={style.insuranceImage}
                resizeMode="contain"
              />
            )
          })}
        </ScrollView>
        <View style={style.insurance}>
          <Text style={style.endowText}>
            salient features
          </Text>
        </View>
        <ScrollView
          style={style.featureSlide}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {featureData.map((item, index) => {
            return (
              <Image
                key={index}
                source={{
                  uri: item.img
                }}
                style={style.featureImage}
                resizeMode="contain"
              />
            )
          })}
        </ScrollView>
        <View style={style.insurance}>
          <Text style={style.endowText}>
            Highlights
          </Text>
        </View>
        <ScrollView
          style={style.featureSlide}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {placeData.map((item, index) => {
            return (
              <View
                style={style.place}
                key={index}
              >
                <LinearGradient
                  colors={['rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 0)']}
                  start={{
                    x: 0,
                    y: 1
                  }}
                  end={{
                    x: 0,
                    y: 0.3
                  }}
                  style={style.placeBackgound}
                />
                <Image
                  source={{
                    uri: item.img
                  }}
                  style={style.placeImage}
                  resizeMode="cover"
                />
                <View style={style.placeInfor}>
                  <Text style={{ color: "white" }}>{item.name}</Text>
                  <Text style={{ color: "white" }}>{item.carAmount}+ xe</Text>
                </View>
              </View>

            )
          })}
        </ScrollView>
        <ImageBackground
          source={{
            uri: "https://st.depositphotos.com/2098885/3243/v/600/depositphotos_32432527-stock-illustration-car-silhouette-with-lights-on.jpg"
          }}
          style={style.carRegistration}
        >
          <Text style={{
            color: "white",
            fontWeight: 700,
            fontSize: 25,
            marginVertical: WIDTH * 0.02,
            marginHorizontal: 15,
          }}>
            Bạn muốn cho thuê xe
          </Text>
          <Text style={{
            color: "white",
            marginVertical: WIDTH * 0.02,
            marginHorizontal: 15,
          }}
          >
            Hãy đăng kí trở thành dối tác của chúng tôi để có cơ hội kiếm thêm thu nhập hàng tháng
          </Text>
          <TouchableOpacity style={style.registrationButton}>
            <Text style={{ color: "white", fontSize: 18, textTransform: "uppercase", }}>SIGN UP NOW</Text>
          </TouchableOpacity>
        </ImageBackground>
        <View style={style.insurance}>
          <Text style={style.endowText}>
            Car Lists
          </Text>
        </View>
        <View style={style.carList} >
          {carData[0] ?
            carData.map((item, key) => {
              return <CardItem navigation={navigation} car={item} key={key} />;
            })
            :
            <Text
              style={{
                width: WIDTH * 0.9,
                fontSize: 20,
                textAlign: "center",
              }}
            >Showroom doesn't have any car yet!
            </Text>
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  home_container: {
    flex: 1
    // justifyContent: "center",
    // alignItems: "center",
  },
  header: {
    width: WIDTH,
    height: HEIGHT * 0.15,
    paddingBottom: HEIGHT * 0.05,
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userName: {
    marginHorizontal: 50,
    color: "white",
    fontWeight: 700,
    fontSize: 25
  },
  banner: {
    width: WIDTH * 0.94,
    height: WIDTH * 0.2,
    borderRadius: 5,
    marginHorizontal: WIDTH * 0.03,
    transform: [{ translateY: -30 }]
  },
  endow: {

  },
  endowHeader: {
    width: WIDTH * 0.94,
    marginHorizontal: WIDTH * 0.03,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  endowText: {
    fontWeight: 500,
    textTransform: "uppercase",
  },
  endowSlide: {
    height: WIDTH * 0.25,
    flexDirection: "row",
  },
  endowImage: {
    width: WIDTH * 0.9,
    height: WIDTH * 0.25,
    borderRadius: 5,
    marginHorizontal: WIDTH * 0.05,
  },
  insurance: {
    marginHorizontal: WIDTH * 0.03,
    marginVertical: 15,
  },
  insuranceImage: {
    width: WIDTH * 0.3,
    height: WIDTH * 0.2,
    marginHorizontal: WIDTH * 0.017,
    borderColor: "rgba(0, 0, 0, 0.5)",
    borderWidth: 1,
    borderRadius: 5,
  },
  featureSlide: {
    // height: WIDTH * 0.25,
    flexDirection: "row",
  },
  featureImage: {
    width: WIDTH * 0.6,
    height: WIDTH * 0.4,
    marginHorizontal: WIDTH * 0.015,
    borderRadius: 5.
  },
  place: {
    position: "relative",
    width: WIDTH * 0.3,
    height: WIDTH * 0.3,
    marginHorizontal: WIDTH * 0.015,
    borderRadius: 5,
    overflow: "hidden"
  },
  placeBackgound: {
    position: "absolute",
    width: WIDTH * 0.3,
    height: WIDTH * 0.3,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 10,
  },
  placeImage: {
    position: "absolute",
    width: WIDTH * 0.3,
    height: WIDTH * 0.3,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  placeInfor: {
    position: "absolute",
    width: WIDTH * 0.3,
    bottom: WIDTH * 0.015,
    left: WIDTH * 0.015,
    color: "white",
    zIndex: 999
  },
  carRegistration: {
    width: WIDTH,
    height: HEIGHT * 0.4,
    borderWidth: 1,
    marginVertical: HEIGHT * 0.03,
    justifyContent: "center",
  },
  registrationButton: {
    width: WIDTH * 0.4,
    color: "white",
    backgroundColor: "rgb(145,212,183)",
    alignItems: "center",
    padding: 15,
    borderRadius: 5,
    marginHorizontal: 15,
    marginVertical: 15,
  },
  carList: {
    width: WIDTH * 0.9,
    marginHorizontal: WIDTH * 0.05,
    flexDirection: "row",
    flexWrap: "wrap",
  }
});

export default Home;