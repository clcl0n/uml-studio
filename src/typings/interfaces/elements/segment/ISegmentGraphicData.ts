import I2DCoordinates from '@interfaces/ICoordinates';

export default interface ISegmentGraphicData extends I2DCoordinates {
    lineToX: number;
    lineToY: number;
}