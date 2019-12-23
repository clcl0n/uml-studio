import I2DCoordinates from '@interfaces/I2DCoordinates';
import Direction from '@enums/Direction';

export default interface ISegmentGraphicData extends I2DCoordinates {
    id: string;
    lineToX: number;
    lineToY: number;
    direction: Direction;
}