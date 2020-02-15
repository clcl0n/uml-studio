import IReduxEntity from '@interfaces/IReduxEntity';
import IStateElement from '@interfaces/state-diagram/state/IStateElement';
import IReducerPayload from '@interfaces/IReducerPayload';
import StateDiagramActionEnum from '@enums/stateDiagramActionEnum';
import IInitialStateElement from '@interfaces/state-diagram/initial-state/IInitialStateElement';
import IFinalStateElement from '@interfaces/state-diagram/final-state/IFinalStateElement';
import IForkJoinElement from '@interfaces/state-diagram/IForkJoinElement';
import IChoiceElement from '@interfaces/state-diagram/IChoiceElement';

const choiceElementsState: IReduxEntity<IChoiceElement> = {
    byId: {},
    allIds: []
};

const forkJoinElementsState: IReduxEntity<IForkJoinElement> = {
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

export const choiceElementsReducer = (state = choiceElementsState, payload: IReducerPayload<StateDiagramActionEnum, IChoiceElement>) => {
    switch(payload.type) {
        case StateDiagramActionEnum.ADD_NEW_CHOICE:
            return {
                byId: {
                    ...state.byId,
                    [payload.data.id]: payload.data
                },
                allIds: [...state.allIds, payload.data.id]
            };
        case StateDiagramActionEnum.UPDATE_CHOICE:
            return {
                byId: {
                    ...state.byId,
                    [payload.data.id]: payload.data
                },
                allIds: [...state.allIds]
            };
        default:
            return state;
    }
};

export const forkJoinElementsReducer = (state = forkJoinElementsState, payload: IReducerPayload<StateDiagramActionEnum, IForkJoinElement>) => {
    switch(payload.type) {
        case StateDiagramActionEnum.ADD_NEW_FORK_JOIN:
            return {
                byId: {
                    ...state.byId,
                    [payload.data.id]: payload.data
                },
                allIds: [...state.allIds, payload.data.id]
            };
        case StateDiagramActionEnum.UPDATE_FORK_JOIN:
            return {
                byId: {
                    ...state.byId,
                    [payload.data.id]: payload.data
                },
                allIds: [...state.allIds]
            };
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
        default:
            return state;
    }
};