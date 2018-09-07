import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Wrapper from '../../Kartu/Wrapper/Wrapper';
import Spinner from '../../Spinner/Spinner';
import KartuMovie from '../../Kartu/KartuMovie/KartuMovie';
import { connect } from 'react-redux';
import { fetchAlike } from '../../../Redux/Actions/MovieListActions';

class MovieAlike extends Component {
  state = {
    isLoading: true,
  };

  async componentDidMount() {
    const { movieId } = this.props;
    await this.props.fetchAlike(movieId);
    this.setState({
      isLoading: false,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.movieId !== this.props.movieId) {
      console.log('COMPONENT DID UPDATE');
      this.componentDidMount();
    }
  }
  render() {
    return (
      <Container fluid>
        <h1 className="text-danger">Movie Similar</h1>
        <Wrapper>
          {this.state.isLoading ? (
            <Spinner />
          ) : (
            this.props.movieAlike.slice(0, 4).map(datum => {
              return <KartuMovie key={datum.id} {...datum} />;
            })
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
  }
)(MovieAlike);
