import {
  FETCH_MOVIE_INDONESIA,
  FETCH_MOVIE_RECOMMENDATIONS,
  FETCH_MOVIE_ALIKE,
  FETCH_MOVIE_SEARCH,
} from './actionCreators';
import API from '../../utils/API';

const fetchNowPlaying = id => async dispatch => {
  const response = await API.fetchMovieData(
    '/movie/now_playing?',
    `${id ? `&page=${id}` : ''}`,
  );
  dispatch({
    type: FETCH_MOVIE_INDONESIA,
    payload: response.data,
  });
};

const fetchRecommendation = id => async dispatch => {
  const response = await API.fetchMovieData(
    `/movie/${id}/recommendations?`,
    '&language=en-US&page=1',
  );
  dispatch({
    type: FETCH_MOVIE_RECOMMENDATIONS,
    payload: response.data.results,
  });
};

const fetchAlike = id => async dispatch => {
  const response = await API.fetchMovieData(
    `/movie/${id}/similar?`,
    '&language=en-US&page=1',
  );
  dispatch({
    type: FETCH_MOVIE_ALIKE,
    payload: response.data.results,
  });
};

const searchMovie = query => dispatch => {
  const response = query;
  dispatch({
    type: FETCH_MOVIE_SEARCH,
    payload: response,
  });
};

export { fetchNowPlaying, fetchRecommendation, fetchAlike, searchMovie };
