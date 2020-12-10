import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
  BackHandler,
  Text,
  FlatList
} from 'react-native';
import {ADS_ID, COLOR_SCHEME, FONT_FAMILY} from '../../../enviroment';
import ImageList from '../../components/ImageList';
import ImageModal from '../../components/ImageModal';
import {CategoryService} from '../../Services/CategoryService';
import {
  BannerAd,
  BannerAdSize,
  InterstitialAd,
  AdEventType,
} from '@react-native-firebase/admob';

const {width, height} = Dimensions.get('window');

const interstitial = InterstitialAd.createForAdRequest(ADS_ID.InterstitialId);

const CategoryImageList = (props) => {
  const [uri, setUri] = useState([]);
  const [page, setPage] = useState(1);
  const [visible, setIsVisible] = useState(false);
  const [imageUri, setImageUri] = useState('');
  const [imageId, setImageId] = useState('');
  const [category, setCategory] = useState('');
  const [isLoaded, setLoader] = useState(false);

  useEffect(() => {
    const fetchAllImages = async () => {
      await setCategory(props.route.params.name.title);
      const data = await CategoryService(props.route.params.name.title);
      await setUri(data);
      await setLoader(true);
      setTimeout(() => {
        interstitial.show();
      }, 3000);
    };
    fetchAllImages();
    interstitial.load();
  }, []);

  const renderListItem = (data) => (
    <ImageList
      imageClickHandler={() => imageClickHandler(data.item)}
      imageUri={data.item.imageUri}
    />
  );

  const imageClickHandler = async (e) => {
    await setIsVisible(true);
    await setImageUri(e.imageUri);
    await setImageId(e.id);
  };

  const endScrolling = async () => {
    await setPage((prev) => {
      return prev + 1;
    });
    const lazyData = await CategoryService(category, page);
    await setUri((prevData) => {
      return [...prevData, ...lazyData];
    });
  };

  if (!isLoaded)
    return (
      <ActivityIndicator color={COLOR_SCHEME.primaryTextColor} size={60} />
    );

  return (
    <View style={styles.container}>
      {visible == true ? (
        <ImageModal
          imageUri={imageUri}
          imageId={imageId}
          isVisible={visible}
          modalToggle={(e) => setIsVisible(e)}
        />
      ) : null}
      <View style={styles.adsContainer}>
        <BannerAd unitId={ADS_ID.bannerId} size={BannerAdSize.FULL_BANNER} />
      </View>
      <FlatList
        columnWrapperStyle={{justifyContent: 'space-between'}}
        data={uri}
        numColumns={2}
        renderItem={renderListItem}
        onEndReachedThreshold={0.5}
        keyExtractor={(item) => item.id}
        onEndReached={() => endScrolling()}
      />
      <BannerAd unitId={ADS_ID.bannerId} size={BannerAdSize.FULL_BANNER} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height - 55,
    backgroundColor: '#fff',
  },
  adsContainer: {
    justifyContent: 'center',
    width: '100%',
    textAlign: 'center',
  },
});

export default CategoryImageList;
