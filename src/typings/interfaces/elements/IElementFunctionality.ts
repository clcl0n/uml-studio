export default interface IElementFunctionality {
    onJointClick?: (event: React.MouseEvent) => void;
    onSegmentMove?: (event: React.MouseEvent, segmentId: string) => void;
}