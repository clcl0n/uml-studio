import IFrame from '@interfaces/class-diagram/common/IFrame';
import ICoordinates from '@interfaces/ICoordinates';
import IBaseElement from '@interfaces/class-diagram/common/IBaseElement';
import IBaseElementGraphicData from '@interfaces/class-diagram/common/IBaseElementGraphicData';
import Direction from '@enums/direction';

const minWidth = 100;

export const createFrame = (coordinates: ICoordinates, numerOfRows: number, rowHeight: number = 25): IFrame => {
    const width: number = 100;
    const height: number = numerOfRows * rowHeight;
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

export const moveFrame = (
    element: IBaseElement<IBaseElementGraphicData<any>>,
    coordinates: ICoordinates,
    oldCursorPosition: ICoordinates
): IFrame => {
    const { frame } = element.graphicData;

    const xShift = coordinates.x - oldCursorPosition.x;
    const yShift = coordinates.y - oldCursorPosition.y;

    const xElementCenter: number = frame.xCenter + xShift;
    const yElementCenter: number = frame.yCenter + yShift;
    const x: number = xElementCenter - (frame.width / 2);
    const y: number = yElementCenter - (frame.height / 2);

    return {
        ...frame,
        x,
        y,
        xCenter: xElementCenter,
        yCenter: yElementCenter
    };
};

export const resizeFrame = (element: IBaseElement<any>, coordinates: ICoordinates, direction: Direction): IBaseElement<any> => {
    const { graphicData } = element;

    let width = 0;
    if (direction === Direction.RIGHT) {
        width = (coordinates.x - graphicData.frame.x);
        if (width >= minWidth) {
            graphicData.frame.width = width;
            graphicData.frame.xCenter = graphicData.frame.x + (graphicData.frame.width / 2);
        }
    } else {
        width = ((graphicData.frame.x + graphicData.frame.width) - coordinates.x);
        if (width >= minWidth) {
            graphicData.frame.width += (graphicData.frame.x - coordinates.x); 
            graphicData.frame.x = coordinates.x;
            graphicData.frame.xCenter = graphicData.frame.x + graphicData.frame.width / 2;
        }
    }

    return {
        ...element,
        ...graphicData
    };
};