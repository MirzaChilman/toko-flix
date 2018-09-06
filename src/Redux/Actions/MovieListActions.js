import {
  FETCH_MOVIE_INDONESIA,
  FETCH_MOVIE_RECOMMENDATIONS,
  FETCH_MOVIE_ALIKE,
} from './actionCreators';
import API from '../../utils/API';

export const fetchIndonesia = () => async (dispatch) => {
  const response = await API.fetchMovieData('/movie/now_playing?', '&language=en-US&page=1&region=ID');
  dispatch({
    type: FETCH_MOVIE_INDONESIA,
    payload: response.data.results,
  });
};

export const fetchRecommendation = id => async (dispatch) => {
  const response = await API.fetchMovieData('/movie/now_playing?', '&language=en-US&page=1&region=ID');
  dispatch({
    type: FETCH_MOVIE_RECOMMENDATIONS,
    payload: response.data.results,
  });
};

export const fetchAlike = id => async (dispatch) => {
  const response = await API.fetchMovieData('/movie/76341/similar?', '&language=en-US&page=1&region=ID');
  dispatch({
    type: FETCH_MOVIE_ALIKE,
    payload: response.data.results,
  });
};
