import React, {Fragment, useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  RefreshControl,
  StatusBar,
  View,
  Dimensions,
} from 'react-native';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import ImageList from '../../components/ImageList';
// import data from '../../assets/data.json';
import {
  HomePageService,
  SCREEN_WIDTH_RESOLUTION,
} from '../../Services/HomePageService';

const {width, height} = Dimensions.get('window');

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
  const [page, setPage] = useState(1);

  const renderListItem = (data) => (
    <ImageList
      imageClickHandler={() => imageClickHandler(data.item)}
      imageUri={data.item.imageUri}
    />
  );

  const imageClickHandler = (e) => {
    console.log(e);
  };

  useEffect(() => {
    const fetchAllImages = async () => {
      const data = await HomePageService();
      setUri(data);
    };
    fetchAllImages();
  }, []);

  // let
  const endScrolling = async () => {
    await setPage((prev) => {
      return prev + 1;
    });
    const lazyData = await HomePageService(page);

    await setUri((prevData) => {
      return [...prevData, ...lazyData];
    });
  };

  return (
    <View style={styles.container}>
      {/* <SkeletonLoader /> */}
      <FlatList
        columnWrapperStyle={{justifyContent: 'space-between'}}
        data={uri}
        numColumns={2}
        renderItem={renderListItem}
        onEndReachedThreshold={0.4}
        keyExtractor={(item) => item.id}
        onEndReached={() => endScrolling()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
    paddingBottom: 120,
    // paddingBottom:500,
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
