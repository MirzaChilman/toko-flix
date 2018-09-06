/* eslint-disable */
import React from 'react';
import './KartuMovie.css';

const KartuMovie = props => {
  const { poster_path, id, vote_average, original_title, overview } = props;
  console.log(props);
  return (
    <React.Fragment>
      <div className="content" key={id}>
        <a href="https://unsplash.com/photos/HkTMcmlMOUQ">
          <div className="content-overlay" />
          <img
            className="content-image"
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            alt={overview}
          />
          <div className="content-details fadeIn-bottom">
            <p className="content-title">{original_title}</p>
            <p className="content-text">{`${vote_average} / 10`}</p>
            <button type="submit" className="button button--secondary">
              Learn More
            </button>
          </div>
        </a>
      </div>
    </React.Fragment>
  );
};

export default KartuMovie;
