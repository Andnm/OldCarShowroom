import React, { useState, useContext, useEffect } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from "../context/authContext";
import { useFocusEffect } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Text, View, Image, SafeAreaView, TouchableOpacity, FlatList, ImageBackground, StyleSheet, ScrollView, Dimensions } from "react-native";
import CardItem from "./CardItem";

import { getCarList } from "../api/car";

import COLORS from "../constants/colors";

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height;

const endowData = [
  {
    img: "https://img.freepik.com/premium-psd/car-sale-instagram-post-banner-design-template_509525-130.jpg?w=2000"
  },
  {
    img: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/car-sales-design-template-4fa0be6f6e087076f86446916d2ccf74_screen.jpg?ts=1689300513"
  },
  {
    img: "https://vir.com.vn/stores/news_dataimages/2022/112022/12/11/b726fd37886053a1aaeae7904430b0bd.jpg?rt=20221112110948"
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
    img: "https://images.netdirector.co.uk/gforces-auto/image/upload/w_372,h_279,q_auto,c_fill,f_auto,fl_lossy/auto-client/4b6918643ab0d73c77b93833ac2a0487/sell_your_car_used_car_page_mob6.jpg",
  },
  {
    img: "https://gomechanic.in/blog/wp-content/uploads/2022/06/Blog.jpg",
  },
  {
    img: "https://blog.sbtjapan.com/wp-content/uploads/2022/11/MicrosoftTeams-image-4.png",
  },
  {
    img: "https://carsguide-res.cloudinary.com/image/upload/f_auto%2Cfl_lossy%2Cq_auto%2Ct_default/v1/editorial/2006-Suzuki-Swift-hatchback-blue-1200x800.jpg",
  },
]

const placeData = [
  {
    img: "https://vietnamdiscovery.com/wp-content/uploads/thumbnail/Things-to-do-in-Ho-Chi-Minh-pg6c38tekgneaywawyn2rivhfpq3klkh8xrnn20fjw.jpg",
    name: "Hồ Chí Minh",
    carAmount: 1200,
  },
  {
    img: "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/07/ho-hoan-kiem-3.jpg",
    name: "Hà Nội",
    carAmount: 2100,
  },
  {
    img: "https://cdn.tgdd.vn/Files/2021/06/22/1362277/tat-tan-tat-kinh-nghiem-du-lich-da-lat-checkin-o-dau-an-gi-202206031411593741.jpeg",
    name: "Đà Lạt",
    carAmount: 450,
  },
  {
    img: "https://statics.vinpearl.com/du-lich-da-nang_1657939501.JPG",
    name: "Đà Nẵng",
    carAmount: 200,
  },
]

const Home = ({ navigation }) => {

  const [title, setTitle] = useState('');
  const [carData, setCarData] = useState([]);
  const { accessToken, userDecode } = useContext(AuthContext);

  useFocusEffect(
    React.useCallback(() => {
      getTime()
      getData()
    }, [])
  );

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
  };

  const getData = async () => {
    const data = await getCarList()
    const filterData = data.filter((item) => item.status === "Confirm");
    setCarData(filterData)
  }

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
            <View style={style.userDetail}>
              <Image
                source={{
                  uri: userDecode.imgUrl ? userDecode.imgUrl : "https://i.pinimg.com/originals/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"
                }}
                style={style.userAvt}
              />
              <TouchableOpacity
                onPress={() => navigation.navigate("Profile")}
              >
                <Text style={style.userName} >{userDecode.fullName}</Text>
              </TouchableOpacity>
            </View>
          )}
        </LinearGradient>
        <Image
          source={
            { uri: "https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.6435-9/53743427_2064018370341726_7663609325637599232_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=730e14&_nc_ohc=IKvdEmilKWQAX-tTUq8&_nc_ht=scontent.fsgn3-1.fna&oh=00_AfBnYgPoHTfTdeDWUx8GiQTj7iHYhhtDWpEHZqgsdeg2ug&oe=64E12E26" }
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
            You want to sale a car
          </Text>
          <Text style={{
            color: "white",
            marginVertical: WIDTH * 0.02,
            marginHorizontal: 15,
          }}
          >
            Register to become our partner for the opportunity to earn additional monthly income
          </Text>
          <TouchableOpacity
            style={style.registrationButton}
            onPress={() => navigation.navigate("RegisterCar")}
          >
            <Text style={{ color: "white", fontSize: 18, textTransform: "uppercase", }}>REGISTER NOW</Text>
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
    height: HEIGHT * 0.2,
    // paddingBottom: HEIGHT * 0.05,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  userName: {
    color: "white",
    fontWeight: 700,
    fontSize: 25,
    marginHorizontal: 15,
  },
  userAvt: {
    width: WIDTH * 0.18,
    height: WIDTH * 0.18,
    borderWidth: 5,
    borderColor: "white",
    borderRadius: 100,
    overflow: "hidden",
    marginLeft: 10,
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
    // paddingHorizontal: 15,
    paddingVertical: 10,
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