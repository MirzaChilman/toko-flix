import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import Wrapper from '../../Wrapper/Wrapper';
import Spinner from '../../Spinner/Spinner';
import KartuMovie from '../../Kartu/KartuMovie/KartuMovie';
import { fetchAlike } from '../../../Redux/Actions/MovieListActions';

class MovieAlike extends Component {
  state = {
    isLoading: true,
  };

  async componentDidMount() {
    const { match } = this.props;
    await this.props.fetchAlike(match.params.movieId);
    this.setState({
      isLoading: false,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.movieId !== this.props.movieId) {
      this.setState({
        isLoading: true,
      });
      this.componentDidMount();
    }
  }

  render() {
    const { isLoading } = this.state;
    const { movieAlike } = this.props;
    return (
      <Container fluid>
        <h1 className="text-danger">Movie Similar</h1>
        <Wrapper>
          {isLoading ? (
            <Spinner />
          ) : (
            movieAlike
              .slice(0, 4)
              .map(datum => <KartuMovie key={datum.id} {...datum} />)
          )}
        </Wrapper>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  movieAlike: state.movieList.movieAlike,
});
export default connect(
  mapStateToProps,
  {
    fetchAlike,
  },
)(MovieAlike);
