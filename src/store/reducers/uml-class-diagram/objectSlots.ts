import IReduxEntity from "@interfaces/IReduxEntity";
import IObjectSlot from '@interfaces/class-diagram/object/IObjectSlot';
import IReducerPayload from '@interfaces/IReducerPayload';
import ClassDiagramActionEnum from '@enums/classDiagramActionEnum';

const objectSlotsState: IReduxEntity<IObjectSlot> = {
    byId: {},
    allIds: []
};

const objectSlotsReducer = (state = objectSlotsState, payload: IReducerPayload<ClassDiagramActionEnum, IObjectSlot>) => {
    let newState: IReduxEntity<IObjectSlot>;
    switch(payload.type) {
        case ClassDiagramActionEnum.ADD_NEW_OBJECT_SLOT:
            newState = {
                byId: {
                    ...state.byId,
                },
                allIds: [...state.allIds, payload.data.id]
            };
            newState.byId[payload.data.id] = payload.data;

            return newState;
        case ClassDiagramActionEnum.UPDATE_OBJECT_SLOT:
            newState = {...state};
            newState.byId[payload.data.id] = payload.data;

            return newState;
        case ClassDiagramActionEnum.REMOVE_OBJECT_SLOT:
            newState = {...state};
            newState.allIds.splice(newState.allIds.indexOf(payload.data.id), 1);
            delete newState.byId[payload.data.id];

            return newState;
        default:
            return state;
    }
};

export default objectSlotsReducer;