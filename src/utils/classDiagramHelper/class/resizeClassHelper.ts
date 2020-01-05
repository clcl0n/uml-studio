import ICoordinates from '@interfaces/ICoordinates';
import IClass from '@interfaces/class-diagram/class/IClass';
import Direction from '@enums/direction';
import resizeElementHelper from '../resizeElementHelper';

const resizeClassHelper = (classElement: IClass, coordinates: ICoordinates, direction: Direction): IClass => {
    const { frame } = classElement.graphicData;

    return {
        ...classElement,
        graphicData: {
            ...classElement.graphicData,
            frame: resizeElementHelper(frame, coordinates, direction)
        }
    };
};

export default resizeClassHelper;