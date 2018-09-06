import { combineReducers } from 'redux';
import movieListReducers from './movieListReducers';

export default combineReducers({
  movieList: movieListReducers,
});
