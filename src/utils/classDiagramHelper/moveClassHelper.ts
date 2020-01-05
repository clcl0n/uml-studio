import ICoordinates from '@interfaces/ICoordinates';
import IClass from '@interfaces/class-diagram/class/IClass';
import createFrameHelper from './createFrameHelper';
import IFrame from '@interfaces/class-diagram/common/IFrame';

const moveClassHelper = (classElement: IClass, coordinates: ICoordinates, oldCursorPosition: ICoordinates): IClass => {
    const { frame } = classElement.graphicData;

    const xShift = coordinates.x - oldCursorPosition.x;
    const yShift = coordinates.y - oldCursorPosition.y;

    const xElementCenter: number = frame.xCenter + xShift;
    const yElementCenter: number = frame.yCenter + yShift;
    const x: number = xElementCenter - (frame.width / 2);
    const y: number = yElementCenter - (frame.height / 2);

    const newFrame: IFrame = {
        ...frame,
        x,
        y,
        xCenter: xElementCenter,
        yCenter: yElementCenter
    };

    return {
        ...classElement,
        graphicData: {
            frame: newFrame,
            sections: {
                head: {
                    y: newFrame.y
                },
                properties: {
                    y: newFrame.y + newFrame.rowHeight
                },
                methods: {
                    y: newFrame.y + ((1 + classElement.data.classPropertyIds.length) * newFrame.rowHeight)
                }
            }
        }
    };
};

export default moveClassHelper;