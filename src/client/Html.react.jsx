import React from 'react';
import { renderToString } from 'react-dom/server';

import config from '../../config';

const { APP_NAME, APP_DOM_CONTAINER, PROD_ENV, BASE_URL } = config;

function Html(props) {
  const { component } = props;
  const initialState = JSON.stringify(props.initialState);

  return (
    <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, user-scalable=no" />
      <title>{ APP_NAME }</title>
      <script dangerouslySetInnerHTML={{ __html: 'window.INITIAL_STATE = ' + initialState + ';' }} />
    </head>
    <body>
      <div id={ APP_DOM_CONTAINER } dangerouslySetInnerHTML={{ __html: renderToString(component) }} />
      <script src={ PROD_ENV && BASE_URL + '/assets/js/app.min.js' ||  '/assets/js/app.js' } />
    </body>
    </html>
  );
}

Html.propTypes = {
  initialState: React.PropTypes.object,
  component: React.PropTypes.object,
};

export default Html;