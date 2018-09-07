import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Wrapper from '../../Kartu/Wrapper/Wrapper';
import Spinner from '../../Spinner/Spinner';
import KartuMovie from '../../Kartu/KartuMovie/KartuMovie';
import { connect } from 'react-redux';
import { fetchRecommendation } from '../../../Redux/Actions/MovieListActions';

class MovieRecommendation extends Component {
  state = {
    isLoading: true,
  };

  async componentDidMount() {
    const { movieId } = this.props;
    await this.props.fetchRecommendation(movieId);
    console.log(this.props);
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
        <h1 className="text-danger">Movie recomendation</h1>
        <Wrapper>
          {this.state.isLoading ? (
            <Spinner />
          ) : (
            this.props.movieRecommendations.slice(0, 4).map(datum => {
              return <KartuMovie key={datum.id} {...datum} />;
            })
          )}
        </Wrapper>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  movieRecommendations: state.movieList.movieRecommendations,
});
export default connect(
  mapStateToProps,
  {
    fetchRecommendation,
  }
)(MovieRecommendation);
