import React from 'react';
import {View, Text} from 'react-native';

const CategoryImageList = (props) => {
    console.log(props.route.params.categoryImages);
  return (
    <View>
      <Text>Category image list</Text>
    </View>
  );
};

export default CategoryImageList;
