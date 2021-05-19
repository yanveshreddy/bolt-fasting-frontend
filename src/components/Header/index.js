import React, { Component } from "react";
import "./index.css";
import Logo from "../../assets/logo.png";
import { Link, Redirect } from "react-router-dom";
import AuthService from "../../services/authService";
class Header extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({ currentUser: AuthService.getCurrentUser() });
    }
  }

  logout() {
    AuthService.logout();
    <Redirect to="/" />;
    // history.push("/login");
  }
  render() {
    const { currentUser } = this.state;
    return (
      <div>
        {currentUser && (
          <nav className="navbar navbar-light fixed custom-nav">
            <div className="row col-12 d-flex justify-content-between align-items-center text-primary">
              <Link to="/">
                <img src={Logo} />
              </Link>
              <a onClick={this.logout} className="nav-item nav-link">
                Logout
              </a>
            </div>
          </nav>
        )}
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
      </div>
    );
  }
}

export default Header;
