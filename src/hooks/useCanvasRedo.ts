import { useDispatch } from 'react-redux';
import useDiagram from './useDiagram';
import DiagramTypeEnum from '@enums/diagramTypeEnum';
import { addNewElement, addNewElementEntry, removeElement, removeElementEntry, removeRedoElement, addUndoElement, removeRelationship, addNewRelationship, removeRedoRelationship, addUndoRelationship, removeRelationshipSegment, addNewRelationshipSegment } from '@store/actions/classDiagram.action';
import HistoryTypeEnum from '@enums/historyTypeEnum';
import IElementHistory from '@interfaces/IElementHistory';
import IRelationshipHistory from '@interfaces/IRelationshipHistory';
import StateHistoryTypeEnum from '@enums/stateHistoryTypeEnum';
import IInitialStateElement from '@interfaces/state-diagram/initial-state/IInitialStateElement';
import IFinalStateElement from '@interfaces/state-diagram/final-state/IFinalStateElement';
import IStateElement from '@interfaces/state-diagram/state/IStateElement';
import { removeInitialStateElement, addNewInitialStateElement, removeFinalStateElement, addNewFinalStateElement, removeStateElement, addNewStateElement, removeRedoInitialStateElement, addUndoInitialStateElement, removeRedoFinalStateElement, addUndoFinalStateElement, removeRedoStateElement, addUndoStateElement, addUndoStateRelationship, removeStateRedoRelationship } from '@store/actions/stateDiagram.action';

export const useCanvasRedo = () => {
    const dispatch = useDispatch();
    let isEnabled: boolean = false;
    const { classDiagram, stateDiagram, diagramType } = useDiagram();

    if (diagramType === DiagramTypeEnum.CLASS) {
        isEnabled = classDiagram.redoHistory.allIds.length > 0;
    } else if (diagramType === DiagramTypeEnum.STATE) {
        isEnabled = stateDiagram.redoHistory.allIds.length > 0; 
    }

    const redo = () => {
        if (classDiagram.redoHistory.allIds.length > 0) {
            let latest = classDiagram.redoHistory.byId[classDiagram.redoHistory.allIds[classDiagram.redoHistory.allIds.length - 1]];
            if (latest.type === HistoryTypeEnum.ELEMNET) {
                let latestElement = latest.data as IElementHistory;
                if (classDiagram.elements.allIds.includes(latestElement.element.id)) {
                    // update
                    latestElement = {
                        element: classDiagram.elements.byId[latestElement.element.id],
                        entries: latestElement.entries.map(entry => classDiagram.elementEntries.byId[entry.id])
                    };
                    dispatch(removeElement(latestElement.element));
                    latestElement.entries.forEach(entry => dispatch(removeElementEntry(entry)));
                } else {
                    latestElement.entries.forEach(entry => dispatch(addNewElementEntry(entry)));
                    dispatch(addNewElement(latestElement.element));
                }
                dispatch(removeRedoElement(latestElement));
                dispatch(addUndoElement(latestElement));
            } else if (latest.type === HistoryTypeEnum.RELATIONSHIP) {
                let latestRelationship = latest.data as IRelationshipHistory;
                if (classDiagram.relationships.allIds.includes(latestRelationship.relationship.id)) {
                    // update
                    latestRelationship = {
                        relationship: classDiagram.relationships.byId[latestRelationship.relationship.id],
                        relationshipSegments: latestRelationship.relationshipSegments.map(segment => classDiagram.relationshipSegments.byId[segment.id])
                    };
                    latestRelationship.relationship.toElementId = '';
                    latestRelationship.relationship.fromElementId = '';
                    dispatch(removeRelationship(latestRelationship.relationship));
                    latestRelationship.relationshipSegments.forEach(segment => dispatch(removeRelationshipSegment(segment)));
                } else {
                    latestRelationship.relationshipSegments.forEach(segment => dispatch(addNewRelationshipSegment(segment)));
                    dispatch(addNewRelationship(latestRelationship.relationship));
                }
                dispatch(removeRedoRelationship(latestRelationship));
                dispatch(addUndoRelationship(latestRelationship));
            }
        } else if (stateDiagram.redoHistory.allIds.length > 0) {
            let latest = stateDiagram.redoHistory.byId[stateDiagram.redoHistory.allIds[stateDiagram.redoHistory.allIds.length - 1]];
            switch (latest.type) {
                case StateHistoryTypeEnum.INITIAL_STATE:
                    let latestInitialState = latest.data as IInitialStateElement;
                    if (stateDiagram.initialStateElements.allIds.includes(latestInitialState.id)) {
                        // update
                        latestInitialState = stateDiagram.initialStateElements.byId[latestInitialState.id];
                        dispatch(removeInitialStateElement(latestInitialState));
                    } else {
                        dispatch(addNewInitialStateElement(latestInitialState));
                    }
                    dispatch(removeRedoInitialStateElement(latestInitialState));
                    dispatch(addUndoInitialStateElement(latestInitialState));
                    break;
                case StateHistoryTypeEnum.FINAL_STATE:
                    let latestFinalState = latest.data as IFinalStateElement;
                    if (stateDiagram.finalStateElements.allIds.includes(latestFinalState.id)) {
                        // update
                        latestFinalState = stateDiagram.finalStateElements.byId[latestFinalState.id];
                        dispatch(removeFinalStateElement(latestFinalState));
                    } else {
                        dispatch(addNewFinalStateElement(latestFinalState));
                    }
                    dispatch(removeRedoFinalStateElement(latestFinalState));
                    dispatch(addUndoFinalStateElement(latestFinalState));
                    break;
                case StateHistoryTypeEnum.STATE:
                    let latestState = latest.data as IStateElement;
                    if (stateDiagram.elements.allIds.includes(latestState.id)) {
                        // update
                        latestState = stateDiagram.elements.byId[latestState.id];
                        dispatch(removeStateElement(latestState));
                    } else {
                        dispatch(addNewStateElement(latestState));
                    }
                    dispatch(removeRedoStateElement(latestState));
                    dispatch(addUndoStateElement(latestState));
                    break;
                case StateHistoryTypeEnum.RELATIONSHIP:
                    let latestRelationship = latest.data as IRelationshipHistory;
                    if (classDiagram.relationships.allIds.includes(latestRelationship.relationship.id)) {
                        // update
                        latestRelationship = {
                            relationship: classDiagram.relationships.byId[latestRelationship.relationship.id],
                            relationshipSegments: latestRelationship.relationshipSegments.map(segment => classDiagram.relationshipSegments.byId[segment.id])
                        };
                        latestRelationship.relationship.toElementId = '';
                        latestRelationship.relationship.fromElementId = '';
                        dispatch(removeRelationship(latestRelationship.relationship));
                        latestRelationship.relationshipSegments.forEach(segment => dispatch(removeRelationshipSegment(segment)));
                    } else {
                        latestRelationship.relationshipSegments.forEach(segment => dispatch(addNewRelationshipSegment(segment)));
                        dispatch(addNewRelationship(latestRelationship.relationship));
                    }
                    dispatch(removeStateRedoRelationship(latestRelationship));
                    dispatch(addUndoStateRelationship(latestRelationship));
                    break;
            }
        }
    }
  
    return {
        isEnabled,
        redo
    };
};