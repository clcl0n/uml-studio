import { combineReducers } from 'redux';
import { canvasZoomReducer } from './ribbon.reducers';
import { canvasOperationReducer, isMouseDownReducer, selectedElementIdReducer, defaultRelationshipTypeReducer, diagramTypeReducer } from './canvas.reducers';
import { elementsReducer, elementEntriesReducer, newRelationshipReducer, relationshipsReducer, relationshipSegmentsReducer } from './classDiagram.reducers';
import { stateElementsReducer } from './stateDiagram.reducers';

const combinedReducers = combineReducers({
    classDiagram: combineReducers({
        elements: elementsReducer,
        elementEntries: elementEntriesReducer,
        relationships: relationshipsReducer,
        relationshipSegments: relationshipSegmentsReducer,
        newRelationship: newRelationshipReducer
    }),
    stateDiagram: combineReducers({
        elements: stateElementsReducer
    }),
    canvas: combineReducers({
        selectedElementId: selectedElementIdReducer,
        isMouseDown: isMouseDownReducer,
        canvasOperation: canvasOperationReducer,
        defaultRelationshipType: defaultRelationshipTypeReducer,
        diagramType: diagramTypeReducer
    }),
    ribbon: combineReducers({
        canvasZoom: canvasZoomReducer
    })
});

export default combinedReducers;