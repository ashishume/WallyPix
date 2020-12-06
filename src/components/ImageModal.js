import React, {useEffect, useState} from 'react';
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
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLOR_SCHEME} from '../../enviroment';
import {SaveImageService} from '../Services/SaveImageService';
import {deleteData, getData} from '../Services/StorageService';
const {width, height} = Dimensions.get('window');
const ImageModal = (props) => {
  const [show, setShow] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [showLoader, setLoader] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData('downloaded_image');
      if (data) {
        const res = data.some((value) => value.id === props.imageId);
        if (res == true) await setDownloaded(res);
      }
    };
    fetchData();
  }, []);

  const setWallpaper = async (type) => {
    await setLoader(true);

    let value;
    if (type == 'home') {
      value = TYPE.HOME;
    } else if (type == 'lock') {
      value = TYPE.LOCK;
    } else if (type == 'both') {
      value = TYPE.BOTH;
    }

    try {
      ManageWallpaper.setWallpaper(
        {
          uri: props.imageUri,
        },
        async (e) => {
          await setLoader(false);
          await props.modalToggle(false);
          await ToastAndroid.show(
            'Wallpaper set successfully',
            ToastAndroid.SHORT,
          );
        },
        value,
      );
    } catch (e) {
      ToastAndroid.show('Wallpaper was unable to set', ToastAndroid.SHORT);
    }
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
  const onDownloadHandler = async () => {
    try {
      await setLoader(true);
      await SaveImageService(props);
      await setLoader(false);
      await props.modalToggle(false);
      await ToastAndroid.show('Wallpaper saved to gallery', ToastAndroid.SHORT);
    } catch (e) {
      // console.log(e);
      ToastAndroid.show('Download failed', ToastAndroid.SHORT);
    }
  };

  const deleteFromGallery = async () => {
    await deleteData(props, 'downloaded_image');
    await props.modalToggle(false);
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
            <View style={styles.innerSelectContainer}>
              <TouchableOpacity
                activeOpacity={0.3}
                onPress={() => setWallpaper('home')}>
                <Text style={styles.modalSelectFont}>Home Screen</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.3}
                onPress={() => setWallpaper('lock')}>
                <Text style={styles.modalSelectFont}>Lock Screen</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.3}
                onPress={() => setWallpaper('both')}>
                <Text style={styles.modalSelectFont}>Both</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButtonContainer}
                onPress={() => setShow(false)}>
                <Text style={styles.cancelButton}>Cancel</Text>
              </TouchableOpacity>
            </View>
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
            {showLoader == true ? (
              <ActivityIndicator
                size={40}
                style={{marginTop: height / 2 - 50}}
                color={COLOR_SCHEME.primaryBackgroundColor}
              />
            ) : null}

            <TouchableOpacity
              onPress={() => props.modalToggle(false)}
              style={styles.closeButton}>
              <Icon size={40} color="#fff" name="close-circle-outline" />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setShow(true)}
              style={styles.setWallpaper}
              onPressIn={() =>
                ToastAndroid.show('Set Wallpaper', ToastAndroid.SHORT)
              }>
              <Icon size={60} color="#fff" name="wallpaper" />
            </TouchableOpacity>
            {downloaded == false ? (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => onDownloadHandler()}
                style={styles.downloadWallpaper}
                onPressIn={() =>
                  ToastAndroid.show('Download wallpaper', ToastAndroid.SHORT)
                }>
                <Icon size={60} color="#fff" name="download-circle" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => deleteFromGallery()}
                style={styles.downloadWallpaper}
                onPressIn={() =>
                  ToastAndroid.show('Delete', ToastAndroid.SHORT)
                }>
                <Icon size={60} color="#fff" name="delete-circle-outline" />
              </TouchableOpacity>
            )}
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
    bottom: 30,
    right: 10,
  },
  downloadWallpaper: {position: 'absolute', bottom: 30, left: 10},
  modalSelectContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalSelectFont: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 25,
    paddingVertical: 10,
    textAlign: 'center',
  },
  innerSelectContainer: {
    width: width - 70,
    backgroundColor: 'rgba(0, 0, 0,0.5)',
  },
  cancelButtonContainer: {
    padding: 10,
  },
  cancelButton: {
    textAlign: 'center',
    color: '#fff',
  },
});

export default ImageModal;
