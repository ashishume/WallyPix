import React from 'react';
import {loadPexelsPictures} from '../../Services/PexelsService';
import ImageLoadingWrapper from '../../components/ImageLoadingComponent';
const TopRated = (props) => {
  return (
    <ImageLoadingWrapper
      loadPicturesHandler={loadPexelsPictures}
      title="Top Rated"
    />
  );
};

export default TopRated;
