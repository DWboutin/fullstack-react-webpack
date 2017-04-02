import React from 'react';
import { Route } from 'react-router-dom';

import App from 'components/App.react';
import Messages from 'components/pages/Messages.react';

function Routes() {
  return (
    <App>
      <Route path="/" component={Messages} />
    </App>
  );
}

export default Routes;
