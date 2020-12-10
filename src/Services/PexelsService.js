import {AUTHORISATION, PEXELS_PHOTO_BASE_URL} from '../../enviroment';
import axios from 'axios';
import {PixelRatio, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const SCREEN_WIDTH_RESOLUTION = PixelRatio.getPixelSizeForLayoutSize(
  width,
);

export const loadPexelsPictures = async (page = 1) => {
  const reqUrl = PEXELS_PHOTO_BASE_URL + 'curated?page=' + page;
  const resp = await axios.get(reqUrl, {
    headers: {Authorization: AUTHORISATION},
  });

  let tempArray = [];
  resp.data.photos.map((value) => {
    tempArray.push({id: value.id, photoUrl: value.src.portrait});
  });

  return tempArray;
};

export const searchPexelsPictures = async (page = 1, search) => {
  const reqUrl =
    PEXELS_PHOTO_BASE_URL +
    'search?query=' +
    search +
    '&per_page=25&page=' +
    page;
  const resp = await axios.get(reqUrl, {
    headers: {Authorization: AUTHORISATION},
  });

  let tempArray = [];
  console.log(resp.data.photos);
  resp.data.photos.map((value) => {
    tempArray.push({id: value.id, photoUrl: value.src.portrait});
  });

  return tempArray;
};
