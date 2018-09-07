import React, { Component } from 'react';
import './MovieDetail.css';
import MovieRecommendation from '../MovieRecommendation/MovieRecommendation';
import { connect } from 'react-redux';
import {
  fetchMovieCast,
  fetchMovieDetails,
} from '../../../Redux/Actions/MovieActions';
import MovieAlike from '../MovieAlike/MovieAlike';
import Utils from '../../../utils/Utils';
import Spinner from '../../Spinner/Spinner';
class MovieDetail extends Component {
  state = {
    isLoading: true,
  };

  // 76341
  async componentDidMount() {
    const { movieId } = this.props.match.params;
    await this.props.fetchMovieDetails(movieId);
    await this.props.fetchMovieCast(movieId);

    this.setState({
      isLoading: false,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params !== this.props.match.params) {
      console.log('COMPONENT DID UPDATE');
      this.componentDidMount();
    }
  }
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
    const { calculatePrice } = Utils;
    return (
      <React.Fragment>
        <h1>data</h1>
        <section className="kontainer-grid">
          <section className="kontainer-item">
            <article className="kontainer-item__image">
              <img
                src={`http://image.tmdb.org/t/p/w500${poster_path}`}
                alt=""
              />
            </article>
            <article className="kontainer-item__details">
              <h1 className="text-center">{original_title}</h1>
              <div className="d-flex justify-content-between">
                <p className="lead">
                  Rating :{' '}
                  <span className="text-warning">{vote_average} / 10 </span>
                </p>
                <p className="lead">
                  Release Date :{' '}
                  <span className="text-warning">{release_date}</span>
                </p>
                <p className="lead">
                  Runtime:
                  <span className="text-warning">{runtime}</span> Hours
                </p>
              </div>
              <hr />
              <p>
                Price :{' '}
                <span className="text-success text-heavy">
                  {calculatePrice(vote_average).harga}
                </span>
              </p>
              <p>{overview}.</p>
              <p className="text-danger">Starring</p>
              <div className="kontainer-item__cast">
                {!this.state.isLoading ? (
                  this.props.movieCast
                    .slice(0, 4)
                    .map(({ character, name, profile_path, cast_id }) => {
                      return (
                        <figure key={cast_id}>
                          <img
                            className="cast-poster__image"
                            src={`http://image.tmdb.org/t/p/w400/${profile_path}`}
                            alt={profile_path}
                          />
                          <figcaption className="text-center">
                            {name} <span className="text-warning"> as</span>{' '}
                            {character}
                          </figcaption>
                        </figure>
                      );
                    })
                ) : (
                  <Spinner />
                )}
              </div>
              <div className="d-flex justify-content-center">
                <button className="btn btn-lg btn-primary">Buy</button>
              </div>
            </article>
          </section>
        </section>
        <MovieRecommendation movieId={this.props.match.params.movieId} />
        <MovieAlike movieId={this.props.match.params.movieId} />
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
  }
)(MovieDetail);
