import React, {Fragment, useEffect, useState} from 'react';
import {Text, StyleSheet, RefreshControl, StatusBar, View} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import ImageList from '../../components/ImageList';
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

  const renderListItem = (data) => <ImageList imageUri={data.item.imageUri} />;

  useEffect(() => {
    const fetchAllImages = async () => {
      const data = await HomePageService();
      setUri(data);
    };
    fetchAllImages();
  }, []);
  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>Latest</Text> */}
      <FlatList
        columnWrapperStyle={{justifyContent: 'space-between'}}
        data={uri}
        numColumns={2}
        renderItem={renderListItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 40,
    marginHorizontal: 10,
    fontFamily: 'FontAwesome5_Brands',
    fontWeight: 'bold',
  },
});

export default Dashboard;
