import ISegmentGraphicDat from '../segment/ISegmentGraphicData';
import Direction from '@enums/Direction';
import I2DCoordinates from '@interfaces/I2DCoordinates';

export default interface IRelationGraphicData {
    tail: I2DCoordinates;
    head: I2DCoordinates;
    segments: Array<ISegmentGraphicDat>;
    direction: Direction;
}