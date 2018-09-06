import React from 'react';
import { Container } from 'reactstrap';
import './MovieRecommendation.css';

const MovieRecommendation = () => (
  <Container fluid>
    <h1>Movie recomendation</h1>

    <section className="movie-recomendation">
      <img
        src="http://image.tmdb.org/t/p/w400///6ORGBbOA45pfKQXvntPf46NoFGO.jpg"
        alt=""
      />
      <img
        src="http://image.tmdb.org/t/p/w400///6ORGBbOA45pfKQXvntPf46NoFGO.jpg"
        alt=""
      />
      <img
        src="http://image.tmdb.org/t/p/w400///6ORGBbOA45pfKQXvntPf46NoFGO.jpg"
        alt=""
      />
    </section>
  </Container>
);

export default MovieRecommendation;
