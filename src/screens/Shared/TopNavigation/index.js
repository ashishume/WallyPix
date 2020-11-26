import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const TopNavigation = (props) => {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        justifyContent: 'center',
        width: '100%',
        height: 55,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
      }}>
      <View style={{paddingHorizontal: 5}}>
        <Icon
          name="menu-outline"
          size={40}
          onPress={() => props.navigation.toggleDrawer()}
        />
      </View>
    </View>
  );
};

export default TopNavigation;
