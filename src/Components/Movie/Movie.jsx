import React from 'react';
import PropTypes from 'prop-types';
import MovieInfo from './MovieInfo/MovieInfo';
import MovieRecommendation from './MovieRecommendation/MovieRecommendation';
import MovieAlike from './MovieAlike/MovieAlike';

const Movie = ({ match }) => {
  console.log(match);
  return (
    <React.Fragment>
      <MovieInfo match={match} />
      <MovieRecommendation match={match} />
      <MovieAlike match={match} />
    </React.Fragment>
  );
};

Movie.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.objectOf(PropTypes.string),
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

export default Movie;
