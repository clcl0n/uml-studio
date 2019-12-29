import IReduxEntity from '@interfaces/IReduxEntity';
import IEnumeration from '@interfaces/class-diagram/enumeration/IEnumeration';
import IReducerPayload from '@interfaces/IReducerPayload';
import ClassDiagramActionEnum from '@enums/classDiagramActionEnum';

const enumerationsState: IReduxEntity<IEnumeration> = {
    byId: {},
    allIds: []
};

const enumerationsReducer = (state = enumerationsState, payload: IReducerPayload<ClassDiagramActionEnum, IEnumeration>) => {
    let newState: IReduxEntity<IEnumeration> = {
        byId: {},
        allIds: []
    };
    switch(payload.type) {
        case ClassDiagramActionEnum.ADD_NEW_ENUMERATION:
            newState.byId = {...state.byId};
            newState.byId[payload.data.id] = payload.data;
            newState.allIds = [...state.allIds, payload.data.id];
            
            return newState;
        default:
            return state;
    }
};

export default enumerationsReducer;