import IReduxEntity from '@interfaces/IReduxEntity';
import IStateElement from '@interfaces/state-diagram/state/IStateElement';
import IReducerPayload from '@interfaces/IReducerPayload';
import StateDiagramActionEnum from '@enums/stateDiagramActionEnum';
import IInitialStateElement from '@interfaces/state-diagram/initial-state/IInitialStateElement';
import IFinalStateElement from '@interfaces/state-diagram/final-state/IFinalStateElement';
import StateHistoryTypeEnum from '@enums/stateHistoryTypeEnum';
import IRelationshipHistory from '@interfaces/IRelationshipHistory';

const undoHistoryState: IReduxEntity<{
    type: StateHistoryTypeEnum,
    data: IInitialStateElement | IFinalStateElement | IStateElement | IRelationshipHistory
}> = {
    byId: {},
    allIds: []
};

const redoHistoryState: IReduxEntity<{
    type: StateHistoryTypeEnum,
    data: IInitialStateElement | IFinalStateElement | IStateElement | IRelationshipHistory
}> = {
    byId: {},
    allIds: []
};

const stateElementsState: IReduxEntity<IStateElement> = {
    byId: {},
    allIds: []
};

const initialStateElementsState: IReduxEntity<IInitialStateElement> = {
    byId: {},
    allIds: []
};

const finalStateElementsState: IReduxEntity<IFinalStateElement> = {
    byId: {},
    allIds: []
};

export const redoStateHistoryReducer = (state = redoHistoryState, payload: IReducerPayload<StateDiagramActionEnum, IInitialStateElement | IFinalStateElement | IStateElement | IRelationshipHistory>): IReduxEntity<{
    type: StateHistoryTypeEnum,
    data: IInitialStateElement | IFinalStateElement | IStateElement | IRelationshipHistory
}>  => {
    switch(payload.type) {
        case StateDiagramActionEnum.ADD_REDO_RELATIONSHIP:
            state.byId[(payload.data as IRelationshipHistory).relationship.id] = {
                type: StateHistoryTypeEnum.RELATIONSHIP,
                data: payload.data as IRelationshipHistory
            };
            return {
                ...state,
                allIds: [...state.allIds, (payload.data as IRelationshipHistory).relationship.id]
            };
        case StateDiagramActionEnum.ADD_REDO_INITIAL_STATE:
            state.byId[(payload.data as IInitialStateElement).id] = {
                type: StateHistoryTypeEnum.INITIAL_STATE,
                data: payload.data as IInitialStateElement
            };
            return {
                ...state,
                allIds: [...state.allIds, (payload.data as IInitialStateElement).id]
            };
        case StateDiagramActionEnum.ADD_REDO_FINAL_STATE:
            state.byId[(payload.data as IFinalStateElement).id] = {
                type: StateHistoryTypeEnum.FINAL_STATE,
                data: payload.data as IFinalStateElement
            };
            return {
                ...state,
                allIds: [...state.allIds, (payload.data as IFinalStateElement).id]
            };
        case StateDiagramActionEnum.ADD_REDO_STATE:
            state.byId[(payload.data as IStateElement).id] = {
                type: StateHistoryTypeEnum.STATE,
                data: payload.data as IStateElement
            };
            return {
                ...state,
                allIds: [...state.allIds, (payload.data as IStateElement).id]
            };
        case StateDiagramActionEnum.REMOVE_REDO_RELATIONSHIP:
            state.allIds.splice(state.allIds.indexOf((payload.data as IRelationshipHistory).relationship.id), 1);
            delete state.byId[(payload.data as IRelationshipHistory).relationship.id];
            return {...state};
        case StateDiagramActionEnum.REMOVE_REDO_INITIAL_STATE:
            state.allIds.splice(state.allIds.indexOf((payload.data as IInitialStateElement).id), 1);
            delete state.byId[(payload.data as IInitialStateElement).id];
            return {...state};
        case StateDiagramActionEnum.REMOVE_REDO_FINAL_STATE:
            state.allIds.splice(state.allIds.indexOf((payload.data as IFinalStateElement).id), 1);
            delete state.byId[(payload.data as IFinalStateElement).id];
            return {...state};
        case StateDiagramActionEnum.REMOVE_REDO_STATE:
            state.allIds.splice(state.allIds.indexOf((payload.data as IStateElement).id), 1);
            delete state.byId[(payload.data as IStateElement).id];
            return {...state};
        default:
            return state;
    }
};

