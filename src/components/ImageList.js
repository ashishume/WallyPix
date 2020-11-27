import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import ProgressiveImage from './ProgressiveImage';
const {width, height} = Dimensions.get('window');

const ImageList = ({imageUri}) => {
  return (
    <View style={styles.container}>
      <ProgressiveImage
        resizeMode="cover"
        source={{
          uri: imageUri,
        }}
        thumbnailSource={require('../assets/newLoader.gif')}
        style={styles.image}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  image: {
    height: 300,
    width: width / 2 - 20,
    borderRadius: 20,
    resizeMode: 'cover',
  },
});
export default ImageList;
