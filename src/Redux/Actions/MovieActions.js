import { FETCH_MOVIE_DETAILS, FETCH_MOVIE_CAST } from './actionCreators';
import API from '../../utils/API';

const fetchMovieDetails = id => async dispatch => {
  const response = await API.fetchMovieData(`/movie/${id}?`, '&language=en-US');
  dispatch({
    type: FETCH_MOVIE_DETAILS,
    payload: response.data,
  });
};

const fetchMovieCast = id => async dispatch => {
  const response = await API.fetchMovieData(`/movie/${id}/credits?`, '');
  dispatch({
    type: FETCH_MOVIE_CAST,
    payload: response.data.cast,
  });
};

export { fetchMovieDetails, fetchMovieCast };
