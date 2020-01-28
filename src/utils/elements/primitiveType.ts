import { createFrame, moveFrame } from './frame';
import ICoordinates from '@interfaces/ICoordinates';
import IPrimitiveType from '@interfaces/class-diagram/primitive-type/IPrimitiveType';
import { v4 } from 'uuid';
import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';

export const createNewPrimitiveType = (coordinates: ICoordinates) => {
    const frame = createFrame(coordinates, 1);

    frame.height += frame.rowHeight / 2;

    const newPrimitiveType: IPrimitiveType = {
        id: v4(),
        type: ClassDiagramElementsEnum.PRIMITIVE_TYPE,
        data: {
            elementName: 'primitive type',
            entryIds: []
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

export const movePrimitiveType = (classElement: IPrimitiveType, coordinates: ICoordinates, oldCursorPosition: ICoordinates): IPrimitiveType => {
    const newFrame = moveFrame(classElement, coordinates, oldCursorPosition);

    return {
        ...classElement,
        graphicData: {
            frame: newFrame,
            sections: {}
        }
    };
};