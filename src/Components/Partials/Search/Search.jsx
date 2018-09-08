import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import searchIcon from '../../../assets/search-icon.png';
import './search.css';

class Search extends Component {
  state = {
    search: '',
  };

  handleChange = (e) => {
    this.setState({
      search: e.target.value,
    });
  };

  render() {
    const { search } = this.state;
    return (
      <React.Fragment>
        <input
          className="search"
          type="text"
          value={search}
          placeholder="Search Movie ..."
          onChange={this.handleChange}
        />

        <Link to={`/${search}`} onClick={this.handleClick}>
          <img className="search-icon" src={searchIcon} alt={searchIcon} />
        </Link>
      </React.Fragment>
    );
  }
}
let _;
export default Search;
