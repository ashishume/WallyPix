import React, {Fragment} from 'react';
import TopNavigation from '../../components/TopNavigation';
import {HomePageService} from '../../Services/HomePageService';
import ImageLoadingWrapper from '../../components/ImageLoadingComponent';
const Home = (props) => {
  return (
    <Fragment>
      <TopNavigation {...props} name={'Latest'} />
      <ImageLoadingWrapper title="" loadPicturesHandler={HomePageService} />
    </Fragment>
  );
};

export default Home;
