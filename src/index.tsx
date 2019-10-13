import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from '@components/app';
import { createStore } from 'redux';
import combinedReducers from './store/reducers';
import { Provider } from 'react-redux';

const store = createStore(
    combinedReducers,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('app'));