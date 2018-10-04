import React from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import Wrapper from '../../Wrapper/Wrapper';
import Spinner from '../../Spinner/Spinner';
import KartuMovie from '../../Kartu/KartuMovie/KartuMovie';
import { fetchRecommendation, fetchAlike } from '../../../Redux/Actions/MovieListActions';

interface Props{
  fetchRecommendation: {}
}

interface State {
  isLoading:boolean
}

class MovieRecommendation extends React.Component<Props,State> {
  public state = {
    isLoading: true,
  };

  public async componentDidMount() {
    const { match } = this.props;
    const { fetchRecommendation, fetchAlike } = this.props;
    await fetchRecommendation(match.params.movieId);
    await fetchAlike(match.params.movieId);
    this.setState({
      isLoading: false,
    });
  }

  public componentDidUpdate(prevProps) {
    const { match } = this.props;
    if (prevProps.match !== match) {
      // eslint-disable-react/no-did-update-set-state
      this.setState({
        isLoading: true,
      });
      this.componentDidMount();
    }
  }

  public  render() {
    const { isLoading } = this.state;
    const { movieRecommendations } = this.props;
    return (
      <Container fluid>
        <h1 className="text-danger">Movie recomendation</h1>
        <Wrapper>
          {isLoading ? (
            <Spinner />
          ) : (
            movieRecommendations.slice(0, 10).map(datum => <KartuMovie key={datum.id} {...datum} />)
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
    fetchAlike,
  },
)(MovieRecommendation);
