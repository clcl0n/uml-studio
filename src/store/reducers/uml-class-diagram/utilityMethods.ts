import IReduxEntity from '@interfaces/IReduxEntity';
import IUtilityMethod from '@interfaces/class-diagram/utility/IUtilityMethod';
import IReducerPayload from '@interfaces/IReducerPayload';
import ClassDiagramActionEnum from '@enums/classDiagramActionEnum';

const utilityMethodsState: IReduxEntity<IUtilityMethod> = {
    byId: {},
    allIds: []
};

const utilityMethodsReducer = (state = utilityMethodsState, payload: IReducerPayload<ClassDiagramActionEnum, IUtilityMethod>) => {
    let newState: IReduxEntity<IUtilityMethod> = {
        byId: {},
        allIds: []
    };
    switch(payload.type) {
        case ClassDiagramActionEnum.ADD_NEW_UTILITY_METHOD:
            newState.byId = {...state.byId};
            newState.byId[payload.data.id] = payload.data;
            newState.allIds = [...state.allIds, payload.data.id];

            return newState;
        case ClassDiagramActionEnum.UPDATE_UTILITY_METHOD:
            newState = {...state};
            newState.byId[payload.data.id] = payload.data;

            return newState;
        case ClassDiagramActionEnum.REMOVE_UTILITY_METHOD:
            newState = {...state};
            newState.allIds.splice(newState.allIds.indexOf(payload.data.id), 1);
            delete newState.byId[payload.data.id];

            return newState;
        default:
            return state;
    }
};

export default utilityMethodsReducer;