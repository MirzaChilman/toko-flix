import {
  FETCH_MOVIE_DETAILS,
  FETCH_MOVIE_CAST,
} from './actionCreators';
import API from '../../utils/API';

export const fetchMovieDetails = id => async (dispatch) => {
  // `/movie/${id}/recommendations?`, '&language=en-US&page=1&region=ID'
  const response = await API.fetchMovieData(`/movie/${id}?`, '&language=en-US');
  dispatch({
    type: FETCH_MOVIE_DETAILS,
    payload: response.data,
  });
};

export const fetchMovieCast = id => async (dispatch) => {
  const response = await API.fetchMovieData(`/movie/${id}/credits?`, '');
  dispatch({
    type: FETCH_MOVIE_CAST,
    payload: response.data.cast,
  });
};
