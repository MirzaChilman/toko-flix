import React, { Component } from 'react';
import KartuMovie from './KartuMovie/KartuMovie';
import Wrapper from './Wrapper/Wrapper';
import Spinner from '../Spinner/Spinner';
import { connect } from 'react-redux';
import { fetchIndonesia } from '../../Redux/Actions/MovieListActions';
class Kartu extends Component {
  state = {
    isLoading: true,
  };

  async componentDidMount() {
    await this.props.fetchIndonesia();
    this.setState({ isLoading: false });
  }

  render() {
    return (
      <React.Fragment>
        <p className="mt-5 text-danger">Now Playing in Indonesia</p>
        <Wrapper>
          {this.state.isLoading ? (
            <Spinner />
          ) : (
            this.props.movieIndonesia.map(datum => {
              return <KartuMovie key={datum.id} {...datum} />;
            })
          )}
        </Wrapper>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  movieIndonesia: state.movieList.movieIndonesia,
});

export default connect(
  mapStateToProps,
  { fetchIndonesia }
)(Kartu);
