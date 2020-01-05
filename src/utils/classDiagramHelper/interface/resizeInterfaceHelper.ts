import Direction from '@enums/direction';
import ICoordinates from '@interfaces/ICoordinates';
import IInterface from '@interfaces/class-diagram/interface/IInterface';
import resizeElementHelper from '../resizeElementHelper';

const resizeInterfaceHelper = (utilityElement: IInterface, coordinates: ICoordinates, direction: Direction): IInterface => {
    const { frame } = utilityElement.graphicData;

    return {
        ...utilityElement,
        graphicData: {
            ...utilityElement.graphicData,
            frame: resizeElementHelper(frame, coordinates, direction)
        }
    };
};

export default resizeInterfaceHelper;