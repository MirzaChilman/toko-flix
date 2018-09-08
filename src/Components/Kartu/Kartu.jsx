import React from 'react';
import PropTypes from 'prop-types';
import KartuMovie from './KartuMovie/KartuMovie';
import Wrapper from '../Wrapper/Wrapper';
import Spinner from '../Spinner/Spinner';

const Kartu = (props) => {
  console.log(props);
  const { movieIndonesia, isLoading } = props;

  return (
    <React.Fragment>
      <p className="mt-5 text-danger">Now Playing in Indonesia</p>
      <Wrapper>
        {isLoading ? (
          <Spinner />
        ) : (
          movieIndonesia.map(datum => <KartuMovie key={datum.id} {...datum} />)
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
      poster_path: PropTypes.string.isRequired,
    }),
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
};
export default Kartu;
