import React from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
const {width, height} = Dimensions.get('window');
import ProgressiveImage from '../components/ProgressiveImage';
const ImageList = ({imageUri, imageClickHandler}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.7} onPress={imageClickHandler}>
        <ProgressiveImage
          resizeMode="cover"
          source={{
            uri: imageUri,
          }}
          thumbnailSource={require('../assets/newLoader.gif')}
          style={styles.image}
        />
      </TouchableOpacity>
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
