import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./home/Home";
import Header from "./header/Header";
import Profile from './profile/Profile';

const routing = (
  <Router>
    <div>
    <Header className='header' classes={{menuBar: 'menu', title: 'title'}} />
      <Switch>
        <Route exact path="/" children={<Home />} />
        <Route path="/profile/:userName" children={<Profile />} />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));