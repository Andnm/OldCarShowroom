import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Image } from 'react-native-svg';
import car_favorite from '../../assets/svg/car-favorite.svg'

const MyCar = () => {
  return (
    <View>
      <Svg width={200} height={200}>
        <Image
          width={200}
          height={200}
          href={car_favorite}
        />
      </Svg>
    </View>
  );
};

export default MyCar;
