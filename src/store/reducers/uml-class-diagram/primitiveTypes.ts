import IReduxEntity from '@interfaces/IReduxEntity';
import IPrimitiveType from '@interfaces/class-diagram/primitive-type/IPrimitiveType';
import IReducerPayload from '@interfaces/IReducerPayload';
import ClassDiagramActionEnum from '@enums/classDiagramActionEnum';

const primitiveTypesState: IReduxEntity<IPrimitiveType> = {
    byId: {},
    allIds: []
};

const primitiveTypessReducer = (state = primitiveTypesState, payload: IReducerPayload<ClassDiagramActionEnum, IPrimitiveType>) => {
    let newState: IReduxEntity<IPrimitiveType> = {
        byId: {},
        allIds: []
    };
    switch(payload.type) {
        case ClassDiagramActionEnum.ADD_NEW_PRIMITIVE:
            newState.byId = {...state.byId};
            newState.byId[payload.data.id] = payload.data;
            newState.allIds = [...state.allIds, payload.data.id];

            return newState;
        case ClassDiagramActionEnum.UPDATE_PRIMITIVE:
            newState = {...state};
            newState.byId[payload.data.id] = payload.data;

            return newState;
        default:
            return state;
    }
};

export default primitiveTypessReducer;