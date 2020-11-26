import React, {Fragment} from 'react';
import {
  Button,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  NativeModules,
  Platform,
} from 'react-native';
import data from '../../assets/data.json';

const Dashboard = (props) => {
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

  const setWallpaper = (uri) => {
    console.log('clicked');
    ManageWallpaper.setWallpaper(
      {
        uri: uri,
      },
      (e) => {
        console.log(e);
      },
      TYPE.HOME,
    );
  };
  return (
    <View>
      <ScrollView>
        {data.map((value, i) => {
          return (
            <Fragment key={i}>
              <Image
                source={{uri: value.path}}
                style={{width: 200, height: 350, resizeMode: 'cover'}}
              />
              <TouchableOpacity
                style={{
                  paddingHorizontal: 30,
                  paddingVertical: 8,
                  marginBottom: 24,
                  borderRadius: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                }}
                onPress={() => setWallpaper(value.path)}
                title="set wallpaper">
                <Text>Press mee</Text>
              </TouchableOpacity>
            </Fragment>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Dashboard;
