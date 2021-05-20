import React, { Component, useEffect, useState } from "react";
import "./index.css";
import Logo from "../../assets/logo.png";
import { Link, withRouter } from "react-router-dom";
import AuthService from "../../services/authService";
import Cookies from "js-cookie";

const Header = (props) => {
  const jwtToken = Cookies.get("jwt_token");

  const { history } = props;
  let logout = () => {
    AuthService.logout();

    history.replace("/login");
  };

  return (
    <div>
      {jwtToken ? (
        <nav className="navbar navbar-light fixed custom-nav">
          <div className="row col-12 d-flex justify-content-between align-items-center text-primary">
            <Link to="/">
              <img src={Logo} />
            </Link>
            <a onClick={logout} className="nav-item nav-link">
              Logout
            </a>
          </div>
        </nav>
      ) : (
        <nav className="navbar navbar-light fixed custom-nav">
          <div className="row col-12 d-flex justify-content-between align-items-center text-primary">
            <Link to="/">
              <img src={Logo} />
            </Link>
            <ul className="d-flex justify-content-between ">
              <li className="li-item">
                <Link to="/">Login</Link>
              </li>
              <li className="li-item ml-2">
                <Link to="/register">SignUp for free</Link>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </div>
  );
};

export default withRouter(Header);
