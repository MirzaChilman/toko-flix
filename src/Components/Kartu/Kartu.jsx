import React, { Component } from 'react';
import './kartu.css';
import KartuMovie from './KartuMovie/KartuMovie';
import axios from 'axios';
import Wrapper from './Wrapper/Wrapper';
import Spinner from '../Spinner/Spinner';

class Kartu extends Component {
  state = {
    data: [],
    isLoading: true,
  };
  componentDidMount() {
    axios
      .get(
        'https://api.themoviedb.org/3/movie/now_playing?api_key=ae4dc1e91f4721e7f574d512da8263fd&language=en-US&page=1&region=ID'
      )
      .then(response =>
        this.setState({ data: response.data.results, isLoading: false })
      );
  }

  render() {
    return (
      <React.Fragment>
        <p className="mt-5 text-danger">Now Playing in Indonesia</p>
        <Wrapper>
          {this.state.isLoading ? (
            <Spinner />
          ) : (
            this.state.data.map(datum => {
              return <KartuMovie {...datum} />;
            })
          )}
        </Wrapper>
      </React.Fragment>
    );
  }
}

export default Kartu;
