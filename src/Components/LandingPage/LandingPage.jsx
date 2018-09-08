import React, { Component } from 'react';
import { connect } from 'react-redux';
import Kartu from '../Kartu/Kartu';
import { fetchNowPlaying } from '../../Redux/Actions/MovieListActions';
import Pagenation from '../Pagenation/Pagenation';

class LandingPage extends Component {
  state = {
    isLoading: true,
  };

  async componentDidMount() {
    const { pageId } = this.props.match.params;
    await this.props.fetchNowPlaying(pageId);
    this.setState({ isLoading: false });
  }

  render() {
    const { isLoading } = this.state;
    return (
      <React.Fragment>
        <Kartu {...this.props} isLoading={isLoading} />
        <Pagenation match={this.props.match} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  movieIndonesia: state.movieList.movieIndonesia,
  pageData: state.movieList.pageData,
});

export default connect(
  mapStateToProps,
  { fetchNowPlaying },
)(LandingPage);
