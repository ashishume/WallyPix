import React, {useEffect, useState} from 'react';
import {SCREEN_WIDTH_RESOLUTION} from '../../Services/CategoryService';
import {View, Text, StyleSheet, Image, ActivityIndicator} from 'react-native';
import {
  ADS_ID,
  COLOR_SCHEME,
  FONT_FAMILY,
  RESOLUTION_PIXELS,
} from '../../../enviroment';
import {getModel, getBrand} from 'react-native-device-info';
const SplashScreen = (props) => {
  const [device, setDevice] = useState('');
  const [resolution, setResolution] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      await setResolution(RESOLUTION_PIXELS[SCREEN_WIDTH_RESOLUTION]);
      await setDevice(getBrand() + ' ' + getModel());

      await setTimeout(() => {
        props.navigation.navigate('Dashboard');
      }, 2000);
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/wallyPix.jpg')}
        style={styles.image}
      />
      <Text style={styles.heading}>Wally Pix</Text>
      <Text style={styles.text}>Wallpaper adapts based on your display</Text>
      <Text style={styles.device}>{device}</Text>
      <Text style={styles.resolution}>{resolution}</Text>
      <ActivityIndicator size={45} color={COLOR_SCHEME.secondaryTextColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {width: 200, height: 200},
  heading: {
    ...FONT_FAMILY,
    fontSize: 50,
    color: 'orange',
  },
  text: {...FONT_FAMILY, color: 'gray', fontSize: 17, textAlign: 'center'},
  device: {
    ...FONT_FAMILY,
    fontSize: 25,
  },
  resolution: {
    ...FONT_FAMILY,
    fontSize: 20,
  },
});

export default SplashScreen;
