import IReduxEntity from '@interfaces/IReduxEntity';
import IDataType from '@interfaces/class-diagram/data-type/IDataType';
import IReducerPayload from '@interfaces/IReducerPayload';
import ClassDiagramActionEnum from '@enums/classDiagramActionEnum';

const dataTypesState: IReduxEntity<IDataType> = {
    byId: {},
    allIds: []
};

const dataTypesReducer = (state = dataTypesState, payload: IReducerPayload<ClassDiagramActionEnum, IDataType>) => {
    let newState: IReduxEntity<IDataType> = {
        byId: {},
        allIds: []
    };
    switch(payload.type) {
        case ClassDiagramActionEnum.ADD_NEW_DATA_TYPE:
            newState.byId = {...state.byId};
            newState.byId[payload.data.id] = payload.data;
            newState.allIds = [...state.allIds, payload.data.id];

            return newState;
        case ClassDiagramActionEnum.UPDATE_DATA_TYPE:
            newState = {...state};
            newState.byId[payload.data.id] = payload.data;

            return newState;
        default:
            return state;
    }
};

export default dataTypesReducer;