import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import ImageList from '../../components/ImageList';
import {HomePageService} from '../../Services/HomePageService';
import ImageModal from '../../components/ImageModal';

const {width, height} = Dimensions.get('window');
const Dashboard = (props) => {
  const [uri, setUri] = useState([]);
  const [page, setPage] = useState(1);
  const [visible, setIsVisible] = useState(false);
  const [imageUri, setImageUri] = useState(false);
  const [imageId, setImageId] = useState('');

  useEffect(() => {
    const fetchAllImages = async () => {
      const data = await HomePageService();
      setUri(data);
    };
    fetchAllImages();
  }, []);

  const renderListItem = (data) => (
    <ImageList
      imageClickHandler={() => imageClickHandler(data.item)}
      imageUri={data.item.imageUri}
    />
  );

  const imageClickHandler = async (e) => {
    await setImageUri(e.imageUri);
    await setImageId(e.id);
    await setIsVisible(true);
  };

  const endScrolling = async () => {
    await setPage((prev) => {
      return prev + 1;
    });
    const lazyData = await HomePageService(page);
    await setUri((prevData) => {
      return [...prevData, ...lazyData];
    });
  };

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

export default Dashboard;
