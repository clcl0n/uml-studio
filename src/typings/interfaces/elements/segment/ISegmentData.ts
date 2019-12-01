export default interface ISegmentData {
    id: string;
    fromSegmentId: string;
    toSegmentId: string;
    isStart: boolean;
    isEnd: boolean;
}