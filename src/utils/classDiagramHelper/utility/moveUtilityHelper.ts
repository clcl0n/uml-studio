import ICoordinates from '@interfaces/ICoordinates';
import moveElementHelper from '../moveElementHelper';
import IUtility from '@interfaces/class-diagram/utility/IUtility';

const moveUtilityHelper = (element: IUtility, coordinates: ICoordinates, oldCursorPosition: ICoordinates): IUtility => {
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
                    y: newFrame.y + ((1 + element.data.utilityPropertyIds.length) * newFrame.rowHeight) + (newFrame.rowHeight / 2)
                }
            }
        }
    };
};

export default moveUtilityHelper;