import { combineReducers } from 'redux';
import classesReducer from './classes';
import classMethodsReducer from './classMethods';
import classPropertiesReducer from './classProperties';
import relationshipsReducer from './relationships';
import relationshipSegmentsReducer from './relationshipSegments';
import interfacesReducer from './interfaces';
import interfaceMethodsReducer from './interfaceMethods';
import interfacePropertiesReducer from './interfaceProperties';

const umlClassDiagramReducer = combineReducers({
    classes: classesReducer,
    classMethods: classMethodsReducer,
    classProperties: classPropertiesReducer,
    relationships: relationshipsReducer,
    relationshipSegments: relationshipSegmentsReducer,
    interfaces: interfacesReducer,
    interfaceMethods: interfaceMethodsReducer,
    interfaceProperties: interfacePropertiesReducer
});

export default umlClassDiagramReducer; 