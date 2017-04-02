import React from 'react';
import { IntlProvider, FormattedMessage } from 'react-intl';

import Header from 'components/sections/Header.react';

import i18n from 'i18n';
import messages from 'language';

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
    const { children } = this.props;
    const intlData = {
      locale: this.state.locale,
      messages: i18n[this.state.locale],
    };

    return (
      <IntlProvider key="intl" {...intlData}>
        <div id="application">
          <Header />
          {children}
          <div>
            <button onClick={this.handleLocaleChange}>
              <FormattedMessage {...messages.localeText} />
            </button>
          </div>
        </div>
      </IntlProvider>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default App;
