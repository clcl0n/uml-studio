import * as log from 'loglevel';
import { createStore } from 'redux';
import combinedReducers from './reducers';

const store = createStore(
    combinedReducers,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

log.debug('Redux store created.'); 

export default store;