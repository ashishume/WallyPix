import {
  AUTHORISATION,
  PEXELS_PHOTO_BASE_URL,
  RESOLUTION_PIXELS,
} from '../../enviroment';
//   import cheerio from 'react-native-cheerio';
import axios from 'axios';
import {PixelRatio, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const SCREEN_WIDTH_RESOLUTION = PixelRatio.getPixelSizeForLayoutSize(
  width,
);

let ScreenResolutionData = '';
const IdentifyScreenWidth = () => {
  const screenWidth = SCREEN_WIDTH_RESOLUTION;
  switch (screenWidth) {
    case 1440:
      ScreenResolutionData = RESOLUTION_PIXELS[1440];
      break;
    case 1080:
      ScreenResolutionData = RESOLUTION_PIXELS[1080];
      break;
    case 1024:
      ScreenResolutionData = RESOLUTION_PIXELS[1024];
      break;
    case 960:
      ScreenResolutionData = RESOLUTION_PIXELS[960];
      break;
    default:
      ScreenResolutionData = RESOLUTION_PIXELS[1080];
  }
};

export const loadPexelsPictures = async (page = 1) => {
  await IdentifyScreenWidth();
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
