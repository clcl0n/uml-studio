import ICoordinates from '@interfaces/ICoordinates';
import Direction from '@enums/direction';
import IEnumeration from '@interfaces/class-diagram/enumeration/IEnumeration';
import resizeElementHelper from '../resizeElementHelper';

const resizeEnumerationHelper = (element: IEnumeration, coordinates: ICoordinates, direction: Direction): IEnumeration => {
    const { frame } = element.graphicData;

    return {
        ...element,
        graphicData: {
            ...element.graphicData,
            frame: resizeElementHelper(frame, coordinates, direction)
        }
    };
};

export default resizeEnumerationHelper;