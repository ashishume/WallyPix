import React from 'react';
import {Fragment} from 'react';
import {View, Text, Share, ToastAndroid} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {FONT_FAMILY, LINKS} from '../../../enviroment';

const TopNavigation = (props) => {
  const onShareHandler = async () => {
    try {
      await Share.share({
        message: `Hey, I just found out a awesome wallpaper app, WallyPix, Checkout: ${LINKS.googlePlayAppLink}   `,
      });
    } catch (error) {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
  };
  const onSearchHandler = () => {
    props.navigation.navigate('SearchScreen');
  };

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
            name="menu"
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
          <Text
            style={{
              ...FONT_FAMILY,
              fontSize: 40,
              paddingRight: 10,
            }}>
            <TouchableOpacity onPress={() => onSearchHandler()}>
              <Icon name="image-search-outline" size={40} />
            </TouchableOpacity>
          </Text>
          <Text
            style={{
              ...FONT_FAMILY,
              fontSize: 40,
            }}>
            <TouchableOpacity onPress={() => onShareHandler()}>
              <Icon name="share-variant" size={40} />
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </Fragment>
  );
};

export default TopNavigation;
