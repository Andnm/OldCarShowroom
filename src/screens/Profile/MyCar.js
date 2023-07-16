import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Image } from 'react-native-svg';
import add_car  from '../../assets/svg/add-car.svg'

const MyCar = () => {
  return (
    <View>
      <Svg width={200} height={200}>
        <Image
          width={200}
          height={200}
          href={add_car}
        />
      </Svg>
    </View>
  );
};

export default MyCar;
