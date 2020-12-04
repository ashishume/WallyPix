import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import React, {Fragment} from 'react';
import 'react-native-gesture-handler';

const AppIndex = () => (
  <Fragment>
    <App />
  </Fragment>
);

AppRegistry.registerComponent(appName, () => AppIndex);
