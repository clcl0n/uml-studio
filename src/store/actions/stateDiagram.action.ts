import IStateElement from '@interfaces/state-diagram/state/IStateElement';
import IReducerPayload from '@interfaces/IReducerPayload';
import StateDiagramActionEnum from '@enums/stateDiagramActionEnum';
import IInitialStateElement from '@interfaces/state-diagram/initial-state/IInitialStateElement';
import IFinalStateElement from '@interfaces/state-diagram/final-state/IFinalStateElement';
import IForkJoinElement from '@interfaces/state-diagram/IForkJoinElement';
import IChoiceElement from '@interfaces/state-diagram/IChoiceElement';

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