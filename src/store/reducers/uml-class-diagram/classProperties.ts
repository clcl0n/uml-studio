import IReduxEntity from '@interfaces/IReduxEntity';
import IReducerPayload from '@interfaces/IReducerPayload';
import ClassDiagramActionEnum from '@enums/classDiagramActionEnum';
import IClassProperty from '@interfaces/class-diagram/class/IClassProperty';

const classPropertiesState: IReduxEntity<IClassProperty> = {
    byId: {},
    allIds: []
};

const classPropertiesReducer = (state = classPropertiesState, payload: IReducerPayload<ClassDiagramActionEnum, IClassProperty>) => {
    let newState: IReduxEntity<IClassProperty>;
    switch(payload.type) {
        case ClassDiagramActionEnum.ADD_NEW_CLASS_PROPERTY:
            newState = {
                byId: {
                    ...state.byId,
                },
                allIds: [...state.allIds, payload.data.id]
            };
            newState.byId[payload.data.id] = payload.data;

            return newState;
        case ClassDiagramActionEnum.UPDATE_CLASS_PROPERTY:
            newState = {...state};
            newState.byId[payload.data.id] = payload.data;

            return newState;
        case ClassDiagramActionEnum.REMOVE_CLASS_PROPERTY:
            newState = {...state};
            newState.allIds.splice(newState.allIds.indexOf(payload.data.id), 1);
            newState.byId[payload.data.id] = undefined;

            return newState;
        default:
            return state;
    }
};

export default classPropertiesReducer;