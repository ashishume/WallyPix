// import React from 'react';
// import {View, Text} from 'react-native';

// const SearchScreen = () => {
//   return (
//     <View>
//         <Inpu
//       <Text>Search</Text>
//     </View>
//   );
// };

// export default SearchScreen;
import ImageList from '../../components/ImageList';
import React, {useState, useRef} from 'react';
import {View, TextInput, StyleSheet, FlatList} from 'react-native';
import {searchPexelsPictures} from '../../Services/PexelsService';
import ImageModal from '../../components/ImageModal';
// import {} from 'react-native-gesture-handler';
// import Http from '../../API/HttpService';
// import CourseCardListItem from './MyCourses/CourseCardListItem';
const Search = (props) => {
  const [data, setData] = useState([]);
  const previousSearchTermRef = useRef('');
  const [visible, setIsVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const setDebouncedSearchTerm = (value) => {
    previousSearchTermRef.current = value;
    setTimeout(async () => {
      if (previousSearchTermRef.current === value) {
        await setSearchTerm(value);
        const respData = await searchPexelsPictures(page, value);
        setData(respData);
      }
    }, 500);
  };
  //   const courseEventHandler = (value) => {
  //     props.navigation.navigate('CourseDetails', value);
  //   };

  const renderListItem = (data) => {
    return (
      <ImageList
        imageClickHandler={() => imageClickHandler(data.item)}
        imageUri={data.item.photoUrl}
      />
    );
  };

  const imageClickHandler = async (e) => {
    await setImageUri(e.imageUri);
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
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  input: {
    color: '#000',
    fontSize: 15,
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
