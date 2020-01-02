import { combineReducers } from 'redux';
import umlClassDiagram from './uml-class-diagram';
import canvas from './canvas';
import ribbon from './ribbon';

const combinedReducers = combineReducers({
    umlClassDiagram,
    canvas,
    ribbon
});

export default combinedReducers;