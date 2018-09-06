/* eslint linebreak-style: ["error", "windows"] */

import Axios from 'axios';

const URL = 'https://api.themoviedb.org/3';
const API_KEY = 'ae4dc1e91f4721e7f574d512da8263fd';
export default {
  fetchMovieData: (query, queryVariable) => Axios.get(`${URL}${query}${API_KEY}${queryVariable}`),
};
