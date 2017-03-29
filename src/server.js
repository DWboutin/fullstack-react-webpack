// @flow
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import DatabaseManager from './server/helpers/DatabaseManager';

import serverRoutes from './server/routes';

const app = express();
const appPort = (process.env.NODE_ENV === 'test') ? 1234 : 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://mongo:27017', (err) => {
  if (err) {
    throw err;
  }
  if (process.env.NODE_ENV !== 'test') {
    DatabaseManager.create();
  }
});

app.use(bodyParser.json());

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

app.get('/', function(req, res){
  res.send("Hello World");
});

app.use(serverRoutes);

app.listen(appPort, function(){
  console.log(`Listening on port ${appPort}!`);
});

export default app;