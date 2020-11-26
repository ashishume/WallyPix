import React from 'react';
import {Text, Button, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Dashboard from '../Dashboard';
import TopNavigation from '../Shared/TopNavigation';

const Home = (props) => {
  return (
    <View>
      <TopNavigation {...props} name={'Explore'} />
      <Dashboard {...props} />
    </View>
  );
};

export default Home;
