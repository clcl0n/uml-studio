import IReduxEntity from '@interfaces/IReduxEntity';
import IReducerPayload from '@interfaces/IReducerPayload';
import IClass from '@interfaces/class-diagram/class/IClass';
import ClassDiagramActionEnum from '@enums/classDiagramActionEnum';

const classesState: IReduxEntity<IClass> = {
    byId: {},
    allIds: []
};

const classesReducer = (state = classesState, payload: IReducerPayload<ClassDiagramActionEnum, IClass>) => {
    let newState: IReduxEntity<IClass> = {
        byId: {},
        allIds: []
    };
    switch(payload.type) {
        case ClassDiagramActionEnum.ADD_NEW_CLASS:
            newState.byId = {...state.byId};
            newState.byId[payload.data.id] = payload.data;
            newState.allIds = [...state.allIds, payload.data.id];

            return newState;
        case ClassDiagramActionEnum.UPDATE_CLASS:
            newState = {...state};
            newState.byId[payload.data.id] = payload.data;

            return newState;
        default:
            return state;
    }
};

export default classesReducer;