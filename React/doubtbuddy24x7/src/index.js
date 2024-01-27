import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import VideoConference from './components/VideoConference';
import Login from './components/Authentication/Login';
import { Auth0Provider } from '@auth0/auth0-react';
import OnlineStatus from './components/Doubtsolver/Onlinestatus';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Auth0Provider
      domain="dev-sx2uj72t1uenlnn7.us.auth0.com"
      clientId="Wwk2Q1l7PWMnrEnieWEJkfyrb9aF613z"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <App/>
      {/* <OnlineStatus/> */}
    </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
