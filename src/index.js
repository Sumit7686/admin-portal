import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Assets/magdelin_fonts/Magdelin-Black.otf';
import './Assets/magdelin_fonts/Magdelin-Medium.otf';
import './Assets/magdelin_fonts/Magdelin-Bold.otf';
import './Assets/magdelin_fonts/Magdelin-Regular.otf';
import './Assets/magdelin_fonts/Poppins-Bold.ttf';
import './Assets/magdelin_fonts/Poppins-Medium.ttf';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Reducer from './Reducers/Reducer';
import { BrowserRouter as Router } from 'react-router-dom';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const myStore = createStore(Reducer, composeEnhancers(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={myStore}>
    <Router>
      <App />
    </Router>
  </Provider>
);
