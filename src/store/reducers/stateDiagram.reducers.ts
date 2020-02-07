import IReduxEntity from '@interfaces/IReduxEntity';
import IStateElement from '@interfaces/state-diagram/state/IStateElement';
import IReducerPayload from '@interfaces/IReducerPayload';
import StateDiagramActionEnum from '@enums/stateDiagramActionEnum';

const stateElementsState: IReduxEntity<IStateElement> = {
    byId: {},
    allIds: []
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
            }
        default:
            return state;
    }
};