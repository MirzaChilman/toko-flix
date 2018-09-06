import {
  FETCH_MOVIE_INDONESIA,
  FETCH_MOVIE_RECOMMENDATIONS,
  FETCH_MOVIE_ALIKE,
} from '../Actions/actionCreators';

const initialState = {
  movieIndonesia: [],
  movieRecommendations: [],
  movieAlike: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_MOVIE_INDONESIA:
      return {
        ...state,
        movieIndonesia: action.payload,
      };
    case FETCH_MOVIE_RECOMMENDATIONS:
      return {
        ...state,
        movieRecommendations: action.payload,
      };
    case FETCH_MOVIE_ALIKE:
      return {
        ...state,
        movieAlike: action.payload,
      };
    default:
      return state;
  }
}
