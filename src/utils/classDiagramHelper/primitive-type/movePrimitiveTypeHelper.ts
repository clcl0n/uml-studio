import IPrimitiveType from '@interfaces/class-diagram/primitive-type/IPrimitiveType';
import ICoordinates from '@interfaces/ICoordinates';
import moveElementHelper from '../moveElementHelper';

const movePrimitiveTypeHelper = (classElement: IPrimitiveType, coordinates: ICoordinates, oldCursorPosition: ICoordinates): IPrimitiveType => {
    const newFrame = moveElementHelper(classElement, coordinates, oldCursorPosition);

    return {
        ...classElement,
        graphicData: {
            frame: newFrame,
            sections: {}
        }
    };
};

export default movePrimitiveTypeHelper;