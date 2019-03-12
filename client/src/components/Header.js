//Making header a class componet because we expect a header to
//have alot of methods and helpers.
import React, { Component } from "react";
import { connect } from "react-redux";

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
        return (
          <li>
            <a href="/api/logout">Logout</a>
          </li>
        );
    }
  }
  //Method that renders(displays)
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="/" className="left brand-logo">
            PracticeApp
          </a>
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
