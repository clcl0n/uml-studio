import IReduxEntity from '@interfaces/IReduxEntity';
import IReducerPayload from '@interfaces/IReducerPayload';
import ClassDiagramActionEnum from '@enums/classDiagramActionEnum';
import IRelationship from '@interfaces/class-diagram/relationships/IRelationship';

const relationships: IReduxEntity<IRelationship> = {
    byId: {},
    allIds: []
};

const relationshipsReducer = (state = relationships, payload: IReducerPayload<ClassDiagramActionEnum, IRelationship>) => {
    let newState: IReduxEntity<IRelationship>;
    switch(payload.type) {
        case ClassDiagramActionEnum.ADD_NEW_RELATIONSHIP:
            newState = {...state};
            newState.allIds.push(payload.data.id);
            newState.byId[payload.data.id] = payload.data;

            return newState;
        case ClassDiagramActionEnum.UPDATE_RELATIONSHIP:
            newState = {...state};
            newState.byId[payload.data.id] = payload.data;

            return newState;
        default:
            return state;
    }
};

export default relationshipsReducer;