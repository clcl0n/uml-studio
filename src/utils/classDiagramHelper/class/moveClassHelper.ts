import ICoordinates from '@interfaces/ICoordinates';
import IClass from '@interfaces/class-diagram/class/IClass';
import moveElementHelper from '../moveElementHelper';

const moveClassHelper = (classElement: IClass, coordinates: ICoordinates, oldCursorPosition: ICoordinates): IClass => {
    const newFrame = moveElementHelper(classElement, coordinates, oldCursorPosition);

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