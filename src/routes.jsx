import React from 'react';
import { Route } from 'react-router';

import App from './client/components/App.react';

function Routes() {
  return (
    <Route path="/" component={App} />
  );
}

export default Routes;
