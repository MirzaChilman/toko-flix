import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import KartuMovie from './KartuMovie/KartuMovie';
import Wrapper from '../Wrapper/Wrapper';
import Spinner from '../Spinner/Spinner';

const Kartu = props => {
  const { movieIndonesia, isLoading, searchState } = props;

  return (
    <React.Fragment>
      <p className="mt-5 text-danger">Now Playing in Indonesia</p>
      <Wrapper>
        {isLoading ? (
          <Spinner />
        ) : (
          movieIndonesia
            .filter(
              datum =>
                `${datum.title}`
                  .toUpperCase()
                  .indexOf(searchState.toUpperCase()) >= 0,
            )
            .map(datum => <KartuMovie key={datum.id} {...datum} />)
        )}
      </Wrapper>
    </React.Fragment>
  );
};

Kartu.propTypes = {
  movieIndonesia: PropTypes.arrayOf(
    PropTypes.shape({
      adult: PropTypes.bool.isRequired,
      original_title: PropTypes.string.isRequired,
      vote_average: PropTypes.number.isRequired,
      release_date: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      poster_path: PropTypes.string,
    }),
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  searchState: state.movieList.searchQuery,
});

export default connect(mapStateToProps)(Kartu);
