import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from 'language';

function Messages() {
  return (
    <div id="messages" className="container-fluid">
      <div className="row title-row">
        <h1 className="col-md-6 col-sm-6 col-xs-6">
          <FormattedMessage {...messages.myMessagesTitle} />
        </h1>
        <div className="col-md-6 col-sm-6 col-xs-6">
          <span className="round-btn">
            <FormattedMessage {...messages.myMessagesCreateAGroup} />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Messages;
