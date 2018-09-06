/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import './KartuMovie.css';

const KartuMovie = props => {
  const { poster_path, id, vote_average, original_title, overview } = props;
  let harga;
  let styles = 'btn-danger';
  let statusButton = 'Buy';

  if (vote_average > 0 && vote_average <= 3) {
    harga = 'Rp.' + vote_average * 3500;
  } else if (vote_average > 3 && vote_average <= 6) {
    harga = 'Rp.' + vote_average * 8250;
  } else if (vote_average > 6 && vote_average <= 8) {
    harga = 'Rp.' + vote_average * 16350;
  } else if (vote_average > 8 && vote_average <= 10) {
    harga = 'Rp.' + vote_average * 21250;
  } else {
    harga = 'Belum Tersedia';
    styles = 'btn-secondary disabled';
    statusButton = 'Sudah dipunyai';
  }

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
          <p className="content-text">{harga}</p>
          <Link
            to={`/movie/detail/${id}`}
            className="btn btn-outline-primary btn-block"
          >
            Learn More
          </Link>
          <br />
          <Link to="/" className={`btn ${styles} btn-block`} disabled>
            {statusButton}
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default KartuMovie;
