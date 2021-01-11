import {AUTHORISATION, PEXELS_PHOTO_BASE_URL} from '../../enviroment';
import axios from 'axios';
// import {ToastAndroid} from 'react-native';

export const loadPexelsPictures = async (page = 1) => {
  try {
    const reqUrl = PEXELS_PHOTO_BASE_URL + 'curated?page=' + page;
    const resp = await axios.get(reqUrl, {
      headers: {Authorization: AUTHORISATION},
    });

    let tempArray = [];
    resp.data.photos.map((value) => {
      tempArray.push({id: value.id, photoUrl: value.src.portrait});
    });
    return tempArray;
  } catch (e) {
    // ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
  }
};

export const searchPexelsPictures = async (search, page = 1) => {
  try {
    const reqUrl =
      PEXELS_PHOTO_BASE_URL +
      'search?query=' +
      search +
      '&per_page=30&page=' +
      page;
    const resp = await axios.get(reqUrl, {
      headers: {Authorization: AUTHORISATION},
    });

    let tempArray = [];
    resp.data.photos.map((value) => {
      tempArray.push({id: value.id, photoUrl: value.src.portrait});
    });

    return tempArray;
  } catch (e) {
    // ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
  }
};
