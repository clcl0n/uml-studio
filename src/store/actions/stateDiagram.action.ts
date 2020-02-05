import IStateElement from '@interfaces/state-diagram/state/IStateElement';
import IReducerPayload from '@interfaces/IReducerPayload';
import StateDiagramActionEnum from '@enums/stateDiagramActionEnum';

export const addNewStateElement = (element: IStateElement): IReducerPayload<StateDiagramActionEnum, IStateElement> => {
    return {
        type: StateDiagramActionEnum.ADD_NEW_STATE_ELEMENT,
        data: element
    };
};