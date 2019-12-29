import IReduxEntity from '@interfaces/IReduxEntity';
import IReducerPayload from '@interfaces/IReducerPayload';
import IClassMethod from '@interfaces/class-diagram/class/IClassMethod';
import ClassDiagramActionEnum from '@enums/classDiagramActionEnum';

const classMethodsState: IReduxEntity<IClassMethod> = {
    byId: {},
    allIds: []
};

const classMethodsReducer = (state = classMethodsState, payload: IReducerPayload<ClassDiagramActionEnum, IClassMethod>) => {
    let newState: IReduxEntity<IClassMethod>;
    switch(payload.type) {
        case ClassDiagramActionEnum.ADD_NEW_CLASS_METHOD:
            newState = {
                byId: {
                    ...state.byId,
                },
                allIds: [...state.allIds, payload.data.id]
            };
            newState.byId[payload.data.id] = payload.data;

            return newState;
        case ClassDiagramActionEnum.UPDATE_CLASS_METHOD:
            newState = {...state};
            newState.byId[payload.data.id] = payload.data;

            return newState;
        case ClassDiagramActionEnum.REMOVE_CLASS_METHOD:
            newState = {...state};
            newState.allIds.splice(newState.allIds.indexOf(payload.data.id), 1);
            newState.byId[payload.data.id] = undefined;

            return newState;
        default:
            return state;
    }
};

export default classMethodsReducer;