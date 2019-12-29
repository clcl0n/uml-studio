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

            return newState
        default:
            return state;
    }
};

export default enumerationEntriesReducer;