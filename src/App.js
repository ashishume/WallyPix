import React, {Fragment} from 'react';
import MainRouting from './Routes/MainRouting';
import {StatusBar} from 'react-native';
const App = () => {
  return (
    <Fragment>
      <StatusBar backgroundColor="black" />
      <MainRouting />
    </Fragment>
  );
};
export default App;
