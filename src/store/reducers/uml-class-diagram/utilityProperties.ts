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
        default:
            return state;
    }
};

export default utilityPropertiesReducer;