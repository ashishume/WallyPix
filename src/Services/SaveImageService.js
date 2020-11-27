import CameraRoll from '@react-native-community/cameraroll';
import RNFetchBlob from 'rn-fetch-blob';

export const SaveImageService = async (imageUri) => {
  RNFetchBlob.config({
    fileCache: true,
    appendExt: 'jpg',
  })
    .fetch('GET', imageUri)
    .then((res) => {
      CameraRoll.save(res.data, {type: 'photo', album: 'Wally Pix'})
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    })
    .catch((error) => console.log(error));
};
