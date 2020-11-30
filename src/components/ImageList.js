import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import ProgressiveImage from '../components/ProgressiveImage';
const ImageList = ({imageUri, imageClickHandler}) => {
  // const [isLoadable, setLoadable] = useState(false);

  // Linking.canOpenURL(imageUri).then((res) => {
  //   setLoadable(res);
  // });
  return (
    <View style={styles.container}>
      {/* {isLoadable ? ( */}
      <TouchableOpacity activeOpacity={0.7} onPress={imageClickHandler}>
        <ProgressiveImage
          resizeMode="cover"
          source={{
            uri: imageUri,
          }}
          thumbnailSource={require('../introAssets/newLoader.gif')}
          style={styles.image}
        />
      </TouchableOpacity>
      {/* ) : null} */}
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
