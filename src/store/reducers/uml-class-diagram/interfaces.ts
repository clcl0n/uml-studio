import IReduxEntity from '@interfaces/IReduxEntity';
import IInterface from '@interfaces/class-diagram/interface/IInterface';
import IReducerPayload from '@interfaces/IReducerPayload';
import ClassDiagramActionEnum from '@enums/classDiagramActionEnum';

const interfacesState: IReduxEntity<IInterface> = {
    byId: {},
    allIds: []
};

const interfacesReducer = (state = interfacesState, payload: IReducerPayload<ClassDiagramActionEnum, IInterface>) => {
    let newState: IReduxEntity<IInterface> = {
        byId: {},
        allIds: []
    };
    switch(payload.type) {
        case ClassDiagramActionEnum.ADD_NEW_INTERFACE:
            newState.byId = {...state.byId};
            newState.byId[payload.data.id] = payload.data;
            newState.allIds = [...state.allIds, payload.data.id];

            return newState;
        default:
            return state;
    }
};

export default interfacesReducer;