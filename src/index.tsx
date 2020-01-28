import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from '@components/app';
import { createStore } from 'redux';
import store from './store';
import { Provider } from 'react-redux';
import initialize from './initialize';
import * as log from 'loglevel';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons/faCaretDown';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faPrint } from '@fortawesome/free-solid-svg-icons/faPrint';
import { faUndo } from '@fortawesome/free-solid-svg-icons/faUndo';
import { faRedo } from '@fortawesome/free-solid-svg-icons/faRedo';
import { faSave } from '@fortawesome/free-solid-svg-icons/faSave';
import { faSearchPlus } from '@fortawesome/free-solid-svg-icons/faSearchPlus';
import { faSearchMinus } from '@fortawesome/free-solid-svg-icons/faSearchMinus';

initialize();
library.add(faCaretDown, faTrashAlt, faPlus, faPrint, faUndo, faRedo, faSave, faSearchPlus, faSearchMinus);

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('app'));