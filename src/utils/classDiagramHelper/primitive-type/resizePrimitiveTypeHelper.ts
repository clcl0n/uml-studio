import IPrimitiveType from '@interfaces/class-diagram/primitive-type/IPrimitiveType';
import ICoordinates from '@interfaces/ICoordinates';
import Direction from '@enums/direction';
import resizeElementHelper from '../resizeElementHelper';

const resizePrimitiveTypeHelper = (utilityElement: IPrimitiveType, coordinates: ICoordinates, direction: Direction): IPrimitiveType => {
    const { frame } = utilityElement.graphicData;

    return {
        ...utilityElement,
        graphicData: {
            ...utilityElement.graphicData,
            frame: resizeElementHelper(frame, coordinates, direction)
        }
    };
};

export default resizePrimitiveTypeHelper;