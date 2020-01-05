import ICoordinates from '@interfaces/ICoordinates';
import Direction from '@enums/direction';
import resizeElementHelper from '../resizeElementHelper';
import IUtility from '@interfaces/class-diagram/utility/IUtility';

const resizeUtilityHelper = (element: IUtility, coordinates: ICoordinates, direction: Direction): IUtility => {
    const { frame } = element.graphicData;

    return {
        ...element,
        graphicData: {
            ...element.graphicData,
            frame: resizeElementHelper(frame, coordinates, direction)
        }
    };
};

export default resizeUtilityHelper;