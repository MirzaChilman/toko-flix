import {
  FETCH_MOVIE_DETAILS,
  FETCH_MOVIE_CAST,
} from '../Actions/actionCreators';

const initialState = {
  movieDetails: [],
  movieCast: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_MOVIE_DETAILS:
      return {
        ...state,
        movieDetails: action.payload,
      };
    case FETCH_MOVIE_CAST:
      return {
        ...state,
        movieCast: action.payload,
      };
    default:
      return state;
  }
}
