import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from '@components/app';
import { createStore } from 'redux';
import combinedReducers from './store/reducers';
import { Provider } from 'react-redux';
import initialize from './initialize';
import * as log from 'loglevel';

initialize();

const store = createStore(combinedReducers,(window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());
log.debug('Redux store created.');  
    
ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('app'));