import { useDispatch } from 'react-redux';
import useDiagram from './useDiagram';
import DiagramTypeEnum from '@enums/diagramTypeEnum';
import { addNewElement, addNewElementEntry, removeElement, removeElementEntry, removeRelationship, removeRelationshipSegment, addNewRelationshipSegment, addNewRelationship, removeUndoElement, removeUndoRelationship, addRedoElement, addRedoRelationship } from '@store/actions/classDiagram.action';
import HistoryTypeEnum from '@enums/historyTypeEnum';
import IElementHistory from '@interfaces/IElementHistory';
import IRelationshipHistory from '@interfaces/IRelationshipHistory';
import StateHistoryTypeEnum from '@enums/stateHistoryTypeEnum';
import IInitialStateElement from '@interfaces/state-diagram/initial-state/IInitialStateElement';
import IFinalStateElement from '@interfaces/state-diagram/final-state/IFinalStateElement';
import IStateElement from '@interfaces/state-diagram/state/IStateElement';
import { removeInitialStateElement, removeFinalStateElement, removeStateElement, addNewInitialStateElement, addNewFinalStateElement, addNewStateElement, removeUndoInitialStateElement, addRedoInitialStateElement, removeUndoFinalStateElement, addRedoFinalStateElement, removeUndoStateElement, addRedoStateElement, addRedoStateRelationship, removeUndoStateRelationship } from '@store/actions/stateDiagram.action';

export const useCanvasUndo = () => {
    const dispatch = useDispatch();
    let isEnabled: boolean = false;
    const { classDiagram, stateDiagram, diagramType } = useDiagram();

    if (diagramType === DiagramTypeEnum.CLASS) {
        isEnabled = classDiagram.undoHistory.allIds.length > 0;

    } else if (diagramType === DiagramTypeEnum.STATE) {
        isEnabled = stateDiagram.undoHistory.allIds.length > 0;
    }

    const undo = () => {
        if (classDiagram.undoHistory.allIds.length > 0) {
            let latest = classDiagram.undoHistory.byId[classDiagram.undoHistory.allIds[classDiagram.undoHistory.allIds.length - 1]];
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
                dispatch(removeUndoElement(latestElement));
                dispatch(addRedoElement(latestElement));
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
                dispatch(removeUndoRelationship(latestRelationship));
                dispatch(addRedoRelationship(latestRelationship));
            }
        }
        else if (stateDiagram.undoHistory.allIds.length > 0) {
            let latest = stateDiagram.undoHistory.byId[stateDiagram.undoHistory.allIds[stateDiagram.undoHistory.allIds.length - 1]];
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
                    dispatch(removeUndoInitialStateElement(latestInitialState));
                    dispatch(addRedoInitialStateElement(latestInitialState));
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
                    dispatch(removeUndoFinalStateElement(latestFinalState));
                    dispatch(addRedoFinalStateElement(latestFinalState));
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
                    dispatch(removeUndoStateElement(latestState));
                    dispatch(addRedoStateElement(latestState));
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
                    dispatch(removeUndoStateRelationship(latestRelationship));
                    dispatch(addRedoStateRelationship(latestRelationship));
                    break;
            }
        }
    }

    return {
        isEnabled,
        undo
    };
};