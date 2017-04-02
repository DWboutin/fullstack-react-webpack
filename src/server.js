// @flow
import express from 'express';
// import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import reactRouting from './middlewares/reactRouting';
import webpackDevServer from './middlewares/webpackDevServer';

import config from '../config';

import serverRoutes from './server/routes';

const { PROD_ENV } = config;

const app = express();
const appPort = (process.env.NODE_ENV === 'test') ? 1234 : 3000;

if (!PROD_ENV) {
  webpackDevServer(app);
}

/*
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://mongo:27017', (err) => {
  if (err) {
    throw err;
  }
});
*/

app.use(bodyParser.json());
app.use('/assets', express.static(`${process.env.ROOT_FOLDER}/public`));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

app.use(serverRoutes);
app.use(reactRouting);

app.listen(appPort, function(){
  console.log(`Listening on port ${appPort}!`);
});

export default app;