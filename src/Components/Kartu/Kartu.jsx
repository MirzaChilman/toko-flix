import React, { Component } from 'react';
import './kartu.css';
import KartuMovie from './KartuMovie/KartuMovie';
import axios from 'axios';
import Wrapper from './Wrapper/Wrapper';
import Spinner from '../Spinner/Spinner';
import { connect } from 'react-redux';
import {
  fetchIndonesia,
  fetchRecommendation,
  fetchAlike,
} from '../../Redux/Actions/MovieListActions';
class Kartu extends Component {
  state = {
    isLoading: true,
  };

  componentWillMount() {
    this.props.fetchIndonesia();
    this.props.fetchRecommendation();
    this.props.fetchAlike();
  }

  render() {
    console.log(this.props.movieIndonesia);

    return (
      <React.Fragment>
        <p className="mt-5 text-danger">Now Playing in Indonesia</p>
        <Wrapper>
          {this.props.movieIndonesia.map(datum => {
            return <KartuMovie key={datum.id} {...datum} />;
          })}
        </Wrapper>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  movieIndonesia: state.movieList.movieIndonesia,
  movieRecommendations: state.movieList.movieRecommendations,
  movieAlike: state.movieList.movieAlike,
});
export default connect(
  mapStateToProps,
  { fetchIndonesia, fetchRecommendation, fetchAlike }
)(Kartu);
