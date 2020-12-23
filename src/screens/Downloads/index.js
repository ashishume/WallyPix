import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Linking,
  FlatList,
} from 'react-native';
import ImageList from '../../components/ImageList';
import ImageModal from '../../components/ImageModal';
import {FONT_FAMILY} from '../../../enviroment';
import {getData} from '../../Services/StorageService';
import {Fragment} from 'react';
const {width, height} = Dimensions.get('window');
const Downloads = (props) => {
  const [visible, setIsVisible] = useState(false);
  const [imageUri, setImageUri] = useState('');
  const [imageId, setImageId] = useState('');
  const [isLoaded, setLoader] = useState(false);

  const [isFetching, setIsFetching] = useState(false);
  const [downloaded, setDownloaded] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData('downloaded_image');
      if (data !== null) await setDownloaded(data.reverse());
    };

    const FocusUnsubscribe = props.navigation.addListener('focus', () => {
      fetchData();
    });
    const TabUnsubscribe = props.navigation.addListener('tabPress', () => {
      fetchData();
    });
    return () => {
      TabUnsubscribe();
      FocusUnsubscribe();
    };
  }, [downloaded]);

  const renderListItem = (data) => {
    return (
      <Fragment>
        <ImageList
          imageClickHandler={() => imageClickHandler(data.item)}
          imageUri={data.item.uri}
        />
      </Fragment>
    );
  };

  const imageClickHandler = async (e) => {
    await setImageUri(e.uri);
    await setImageId(e.id);
    await setIsVisible(true);
  };

  const onRefresh = async () => {
    await setIsFetching(true);
    const data = await getData('downloaded_image');
    if (data !== null) await setDownloaded(data.reverse());
    // await setLoader(true);
    await setIsFetching(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Downloads</Text>
      {visible == true ? (
        <ImageModal
          imageUri={imageUri}
          imageId={imageId}
          isVisible={visible}
          modalToggle={(e) => setIsVisible(e)}
        />
      ) : null}
      {downloaded.length !== 0 ? (
        <FlatList
          onRefresh={() => onRefresh()}
          refreshing={isFetching}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          data={downloaded}
          numColumns={2}
          renderItem={renderListItem}
          onEndReachedThreshold={0.5}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={styles.alternateText}>
          Nothing here try some awesome wallpapers
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
    paddingBottom: 60,
    backgroundColor: '#fff',
  },
  heading: {
    ...FONT_FAMILY,
    fontSize: 40,
    paddingHorizontal: 10,
  },
  alternateText: {
    ...FONT_FAMILY,
    fontSize: 15,
    textAlign: 'left',
    paddingHorizontal: 10,
  },
});

export default Downloads;
