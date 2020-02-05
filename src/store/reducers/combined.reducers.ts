import { combineReducers } from 'redux';
import { canvasZoomReducer } from './ribbon.reducer';
import { canvasOperationReducer, isMouseDownReducer, selectedElementIdReducer, defaultRelationshipTypeReducer, diagramTypeReducer } from './canvas.reducer';
import { elementsReducer, elementEntriesReducer, newRelationshipReducer, relationshipsReducer, relationshipSegmentsReducer } from './classDiagram.reducer';

const combinedReducers = combineReducers({
    classDiagram: combineReducers({
        elements: elementsReducer,
        elementEntries: elementEntriesReducer,
        relationships: relationshipsReducer,
        relationshipSegments: relationshipSegmentsReducer,
        newRelationship: newRelationshipReducer
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