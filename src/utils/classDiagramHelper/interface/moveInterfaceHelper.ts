import ICoordinates from '@interfaces/ICoordinates';
import IInterface from '@interfaces/class-diagram/interface/IInterface';
import moveElementHelper from '../moveElementHelper';

const moveInterfaceHelper = (element: IInterface, coordinates: ICoordinates, oldCursorPosition: ICoordinates): IInterface => {
    const newFrame = moveElementHelper(element, coordinates, oldCursorPosition);

    return {
        ...element,
        graphicData: {
            frame: newFrame,
            sections: {
                head: {
                    y: newFrame.y
                },
                properties: {
                    y: newFrame.y + newFrame.rowHeight + (newFrame.rowHeight / 2)
                },
                methods: {
                    y: newFrame.y + ((1 + element.data.interfacePropertyIds.length) * newFrame.rowHeight) + (newFrame.rowHeight / 2)
                }
            }
        }
    };
};

export default moveInterfaceHelper;