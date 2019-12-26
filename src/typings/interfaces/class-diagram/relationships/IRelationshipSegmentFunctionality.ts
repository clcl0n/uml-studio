import SegmentDirection from '@enums/segmentDirection';

export default interface IRelationshipSegmentFunctionality {
    onSegmentMove: (event: React.MouseEvent, segmentId: string, segmentDirection: SegmentDirection) => void;
}