import React from 'react';
import Dashboard from '../screens/Dashboard';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
// import {Icon} from 'react-native-elements';
// import MyCourses from '../components/screens/MyCourses/MyCourses';
// import {IconStyles} from '../components/Styles';
// import Library from '../components/screens/Library/Library';
// import FreeVideos from '../components/screens/FreeVideos/FreeVideos';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Tab = createBottomTabNavigator();

// const DrawerNavigation = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({route}) => ({
//         tabBarIcon: ({focused, color, size}) => {
//           let iconName;
//           if (route.name === 'Home') {
//             iconName = 'ios-home';
//           } else if (route.name === 'Free Videos') {
//             iconName = 'videocam';
//           } else if (route.name === 'Library') {
//             iconName = 'ios-library';
//           } else if (route.name === 'My Courses') {
//             iconName = 'ios-play';
//           }
//           return (
//             <Icon
//               size={IconStyles.iconSize}
//               type={IconStyles.iconType}
//               color={color}
//               name={iconName}
//             />
//           );
//         },
//       })}
//       tabBarOptions={{
//         activeTintColor: IconStyles.iconColor,
//         inactiveTintColor: 'gray',
//       }}>
//       <Tab.Screen name="Home" component={Dashboard} />
//       <Tab.Screen name="Free Videos" component={FreeVideos} />
//       <Tab.Screen name="My Courses" component={MyCourses} />
//       <Tab.Screen name="Library" component={Library} />
//     </Tab.Navigator>
//   );
// };

//For sample Don't Delete!!!!!!!!!!!

const DrawerNavigation = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      {/* <Drawer.Screen name="Privacy Policy" component={PrivacyPolicy} /> */}
    </Drawer.Navigator>
  );
};
//For sample Don't Delete!!!!!!!!!!!

export default DrawerNavigation;
