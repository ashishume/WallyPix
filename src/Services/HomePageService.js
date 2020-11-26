import {HOME_PAGE_BASE_URL} from '../../enviroment';
import cheerio from 'react-native-cheerio';

const loadGraphicCards = async () => {
  const searchUrl = HOME_PAGE_BASE_URL;
  const response = await fetch(searchUrl); // fetch page
  const htmlString = await response.text(); // get response text
  const $ = cheerio.load(htmlString); // parse HTML string
  return $('.wallpapers__item > .wallpapers__link');
};

export const HomePageService = async () => {
  let temp = [];
  const data = await loadGraphicCards();
  for (let i = 0; i < data.length; i++) {
    console.log(data[i]);
    const uri = 'https://' + HOME_PAGE_BASE_URL + data[i].attribs.href;
    temp.push(uri);
  }

  return temp;
};
// export default HomePageService;
