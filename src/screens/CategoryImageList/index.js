import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Dimensions, PermissionsAndroid} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {FONT_FAMILY} from '../../../enviroment';
import ImageList from '../../components/ImageList';
import ImageModal from '../../components/ImageModal';
import {CategoryService} from '../../Services/CategoryService';

const {width, height} = Dimensions.get('window');
const CategoryImageList = (props) => {
  const [uri, setUri] = useState([]);
  const [page, setPage] = useState(1);
  const [visible, setIsVisible] = useState(false);
  const [imageUri, setImageUri] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchAllImages = async () => {
      await setCategory(props.route.params.name.title);
      const data = await CategoryService(props.route.params.name.title);
      await setUri(data);
    };
    fetchAllImages();

    // return () => {
    //   setUri([]);
    //   setPage(1);
    //   setIsVisible(false);
    //   setImageUri('');
    //   setCategory('');
    // };
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

  return (
    <View style={styles.container}>
      {visible == true ? (
        <ImageModal
          imageUri={imageUri}
          isVisible={visible}
          modalToggle={(e) => setIsVisible(e)}
        />
      ) : null}
      <FlatList
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
    paddingBottom: 120,
    backgroundColor: '#fff',
  },
});

export default CategoryImageList;
