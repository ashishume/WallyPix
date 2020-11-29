import React from 'react';
import {View} from 'react-native';
import Dashboard from '../Dashboard';
import TopNavigation from '../../components/TopNavigation';
import {BannerAd, BannerAdSize} from '@react-native-firebase/admob';
import {ADS_ID} from '../../../enviroment';
const Home = (props) => {
  return (
    <View>
      <TopNavigation {...props} name={'Latest'} />
      <BannerAd
        unitId={ADS_ID.bannerId}
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
      <Dashboard {...props} />
    </View>
  );
};

export default Home;
