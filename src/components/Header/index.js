import React from "react";
import "./index.css";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-light fixed custom-nav">
      <div className="row col-12 d-flex justify-content-between align-items-center text-primary">
        <Link to="/">
          <img src={Logo} />
        </Link>
        {/* <ul className="d-flex justify-content-between ">
          <li className="li-item">
            <Link to="/">Login</Link>
          </li>
          <li className="li-item ml-2">
            <Link to="/register">SignUp for free</Link>
          </li>
        </ul> */}
      </div>
    </nav>
  );
};

export default Header;
