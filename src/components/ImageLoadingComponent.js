import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
  Text,
  FlatList,
} from 'react-native';
import {ADS_ID, COLOR_SCHEME, FONT_FAMILY} from '../../enviroment';
const {width, height} = Dimensions.get('window');
import {BannerAd, BannerAdSize} from '@react-native-firebase/admob';
import ImageList from './ImageList';
import ImageModal from './ImageModal';
const ImageLoadingWrapper = (props) => {
  const [uri, setUri] = useState([]);
  const [page, setPage] = useState(1);
  const [visible, setIsVisible] = useState(false);
  const [imageUri, setImageUri] = useState(false);
  const [imageId, setImageId] = useState('');
  const [isLoaded, setLoader] = useState(false);

  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    const fetchPhotos = async () => {
      const fetchedData = await props.loadPicturesHandler();
      setUri(fetchedData);
      await setLoader(true);
    };
    fetchPhotos();
  }, []);

  const renderListItem = (data) => {
    return (
      <ImageList
        imageClickHandler={() => imageClickHandler(data.item)}
        imageUri={data.item.photoUrl}
      />
    );
  };

  const imageClickHandler = async (e) => {
    await setImageUri(e.photoUrl);
    await setImageId(e.id);
    await setIsVisible(true);
  };

  const endScrolling = async () => {
    await setPage((prev) => {
      return prev + 1;
    });
    const lazyData = await props.loadPicturesHandler(page);
    await setUri((prevData) => {
      return [...prevData, ...lazyData];
    });
  };

  const onRefresh = async () => {
    await setIsFetching(true);
    const data = await props.loadPicturesHandler();
    await setUri(data);
    await setLoader(true);
    await setIsFetching(false);
  };

  if (!isLoaded)
    return (
      <ActivityIndicator color={COLOR_SCHEME.primaryTextColor} size={60} />
    );

  return (
    <View style={styles.container}>
      {props.title.length ? (
        <Text style={styles.headerText}>{props.title}</Text>
      ) : null}
      <BannerAd unitId={ADS_ID.bannerId} size={BannerAdSize.FULL_BANNER} />
      {visible == true ? (
        <ImageModal
          imageUri={imageUri}
          imageId={imageId}
          isVisible={visible}
          modalToggle={(e) => setIsVisible(e)}
        />
      ) : null}
      <FlatList
        onRefresh={() => onRefresh()}
        refreshing={isFetching}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        data={uri}
        numColumns={2}
        renderItem={renderListItem}
        onEndReachedThreshold={0.5}
        keyExtractor={(item) => item.id}
        onEndReached={() => endScrolling()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
    paddingBottom: 80,
    backgroundColor: '#fff',
  },
  headerText: {
    ...FONT_FAMILY,
    fontSize: 40,
    paddingHorizontal: 10,
  },
});

export default ImageLoadingWrapper;
