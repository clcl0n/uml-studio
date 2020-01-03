import IUtility from '@interfaces/class-diagram/utility/IUtility';
import IReduxEntity from '@interfaces/IReduxEntity';
import IReducerPayload from '@interfaces/IReducerPayload';
import ClassDiagramActionEnum from '@enums/classDiagramActionEnum';

const utilitiesState: IReduxEntity<IUtility> = {
    byId: {},
    allIds: []
};

const utilitiesReducer = (state = utilitiesState, payload: IReducerPayload<ClassDiagramActionEnum, IUtility>) => {
    let newState: IReduxEntity<IUtility> = {
        byId: {},
        allIds: []
    };
    switch(payload.type) {
        case ClassDiagramActionEnum.ADD_NEW_UTILITY:
            newState.byId = {...state.byId};
            newState.byId[payload.data.id] = payload.data;
            newState.allIds = [...state.allIds, payload.data.id];

            return newState;
        case ClassDiagramActionEnum.UPDATE_UTILITY:
            newState = {...state};
            newState.byId[payload.data.id] = payload.data;

            return newState;
        default:
            return state;
    }
};

export default utilitiesReducer;