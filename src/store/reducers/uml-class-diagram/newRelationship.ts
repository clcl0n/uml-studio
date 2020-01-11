import INewRelationship from '@interfaces/class-diagram/INewRelationship';
import IReducerPayload from '@interfaces/IReducerPayload';
import ClassDiagramActionEnum from '@enums/classDiagramActionEnum';

const newRelationshipState: INewRelationship = {
    relationship: null,
    relationshipSegments: []
};

const newRelationshipReducer = (state = newRelationshipState, payload: IReducerPayload<ClassDiagramActionEnum, INewRelationship>): INewRelationship => {
    switch (payload.type) {
        case ClassDiagramActionEnum.ADD_NEW_NEW_RELATIONSHIP:
            return payload.data;
        case ClassDiagramActionEnum.UPDATE_NEW_RELATIONSHIP:
            return payload.data;
        case ClassDiagramActionEnum.CLEAR_NEW_RELATIONSHIP:
            return {
                relationship: null,
                relationshipSegments: []
            };
        default: 
            return state;
    }
};

export default newRelationshipReducer;