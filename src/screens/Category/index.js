import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
  ImageBackground,
  FlatList,
} from 'react-native';
import {Fragment} from 'react/cjs/react.production.min';
import {
  CATEGORY_LIST,
  FONT_FAMILY,
  ADS_ID,
  GOOGLE_DRIVE_LINK,
} from '../../../enviroment';
import {CategoryService} from '../../Services/CategoryService';

import {BannerAd, BannerAdSize} from '@react-native-firebase/admob';

const {width, height} = Dimensions.get('window');
const Category = (props) => {
  const [categoryImages, setCategoryImages] = useState([]);
  const selectCategoryHandler = async (value) => {
    const data = await CategoryService(value);
    await setCategoryImages(data);
    props.navigation.navigate('CategoryImageList', {
      categoryImages,
      name: value,
    });
  };
  const renderCategoryListItem = (list) => {
    const link = GOOGLE_DRIVE_LINK + list.item.thumnail;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => selectCategoryHandler(list.item)}>
          <View style={styles.cardContainer}>
            <ImageBackground
              imageStyle={{opacity: 0.6, borderRadius: 20}}
              source={{uri: link}}
              style={styles.cardImage}>
              <View style={styles.listItemStyle}>
                <Text style={styles.cardText}>
                  {list.item.title.toUpperCase()}
                </Text>
              </View>
            </ImageBackground>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <Fragment>
      <Text style={styles.headerText}>Categories</Text>
      <View style={styles.adsContainer}>
        <BannerAd unitId={ADS_ID.bannerId} size={BannerAdSize.FULL_BANNER} />
      </View>
      <FlatList
        data={CATEGORY_LIST}
        renderItem={renderCategoryListItem}
        keyExtractor={(item) => item.id}
      />
    </Fragment>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    ...FONT_FAMILY,
    fontSize: 40,
    paddingHorizontal: 10,
  },
  cardContainer: {
    width: width - 20,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
    marginVertical: 10,
  },
  adsContainer: {
    justifyContent: 'center',
    width: '100%',
  },
  cardImage: {
    width: width - 20,
    height: 200,
    backgroundColor: '#000',
    borderRadius: 20,
  },
  cardText: {
    color: '#fff',
    fontSize: 45,
    ...FONT_FAMILY,
  },
  listItemStyle: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
});
