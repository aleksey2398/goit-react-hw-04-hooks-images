import axios from 'axios';

const key = '24499282-2c88a00bf4afff93913de8ef0';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: key,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  },
});

const fetchImages = ({page, query}) => {
  return instance.get('/', {
    params: {
      page,
      q: query
    },
  })
  .then(response => response.data);
};

export const Api = {
  fetchImages,
};