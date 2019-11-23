import IRelationSegment from './IRelationSegment';
import RelationDirection from '@enums/relationDirection';

export default interface IRelationGraphicData {
    head: { x: number, y: number };
    segments: Array<IRelationSegment>;
    direction: RelationDirection;
}