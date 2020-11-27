import React, {Fragment, useEffect} from 'react';
import MainRouting from './Routes/MainRouting';
import {StatusBar, PermissionsAndroid} from 'react-native';
const App = () => {
  useEffect(() => {
    const requestStoragePermission = async () => {
      try {
        const granted = await PermissionsAndroid.requestMultiple(
          [
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          ],
          {
            title: 'We need gallery access to download wallpapers',
            message:
              'App needs access to your storage' +
              'so you can download awesome 4k wallpapers',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the camera');
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };

    requestStoragePermission();
  }, []);

  return (
    <Fragment>
      <StatusBar backgroundColor="black" />
      <MainRouting />
    </Fragment>
  );
};
export default App;
