import {
  FETCH_MOVIE_INDONESIA,
  FETCH_MOVIE_RECOMMENDATIONS,
  FETCH_MOVIE_ALIKE,
} from './actionCreators';
import API from '../../utils/API';

export const fetchNowPlaying = id => async (dispatch) => {
  const response = await API.fetchMovieData('/movie/now_playing?', `${id ? `&page=${id}` : ''}`);
  dispatch({
    type: FETCH_MOVIE_INDONESIA,
    payload: response.data,
  });
};

export const fetchRecommendation = id => async (dispatch) => {
  const response = await API.fetchMovieData(`/movie/${id}/recommendations?`, '&language=en-US&page=1');
  dispatch({
    type: FETCH_MOVIE_RECOMMENDATIONS,
    payload: response.data.results,
  });
};

export const fetchAlike = id => async (dispatch) => {
  const response = await API.fetchMovieData(`/movie/${id}/similar?`, '&language=en-US&page=1');
  dispatch({
    type: FETCH_MOVIE_ALIKE,
    payload: response.data.results,
  });
};
