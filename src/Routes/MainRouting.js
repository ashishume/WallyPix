import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import {NavigationContainer} from '@react-navigation/native';
import TabsNavigation from './TabsNavigation';
import CategoryImageList from '../screens/CategoryImageList';
import SplashScreen from '../screens/SplashScreen';
import {FONT_FAMILY, TAB_COLOR} from '../../enviroment';
import SearchScreen from '../screens/SearchScreen';
import PixabayPictures from '../screens/PixabayPictures';
const Stack = createStackNavigator();
const config = {
  animation: 'spring',
  config: {
    stiffness: 4000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
const MainRouting = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: config,
            close: config,
          },
        }}>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PixabayPictures"
          component={PixabayPictures}
          options={{
            headerShown: false,
          }}
        />
       
        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Dashboard"
          component={TabsNavigation}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CategoryImageList"
          component={CategoryImageList}
          options={(props) => ({
            title: props.route.params.name.title.toUpperCase(),
            headerStyle: {
              // backgroundColor: TAB_COLOR.category,
              backgroundColor: "#fff",
            },
            headerTitleStyle: {
              ...FONT_FAMILY,
            },
            headerTintColor: '#000',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainRouting;
