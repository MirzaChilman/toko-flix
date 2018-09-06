import API from '../../utils/API';

export default {
  fetchTheMovie: movieId => async (dispatch) => {
    const response = await API.fetchMovieData(`/movie/${movieId}?`);
    dispatch({
      type: 'FETCH_THEMOVIE',
      payload: response,
    });
  },
};
