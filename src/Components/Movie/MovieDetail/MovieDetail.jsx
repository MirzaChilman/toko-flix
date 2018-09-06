import React, { Component } from 'react';
import './MovieDetail.css';
import axios from 'axios';
import MovieRecommendation from '../MovieRecommendation/MovieRecommendation';
// https://api.themoviedb.org/3/movie/299536?api_key=ae4dc1e91f4721e7f574d512da8263fd&language=en-US
class MovieDetail extends Component {
  state = {
    movieData: [],
    movieCast: [],
    movieRecommendation: [],
    movieAlike: [],
    isLoading: true,
    API_KEY: 'ae4dc1e91f4721e7f574d512da8263fd',
  };

  getMovieDetail = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${
          this.props.match.params.movieId
        }?api_key=${this.state.API_KEY}`
      )
      .then(response =>
        this.setState({ movieData: response.data, isLoading: false })
      );
  };

  getMovieCast = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${
          this.props.match.params.movieId
        }/credits?api_key=${this.state.API_KEY}`
      )
      .then(response =>
        this.setState({ movieCast: response.data, isLoading: false })
      );
  };

  getMovieReccomendation = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${
          this.props.match.params.movieId
        }/recommendations?api_key=${this.state.API_KEY}`
      )
      .then(response =>
        this.setState({ movieRecommendation: response.data, isLoading: false })
      );
  };

  componentWillMount() {
    this.getMovieDetail();
    this.getMovieCast();
    this.getMovieReccomendation();
  }

  render() {
    console.log(this.state.movieCast.cast);
    console.log(this.state.movieRecommendation);
    const {
      poster_path,
      original_title,
      vote_average,
      runtime,
      release_date,
      overview,
    } = this.state.movieData;
    return (
      <React.Fragment>
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
                <p className="lead">Rating : {vote_average} / 10</p>
                <p className="lead">Release Date :{release_date}</p>
                <p className="lead">{runtime} Hours</p>
              </div>
              <hr />
              <p>{overview}.</p>
              <div className="d-flex justify-content-between">
                <p>Starring</p>
                <p className="ml-3">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
                  eius alias, mollitia voluptatum corrupti tenetur atque ea vel
                  dolore. Dignissimos architecto rerum nisi, unde maxime
                  molestias hic quaerat. Asperiores, cum?
                </p>
              </div>
              <div className="d-flex justify-content-center">
                <button className="btn btn-lg btn-primary">Buy</button>
              </div>
            </article>
          </section>
        </section>
        <MovieRecommendation />
      </React.Fragment>
    );
  }
}

export default MovieDetail;
