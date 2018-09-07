import { combineReducers } from 'redux';
import MovieListReducers from './MovieListReducers';
import MovieActionReducers from './MovieActionReducers';

export default combineReducers({
  movieList: MovieListReducers,
  movieDataDetails: MovieActionReducers,
});
