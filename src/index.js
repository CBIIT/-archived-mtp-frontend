import React from 'react';
import ReactDOM from 'react-dom';
import TagManager from 'react-gtm-module';

import App from './App';
import config from './config';

import 'typeface-inter';

if (config.googleTagManagerID) {
  TagManager.initialize({ gtmId: config.googleTagManagerID });
}

ReactDOM.render(<App />, document.getElementById('root'));
