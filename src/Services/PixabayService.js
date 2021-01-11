import {
  PIXA_BAY_AUTHORISATION_KEY,
  PIXA_BAY_PHOTO_BASE_URL,
} from '../../enviroment';
import axios from 'axios';

export const loadPixabayPictures = async (category = '', page = 1) => {
  try {
    const reqUrl = `${PIXA_BAY_PHOTO_BASE_URL}?key=${PIXA_BAY_AUTHORISATION_KEY}`;
    const resp = await axios.get(reqUrl, {
      params: {
        image_type: 'photo',
        orientation: 'vertical',
        per_page: 25,
        safesearch: true,
        page: page,
        // editors_choice: true,
        category,
      },
    });

    let tempArray = [];
    resp.data.hits.map((value) => {
      tempArray.push({
        id: value.id,
        photoUrl: value.largeImageURL,
      });
    });
    return tempArray;
  } catch (e) {
    // ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
  }
};
