import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

//Quick way to test post request to sendgrid Api
import axios from 'axios';
window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk)); //redux store

ReactDOM.render(
  //A react componet
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);

//console.log("STRIPE KEY IS::", process.env.REACT_APP_STRIPE_KEY);
//console.log("Env is::", process.env.NODE_ENV);
