import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import {NavigationContainer} from '@react-navigation/native';
import Dashboard from '../screens/Dashboard';
import DrawerNavigation from './DrawerNavigation';
import TabsNavigation from './TabsNavigation';
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
const MainRouting = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: config,
            close: config,
          },
        }}>
        <Stack.Screen
          name="Dashboard"
          component={TabsNavigation}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainRouting;
