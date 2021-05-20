// import logo from './logo.svg';
import React, { Component, useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/DashBoard";
import AuthService from "./services/authService";
// import history from "./helpers/history";
const App = () => {
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  let [currentUser, setCurrentUser] = useState(false);

  // constructor(props) {

  //   super(props);
  //   this.state = {
  //     currentUser: undefined,
  //     isLoggedIn: false,
  //   };
  // }

  let handleCallback = (data) => {
    console.log("isLoggedIn:" + data);
    setIsLoggedIn(data);
  };

  useEffect(() => {
    // const user = AuthService.getCurrentUser();
    console.log("in did mount");
    // if (user) {
    //   setCurrentUser(AuthService.getCurrentUser());
    // }
  }, [isLoggedIn, currentUser]);

  // const { currentUser } = this.state;
  return (
    <div className="bg-container">
      <div className="container">
        <BrowserRouter>
          <Header isLoggedIn={isLoggedIn} onLogout={handleCallback} />

          <Switch>
            <Route exact path="/login" component={Login} />

            <Route exact path="/register" component={Register} />

            <Route exact path="/dashboard" component={Dashboard} />

            <Route exact path="/" component={Login} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
