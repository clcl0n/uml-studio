import { combineReducers } from 'redux';
import selectedElementIdReducer from './selectedElementId';
import isMouseDownReducer from './isMouseDown';
import canvasOperationReducer from './canvasOperation';

const canvasReducer = combineReducers({
    selectedElementId: selectedElementIdReducer,
    isMouseDown: isMouseDownReducer,
    canvasOperation: canvasOperationReducer
});

export default canvasReducer; 