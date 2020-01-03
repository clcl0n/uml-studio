import IReduxEntity from '@interfaces/IReduxEntity';
import IEnumerationEntry from '@interfaces/class-diagram/enumeration/IEnumerationEntry';
import IReducerPayload from '@interfaces/IReducerPayload';
import ClassDiagramActionEnum from '@enums/classDiagramActionEnum';

const enumerationEntriesState: IReduxEntity<IEnumerationEntry>= {
    byId: {},
    allIds: []
};

const enumerationEntriesReducer = (state = enumerationEntriesState, payload: IReducerPayload<ClassDiagramActionEnum, IEnumerationEntry>) => {
    let newState: IReduxEntity<IEnumerationEntry>;
    switch(payload.type) {
        case ClassDiagramActionEnum.ADD_NEW_ENUMERATION_ENTRY:
            newState = {
                byId: {
                    ...state.byId,
                },
                allIds: [...state.allIds, payload.data.id]
            };
            newState.byId[payload.data.id] = payload.data;

            return newState;
        case ClassDiagramActionEnum.UPDATE_ENUMERATION_ENTRY:
            newState = {...state};
            newState.byId[payload.data.id] = payload.data;

            return newState;
        case ClassDiagramActionEnum.REMOVE_ENUMERATION_ENTRY:
            newState = {...state};
            newState.allIds.splice(newState.allIds.indexOf(payload.data.id), 1);
            delete newState.byId[payload.data.id];

            return newState;
        default:
            return state;
    }
};

export default enumerationEntriesReducer;