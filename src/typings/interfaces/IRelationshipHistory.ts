import IRelationship from './class-diagram/relationships/IRelationship';
import IRelationshipSegment from './class-diagram/relationships/IRelationshipSegment';

export default interface IRelationshipHistory {
    relationship: IRelationship;
    relationshipSegments: Array<IRelationshipSegment>;
}