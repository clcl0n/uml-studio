import ISegmentGraphicDat from '../segment/ISegmentGraphicData';
import RelationDirection from '@enums/relationDirection';
import I2DCoordinates from '@interfaces/ICoordinates';

export default interface IRelationGraphicData {
    head: I2DCoordinates;
    segments: Array<ISegmentGraphicDat>;
    direction: RelationDirection;
}