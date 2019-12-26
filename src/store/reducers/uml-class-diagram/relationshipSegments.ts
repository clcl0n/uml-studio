import IReduxEntity from '@interfaces/IReduxEntity';
import ClassDiagramActionEnum from '@enums/classDiagramActionEnum';
import IReducerPayload from '@interfaces/IReducerPayload';
import IRelationshipSegment from '@interfaces/class-diagram/relationships/IRelationshipSegment';

const relationshipSegments: IReduxEntity<IRelationshipSegment> = {
    byId: {},
    allIds: []
};

const relationshipSegmentsReducer = (state = relationshipSegments, payload: IReducerPayload<ClassDiagramActionEnum, IRelationshipSegment>) => {
    let newState: IReduxEntity<IRelationshipSegment>;
    switch(payload.type) {
        case ClassDiagramActionEnum.ADD_NEW_RELATIONSHIP_SEGMENT:
            newState = {...state};
            newState.allIds.push(payload.data.id);
            newState.byId[payload.data.id] = payload.data;
            
            return newState;
        case ClassDiagramActionEnum.UPDATE_RELATIONSHIP_SEGMENT:
            newState = {...state};
            newState.byId[payload.data.id] = payload.data;

            return newState;
        default:
            return state;
    }
};

export default relationshipSegmentsReducer;