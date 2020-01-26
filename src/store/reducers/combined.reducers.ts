import { combineReducers } from 'redux';
import { canvasZoomReducer } from './ribbon.reducer';
import { canvasOperationReducer, isMouseDownReducer, selectedElementIdReducer } from './canvas.reducer';
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
        canvasOperation: canvasOperationReducer
    }),
    ribbon: combineReducers({
        canvasZoom: canvasZoomReducer
    })
});

export default combinedReducers;