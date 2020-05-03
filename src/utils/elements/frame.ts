import IFrame from '@interfaces/class-diagram/common/IFrame';
import ICoordinates from '@interfaces/ICoordinates';
import IBaseElement from '@interfaces/class-diagram/common/IBaseElement';
import IBaseElementGraphicData from '@interfaces/class-diagram/common/IBaseElementGraphicData';
import Direction from '@enums/direction';
import IStateElement from '@interfaces/state-diagram/state/IStateElement';

const minWidth = 100;
const minHeight = 100;

export const createFrame = (coordinates: ICoordinates, numerOfRows: number, rowHeight: number = 25, width: number = 100, isCoordinatesCenter: boolean = true): IFrame => {
    const height: number = numerOfRows * rowHeight;
    let xElementCenter: number = coordinates.x;
    let yElementCenter: number = coordinates.y;
    let x: number = xElementCenter - (width / 2);
    let y: number = yElementCenter - (height / 2);
    // if (!isCoordinatesCenter) {
    //     yElementCenter = y;
    //     y = coordinates.y
    // }
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
    element: IBaseElement<IBaseElementGraphicData<any>> | IStateElement,
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

export const resizeFrame = (element: IBaseElement<any> | IStateElement, coordinates: ICoordinates, direction: Direction): IBaseElement<any> | IStateElement => {
    const { graphicData } = element;
    let width = 0;
    let height = 0;
    switch(direction) {
        case Direction.RIGHT:
            width = (coordinates.x - graphicData.frame.x);
            if (width >= minWidth) {
                graphicData.frame.width = width;
                graphicData.frame.xCenter = graphicData.frame.x + (graphicData.frame.width / 2);
            }
            break;
        case Direction.LEFT:
            width = ((graphicData.frame.x + graphicData.frame.width) - coordinates.x);
            if (width >= minWidth) {
                graphicData.frame.width += (graphicData.frame.x - coordinates.x); 
                graphicData.frame.x = coordinates.x;
                graphicData.frame.xCenter = graphicData.frame.x + graphicData.frame.width / 2;
            }
            break;
        case Direction.UP:
            height = ((graphicData.frame.y + graphicData.frame.height) - coordinates.y);
            if (height >= minHeight) {
                graphicData.frame.height += (graphicData.frame.y - coordinates.y); 
                graphicData.frame.y = coordinates.y;
                graphicData.frame.yCenter = graphicData.frame.y + graphicData.frame.height / 2;
            } 
            break;
            break;
        case Direction.DOWN:
            height = (coordinates.y - graphicData.frame.y);
            if (height >= minHeight) {
                graphicData.frame.height = height;
                graphicData.frame.yCenter = graphicData.frame.y + (graphicData.frame.height / 2);
            }
            break;
    }

    return {
        ...element,
        ...graphicData
    };
};