import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const ImageList = ({imageUri}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: imageUri}} style={styles.image} />
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
