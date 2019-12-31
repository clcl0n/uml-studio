import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from '@components/app';
import { createStore } from 'redux';
import store from './store';
import { Provider } from 'react-redux';
import initialize from './initialize';
import * as log from 'loglevel';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCaretDown, faTrashAlt, faPlus, faPrint, faUndo, faRedo, faSave, faSearchPlus, faSearchMinus } from '@fortawesome/free-solid-svg-icons';

initialize();
library.add(faCaretDown, faTrashAlt, faPlus, faPrint, faUndo, faRedo, faSave, faSearchPlus, faSearchMinus);

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('app'));