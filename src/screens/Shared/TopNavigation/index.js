import React from 'react';
import {Fragment} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const TopNavigation = (props) => {
  return (
    <Fragment>
      <View
        style={{
          backgroundColor: '#fff',
          justifyContent: 'center',
          width: '100%',
          height: 65,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: 0.37,
          shadowRadius: 7.49,
          elevation: 12,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Icon
            name="menu-outline"
            size={40}
            onPress={() => props.navigation.toggleDrawer()}
          />
          <Text
            style={{
              fontSize: 28,
              paddingHorizontal: 5,
              fontWeight: 'bold',
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
