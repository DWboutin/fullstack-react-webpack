import React from 'react';
import ReactDOM from 'react-dom';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';

import reducers from './client/reducers';

import thunkMiddleware from './middlewares/thunkMiddleware';

import Routes from './routes';

import config from '../config';

const { APP_DOM_CONTAINER } = config;

const history = createHistory();

const reduxRouterMiddleware = routerMiddleware(history);

const initialState = window.INITIAL_STATE;

const configureStore = compose(
  applyMiddleware(thunkMiddleware, reduxRouterMiddleware)
)(createStore);

const store = configureStore(reducers, initialState);

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter history={history}>
      <Routes />
    </BrowserRouter>
  </Provider>
), document.getElementById(APP_DOM_CONTAINER));
