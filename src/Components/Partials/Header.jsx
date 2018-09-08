import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NetflixLogo from '../../assets/Netflix-logo.png';
import { requestAccountCredit } from '../../Redux/Actions/AccountActions';
import Search from './Search/Search';

import './header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  async componentDidMount() {
    // eslint-disable-next-line
    await this.props.requestAccountCredit();
  }

  toggle() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  }

  render() {
    const { isOpen } = this.state;
    const { accountCredit } = this.props;
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">
            <img src={NetflixLogo} className="nav-brand" alt="NetFlix Logo" />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Browse
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Lorem</DropdownItem>
                  <DropdownItem>Ipsum</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Dolor</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <NavLink href="/components/" className="text-danger">
                  Movie
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">
                  About
                </NavLink>
              </NavItem>
            </Nav>
            <Nav className="ml-auto text-default" navbar>
              <NavItem className="mx-5">
                {`Account Credit : ${accountCredit}`}
                <Search className="form__search" />
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

Navbar.propTypes = {
  light: PropTypes.bool,
  dark: PropTypes.bool,
  fixed: PropTypes.string,
  color: PropTypes.string,
  role: PropTypes.string,
  expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  // pass in custom element to use
};

NavbarBrand.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  // pass in custom element to use
};
Header.defaultProps = {
  accountCredit: 100000,
};

Header.propTypes = {
  accountCredit: PropTypes.number,
};

const mapStateToProps = state => ({
  accountCredit: state.accountInfo.accountCredit,
});

export default connect(
  mapStateToProps,
  {
    requestAccountCredit,
  },
)(Header);
