/* eslint linebreak-style: ["error", "windows"] */

import axios from 'axios';

const URL = 'https://api.themoviedb.org/3';
const API_KEY = 'api_key=ae4dc1e91f4721e7f574d512da8263fd';
export default {
  /**
  * @params {string} query
  * @params {string} queryVariable
  */
  fetchMovieData: (query, queryVariable) => axios.get(`${URL}${query}${API_KEY}${queryVariable}`),
};
