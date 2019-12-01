import ISegmentData from '../segment/ISegmentData';

export default interface IRelationData {
    fromClassId: string;
    toClassId: string;
    segments: Array<ISegmentData>;
}