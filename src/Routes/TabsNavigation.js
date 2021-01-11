import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DrawerNavigation from './DrawerNavigation';
import Category from '../screens/Category';
import Downloads from '../screens/Downloads';
import PixabayPictures from '../screens/PixabayPictures';
import TopRated from '../screens/TopRated';
import {COLOR_SCHEME, TAB_COLOR, TAB_ICONS} from '../../enviroment';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Text} from 'react-native';

const Tab = createMaterialBottomTabNavigator();

const TabsNavigation = () => {
  return (
    <Tab.Navigator
      sceneAnimationEnabled
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let focusColor;
          if (route.name === 'Home') {
            iconName = TAB_ICONS.home;
          } else if (route.name === 'Top Rated') {
            iconName = TAB_ICONS.topRated;
          } else if (route.name === 'Category') {
            iconName = TAB_ICONS.category;
          } else if (route.name === 'Random') {
            iconName = TAB_ICONS.random;
          } else if (route.name === 'Downloads') {
            iconName = TAB_ICONS.downloads;
          }
          {
            focusColor = focused == true ? '#000' : '#707070';
          }
          return <Icon size={25} color={focusColor} name={iconName} />;
        },
      })}
      // tabBarOptions={{
      //   activeTintColor: COLOR_SCHEME.primaryTextColor,
      //   inactiveTintColor: COLOR_SCHEME.secondaryTextColor,
      // }}

      initialRouteName="Home"
      activeColor="#000"
      inactiveColor="#000"
      barStyle={{
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15,
      }}
      backBehavior="none"
      shifting={true}>
      <Tab.Screen
        name="Home"
        component={DrawerNavigation}
        options={{
          // tabBarColor: TAB_COLOR.home,
          tabBarLabel: (
            <Text style={{color: TAB_COLOR.tabFontColor}}>Home</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Random"
        options={{
          // tabBarColor: TAB_COLOR.random,
          tabBarLabel: (
            <Text style={{color: TAB_COLOR.tabFontColor}}>Random</Text>
          ),
        }}
        component={PixabayPictures}
      />
      <Tab.Screen
        name="Top Rated"
        component={TopRated}
        options={{
          // tabBarColor: TAB_COLOR.topRated,
          tabBarLabel: (
            <Text style={{color: TAB_COLOR.tabFontColor}}>Top Rated</Text>
          ),
        }}
      />

      <Tab.Screen
        name="Category"
        options={{
          // tabBarColor: TAB_COLOR.category,
          tabBarLabel: (
            <Text style={{color: TAB_COLOR.tabFontColor}}>Category</Text>
          ),
        }}
        component={Category}
      />
      <Tab.Screen
        name="Downloads"
        options={{
          // tabBarColor: TAB_COLOR.download,
          tabBarLabel: (
            <Text style={{color: TAB_COLOR.tabFontColor}}>Downloads</Text>
          ),
        }}
        component={Downloads}
      />
    </Tab.Navigator>
  );
};

export default TabsNavigation;
