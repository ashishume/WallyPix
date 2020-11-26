import React, {Fragment, useEffect, useState} from 'react';
import {
  // Button,
  // Image,
  // ScrollView,
  // Text,
  // TouchableOpacity,
  // View,
  // NativeModules,
  // Platform,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
// import data from '../../assets/data.json';
import {
  HomePageService,
  SCREEN_WIDTH_RESOLUTION,
} from '../../Services/HomePageService';

const Dashboard = (props) => {
  // const TYPE = {
  //   HOME: 'home',
  //   LOCK: 'lock',
  //   BOTH: 'both',
  // };

  // const ManageWallpaper = {
  //   setWallpaper: (source, callback, type) => {
  //     NativeModules.ManageWallpaper.setWallpaper(
  //       Image.resolveAssetSource(source),
  //       type,
  //       callback,
  //     );
  //   },
  // };

  // const setWallpaper = (uri) => {
  //   console.log('clicked');
  //   ManageWallpaper.setWallpaper(
  //     {
  //       uri: uri,
  //     },
  //     (e) => {
  //       console.log(e);
  //     },
  //     TYPE.HOME,
  //   );
  // };

  const [uri, setUri] = useState([]);
  

  useEffect(() => {
    const fetchAllImages = async () => {
      const data = await HomePageService();
      setUri(data);
    };
    fetchAllImages();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {/* <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      /> */}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default Dashboard;
