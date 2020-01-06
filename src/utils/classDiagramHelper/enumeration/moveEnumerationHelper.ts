import IEnumeration from '@interfaces/class-diagram/enumeration/IEnumeration';
import ICoordinates from '@interfaces/ICoordinates';
import moveElementHelper from '../moveElementHelper';

const moveEnumerationHelper = (element: IEnumeration, coordinates: ICoordinates, oldCursorPosition: ICoordinates): IEnumeration => {
    const newFrame = moveElementHelper(element, coordinates, oldCursorPosition);

    return {
        ...element,
        graphicData: {
            frame: newFrame,
            sections: {}
        }
    };
};

export default moveEnumerationHelper;