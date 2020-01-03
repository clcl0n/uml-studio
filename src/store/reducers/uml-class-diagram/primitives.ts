import IReduxEntity from '@interfaces/IReduxEntity';
import IPrimitive from '@interfaces/class-diagram/primitive/IPrimitive';
import IReducerPayload from '@interfaces/IReducerPayload';
import ClassDiagramActionEnum from '@enums/classDiagramActionEnum';

const primitivesState: IReduxEntity<IPrimitive> = {
    byId: {},
    allIds: []
};

const primitivesReducer = (state = primitivesState, payload: IReducerPayload<ClassDiagramActionEnum, IPrimitive>) => {
    let newState: IReduxEntity<IPrimitive> = {
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

export default primitivesReducer;