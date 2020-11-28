import React from 'react';
import {Fragment} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {FONT_FAMILY} from '../../../enviroment';

const TopNavigation = (props) => {
  return (
    <Fragment>
      <View
        style={{
          backgroundColor: '#fff',
          justifyContent: 'center',
          width: '100%',
          height: 65,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}>
          <Icon
            name="menu-outline"
            size={40}
            onPress={() => props.navigation.toggleDrawer()}
          />
          <Text
            style={{
              ...FONT_FAMILY,
              fontSize: 40,
              paddingHorizontal: 10,
              flexGrow: 1,
            }}>
            {props.name}
          </Text>
        </View>
      </View>
    </Fragment>
  );
};

export default TopNavigation;
