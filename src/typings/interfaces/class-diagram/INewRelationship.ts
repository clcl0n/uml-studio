import IRelationship from './relationships/IRelationship';
import IRelationshipSegment from './relationships/IRelationshipSegment';

export default interface INewRelationship {
    relationship: IRelationship;
    relationshipSegments: Array<IRelationshipSegment>;
} 