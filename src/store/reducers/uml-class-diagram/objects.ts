import IReduxEntity from "@interfaces/IReduxEntity";
import IObject from '@interfaces/class-diagram/object/IObject';
import IReducerPayload from '@interfaces/IReducerPayload';
import ClassDiagramActionEnum from '@enums/classDiagramActionEnum';

const objectsState: IReduxEntity<IObject> = {
    byId: {},
    allIds: []
};

const objectsReducer = (state = objectsState, payload: IReducerPayload<ClassDiagramActionEnum, IObject>) => {
    let newState: IReduxEntity<IObject> = {
        byId: {},
        allIds: []
    };
    switch(payload.type) {
        case ClassDiagramActionEnum.ADD_NEW_OBJECT:
            newState.byId = {...state.byId};
            newState.byId[payload.data.id] = payload.data;
            newState.allIds = [...state.allIds, payload.data.id];

            return newState;
        case ClassDiagramActionEnum.UPDATE_OBJECT:
            newState = {...state};
            newState.byId[payload.data.id] = payload.data;

            return newState;
        default:
            return state;
    }
};

export default objectsReducer;