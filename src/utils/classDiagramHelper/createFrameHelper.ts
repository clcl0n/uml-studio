import ICoordinates from '@interfaces/ICoordinates';
import IFrame from '@interfaces/class-diagram/common/IFrame';

const createFrameHelper = (coordinates: ICoordinates): IFrame => {
    const width: number = 100;
    const rowHeight: number = 25;
    const height: number = 3 * rowHeight;
    const xElementCenter: number = coordinates.x;
    const yElementCenter: number = coordinates.y;
    const x: number = xElementCenter - (width / 2);
    const y: number = yElementCenter - (height / 2);
    const fontPixelSize: number = 12;
    const fontMargin: number = 5;

    return {
        fontMargin,
        fontPixelSize,
        rowHeight,
        height,
        width,
        x,
        y,
        xCenter: xElementCenter,
        yCenter: yElementCenter,
    };
};

export default createFrameHelper;