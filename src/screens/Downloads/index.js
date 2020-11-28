// import AsyncStorage from '@react-native-async-storage/async-storage';
// import React, {useEffect, useState} from 'react';
// import {View, Text, StyleSheet, FlatList} from 'react-native';
// import {FONT_FAMILY} from '../../../enviroment';
// import {getData} from '../../Services/StorageService';

// const Downloads = (props) => {
//
//

//   const renderListItem = (data) => (
//     <ImageList
//       imageClickHandler={() => imageClickHandler(data.item)}
//       imageUri={data.item.imageUri}
//     />
//   );

//   const imageClickHandler = async (e) => {
//     await setImageUri(e.imageUri);
//     await setImageId(e.id);
//     await setIsVisible(true);
//   };

//   return (
//     <View>
//
//       <FlatList
//         columnWrapperStyle={{justifyContent: 'space-between'}}
//         data={downloaded}
//         numColumns={2}
//         renderItem={renderListItem}
//         onEndReachedThreshold={0.5}
//         keyExtractor={(item) => item.id}
//         onEndReached={() => endScrolling()}
//       />
//     </View>
//   );
// };

// export default Downloads;

// const styles = StyleSheet.create({
//
// });

import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import ImageList from '../../components/ImageList';
import ImageModal from '../../components/ImageModal';
import {FONT_FAMILY} from '../../../enviroment';
import {getData} from '../../Services/StorageService';

const {width, height} = Dimensions.get('window');
const Dashboard = (props) => {
  const [visible, setIsVisible] = useState(false);
  const [imageUri, setImageUri] = useState(false);
  const [imageId, setImageId] = useState('');

  const [downloaded, setDownloaded] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData('downloaded_image');
      await setDownloaded(data);
    };

    const unsubscribe = props.navigation.addListener('focus', () => {
      fetchData();
    });
    return unsubscribe;
  }, []);

  const renderListItem = (data) => {
    return (
      <ImageList
        imageClickHandler={() => imageClickHandler(data.item)}
        imageUri={data.item.uri}
      />
    );
  };

  const imageClickHandler = async (e) => {
    await setImageUri(e.uri);
    await setImageId(e.id);
    await setIsVisible(true);
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
    paddingBottom: 120,
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

export default Dashboard;
