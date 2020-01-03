import IReduxEntity from '@interfaces/IReduxEntity';
import IReducerPayload from '@interfaces/IReducerPayload';
import ClassDiagramActionEnum from '@enums/classDiagramActionEnum';
import IInterfaceMethod from '@interfaces/class-diagram/interface/IInterfaceMethod';

const interfaceMethodsState: IReduxEntity<IInterfaceMethod> = {
    byId: {},
    allIds: []
};

const interfaceMethodsReducer = (state = interfaceMethodsState, payload: IReducerPayload<ClassDiagramActionEnum, IInterfaceMethod>) => {
    let newState: IReduxEntity<IInterfaceMethod>;
    switch(payload.type) {
        case ClassDiagramActionEnum.ADD_NEW_INTERFACE_METHOD:
            newState = {
                byId: {
                    ...state.byId,
                },
                allIds: [...state.allIds, payload.data.id]
            };
            newState.byId[payload.data.id] = payload.data;

            return newState;
        case ClassDiagramActionEnum.UPDATE_INTERFACE_METHOD:
            newState = {...state};
            newState.byId[payload.data.id] = payload.data;

            return newState;
        case ClassDiagramActionEnum.REMOVE_INTERFACE_METHOD:
            newState = {...state};
            newState.allIds.splice(newState.allIds.indexOf(payload.data.id), 1);
            delete newState.byId[payload.data.id];

            return newState;
        default:
            return state;
    }
};

export default interfaceMethodsReducer;