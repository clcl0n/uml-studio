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
        default:
            return state;
    }
};

export default utilityMethodsReducer;