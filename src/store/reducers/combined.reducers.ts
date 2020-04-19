import { combineReducers } from 'redux';
import { canvasZoomReducer } from './ribbon.reducers';
import { canvasOperationReducer, isMouseDownReducer, selectedElementIdReducer, defaultRelationshipTypeReducer, diagramTypeReducer, canvasDimensionsReducer } from './canvas.reducers';
import { elementsReducer, elementEntriesReducer, newRelationshipReducer, relationshipsReducer, relationshipSegmentsReducer, undoHistoryReducer, redoHistoryReducer } from './classDiagram.reducers';
import { stateElementsReducer, initialStateElementsReducer, finalStateElementsReducer, undoStateHistoryReducer, redoStateHistoryReducer  } from './stateDiagram.reducers';
import IClassDiagramState from '@interfaces/class-diagram/IClassDiagramState';
import IStateDiagramState from '@interfaces/state-diagram/IStateDiagramState';

const combinedReducers = combineReducers({
    classDiagram: combineReducers<IClassDiagramState>({
        elements: elementsReducer,
        elementEntries: elementEntriesReducer,
        relationships: relationshipsReducer,
        relationshipSegments: relationshipSegmentsReducer,
        newRelationship: newRelationshipReducer,
        undoHistory: undoHistoryReducer,
        redoHistory: redoHistoryReducer
    }),
    stateDiagram: combineReducers<IStateDiagramState>({
        elements: stateElementsReducer,
        initialStateElements: initialStateElementsReducer,
        finalStateElements: finalStateElementsReducer,
        undoHistory: undoStateHistoryReducer,
        redoHistory: redoStateHistoryReducer
    }),
    canvas: combineReducers({
        selectedElementId: selectedElementIdReducer,
        isMouseDown: isMouseDownReducer,
        canvasOperation: canvasOperationReducer,
        defaultRelationshipType: defaultRelationshipTypeReducer,
        diagramType: diagramTypeReducer,
        canvasDimensions: canvasDimensionsReducer
    }),
    ribbon: combineReducers({
        canvasZoom: canvasZoomReducer
    })
});

export default combinedReducers;