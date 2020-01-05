import { combineReducers } from 'redux';
import classesReducer from './classes';
import classMethodsReducer from './classMethods';
import classPropertiesReducer from './classProperties';
import relationshipsReducer from './relationships';
import relationshipSegmentsReducer from './relationshipSegments';
import interfacesReducer from './interfaces';
import interfaceMethodsReducer from './interfaceMethods';
import interfacePropertiesReducer from './interfaceProperties';
import utilitiesReducer from './utilities';
import utilityMethodsReducer from './utilityMethods';
import utilityPropertiesReducer from './utilityProperties';
import enumerationsReducer from './enumerations';
import enumerationEntriesReducer from './enumerationEntries';
import dataTypesReducer from './dataTypes';
import dataTypeEntriesReducer from './dataTypeEntries';
import primitiveTypesReducer from './primitiveTypes';

const umlClassDiagramReducer = combineReducers({
    classes: classesReducer,
    classMethods: classMethodsReducer,
    classProperties: classPropertiesReducer,
    relationships: relationshipsReducer,
    relationshipSegments: relationshipSegmentsReducer,
    interfaces: interfacesReducer,
    interfaceMethods: interfaceMethodsReducer,
    interfaceProperties: interfacePropertiesReducer,
    utilities: utilitiesReducer,
    utilityMethods: utilityMethodsReducer,
    utilityProperties: utilityPropertiesReducer,
    enumerations: enumerationsReducer,
    enumerationEntries: enumerationEntriesReducer,
    dataTypes: dataTypesReducer,
    dataTypeEntries: dataTypeEntriesReducer,
    primitiveTypes: primitiveTypesReducer
});

export default umlClassDiagramReducer; 