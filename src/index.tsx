import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from '@components/app';
import { createStore } from 'redux';
import store from './store';
import { Provider } from 'react-redux';
import initialize from './initialize';
import * as log from 'loglevel';

initialize();

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('app'));