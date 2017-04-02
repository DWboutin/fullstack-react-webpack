import React from 'react';
import { Link } from 'react-router-dom';
import { IntlProvider, FormattedMessage } from 'react-intl';

import i18n from '../../i18n';
import messages from '../../i18n/base-en';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      locale: 'en',
    };

    this.handleLocaleChange = this.handleLocaleChange.bind(this);
  }

  handleLocaleChange() {
    const language = (this.state.locale === 'en') ? 'fr' : 'en';

    this.setState({
      locale: language,
    });
  }

  render() {
    const intlData = {
      locale: this.state.locale,
      messages: i18n[this.state.locale],
    };

    return (
      <IntlProvider key="intl" {...intlData}>
        <div>
          <div>
            <button onClick={this.handleLocaleChange}>
              <FormattedMessage {...messages.localeText} />
            </button>
          </div>
          <h1>
            <FormattedMessage {...messages.helloWorld} />{' '}
            <small>
              <FormattedMessage {...messages.fromAComponent} />
            </small>
          </h1>
          <Link to="/test">Test link</Link>
        </div>
      </IntlProvider>
    );
  }
}

export default App;
