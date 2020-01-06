import ICoordinates from '@interfaces/ICoordinates';
import IFrame from '@interfaces/class-diagram/common/IFrame';
import IBaseElement from '@interfaces/class-diagram/common/IBaseElement';
import IBaseElementGraphicData from '@interfaces/class-diagram/common/IBaseElementGraphicData';

const moveElementHelper = (
    element: IBaseElement<IBaseElementGraphicData<any>, any>,
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

export default moveElementHelper;