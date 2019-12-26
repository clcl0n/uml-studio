import { combineReducers } from 'redux';
import umlClassDiagram from './uml-class-diagram';
import canvas from './canvas';

const combinedReducers = combineReducers({
    umlClassDiagram,
    canvas
});

export default combinedReducers;