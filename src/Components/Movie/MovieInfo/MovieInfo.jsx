/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMovieCast, fetchMovieDetails } from '../../../Redux/Actions/MovieActions';
import LazyLoad from 'react-lazyload';
import { calculatePrice, afforadbleHandler } from '../../../utils/Utils';
import { dispatchAccountCredit } from '../../../Redux/Actions/AccountActions';
import Spinner from '../../Spinner/Spinner';
import './MovieInfo.css';
class MovieDetail extends Component {
  state = {
    isLoading: true,
    buttonStatus: 'buy',
    buttonStyle: 'btn-danger',
    buttonAttr: false,
  };

  async componentDidMount() {
    const { match, movieDetails } = this.props;
    const movie = JSON.parse(localStorage.getItem('storageMovie'));

    await this.props.fetchMovieDetails(match.params.movieId);
    await this.props.fetchMovieCast(match.params.movieId);
    console.log(this.props.movieDetails.id);
    if (movie) {
      // if exist then change button
      if (movie.includes(this.props.movieDetails.id)) {
        this.setState({
          buttonStatus: 'Owned',
          buttonStyle: 'btn-success',
          buttonAttr: true,
        });
      }
    }
    this.afforadbleHandler();
    this.setState({
      isLoading: false,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { match } = this.props;
    if (prevProps.match.params !== match.params) {
      this.setState({
        isLoading: true,
      });
      this.componentDidMount();
    }
  }

  afforadbleHandler = () => {
    const credit = JSON.parse(localStorage.getItem('storageCredit'));
    const price = calculatePrice(this.props.vote_average);
    const movie = JSON.parse(localStorage.getItem('storageMovie'));
    const { id } = this.props.movieDetails;
    console.log(id);
    if (credit < price || !movie.includes(id)) {
      this.setState({
        buttonStatus: 'Buy more Credit',
        buttonStyle: 'btn-secondary',
        buttonAttr: true,
      });
    }
  };

  // invoke 2 function onClick event
  combineClickedEvent = (id, price) => {
    console.log('ke Click');
    // change the movie store in redux
    const { buyMovie } = this.props;
    buyMovie(id, price);
    // call componentDidMount
    this.componentDidMount();
  };

  render() {
    const {
      original_title,
      id,
      poster_path,
      overview,
      vote_average,
      release_date,
      runtime,
    } = this.props.movieDetails;
    const { buttonStatus, buttonStyle, buttonAttr } = this.state;
    const price = calculatePrice(vote_average);
    return (
      <React.Fragment>
        <section className="kontainer-grid">
          <section className="kontainer-item" key={id}>
            <article className="kontainer-item__image">
              {this.state.isLoading ? (
                <Spinner />
              ) : (
                <LazyLoad height="100%" resize offset={100}>
                  <img src={`http://image.tmdb.org/t/p/w500${poster_path}`} alt="" />
                </LazyLoad>
              )}
            </article>
            <article className="kontainer-item__details">
              <h1 className="text-center">{original_title}</h1>
              <div className="d-flex justify-content-between">
                <p className="lead">
                  Rating: <span className="text-warning">{vote_average}/ 10</span>
                </p>
                <p className="lead">
                  Release Date: <span className="text-warning">{release_date}</span>
                </p>
                <p className="lead">
                  Runtime: <span className="text-warning">{runtime}</span> Hours
                </p>
              </div>
              <hr />
              <h3>
                Price :{' '}
                <span className="text-success text-heavy">
                  {`Rp.${calculatePrice(vote_average)}`}
                </span>
              </h3>
              <p>{overview}.</p>
              <p className="text-danger">Starring</p>
              <div className="kontainer-item__cast text-center">
                {!this.state.isLoading ? (
                  this.props.movieCast
                    .slice(0, 6)
                    .map(({ character, name, profile_path, cast_id }) => (
                      <figure key={cast_id}>
                        <LazyLoad height="100%" resize offset={100} once>
                          <img
                            className="cast-poster__image"
                            src={`http://image.tmdb.org/t/p/w400/${profile_path}`}
                            alt={name}
                          />
                        </LazyLoad>
                        <figcaption className="text-center">
                          {name} <span className="text-warning"> as</span> {character}
                        </figcaption>
                      </figure>
                    ))
                ) : (
                  <Spinner />
                )}
              </div>
              <div className="d-flex justify-content-center">
                <button
                  className={`btn ${buttonStyle} btn-block`}
                  onClick={() => this.combineClickedEvent(id, price)}
                  disabled={buttonAttr}
                >
                  {buttonStatus}
                </button>
              </div>
            </article>
          </section>
        </section>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  movieDetails: state.movieDataDetails.movieDetails,
  movieCast: state.movieDataDetails.movieCast,
});

export default connect(
  mapStateToProps,
  {
    fetchMovieDetails,
    fetchMovieCast,
    buyMovie: dispatchAccountCredit,
  },
)(MovieDetail);
