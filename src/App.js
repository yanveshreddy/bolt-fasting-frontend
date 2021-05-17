// import logo from './logo.svg';
import React, { useEffect, useState } from "react";
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

function App() {
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  let [count, setCount] = useState(0);

  useEffect(() => {
    //rerendering
  }, [count]);

  async function handleCallBack(childData) {
    await setIsLoggedIn(childData);
    await setCount(count + 1);
    console.log(isLoggedIn);
    console.log(count);
  }
  return (
    <div className="bg-container">
      <div className="container">
        <Router>
          <Header />
          {/* {isLoggedIn ? <Redirect to="/dashboard" /> : <Redirect to="/login" />} */}
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Dashboard />
          {/* <Switch>
            <Route exact path="/login">
              <Login handleCallBack={handleCallBack} message="hi" />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/">
              <Redirect to="/login" />
            </Route>
          </Switch> */}
        </Router>
      </div>
    </div>
  );
}

export default App;
