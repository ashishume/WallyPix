import React, {Fragment, useEffect} from 'react';
import MainRouting from './Routes/MainRouting';
import {StatusBar, PermissionsAndroid} from 'react-native';
// import {fcmService} from './Services/FCMService';
// import {localNotificationService} from './Services/LocalNotificationService';
// import {AddFCMToken} from './store/actions/fcmService';
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
          // console.log('You can use storage');
        } else {
          // console.log('Storage permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };

    requestStoragePermission();

    // fcmService.register(onRegister, onNotification, onOpenNotification);
    // localNotificationService.configure(onOpenNotification);

    // function onRegister(token) {
    //   console.log(token);
    //   // AddFCMToken(token);
    // }

    // function onNotification(notify) {
    //   const options = {
    //     soundName: 'default',
    //     playSound: true, //,
    //   };
    //   localNotificationService.showNotification(
    //     0,
    //     notify.title,
    //     notify.body,
    //     notify,
    //     options,
    //   );
    // }

    // function onOpenNotification(notify) {}

    // return () => {
    //   fcmService.unRegister();
    //   localNotificationService.unregister();
    // };
  }, []);

  return (
    <Fragment>
      <StatusBar backgroundColor="black" />
      <MainRouting />
    </Fragment>
  );
};
export default App;
