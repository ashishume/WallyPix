import React, {useState} from 'react';
import {Fragment} from 'react';
import {
  Modal,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  ToastAndroid,
  Dimensions,
  NativeModules,
  Image,
  Alert,
  View,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const {width, height} = Dimensions.get('window');

const ImageModal = (props) => {
  const [show, setShow] = useState(false);

  const setWallpaper = () => {
    setShow(true);
    // ManageWallpaper.setWallpaper(
    //   {
    //     uri: props.imageUri,
    //   },
    //   (e) => {
    //     console.log(e);
    //   },
    //   TYPE.HOME,
    // );
  };
  const TYPE = {
    HOME: 'home',
    LOCK: 'lock',
    BOTH: 'both',
  };

  const ManageWallpaper = {
    setWallpaper: (source, callback, type) => {
      NativeModules.ManageWallpaper.setWallpaper(
        Image.resolveAssetSource(source),
        type,
        callback,
      );
    },
  };
  return (
    <Fragment>
      {show == true ? (
        <Modal
          animationType="slide"
          visible={show}
          transparent={true}
          onRequestClose={() => setShow(false)}>
          <View style={styles.modalSelectContainer}>
            <View style={{width: width}}>
              <Text style={styles.modalSelectFont}>Home Screen</Text>
              <Text style={styles.modalSelectFont}>Lock Screen</Text>
              <Text style={styles.modalSelectFont}>Both</Text>
            </View>
            <TouchableOpacity onPress={() => setShow(false)}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      ) : null}
      <Modal
        animationType="slide"
        visible={props.isVisible}
        onRequestClose={() => props.modalToggle(false)}>
        {props.imageUri ? (
          <ImageBackground
            source={{uri: props.imageUri}}
            style={styles.modalImageBackground}>
            <TouchableOpacity
              onPress={() => props.modalToggle(false)}
              style={styles.closeButton}>
              <Icon size={40} color="#fff" name="close-circle-outline" />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setWallpaper()}
              style={styles.setWallpaper}
              onPressIn={() =>
                ToastAndroid.show('Set Wallpaper', ToastAndroid.SHORT)
              }>
              <Icon size={60} color="#fff" name="wallpaper" />
            </TouchableOpacity>
          </ImageBackground>
        ) : null}
      </Modal>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  modelImage: {
    height: height,
    width: width,
  },
  modalImageBackground: {
    width,
    height,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  setWallpaper: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  modalSelectContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    // alignSelf: 'center',
  },
  modalSelectFont: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
    backgroundColor: '#000',
    opacity: 0.4,
    borderBottomColor: '#000',
  },
});

export default ImageModal;
