import React, {useEffect} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {CATEGORY_LIST} from '../../../enviroment';
import {CategoryService} from '../../Services/CategoryService';
const Category = (props) => {
  useEffect(() => {});

  const selectCategoryHandler = (value) => {
    CategoryService(value);
  };

  return (
    <View>
      {CATEGORY_LIST.map((value, i) => {
        return (
          <TouchableOpacity
            key={i}
            activeOpacity={0.7}
            onPress={() => selectCategoryHandler(value)}>
            <Text style={{color: '#000'}}>{value.toUpperCase()}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Category;
