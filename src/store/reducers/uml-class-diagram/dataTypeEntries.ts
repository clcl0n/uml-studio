import IReduxEntity from '@interfaces/IReduxEntity';
import IDataTypeEntry from '@interfaces/class-diagram/data-type/IDataTypeEntry';
import IReducerPayload from '@interfaces/IReducerPayload';
import ClassDiagramActionEnum from '@enums/classDiagramActionEnum';

const dataTypeEntriesState: IReduxEntity<IDataTypeEntry> = {
    byId: {},
    allIds: []
};

const dataTypeEntriesReducer = (state = dataTypeEntriesState, payload: IReducerPayload<ClassDiagramActionEnum, IDataTypeEntry>) => {
    let newState: IReduxEntity<IDataTypeEntry> = {
        byId: {},
        allIds: []
    };
    switch(payload.type) {
        case ClassDiagramActionEnum.ADD_NEW_DATA_TYPE_ENTRY:
            newState = {
                byId: {
                    ...state.byId,
                },
                allIds: [...state.allIds, payload.data.id]
            };
            newState.byId[payload.data.id] = payload.data;

            return newState;
        case ClassDiagramActionEnum.UPDATE_DATA_TYPE_ENTRY:
            newState = {...state};
            newState.byId[payload.data.id] = payload.data;

            return newState;
        case ClassDiagramActionEnum.REMOVE_DATA_TYPE_ENTRY:
            newState = {...state};
            newState.allIds.splice(newState.allIds.indexOf(payload.data.id), 1);
            delete newState.byId[payload.data.id];

            return newState;
        default:
            return state;
    }
};

export default dataTypeEntriesReducer;