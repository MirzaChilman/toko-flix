import React, { Component } from 'react';
import { connect } from 'react-redux';
import Kartu from '../Kartu/Kartu';
import { fetchIndonesia } from '../../Redux/Actions/MovieListActions';

class LandingPage extends Component {
  state = {
    isLoading: true,
  };

  async componentDidMount() {
    await this.props.fetchIndonesia();
    this.setState({ isLoading: false });
  }

  render() {
    const { isLoading } = this.state;
    return (
      <React.Fragment>
        <Kartu {...this.props} isLoading={isLoading} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  movieIndonesia: state.movieList.movieIndonesia,
});

export default connect(
  mapStateToProps,
  { fetchIndonesia },
)(LandingPage);
