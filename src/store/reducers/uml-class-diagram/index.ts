import { combineReducers } from 'redux';
import classesReducer from './classes';
import classMethodsReducer from './classMethods';
import classPropertiesReducer from './classProperties';
import relationshipsReducer from './relationships';
import relationshipSegmentsReducer from './relationshipSegments';

const umlClassDiagramReducer = combineReducers({
    classes: classesReducer,
    classMethods: classMethodsReducer,
    classProperties: classPropertiesReducer,
    relationships: relationshipsReducer,
    relationshipSegments: relationshipSegmentsReducer
});

export default umlClassDiagramReducer; 