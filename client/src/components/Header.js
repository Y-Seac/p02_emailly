//Making header a class componet because we expect a header to
//have alot of methods and helpers.
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StripePay from './StripePay';

class Header extends Component {
  //helper method that determines the status of oAuth
  userStatus() {
    switch (this.props.auth) {
      case null: //if its still processing & we dont know yet
        return;
      case false: //not logged in
        return (
          <li>
            <a href="/auth/google"> Login w. Google </a>
          </li>
        );
      default:
        return [
          <li key="1">
            <StripePay />
          </li>,
          <li key="3" style={{ margin: '0 10px' }}>
            Credits: {this.props.auth.credits}
          </li>,
          <li key="2">
            <a href="/api/logout">Logout</a>
          </li>
        ];
    }
  }
  //Method that renders(displays)
  // to={this.props.user ? '/surveys' : '/'} boolean checks if user exist
  //if true return /surveys else return /
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? '/surveys' : '/'}
            className="left brand-logo"
          >
            SurveyMail
          </Link>
          <ul className="right">
            <li>{this.userStatus()}</li>
          </ul>
        </div>
      </nav>
    );
  }
}
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
