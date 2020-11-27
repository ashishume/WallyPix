import React from 'react';
import {View, Animated, StyleSheet} from 'react-native';

const ProgressiveImage = (props) => {
  const thumbnailAnimated = new Animated.Value(0);
  const imageAnimated = new Animated.Value(0);

  const handleThumbnailLoad = () => {
    Animated.timing(thumbnailAnimated, {
      toValue: 1,
      useNativeDriver: true, // Add This line
    }).start();
  };
  const onImageLoad = () => {
    Animated.timing(imageAnimated, {
      toValue: 1,
      useNativeDriver: true, // Add This line
    }).start();
  };
  const {thumbnailSource, source, style} = props;
  return (
    <View style={styles.container}>
      <Animated.Image
        onLoad={handleThumbnailLoad}
        {...props}
        source={thumbnailSource}
        style={style}
      />
      <Animated.Image
        {...props}
        onLoad={onImageLoad}
        source={source}
        style={[styles.imageOverlay, style]}
      />
    </View>
  );
};

export default ProgressiveImage;

const styles = StyleSheet.create({
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
});
