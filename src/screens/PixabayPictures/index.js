import React from 'react';
import ImageLoadingWrapper from '../../components/ImageLoadingComponent';
import {loadPixabayPictures} from '../../Services/PixabayService';
const PixabayPictures = (props) => {
  return (
    <ImageLoadingWrapper
      loadPicturesHandler={loadPixabayPictures}
      title="Random"
    />
  );
};

export default PixabayPictures;
