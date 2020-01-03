import { combineReducers } from 'redux';
import canvasZoomReducer from './canvasZoom';

const ribbonReducer = combineReducers({
    canvasZoom: canvasZoomReducer
});

export default ribbonReducer;