export const undoStateHistoryReducer = (state = undoHistoryState, payload: IReducerPayload<StateDiagramActionEnum, IInitialStateElement | IFinalStateElement | IStateElement | IRelationshipHistory>): IReduxEntity<{
    type: StateHistoryTypeEnum,
    data: IInitialStateElement | IFinalStateElement | IStateElement | IRelationshipHistory
}>  => {
    switch(payload.type) {
        case StateDiagramActionEnum.ADD_UNDO_RELATIONSHIP:
            state.byId[(payload.data as IRelationshipHistory).relationship.id] = {
                type: StateHistoryTypeEnum.RELATIONSHIP,
                data: payload.data as IRelationshipHistory
            };
            return {
                ...state,
                allIds: [...state.allIds, (payload.data as IRelationshipHistory).relationship.id]
            };
        case StateDiagramActionEnum.ADD_UNDO_INITIAL_STATE:
            state.byId[(payload.data as IInitialStateElement).id] = {
                type: StateHistoryTypeEnum.INITIAL_STATE,
                data: payload.data as IInitialStateElement
            };
            return {
                ...state,
                allIds: [...state.allIds, (payload.data as IInitialStateElement).id]
            };
        case StateDiagramActionEnum.ADD_UNDO_FINAL_STATE:
            state.byId[(payload.data as IFinalStateElement).id] = {
                type: StateHistoryTypeEnum.FINAL_STATE,
                data: payload.data as IFinalStateElement
            };
            return {
                ...state,
                allIds: [...state.allIds, (payload.data as IFinalStateElement).id]
            };
        case StateDiagramActionEnum.ADD_UNDO_STATE:
            state.byId[(payload.data as IStateElement).id] = {
                type: StateHistoryTypeEnum.STATE,
                data: payload.data as IStateElement
            };
            return {
                ...state,
                allIds: [...state.allIds, (payload.data as IStateElement).id]
            };
        case StateDiagramActionEnum.REMOVE_UNDO_RELATIONSHIP:
            state.allIds.splice(state.allIds.indexOf((payload.data as IRelationshipHistory).relationship.id), 1);
            delete state.byId[(payload.data as IRelationshipHistory).relationship.id];
            return {...state};
        case StateDiagramActionEnum.REMOVE_UNDO_INITIAL_STATE:
            state.allIds.splice(state.allIds.indexOf((payload.data as IInitialStateElement).id), 1);
            delete state.byId[(payload.data as IInitialStateElement).id];
            return {...state};
        case StateDiagramActionEnum.REMOVE_UNDO_FINAL_STATE:
            state.allIds.splice(state.allIds.indexOf((payload.data as IFinalStateElement).id), 1);
            delete state.byId[(payload.data as IFinalStateElement).id];
            return {...state};
        case StateDiagramActionEnum.REMOVE_UNDO_STATE:
            state.allIds.splice(state.allIds.indexOf((payload.data as IStateElement).id), 1);
            delete state.byId[(payload.data as IStateElement).id];
            return {...state};
        default:
            return state;
    }
};

export const finalStateElementsReducer = (state = finalStateElementsState, payload: IReducerPayload<StateDiagramActionEnum, IFinalStateElement>) => {
    switch(payload.type) {
        case StateDiagramActionEnum.ADD_NEW_FINAL_STATE_ELEMENT:
            return {
                byId: {
                    ...state.byId,
                    [payload.data.id]: payload.data
                },
                allIds: [...state.allIds, payload.data.id]
            };
        case StateDiagramActionEnum.UPDATE_FINAL_STATE_ELEMENT:
            return {
                byId: {
                    ...state.byId,
                    [payload.data.id]: payload.data
                },
                allIds: [...state.allIds]
            };
        case StateDiagramActionEnum.CLEAR_FINAL_STATE_ELEMENTS:
            return {
                byId: {},
                allIds: []
            };
        case StateDiagramActionEnum.REMOVE_FINAL_STATE_ELEMENTS:
            state.allIds.splice(state.allIds.indexOf(payload.data.id), 1);
            delete state.byId[payload.data.id];

            return {...state};
        default:
            return state;
    }
};

export const initialStateElementsReducer = (state = initialStateElementsState, payload: IReducerPayload<StateDiagramActionEnum, IInitialStateElement>) => {
    switch(payload.type) {
        case StateDiagramActionEnum.ADD_NEW_INITIAL_STATE_ELEMENT:
            return {
                byId: {
                    ...state.byId,
                    [payload.data.id]: payload.data
                },
                allIds: [...state.allIds, payload.data.id]
            };
        case StateDiagramActionEnum.UPDATE_INITIAL_STATE_ELEMENT:
            return {
                byId: {
                    ...state.byId,
                    [payload.data.id]: payload.data
                },
                allIds: [...state.allIds]
            };
        case StateDiagramActionEnum.CLEAR_INITIAL_STATE_ELEMENTS:
            return {
                byId: {},
                allIds: []
            };
        case StateDiagramActionEnum.REMOVE_INITIAL_STATE_ELEMENTS:
            state.allIds.splice(state.allIds.indexOf(payload.data.id), 1);
            delete state.byId[payload.data.id];

            return {...state};
        default:
            return state;
    }
};

export const stateElementsReducer = (state = stateElementsState, payload: IReducerPayload<StateDiagramActionEnum, IStateElement>): IReduxEntity<IStateElement> => {
    switch(payload.type) {
        case StateDiagramActionEnum.ADD_NEW_STATE_ELEMENT:
            return {
                byId: {
                    ...state.byId,
                    [payload.data.id]: payload.data
                },
                allIds: [...state.allIds, payload.data.id]
            };
        case StateDiagramActionEnum.UPDATE_STATE_ELEMENT:
            return {
                byId: {
                    ...state.byId,
                    [payload.data.id]: payload.data
                },
                allIds: [...state.allIds]
            };
        case StateDiagramActionEnum.CLEAR_STATE_ELEMENTS:
            return {
                byId: {},
                allIds: []
            };
        case StateDiagramActionEnum.REMOVE_STATE_ELEMENTS:
            state.allIds.splice(state.allIds.indexOf(payload.data.id), 1);
            delete state.byId[payload.data.id];

            return {...state};
        default:
            return state;
    }
};