import SegmentDirection from '@enums/segmentDirection';

export default interface IRelationshipSegment {
    id: string;
    relationshipId: string;
    fromSegmentId: string;
    toSegmentId: string;
    isStart: boolean;
    isEnd: boolean;
    x: number;
    y: number;
    lineToX: number;
    lineToY: number;
    direction: SegmentDirection;
}