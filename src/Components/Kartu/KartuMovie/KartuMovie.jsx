/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import './KartuMovie.css';
import Utils from '../../../utils/Utils';

const KartuMovie = props => {
  const { poster_path, id, vote_average, original_title, overview } = props;
  const { calculatePrice } = Utils;
  return (
    <React.Fragment>
      <div className="content" key={id}>
        <div className="content-overlay" />
        <img
          className="content-image"
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={overview}
        />
        <div className="content-details fadeIn-bottom">
          <h3 className="content-title">{original_title}</h3>
          <p className="content-text">{`${vote_average} / 10`}</p>
          <p className="content-text">{calculatePrice(vote_average).harga}</p>
          <Link
            to={`/movie/detail/${id}`}
            className="btn btn-outline-primary btn-block"
          >
            Learn More
          </Link>
          <br />
          <Link to="/" className="btn btn-danger" disabled>
            Buy
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default KartuMovie;
