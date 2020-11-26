import React, {Fragment, useEffect, useState} from 'react';
// import MainRouting from './Routes/MainRouting';
import {
  StatusBar,
  View,
  StyleSheet,
  Text,
  Button,
  Linking,
  Dimensions,
} from 'react-native';
import {HomePageService} from './Services/HomePageService';

const App = () => {
  const [uri, setUri] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await HomePageService();
      setUri(data);
    };

    fetchData();
  }, []);
  return (
    <Fragment>
      <StatusBar backgroundColor="black" />
      {/* <MainRouting /> */}

      {uri.map((value) => {
        return (
          <Text style={{marginVertical: 30}}>
            {value}
          </Text>
        );
      })}
    </Fragment>
  );
};
export default App;
