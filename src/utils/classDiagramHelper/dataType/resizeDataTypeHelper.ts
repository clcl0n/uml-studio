import ICoordinates from '@interfaces/ICoordinates';
import Direction from '@enums/direction';
import IDataType from '@interfaces/class-diagram/data-type/IDataType';
import resizeElementHelper from '../resizeElementHelper';

const resizeDataTypeHelper = (element: IDataType, coordinates: ICoordinates, direction: Direction): IDataType => {
    const { frame } = element.graphicData;

    return {
        ...element,
        graphicData: {
            ...element.graphicData,
            frame: resizeElementHelper(frame, coordinates, direction)
        }
    };
};

export default resizeDataTypeHelper;