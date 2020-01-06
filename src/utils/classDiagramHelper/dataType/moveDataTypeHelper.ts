import IDataType from '@interfaces/class-diagram/data-type/IDataType';
import ICoordinates from '@interfaces/ICoordinates';
import moveElementHelper from '../moveElementHelper';

const moveDataTypeHelper = (element: IDataType, coordinates: ICoordinates, oldCursorPosition: ICoordinates): IDataType => {
    const newFrame = moveElementHelper(element, coordinates, oldCursorPosition);

    return {
        ...element,
        graphicData: {
            frame: newFrame,
            sections: {}
        }
    };
};

export default moveDataTypeHelper;