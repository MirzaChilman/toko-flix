import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchNowPlaying } from '../../Redux/Actions/MovieListActions';

class Pagenation extends Component {
  componentDidMount() {
    this.props.fetchNowPlaying(this.props.match.params.pageId);
  }

  componentWillReceiveProps(nextProps) {
    this.props.fetchNowPlaying(nextProps.match.params.pageId);
  }

  render() {
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <NavLink to="/page/1" className="page-link">
              1
            </NavLink>
          </li>
          <li className="page-item">
            <NavLink to="/page/2" className="page-link">
              2
            </NavLink>
          </li>
          <li className="page-item">
            <NavLink to="/page/3" className="page-link">
              3
            </NavLink>
          </li>
          <li className="page-item">
            <NavLink to="/page/4" className="page-link">
              4
            </NavLink>
          </li>
          <li className="page-item">
            <NavLink to="/page/5" className="page-link">
              5
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}
let _;
export default withRouter(
  connect(
    _,
    { fetchNowPlaying },
  )(Pagenation),
);
