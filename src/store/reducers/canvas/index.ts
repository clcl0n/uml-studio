import { combineReducers } from 'redux';
import selectedElementIdReducer from './selectedElementId';

const canvasReducer = combineReducers({
    selectedElementId: selectedElementIdReducer,
});

export default canvasReducer; 