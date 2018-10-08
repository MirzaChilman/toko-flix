import { combineReducers } from 'redux';
import MovieListReducers from './MovieListReducers';
import MovieActionReducers from './MovieActionReducers';
import AccountReducer from './AccountReducer';

export default combineReducers({
  movieList: MovieListReducers,
  movieDataDetails: MovieActionReducers,
  accountInfo: AccountReducer,
});
