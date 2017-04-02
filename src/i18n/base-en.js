import frLocaleData from 'react-intl/locale-data/fr';
import { defineMessages, addLocaleData } from 'react-intl';

import messagesPage from './en/messagesPage';

addLocaleData(frLocaleData);

const messages = defineMessages({
  helloWorld: {
    id: 'helloWorld',
    description: 'Hello World',
    defaultMessage: 'Hello World',
  },
  fromAComponent: {
    id: 'fromAComponent',
    description: 'from a component',
    defaultMessage: 'from a component',
  },
  localeText: {
    id: 'localeText',
    description: 'FR',
    defaultMessage: 'FR',
  },
  ...messagesPage,
});

export default messages;
