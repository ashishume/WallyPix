import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DrawerNavigation from './DrawerNavigation';
import Category from '../screens/Category';
import Downloads from '../screens/Downloads';
import Profile from '../screens/Profile';
import {COLOR_SCHEME, TAB_COLOR, TAB_ICONS} from '../../enviroment';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

const TabsNavigation = () => {
  return (
    <Tab.Navigator
      sceneAnimationEnabled
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = TAB_ICONS.home;
          } else if (route.name === 'Category') {
            iconName = TAB_ICONS.category;
          } else if (route.name === 'Downloads') {
            iconName = TAB_ICONS.downloads;
          }
          // else if (route.name === 'Profile') {
          //   iconName = TAB_ICONS.profile;
          // }
          return <Icon size={25} color={color} name={iconName} />;
        },
      })}
      // tabBarOptions={{
      //   activeTintColor: COLOR_SCHEME.primaryTextColor,
      //   inactiveTintColor: COLOR_SCHEME.secondaryTextColor,
      // }}

      initialRouteName="Home"
      activeColor="#fff"
      inactiveColor="#fff"
      barStyle={{backgroundColor: '#694fad'}}
      backBehavior="none"
      shifting={true}>
      <Tab.Screen
        name="Home"
        component={DrawerNavigation}
        options={{
          tabBarColor: TAB_COLOR.home,
        }}
      />
      <Tab.Screen
        name="Category"
        options={{
          tabBarColor: TAB_COLOR.category,
        }}
        component={Category}
      />
      <Tab.Screen
        name="Downloads"
        options={{
          tabBarColor: TAB_COLOR.download,
        }}
        component={Downloads}
      />
      {/* <Tab.Screen name="Profile" component={Profile} /> */}
    </Tab.Navigator>
  );
};

export default TabsNavigation;
