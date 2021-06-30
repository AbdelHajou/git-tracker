import React from 'react';
import ReactDOM from 'react-dom';
import Profile from './profile/Profile';
import './index.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <>
      <Profile userName='octocat' />
    </>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
