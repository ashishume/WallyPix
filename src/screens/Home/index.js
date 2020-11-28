import React from 'react';
import {Text, Button, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Dashboard from '../Dashboard';
import TopNavigation from '../../components/TopNavigation';

const Home = (props) => {
  return (
    <View>
      <TopNavigation {...props} name={'Latest'} />
      <Dashboard {...props} />
    </View>
  );
};

export default Home;
