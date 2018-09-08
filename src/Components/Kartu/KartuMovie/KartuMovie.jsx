import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { calculatePrice, titleToSlug } from '../../../utils/Utils';
import { dispatchAccountCredit } from '../../../Redux/Actions/AccountActions';
import './KartuMovie.css';

class KartuMovie extends Component {
  state = {
    buttonStatus: 'buy',
    buttonStyle: 'btn-danger',
    buttonAttr: false,
  };

  componentDidMount() {
    // get movie
    const movie = JSON.parse(localStorage.getItem('storageMovie'));
    const { id } = this.props;
    if (movie) {
      // if exist then change button
      if (movie.includes(id)) {
        this.setState({
          buttonStatus: 'Owned',
          buttonStyle: 'btn-success',
          buttonAttr: true,
        });
      }
    } else {
      // initialize movie collection storage to prevent bug
      localStorage.setItem('storageMovie', JSON.stringify(['checking']));
    }
  }

  // check if the movie can be bought
  afforadbleHandler = () => {
    const credit = JSON.parse(localStorage.getItem('storageCredit'));
    const price = calculatePrice(this.props.vote_average);
    const movie = JSON.parse(localStorage.getItem('storageMovie'));
    const { id } = this.props;
    if (credit < price && !movie.includes(id)) {
      this.setState({
        buttonStatus: 'Buy more Credit',
        buttonStyle: 'btn-secondary',
        buttonAttr: true,
      });
    }
  };

  afforadbleHandler = () => {
    const credit = JSON.parse(localStorage.getItem('storageCredit'));
    const price = calculatePrice(this.props.vote_average);
    const movie = JSON.parse(localStorage.getItem('storageMovie'));
    const { id } = this.props;
    if (credit < price && !movie.includes(id)) {
      this.setState({
        buttonStatus: 'Buy more Credit',
        buttonStyle: 'btn-secondary',
        buttonAttr: true,
      });
    }
  };

  // invoke 2 function onClick event
  combineClickedEvent = (id, price) => {
    // change the movie store in redux
    const { buyMovie } = this.props;
    buyMovie(id, price);
    // call componentDidMount
    this.componentDidMount();
  };

  render() {
    /* eslint-disable camelcase */
    const {
      poster_path,
      id,
      vote_average,
      original_title,
      overview,
    } = this.props;
    const { buttonStatus, buttonStyle, buttonAttr } = this.state;
    const price = calculatePrice(vote_average);

    return (
      <React.Fragment>
        <div className="content" key={id} onMouseEnter={this.afforadbleHandler}>
          <div className="content-overlay" />
          <LazyLoad height="100%" resize offset={100}>
            <img
              className="content-image"
              src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
              alt={overview}
            />
          </LazyLoad>
          <div className="content-details fadeIn-bottom">
            <h3 className="content-title">{original_title}</h3>
            <p className="content-text">{`${vote_average} / 10`}</p>
            <p className="content-text">{`Rp.${price}`}</p>
            <Link
              to={`/movie/detail/${id}-${titleToSlug(original_title)}`}
              className="btn btn-outline-primary btn-block"
            >
              Learn More
            </Link>
            <br />
            {/* eslint-disable react/button-has-type */}
            <button
              className={`btn ${buttonStyle} btn-block`}
              onClick={() => this.combineClickedEvent(id, price)}
              disabled={buttonAttr}
            >
              {buttonStatus}
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

KartuMovie.propTypes = {
  poster_path: PropTypes.string,
  id: PropTypes.number,
  vote_average: PropTypes.number,
  original_title: PropTypes.string,
  overview: PropTypes.string,
  buyMovie: PropTypes.func,
};

KartuMovie.defaultProps = {
  poster_path: '/image',
  id: 50273,
  vote_average: 0,
  original_title: 'Judul',
  overview: 'Overview Movie',
  buyMovie: 'buyMovie(id, vote_average)',
};

let _;
export default connect(
  _,
  { buyMovie: dispatchAccountCredit },
)(KartuMovie);
