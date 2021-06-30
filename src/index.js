import React from 'react';
import ReactDOM from 'react-dom';
import Profile from './profile/Profile';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <>
    <Router>
      <Switch>
        <Route path="/profile/:userName" children={<Profile />} />
      </Switch>
    </Router>
    </>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
