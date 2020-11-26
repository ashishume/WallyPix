import React from 'react';
import {Text, Button, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Dashboard from '../Dashboard';
import TopNavigation from '../Shared/TopNavigation';

const Home = (props) => {
  return (
    <View>
      <TopNavigation {...props} />
      {/* <Button
        raised={true}
        onPress={() => props.navigation.toggleDrawer()}
        title="Click"
      /> */}
      {/* <Text> Home </Text> */}
      <Dashboard />
    </View>
  );
};

export default Home;
