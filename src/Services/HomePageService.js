import {HOME_PAGE_BASE_URL, RESOLUTIONS} from '../../enviroment';
import cheerio from 'react-native-cheerio';
import {PixelRatio, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const loadGraphicCards = async () => {
  const searchUrl = HOME_PAGE_BASE_URL;
  const response = await fetch(searchUrl); // fetch page
  const htmlString = await response.text(); // get response text
  const $ = cheerio.load(htmlString); // parse HTML string
  return $('.wallpapers__item > .wallpapers__link');
};

const IdentifyScreenWidth = (width) => {
  switch (width) {
    case RESOLUTIONS['2160x3840']:
    case RESOLUTIONS['1440x2560']:
    case RESOLUTIONS['1366x768']:
    case RESOLUTIONS['1080x1920']:
    case RESOLUTIONS['1024x600']:
    case RESOLUTIONS['960x544']:
    case RESOLUTIONS['800x600']:
    case RESOLUTIONS['720x1280']:
    case RESOLUTIONS['540x960']:
  }
};

export const HomePageService = async () => {
  let temp = [];
  const data = await loadGraphicCards();
  for (let i = 0; i < data.length; i++) {
    const uri = HOME_PAGE_BASE_URL + data[i].attribs.href + '/';
    temp.push({id: uri, imageUri: uri});
  }

  return temp;
};

export const SCREEN_WIDTH_RESOLUTION = PixelRatio.getPixelSizeForLayoutSize(
  width,
);
