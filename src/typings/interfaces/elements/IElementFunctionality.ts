import Direction from '@enums/Direction';

export default interface IElementFunctionality {
    onJointClick?: (event: React.MouseEvent) => void;
    onSegmentMove?: (event: React.MouseEvent, segmentId: string, direction: Direction) => void;
    onClassMouseDown?: (event: React.MouseEvent, classId: string) => void;
    onClassMouseUp?: (event: React.MouseEvent) => void;
}