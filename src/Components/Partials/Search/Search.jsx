import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { searchMovie } from '../../../Redux/Actions/MovieListActions';
import searchIcon from '../../../assets/search-icon.png';
import './search.css';

class Search extends Component {
  state = {
    search: '',
  };

  handleChange = e => {
    const { searchMovie } = this.props;
    searchMovie(e.target.value);
  };

  render() {
    const { searchState } = this.props;
    return (
      <React.Fragment>
        <input
          className="search"
          type="text"
          value={searchState}
          placeholder="Search Movie ..."
          onChange={this.handleChange}
        />

        {/* <Link to={`/${search}`} onClick={this.handleClick}>
          <img className="search-icon" src={searchIcon} alt={searchIcon} />
        </Link> */}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  searchState: state.movieList.searchQuery,
});

export default connect(
  mapStateToProps,
  { searchMovie },
)(Search);
