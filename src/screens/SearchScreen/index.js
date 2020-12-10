import ImageList from '../../components/ImageList';
import React, {useState, useRef} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {searchPexelsPictures} from '../../Services/PexelsService';
import ImageModal from '../../components/ImageModal';
import {COLOR_SCHEME, FONT_FAMILY} from '../../../enviroment';
const Search = (props) => {
  const [data, setData] = useState([]);
  const previousSearchTermRef = useRef('');
  const [visible, setIsVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [imageUri, setImageUri] = useState(false);
  const [imageId, setImageId] = useState('');
  const [isLoaded, setLoader] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const setDebouncedSearchTerm = (value) => {
    setLoader(true);
    previousSearchTermRef.current = value;
    setTimeout(async () => {
      if (previousSearchTermRef.current === value) {
        await setSearchTerm(value);
        const respData = await searchPexelsPictures(value, page);
        setLoader(false);
        setData(respData);
      }
    }, 500);
  };

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
    const respData = await searchPexelsPictures(searchTerm, page);
    await setData((prevData) => {
      return [...prevData, ...respData];
    });
  };

  return (
    <View style={{backgroundColor: '#fff', height: '100%'}}>
      <TextInput
        style={styles.input}
        placeholderTextColor="#000"
        autoFocus={true}
        onChangeText={(e) => setDebouncedSearchTerm(e)}
        placeholder="Search random photos..."
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
        columnWrapperStyle={{justifyContent: 'space-between'}}
        data={data}
        numColumns={2}
        renderItem={renderListItem}
        onEndReachedThreshold={0.5}
        keyExtractor={(item) => item.id}
        onEndReached={() => endScrolling()}
      />

      {isLoaded ? (
        <ActivityIndicator color={COLOR_SCHEME.primaryTextColor} size={60} />
      ) : null}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  input: {
    color: '#000',
    fontSize: 18,
    ...FONT_FAMILY,
    marginTop: 10,
    height: 60,
    fontWeight: 'normal',
    borderBottomColor: '#000',
    //shadow
    backgroundColor: '#fff',
    padding: 15,
    shadowColor: '#fff',
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 15,
  },
});
