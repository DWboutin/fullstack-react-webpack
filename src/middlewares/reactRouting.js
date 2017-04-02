import React from 'react'
import ReactDOMServer  from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import Html from '../client/Html.react';
import Routes from '../routes';
import reducers from '../client/reducers';
import thunkMiddleware from './thunkMiddleware';

const store = applyMiddleware(thunkMiddleware)(createStore)(reducers);

function reactRouting(req, res) {
  const state = store.getState();
  const context = {};

  const component = (
    <StaticRouter location={req.url} context={context}>
      <Provider store={store}>
        <Routes />
      </Provider>
    </StaticRouter>
  );

  res.status(200).send('<!DOCTYPE html>\n' + ReactDOMServer.renderToString(<Html component={component} initialState={state} />));
}

export default reactRouting;
