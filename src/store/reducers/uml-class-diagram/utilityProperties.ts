import IReduxEntity from '@interfaces/IReduxEntity';
import IUtilityProperty from '@interfaces/class-diagram/utility/IUtilityProperty';
import IReducerPayload from '@interfaces/IReducerPayload';
import ClassDiagramActionEnum from '@enums/classDiagramActionEnum';

const utilityPropertiesState: IReduxEntity<IUtilityProperty> = {
    byId: {},
    allIds: []
};

const utilityPropertiesReducer = (state = utilityPropertiesState, payload: IReducerPayload<ClassDiagramActionEnum, IUtilityProperty>) => {
    let newState: IReduxEntity<IUtilityProperty> = {
        byId: {},
        allIds: []
    };
    switch(payload.type) {
        case ClassDiagramActionEnum.ADD_NEW_UTILITY_PROPERTY:
            newState.byId = {...state.byId};
            newState.byId[payload.data.id] = payload.data;
            newState.allIds = [...state.allIds, payload.data.id];

            return newState;
            case ClassDiagramActionEnum.UPDATE_UTILITY_PROPERTY:
                newState = {...state};
                newState.byId[payload.data.id] = payload.data;
    
                return newState;
            case ClassDiagramActionEnum.REMOVE_UTILITY_PROPERTY:
                newState = {...state};
                newState.allIds.splice(newState.allIds.indexOf(payload.data.id), 1);
                delete newState.byId[payload.data.id];
    
                return newState;
        default:
            return state;
    }
};

export default utilityPropertiesReducer;