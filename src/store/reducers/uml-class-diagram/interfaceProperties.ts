import IReduxEntity from '@interfaces/IReduxEntity';
import IInterfaceProperty from '@interfaces/class-diagram/interface/IInterfaceProperty';
import IReducerPayload from '@interfaces/IReducerPayload';
import ClassDiagramActionEnum from '@enums/classDiagramActionEnum';

const interfacePropertiesState: IReduxEntity<IInterfaceProperty> = {
    byId: {},
    allIds: []
};

const interfacePropertiesReducer = (state = interfacePropertiesState, payload: IReducerPayload<ClassDiagramActionEnum, IInterfaceProperty>) => {
    let newState: IReduxEntity<IInterfaceProperty>;
    switch(payload.type) {
        case ClassDiagramActionEnum.ADD_NEW_INTERFACE_PROPERTY:
            newState = {
                byId: {
                    ...state.byId,
                },
                allIds: [...state.allIds, payload.data.id]
            };
            newState.byId[payload.data.id] = payload.data;

            return newState;
        case ClassDiagramActionEnum.UPDATE_INTERFACE_PROPERTY:
            newState = {...state};
            newState.byId[payload.data.id] = payload.data;

            return newState;
        case ClassDiagramActionEnum.REMOVE_INTERFACE_PROPERTY:
            newState = {...state};
            newState.allIds.splice(newState.allIds.indexOf(payload.data.id), 1);
            delete newState.byId[payload.data.id];

            return newState;
        default:
            return state;
    }
};

export default interfacePropertiesReducer;