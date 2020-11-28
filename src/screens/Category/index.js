import React, {useEffect, useState} from 'react';
import {Fragment} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  ImageBackground,
  FlatList,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {CATEGORY_LIST} from '../../../enviroment';
import {CategoryService} from '../../Services/CategoryService';
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
  const renderCategoryListItem = (list) => (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => selectCategoryHandler(list.item)}>
        <View style={styles.cardContainer}>
          <ImageBackground
            imageStyle={{opacity: 0.6, borderRadius: 20}}
            source={list.item.thumnail}
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
  return (
    <FlatList
      data={CATEGORY_LIST}
      renderItem={renderCategoryListItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  cardImage: {
    width: width - 20,
    height: 200,
    backgroundColor: '#000',
    borderRadius: 20,
  },
  cardText: {
    color: '#fff',
    fontSize: 45,
    fontWeight: 'bold',
    // textAlign: 'center',
    fontFamily: 'Kodchasan-Regular',
  },
  listItemStyle: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
});
