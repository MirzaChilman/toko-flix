import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { connect } from 'react-redux';
import Utils from '../../../utils/Utils';
import { dispatchAccountCredit } from '../../../Redux/Actions/AccountActions';
import './KartuMovie.css';
class KartuMovie extends Component {
  state = {
    buttonStatus: 'buy',
    buttonStyle: 'btn-danger',
    buttonAttr: false,
  };

  componentDidMount() {
    //get movie
    let movie = JSON.parse(localStorage.getItem('storageMovie'));
    if (movie) {
      //if exist then change button
      if (movie.includes(this.props.id)) {
        this.setState({
          buttonStatus: 'Owned',
          buttonStyle: 'btn-secondary',
          buttonAttr: true,
        });
      }
    } else {
      //initialize movie collection storage to prevent bug
      localStorage.setItem('storageMovie', JSON.stringify(['checking']));
    }
  }

  afforadbleHandler = () => {
    let credit = JSON.parse(localStorage.getItem('storageCredit'));
    let price = Utils.calculatePrice(this.props.vote_average);
    if (credit < price) {
      this.setState({
        buttonStatus: 'Buy more Credit',
        buttonStyle: 'btn-secondary',
        buttonAttr: true,
      });
    }
  };

  //invoke 2 function onClick event
  combineClickedEvent = (id, price) => {
    //change the movie store in redux
    this.props.buyMovie(id, price);
    //call componentDidMount
    this.componentDidMount();
  };

  render() {
    const {
      poster_path,
      id,
      vote_average,
      original_title,
      overview,
    } = this.props;
    const { buttonStatus, buttonStyle, buttonAttr } = this.state;
    const { calculatePrice, titleToSlug } = Utils;
    let price = calculatePrice(vote_average);

    return (
      <React.Fragment>
        <div className="content" key={id} onMouseEnter={this.afforadbleHandler}>
          <div className="content-overlay" />
          <LazyLoad height={'100%'} resize={true} offset={100}>
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

let _;
export default connect(
  _,
  { buyMovie: dispatchAccountCredit }
)(KartuMovie);
