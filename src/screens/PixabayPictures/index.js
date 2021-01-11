import {loadPixabayPictures} from '../../Services/PixabayService';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  ADS_ID,
  COLOR_SCHEME,
  FONT_FAMILY,
  PIXA_BAY_CATEGORIES,
  TAB_COLOR,
} from '../../../enviroment';
const {width, height} = Dimensions.get('window');
import {BannerAd, BannerAdSize} from '@react-native-firebase/admob';
import ImageList from '../../components/ImageList';
import ImageModal from '../../components/ImageModal';
const PixabayPictures = (props) => {
  const [uri, setUri] = useState([]);
  const [page, setPage] = useState(1);
  const [visible, setIsVisible] = useState(false);
  const [imageUri, setImageUri] = useState(false);
  const [imageId, setImageId] = useState('');
  const [isLoaded, setLoader] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    PIXA_BAY_CATEGORIES[0].name,
  );
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    const fetchPhotos = async () => {
      await callPicturesAPI(selectedCategory, 1);
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
    const lazyData = await loadPixabayPictures(selectedCategory, page);
    await setUri((prevData) => {
      return [...prevData, ...lazyData];
    });
  };

  const onRefresh = async () => {
    await setIsFetching(true);
    await callPicturesAPI(selectedCategory, 1); //page no. is set to 1
    await setLoader(true);
    await setIsFetching(false);
  };

  const selectCategoryItem = async (data) => {
    await setSelectedCategory(data.name);
    await setPage(1);
    await setUri([]);
    await callPicturesAPI(data.name, 1);
  };

  const callPicturesAPI = async (category, pageNo) => {
    const fetchedData = await loadPixabayPictures(category, pageNo);
    await setUri(fetchedData);
  };

  const renderCategoryTag = (data) => {
    return (
      <View
        style={{
          marginBottom: 10,
          marginHorizontal: 4,
        }}>
        <TouchableOpacity
          onPress={() => selectCategoryItem(data.item)}
          activeOpacity={0.8}>
          <Text
            style={{
              color: selectedCategory == data.item.name ? '#fff' : '#000',
              borderRadius: 100,
              paddingHorizontal: 10,
              backgroundColor:
                selectedCategory == data.item.name ? '#000' : '#fff',
              ...FONT_FAMILY,
              fontSize: 17,
              textTransform: 'capitalize',
            }}>
            {data.item.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (!isLoaded)
    return (
      <ActivityIndicator color={COLOR_SCHEME.primaryTextColor} size={60} />
    );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Random</Text>
      <BannerAd unitId={ADS_ID.bannerId} size={BannerAdSize.FULL_BANNER} />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={PIXA_BAY_CATEGORIES}
        renderItem={renderCategoryTag}
        keyExtractor={(item) => item.id.toString()}
      />
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
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => endScrolling()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
    backgroundColor: '#fff',
  },
  headerText: {
    ...FONT_FAMILY,
    fontSize: 40,
    paddingHorizontal: 10,
  },
  clearFilterText: {
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
});

export default PixabayPictures;
