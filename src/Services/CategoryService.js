import {
  CATEGORY_BASE_URL,
  DOWNLOAD_BASE_URL,
  HOME_PAGE_BASE_URL,
  RESOLUTION_PIXELS,
} from '../../enviroment';
import cheerio from 'react-native-cheerio';
import {PixelRatio, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const SCREEN_WIDTH_RESOLUTION = PixelRatio.getPixelSizeForLayoutSize(
  width,
);

let ScreenResolutionData = '';
const IdentifyScreenWidth = () => {
  const screenWidth = SCREEN_WIDTH_RESOLUTION;
  switch (screenWidth) {
    case 2160:
      ScreenResolutionData = RESOLUTION_PIXELS[1366];
      break;
    case 1440:
      ScreenResolutionData = RESOLUTION_PIXELS[1080];
      break;
    case 1366:
      ScreenResolutionData = RESOLUTION_PIXELS[1080];
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
      ScreenResolutionData = RESOLUTION_PIXELS[1024];
  }
};

const loadPageURL = async (category, page) => {
  await IdentifyScreenWidth();
  const searchUrl =
    CATEGORY_BASE_URL + '/' + category + ScreenResolutionData + '/page' + page;
  const response = await fetch(searchUrl); // fetch page
  const htmlString = await response.text(); // get response text

  const $ = cheerio.load(htmlString); // parse HTML string
  console.log(htmlString);

  return $('.wallpapers__item > .wallpapers__link');
};

export const CategoryService = async (category, page = 1) => {
  // https://images.wallpaperscraft.com/image/car_blue_headlight_193447_720x1280.jpg   //sample image url

  let temp = [];
  const data = await loadPageURL(category, page);
  for (let i = 0; i < data.length; i++) {
    const tempHref = data[i].attribs.href.toString().split('/'); //spliting the sample URL into 3 data based on slash

    console.log(tempHref);
    // const createUrl =
    //   DOWNLOAD_BASE_URL +
    //   tempHref[1] +
    //   '/' +
    //   tempHref[2] +
    //   '_' +
    //   tempHref[3] +
    //   '.jpg'; //creating a new download link by concatinating 3 datas
    // temp.push({id: tempHref[2], imageUri: createUrl});
  }

  return temp;
};
