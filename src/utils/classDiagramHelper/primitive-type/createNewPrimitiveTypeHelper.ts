import ICoordinates from '@interfaces/ICoordinates';
import IPrimitiveType from '@interfaces/class-diagram/primitive-type/IPrimitiveType';
import { v4 } from 'uuid';
import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';
import createFrameHelper from '../createFrameHelper';

const createNewPrimitiveType = (coordinates: ICoordinates) => {
    const frame = createFrameHelper(coordinates, 1);

    frame.height += frame.rowHeight / 2;

    const newPrimitiveType: IPrimitiveType = {
        id: v4(),
        type: ClassDiagramElementsEnum.PRIMITIVE_TYPE,
        data: {
            primitiveName: 'primitive type'
        },
        graphicData: {
            frame,
            sections: {}
        }
    };

    return {
        newPrimitiveType
    };
};

export default createNewPrimitiveType;