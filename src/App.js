// import logo from './logo.svg';
import React, { Component, useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/DashBoard";
import AuthService from "./services/authService";
// import history from "./helpers/history";
class App extends Component {
  constructor(props) {
    super(props);
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

  render() {
    const { currentUser } = this.state;
    return (
      <div className="bg-container">
        <div className="container">
          <Router>
            <Header />
            <Login />
            <Switch>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/register">
                <Register />
              </Route>
              <Route exact path="/dashboard">
                <Dashboard />
              </Route>
              <Route exact path="/">
                <Redirect to="/login" />
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
