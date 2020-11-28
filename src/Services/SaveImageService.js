import CameraRoll from '@react-native-community/cameraroll';
import {ToastAndroid} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {storeData} from './StorageService';

export const SaveImageService = async (props) => {
  RNFetchBlob.config({
    fileCache: true,
    appendExt: 'jpg',
  })
    .fetch('GET', props.imageUri)
    .then((res) => {
      CameraRoll.save(res.data, {type: 'photo', album: 'Wally Pix'})
        .then((result) => {
          const obj = {
            id: props.imageId,
            uri: result,
          };
          storeData('downloaded_image', obj);
        })
        .catch((err) => {
          ToastAndroid.show('Failed to download', ToastAndroid.LONG);
        });
    })
    .catch((error) =>
      ToastAndroid.show('Failed to download', ToastAndroid.LONG),
    );
};
