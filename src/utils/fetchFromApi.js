import axios from 'axios';

const BASE_URL = 'https://youtube-v31.p.rapidapi.com';
const MAX_RESULTS = '50';

const options = {
  params: {
    maxResults: MAX_RESULTS,
  },
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST,
  },
};

export const fetchFromApi = async (endpoint, customOptions) => {
  const { data } = await axios.get(`${BASE_URL}/${endpoint}`, {
    headers: { ...options.headers, ...customOptions.headers },
    params: { ...options.params, ...customOptions.params },
  });
  return data;
};
