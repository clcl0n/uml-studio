import canvasReducer from './canvas';
import ribbonReducer from './ribbon';
import { combineReducers } from 'redux';

const combinedReducers = combineReducers({
    ribbon: ribbonReducer,
    canvas: canvasReducer
});

export default combinedReducers;