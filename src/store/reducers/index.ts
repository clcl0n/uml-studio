import ribbonReducer from './ribbon';
import { combineReducers } from 'redux';

const combinedReducers = combineReducers({
    ribbon: ribbonReducer
});

export default combinedReducers;