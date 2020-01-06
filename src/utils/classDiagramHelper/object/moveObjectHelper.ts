import IObject from '@interfaces/class-diagram/object/IObject';
import ICoordinates from '@interfaces/ICoordinates';
import moveElementHelper from '../moveElementHelper';

const moveObjectHelper = (element: IObject, coordinates: ICoordinates, oldCursorPosition: ICoordinates): IObject => {
    const newFrame = moveElementHelper(element, coordinates, oldCursorPosition);

    return {
        ...element,
        graphicData: {
            frame: newFrame,
            sections: {}
        }
    };
};

export default moveObjectHelper;