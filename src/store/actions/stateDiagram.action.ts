import IStateElement from '@interfaces/state-diagram/state/IStateElement';
import IReducerPayload from '@interfaces/IReducerPayload';
import StateDiagramActionEnum from '@enums/stateDiagramActionEnum';
import IInitialStateElement from '@interfaces/state-diagram/initial-state/IInitialStateElement';
import IFinalStateElement from '@interfaces/state-diagram/final-state/IFinalStateElement';
import IForkJoinElement from '@interfaces/state-diagram/IForkJoinElement';
import IChoiceElement from '@interfaces/state-diagram/IChoiceElement';
import IRelationshipHistory from '@interfaces/IRelationshipHistory';

export const removeRedoFinalStateElement = (element: IFinalStateElement): IReducerPayload<StateDiagramActionEnum, IFinalStateElement> => {
    return {
        type: StateDiagramActionEnum.REMOVE_REDO_FINAL_STATE,
        data: element
    };
};

export const removeRedoInitialStateElement = (element: IInitialStateElement): IReducerPayload<StateDiagramActionEnum, IInitialStateElement> => {
    return {
        type: StateDiagramActionEnum.REMOVE_REDO_FINAL_STATE,
        data: element
    };
};

export const removeRedoStateElement = (element: IStateElement): IReducerPayload<StateDiagramActionEnum, IStateElement> => {
    return {
        type: StateDiagramActionEnum.REMOVE_REDO_STATE,
        data: element
    };
};

export const removeStateRedoRelationship = (relationship: IRelationshipHistory): IReducerPayload<StateDiagramActionEnum, IRelationshipHistory> => {
    return {
        type: StateDiagramActionEnum.REMOVE_REDO_RELATIONSHIP,
        data: relationship
    };
};

export const addRedoFinalStateElement = (element: IFinalStateElement): IReducerPayload<StateDiagramActionEnum, IFinalStateElement> => {
    return {
        type: StateDiagramActionEnum.ADD_REDO_FINAL_STATE,
        data: element
    };
};

export const addRedoInitialStateElement = (element: IInitialStateElement): IReducerPayload<StateDiagramActionEnum, IInitialStateElement> => {
    return {
        type: StateDiagramActionEnum.ADD_REDO_INITIAL_STATE,
        data: element
    };
};

export const addRedoStateElement = (element: IStateElement): IReducerPayload<StateDiagramActionEnum, IStateElement> => {
    return {
        type: StateDiagramActionEnum.ADD_REDO_STATE,
        data: element
    };
};

export const addRedoStateRelationship = (relationship: IRelationshipHistory): IReducerPayload<StateDiagramActionEnum, IRelationshipHistory> => {
    return {
        type: StateDiagramActionEnum.ADD_REDO_RELATIONSHIP,
        data: relationship
    };
};

export const removeUndoFinalStateElement = (element: IFinalStateElement): IReducerPayload<StateDiagramActionEnum, IFinalStateElement> => {
    return {
        type: StateDiagramActionEnum.REMOVE_UNDO_FINAL_STATE,
        data: element
    };
};

export const removeUndoInitialStateElement = (element: IInitialStateElement): IReducerPayload<StateDiagramActionEnum, IInitialStateElement> => {
    return {
        type: StateDiagramActionEnum.REMOVE_UNDO_FINAL_STATE,
        data: element
    };
};

export const removeUndoStateElement = (element: IStateElement): IReducerPayload<StateDiagramActionEnum, IStateElement> => {
    return {
        type: StateDiagramActionEnum.REMOVE_UNDO_STATE,
        data: element
    };
};

export const removeUndoStateRelationship = (relationship: IRelationshipHistory): IReducerPayload<StateDiagramActionEnum, IRelationshipHistory> => {
    return {
        type: StateDiagramActionEnum.REMOVE_UNDO_RELATIONSHIP,
        data: relationship
    };
};

export const addUndoFinalStateElement = (element: IFinalStateElement): IReducerPayload<StateDiagramActionEnum, IFinalStateElement> => {
    return {
        type: StateDiagramActionEnum.ADD_UNDO_FINAL_STATE,
        data: element
    };
};

export const addUndoInitialStateElement = (element: IInitialStateElement): IReducerPayload<StateDiagramActionEnum, IInitialStateElement> => {
    return {
        type: StateDiagramActionEnum.ADD_UNDO_INITIAL_STATE,
        data: element
    };
};

export const addUndoStateElement = (element: IStateElement): IReducerPayload<StateDiagramActionEnum, IStateElement> => {
    return {
        type: StateDiagramActionEnum.ADD_UNDO_STATE,
        data: element
    };
};

export const addUndoStateRelationship = (relationship: IRelationshipHistory): IReducerPayload<StateDiagramActionEnum, IRelationshipHistory> => {
    return {
        type: StateDiagramActionEnum.ADD_UNDO_RELATIONSHIP,
        data: relationship
    };
};

export const removeInitialStateElement = (element: IInitialStateElement): IReducerPayload<StateDiagramActionEnum, IInitialStateElement> => {
    return {
        type: StateDiagramActionEnum.REMOVE_INITIAL_STATE_ELEMENTS,
        data: element
    };
};

export const removeStateElement = (element: IStateElement): IReducerPayload<StateDiagramActionEnum, IStateElement> => {
    return {
        type: StateDiagramActionEnum.REMOVE_STATE_ELEMENTS,
        data: element
    };
};

export const removeFinalStateElement = (element: IFinalStateElement): IReducerPayload<StateDiagramActionEnum, IFinalStateElement> => {
    return {
        type: StateDiagramActionEnum.REMOVE_FINAL_STATE_ELEMENTS,
        data: element
    };
};

export const addNewStateElement = (element: IStateElement): IReducerPayload<StateDiagramActionEnum, IStateElement> => {
    return {
        type: StateDiagramActionEnum.ADD_NEW_STATE_ELEMENT,
        data: element
    };
};

export const addNewInitialStateElement = (element: IInitialStateElement): IReducerPayload<StateDiagramActionEnum, IInitialStateElement> => {
    return {
        type: StateDiagramActionEnum.ADD_NEW_INITIAL_STATE_ELEMENT,
        data: element
    };
};

export const updateInitialStateElement = (element: IInitialStateElement): IReducerPayload<StateDiagramActionEnum, IInitialStateElement> => {
    return {
        type: StateDiagramActionEnum.UPDATE_INITIAL_STATE_ELEMENT,
        data: element
    };
};

export const updateFinalStateElement = (element: IFinalStateElement): IReducerPayload<StateDiagramActionEnum, IFinalStateElement> => {
    return {
        type: StateDiagramActionEnum.UPDATE_FINAL_STATE_ELEMENT,
        data: element
    };
};

export const addNewFinalStateElement = (element: IFinalStateElement): IReducerPayload<StateDiagramActionEnum, IFinalStateElement> => {
    return {
        type: StateDiagramActionEnum.ADD_NEW_FINAL_STATE_ELEMENT,
        data: element
    };
};

export const updateForkJoinElement = (element: IForkJoinElement): IReducerPayload<StateDiagramActionEnum, IForkJoinElement> => {
    return {
        type: StateDiagramActionEnum.UPDATE_FORK_JOIN,
        data: element
    };
};

export const addNewForkJoinElement = (element: IForkJoinElement): IReducerPayload<StateDiagramActionEnum, IForkJoinElement> => {
    return {
        type: StateDiagramActionEnum.ADD_NEW_FORK_JOIN,
        data: element
    };
};

export const updateChoiceElement = (element: IChoiceElement): IReducerPayload<StateDiagramActionEnum, IChoiceElement> => {
    return {
        type: StateDiagramActionEnum.UPDATE_CHOICE,
        data: element
    };
};

export const addNewChoiceElement = (element: IChoiceElement): IReducerPayload<StateDiagramActionEnum, IChoiceElement> => {
    return {
        type: StateDiagramActionEnum.ADD_NEW_CHOICE,
        data: element
    };
};

export const updateStateElement = (element: IStateElement): IReducerPayload<StateDiagramActionEnum, IStateElement> => {
    return {
        type: StateDiagramActionEnum.UPDATE_STATE_ELEMENT,
        data: element
    };
};

export const clearStateElements = () : IReducerPayload<StateDiagramActionEnum, {}> => {
    return {
        type: StateDiagramActionEnum.CLEAR_STATE_ELEMENTS,
        data: {}
    };
};

export const clearFinalStateElements = () : IReducerPayload<StateDiagramActionEnum, {}> => {
    return {
        type: StateDiagramActionEnum.CLEAR_FINAL_STATE_ELEMENTS,
        data: {}
    };
};

export const clearInitialStateElements = () : IReducerPayload<StateDiagramActionEnum, {}> => {
    return {
        type: StateDiagramActionEnum.CLEAR_INITIAL_STATE_ELEMENTS,
        data: {}
    };
};